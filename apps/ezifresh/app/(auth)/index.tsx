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
  View
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
      <View className="flex h-full w-full flex-col items-center justify-center bg-white p-8">
        <Image
          source={{
            uri: "https://assets.ezifarmer.com/ezifresh.png",
          }}
          className={cn("absolute top-24 h-16 w-full object-contain")}
          resizeMode="contain"
        />
        <PhoneInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={error || ""}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />

        <View
          className={cn(
            "absolute bottom-8 w-full items-center justify-center gap-4",
          )}
        >
          <Text className="text-center text-muted-foreground">
            If you sign up,{" "}
            <Text className="text-muted-foreground underline">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-muted-foreground underline">
              Privacy Policy
            </Text>{" "}
            apply
          </Text>
          <Button
            size="lg"
            className="native:h-16 flex w-full items-center justify-center rounded-full"
            onPress={() => {
              setStashedPhone(phoneNumber);
              handleSignIn();
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-asap-medium native:text-xl">Continue</Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
