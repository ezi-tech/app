import { Text } from "@/components/ui/text";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Toast from 'react-native-toast-message';

const INITIAL_TIMER = 15;

export default function OTPScreen() {
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();
  const { phone, type, phoneNumberId } = useLocalSearchParams();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);

  const handleOtpChange = (text: string) => setCode(text);

  const handleOtpFilled = async (text: string) => {
    try {
      if (type === "signUp") {
        const response = await signUp?.attemptPhoneNumberVerification({ code: text });
        console.log(JSON.stringify(response, null, 2));
        if (response?.status === "complete") {
          await setActive!({ session: response.createdSessionId });
          router.replace("/(tabs)/");
        }
      } else {
        const response = await signIn?.attemptFirstFactor({
          strategy: "phone_code",
          code: text,
        });

        if (response?.status === "complete") {
          await setActive!({ session: response.createdSessionId });
          router.replace("/(tabs)/");
        }
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const resendOtp = async () => {
    try {
      setTimer(INITIAL_TIMER);
      if (type === "signUp") {
        await signUp?.preparePhoneNumberVerification({ strategy: "phone_code" });
      } else {
        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId:  Array.isArray(phoneNumberId) ? phoneNumberId[0] : phoneNumberId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval: number;

    if (timer > 0) {
      interval = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);


  return (
    <SafeAreaView className="flex h-full w-full">
      <View className="flex w-full flex-col gap-y-4 p-3">
        <View className="flex flex-row gap-10 items-center justify-start">
          <ArrowLeft className="text-black" color="black" onPress={() => router.back()} />
          <Text className="text-black text-2xl font-bold">Enter OTP</Text>
        </View>
        <Text className="text-black text-lg">
          Enter the OTP sent to <Text className="text-black font-semibold">{phone}</Text>
        </Text>
        <OtpInput
          numberOfDigits={6}
          focusColor="#32BB78"
          focusStickBlinkingDuration={500}
          onTextChange={handleOtpChange}
          onFilled={handleOtpFilled}
          textInputProps={{ accessibilityLabel: "One-Time Password" }}
          theme={{
            pinCodeContainerStyle: styles.container,
            containerStyle: styles.box,
          }}
        />
      </View>
      <View className="flex w-full items-center mt-5">
        <Text className="text-black text-lg">
          Didn't receive the OTP?{" "}
          {timer === 0 ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-black font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-gray-500">{`Resend in ${timer}s`}</Text>
          )}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "auto",
    height: 50,
    backgroundColor: "transparent",
    padding: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 5,
    borderColor: "#CECECE",
  },
});
