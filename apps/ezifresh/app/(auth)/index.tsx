import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Text } from "@/components/ui/text";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSecureStore } from "@/hooks/useSecureStore";
import { useSignInFlow } from "@/hooks/useSignInFlow";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  error,
}: InputFieldProps) => (
  <>
    <View className="flex w-full flex-row items-center gap-4">
      <TextInput
        value="+254"
        className="rounded-xl bg-muted p-5 px-8 text-lg"
      />
      <TextInput
        className={cn("flex-grow rounded-xl bg-muted p-5 text-lg")}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
    {error && <Text className="text-[12px] text-red-500">{error}</Text>}
  </>
);

const PHONE_STASH_KEY = "phoneNumber";

export default function SignInScreen() {
  const { isKeyboardVisible } = useKeyboard();
  const { value: stashedPhone, setItem: setStashedPhone } =
    useSecureStore(PHONE_STASH_KEY);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const { error, loading, handleSignIn } = useSignInFlow({
    countryCode,
    phoneNumber,
  });

  useEffect(() => {
    if (stashedPhone && !phoneNumber) {
      setPhoneNumber(stashedPhone);
    }
  }, [stashedPhone]);

  return (
    <SafeAreaView>
      <View className="flex h-full w-full flex-col items-center justify-center gap-36 bg-white p-8">
        <Image
          source={{
            uri: "https://assets.ezifarmer.com/ezifresh.png",
          }}
          className={cn(
            "h-16 w-full object-contain",
            isKeyboardVisible && "absolute top-20",
          )}
          resizeMode="contain"
        />
        <View className="flex w-full flex-col gap-3">
          <PhoneInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={error || ""}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        </View>

        <View
          className={cn(
            "w-full items-center justify-center gap-4",
            isKeyboardVisible && "absolute bottom-10",
          )}
        >
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
            onPress={() => {
              setStashedPhone(phoneNumber);
              handleSignIn();
            }}
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
