import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Text } from "@/components/ui/text";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import * as z from "zod";

const signInSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number is too short" })
    .regex(/^\+254\d{9}$/, { message: "Please enter a valid phone number" }),
});

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    SecureStore.getItemAsync("phoneNumber").then((value) => {
      if (value) {
        setPhoneNumber(value);
      }
    });
  }, []);

  const onSubmit = async () => {
    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const result = signInSchema.safeParse({ phone: fullPhone });
      if (!result.success) {
        const newErrors: { [key: string]: string } = {};
        result.error.errors.forEach((error: any) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({});
        setLoading(true);
        await SecureStore.setItemAsync("phoneNumber", phoneNumber);
        const signInAttempt = await signIn?.create({
          identifier: fullPhone,
          strategy: "phone_code",
        });
        const phoneNumberId = signInAttempt?.supportedFirstFactors?.find(
          (factor) => factor.strategy === "phone_code",
        )?.phoneNumberId;
        if (signInAttempt?.status === "needs_first_factor") {
          router.push({
            pathname: "/(auth)/otp",
            params: { phone: fullPhone, type: "signIn", phoneNumberId },
          });
        } else if (signInAttempt?.status === "complete") {
          await setActive!({ session: signInAttempt.createdSessionId });
          router.replace({
            pathname: "/(tabs)",
          });
        }
      }
    } catch (err: any) {
      console.log("signInError", JSON.stringify(err, null, 2));
      if (err.errors[0].code === "form_identifier_not_found") {
        await signUp
          ?.create({
            phoneNumber: `+254${phoneNumber}`,
          })
          .then(async (signUpAttempt) => {
            if (signUpAttempt?.status === "missing_requirements") {
              await signUp?.preparePhoneNumberVerification({
                strategy: "phone_code",
              });
              router.push({
                pathname: "/(auth)/otp",
                params: { phone: phoneNumber, type: "signUp" },
              });
            } else if (signUpAttempt?.status === "complete") {
              setActive!({ session: signUpAttempt.createdSessionId });
              router.replace({
                pathname: "/(tabs)",
              });
            }
          })
          .catch((err) => {
            console.log("signUpError", JSON.stringify(err, null, 2));
          });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex h-full w-full flex-col items-center justify-center gap-36 bg-white p-8">
        <Image
          source={{
            uri: "https://assets.ezifarmer.com/ezifresh.png",
          }}
          className="h-16 w-full object-contain"
          resizeMode="contain"
        />
        <View className="flex w-full flex-col gap-3">
          <PhoneInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        </View>

        <View className="w-full items-center justify-center gap-4">
          <View className="flex flex-row flex-wrap items-center gap-1">
            <Text className="text-muted-foreground">
              By continuing, you agree to our
            </Text>
            <Text className="text-muted-foreground underline">
              Terms of Service
            </Text>
          </View>
          <Button
            size="lg"
            className="flex w-full items-center rounded-xl"
            onPress={onSubmit}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Continue</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
