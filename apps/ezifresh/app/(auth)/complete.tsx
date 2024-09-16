import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit() {
    setLoading(true);
    try {
      console.log(
        "create signup",
        firstName,
        lastName,
        email,
        signUp?.phoneNumber,
      );
      const res = await signUp?.update({
        firstName,
        lastName,
        emailAddress: email,
      });
      console.log("create signup", res);

      if (res?.status === "complete") {
        await setActive!({ session: res.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.log("erorrr", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <View className="flex h-full w-full gap-8 bg-white px-5 py-12">
        <View className="flex w-full flex-col gap-y-4">
          <View className="relative flex w-full flex-row items-center justify-start">
            <View className="absolute left-0">
              <ArrowLeft color="black" onPress={() => router.back()} />
            </View>
            <Text className="font-asap-semibold mx-auto text-center text-2xl">
              Complete profile
            </Text>
          </View>
          <Text className="text-xl leading-relaxed text-muted-foreground">
            Please enter your personal details to complete your profile
          </Text>
        </View>
        <View className="flex gap-4">
          <View className="flex flex-row items-center gap-4">
            <TextField
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              className="flex-grow"
            />
            <TextField
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              className="flex-grow"
            />
          </View>

          <TextField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mt-8 flex gap-4">
          <Text className="text-muted-foreground">
            We may use your email to send occasional offers and promotions. You
            can unsubscribe at any time.
          </Text>
          <Button
            size="lg"
            className="flex w-full items-center rounded-xl"
            onPress={onSubmit}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Complete</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
