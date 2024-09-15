import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { useAuth, useSignIn, useSignUp, useUser } from "@clerk/clerk-expo";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const InputField = (
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
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(7, "Phone number should be at least 7 digits"),
  email: z.string().email("Invalid email address"),
});

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();
  const { signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    try {
      const result = signInSchema.safeParse({ name, phoneNumber, email });
      if (!result.success) {
        const newErrors: { [key: string]: string } = {};
        result.error.errors.forEach((error: any) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({});
        if (!isLoaded) return;
        setLoading(true);

        const signUpAttempt = await signUp?.create({
          firstName: name,
          lastName: name,
          emailAddress: email,
        phoneNumber: phoneNumber,
        });

        if (signUpAttempt?.status === "missing_requirements") {
          await signUp?.preparePhoneNumberVerification({
            strategy: "phone_code",
          });
          router.push({
            pathname: "/(auth)/otp",
            params: { phoneNumber, type: "signUp" },
          });
        } else {
          console.error(JSON.stringify(signUpAttempt, null, 2));
        }
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex flex-col bg-white h-full items-center justify-center">
      <View className="flex flex-col p-5 w-full items-start h-full justify-center gap-5">
        <View className="flex w-full items-center">
          <Text className="justify-center text-black text-3xl font-semibold">
            Enter your details
          </Text>
        </View>

        <View className="flex flex-col w-full gap-3">
          <InputField
            placeholder="Name"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <InputField
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phoneNumber}
          />

          <InputField
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
        </View>

        <View className="w-full">
          <Pressable
            className="flex w-full p-5 items-center rounded-full bg-[#32BB78]"
            onPress={onSubmit}
          >
            {loading
              ? <ActivityIndicator color="white" />
              : (
                <Text className="text-white text-[15px] font-bold">
                  Sign Up
                </Text>
              )}
          </Pressable>
        </View>
        <View className="flex items-center justify-center w-full">
          <Text className="text-black text-[14px]">
            Already have an account?
            <Text
              className="text-blue-500 font-medium"
              onPress={() => router.push({ pathname: "/(auth)" })}
            >
              Sign In
            </Text>
          </Text>
        </View>
        <View className="flex w-full items-center">
          <Text className="text-black text-[14px]">
            By signing in, you agree to our
            <Text className="text-blue-500">Terms of Service</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
