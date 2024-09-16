import { Text } from "@/components/ui/text";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const INITIAL_TIMER = 15;

export default function OTPScreen() {
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();
  const { type, phoneNumberId } = useLocalSearchParams();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);

  const handleOtpChange = (text: string) => setCode(text);

  const handleOtpFilled = async (text: string) => {
    try {
      if (type === "signUp") {
        const response = await signUp?.attemptPhoneNumberVerification({
          code: text,
        });
        console.log(JSON.stringify(response, null, 2));
        if (response?.status === "complete") {
          await setActive!({ session: response.createdSessionId });
          router.replace("/(tabs)/");
        } else if (response?.status === "missing_requirements") {
          router.replace({
            pathname: "/(auth)/complete",
            params: { missingFields: response.missingFields },
          });
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
        await signUp?.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
      } else {
        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId: Array.isArray(phoneNumberId)
            ? phoneNumberId[0]
            : phoneNumberId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval: number;

    if (timer > 0) {
      interval = setInterval(
        () => setTimer((prevTimer) => prevTimer - 1),
        1000,
      );
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <SafeAreaView>
      <View className="flex h-full w-full gap-y-20 bg-white px-4 py-12">
        <View className="flex w-full flex-col gap-y-4 p-3">
          <View className="relative flex w-full flex-row items-center justify-start">
            <View className="absolute left-0">
              <ArrowLeft color="black" onPress={() => router.back()} />
            </View>
            <Text className="font-asap-medium mx-auto text-center text-2xl">
              Enter OTP code
            </Text>
          </View>
          <View className="flex gap-2">
            <Text className="text-center text-xl text-muted-foreground">
              We've sent it to
            </Text>
            <Text className="text-center text-xl text-muted-foreground">
              {signIn?.identifier}
            </Text>
          </View>
        </View>
        <View className="flex w-full items-center gap-12">
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
              pinCodeTextStyle: {
                color: "#71717a",
              },
              focusedPinCodeContainerStyle: {
                backgroundColor: "#fff",
              },
            }}
          />

          {timer === 0 ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-lg font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-lg text-muted-foreground">{`Resend in ${timer}s`}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "auto",
    padding: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 5,
    borderRadius: 8,
    color: "#71717a",
    borderColor: "transparent",
    backgroundColor: "#F4F4F5",
  },
});
