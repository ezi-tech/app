import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!signUp?.phoneNumber) {
    router.replace("/(auth)/");
    return null;
  }

  async function onSubmit() {
    setLoading(true);
    try {
      const res = await signUp?.update({
        firstName,
        lastName,
        emailAddress: email,
      });

      if (res?.status === "complete") {
        await setActive!({ session: res.createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      console.log("completeError", JSON.stringify(err, null, 2));
      const { errors } = err as { errors: ClerkAPIError[] };

      const firstError = errors[0];
      setError(firstError.longMessage || firstError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <View className="flex h-full w-full bg-white py-12">
        <View className="absolute top-12 gap-8 px-6">
          <View className="flex w-full flex-col gap-y-8">
            <View className="relative flex w-full flex-row items-center justify-start">
              <View className="absolute left-0">
                <ArrowLeft color="black" onPress={() => router.replace("/(auth)/")} />
              </View>
              <Text className="font-asap-semibold mx-auto text-center text-2xl">
                Complete profile
              </Text>
            </View>
            <Text className="text-xl text-muted-foreground">
              Please enter your personal details to complete your profile
            </Text>
          </View>
          <View className="flex gap-4">
            <View className="flex flex-row items-center gap-4">
              <TextField
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
                className="flex-1"
              />
              <TextField
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
                className="flex-1"
              />
            </View>

            <TextField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            {error && <Text className="text-red-500">{error}</Text>}
          </View>
        </View>

        <View className="absolute bottom-8 mx-auto flex w-full gap-4 px-6">
          <Text className="text-center text-sm text-muted-foreground">
            We may use your email to send occasional offers and promotions. You
            can unsubscribe at any time.
          </Text>
          <Button
            size="lg"
            className="native:h-16 flex w-full items-center justify-center rounded-full"
            onPress={onSubmit}
            disabled={!firstName || !lastName || !email}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-asap-medium native:text-xl">Complete</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
