import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useOTPFlow } from "@/hooks/useOTPFlow";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const INITIAL_TIMER = 15;

export default function OTPScreen() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  const [code, setCode] = useState("");
  const { error, loading, timer, resendOtp, handleOtpFilled } = useOTPFlow();

  const phoneNumber = signIn?.identifier || signUp?.phoneNumber;
  const handleOtpChange = (text: string) => setCode(text);

  // no auth session
  if (!phoneNumber) {
    router.replace("/(auth)/");
    return null;
  }

  return (
    <SafeAreaView>
      <View className="flex h-full w-full items-center justify-center gap-y-16 bg-white">
        <View className="flex absolute top-0 w-full flex-col gap-y-4 p-3">
          <View className="relative flex w-full flex-row items-center justify-start">
            <View className="absolute left-0">
              <ArrowLeft
                color="black"
                onPress={() => router.replace("/(auth)/")}
              />
            </View>
            <Text className="font-asap-semibold mx-auto text-center text-2xl">
              Enter OTP code
            </Text>
          </View>
          <View className="flex gap-2">
            <Text className="text-center text-xl text-muted-foreground">
              We've sent it to
            </Text>
            <Text className="text-center text-xl text-muted-foreground">
              {phoneNumber}
            </Text>
          </View>
        </View>
        
        <View className="w-full gap-4 px-4">
          <OtpInput
            numberOfDigits={6}
            focusColor="#32BB78"
            focusStickBlinkingDuration={500}
            onTextChange={handleOtpChange}
            onFilled={handleOtpFilled}
            textInputProps={{ accessibilityLabel: "One-Time Password" }}
            theme={{
              pinCodeContainerStyle: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginLeft: 5,
                borderRadius: 8,
                borderColor: "transparent",
                backgroundColor: "#F4F4F5",
              },
              containerStyle: {
                width: "auto",
                padding: 4,
              },
              pinCodeTextStyle: {
                color: "#71717a",
              },
              focusedPinCodeContainerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
          {error && <Text className="text-center text-red-500">{error}</Text>}
        </View>

        <View className="absolute bottom-10 w-full gap-8 px-4">
          <Button
            size="lg"
            disabled={code.length < 6}
            className="native:h-16 flex w-full items-center justify-center rounded-full"
            onPress={() => handleOtpFilled(code)}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-asap-medium native:text-xl">Continue</Text>
            )}
          </Button>
          {timer === 0 ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-center text-lg">
                Resend OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-center text-lg text-muted-foreground">{`Resend in ${timer}s`}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
