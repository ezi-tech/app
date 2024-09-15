import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export const InputField = (
  { placeholder, value, onChangeText, error }: InputFieldProps,
) => (
  <>
    <TextInput
      className={cn(
        "bg-[#F5F6F8] w-full p-5 rounded-xl placeholder:text-black placeholder:text-[15px] text-[15px] text-black",
      )}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
    {error && <Text className="text-red-500 text-[12px]">{error}</Text>}
  </>
);
const signInSchema = z.object({
  phone: z.string().min(10, { message: "Phone number is too short" }).regex(
    /^\+2547\d{8}$/,
    { message: "Invalid phone number" },
  ),
});

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+2547");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    SecureStore.getItemAsync("phone").then((value) => {
      if (value) {
        setPhone(value);
      }
    });
  }, []);

  const onSubmit = async () => {
    try {
      const result = signInSchema.safeParse({ phone });
      if (!result.success) {
        const newErrors: { [key: string]: string } = {};
        result.error.errors.forEach((error: any) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({});
        setLoading(true);
        await SecureStore.setItemAsync("phone", phone);
        const signInAttempt = await signIn?.create({
          identifier: phone,
          strategy: "phone_code",
        });
        const phoneNumberId = signInAttempt?.supportedFirstFactors?.find(
          (factor) => factor.strategy === "phone_code",
        )?.phoneNumberId;
        if (signInAttempt?.status === "needs_first_factor") {
          router.push({
            pathname: "/(auth)/otp",
            params: { phone, type: "signIn", phoneNumberId },
          });
        } else if (signInAttempt?.status === "complete") {
          await setActive!({ session: signInAttempt.createdSessionId });
          router.replace({
            pathname: "/(tabs)",
          });
        }
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      if (err.errors[0].code === "form_identifier_not_found") {
        const signUpAttempt = await signUp?.create({
          phoneNumber: phone,
        });
        if (signUpAttempt?.status === "missing_requirements") {
          await signUp?.preparePhoneNumberVerification({
            strategy: "phone_code",
          });
          router.push({
            pathname: "/(auth)/otp",
            params: { phone, type: "signUp" },
          });
        } else if (signUpAttempt?.status === "complete") {
          await setActive!({ session: signUpAttempt.createdSessionId });
          router.replace({
            pathname: "/(tabs)",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex flex-col bg-white h-full items-center justify-center">
      <View className="flex flex-col p-5 w-full items-start h-full justify-center gap-5">
        <View className="absolute top-1 items-center justify-center w-screen">
          <Image
            source={{
              uri: "https://assets.ezifarmer.com/ezifresh.png",
            }}
            className="w-full h-12 object-contain"
            resizeMode="contain"
          />
        </View>
        <View className="flex flex-col w-full gap-3">
          <InputField
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
          />
        </View>

        <View className="w-full">
        </View>
        <View className="absolute bottom-0 w-screen items-center gap-2 justify-center px-5">
          <View className="flex flex-row flex-wrap items-center gap-1">
            <Text className="text-black text-[14px]">
              By signing in, you agree to our
            </Text>
            <Text className="text-black underline">Terms of Service</Text>
          </View>
          <Pressable
            className="flex w-full p-5 items-center rounded-full bg-[#32BB78]"
            onPress={onSubmit}
          >
            {loading
              ? <ActivityIndicator color="white" />
              : (
                <Text className="text-white text-[15px] font-bold">
                  Sign In
                </Text>
              )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
