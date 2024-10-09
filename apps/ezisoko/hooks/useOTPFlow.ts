import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const INITIAL_TIMER = 30;

export function useOTPFlow() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(INITIAL_TIMER);

  const isSignIn = signIn?.identifier;
  const isSignUp = signUp?.phoneNumber;

  const handleOtpFilled = async (text: string) => {
    try {
      setLoading(true);
      if (isSignUp) {
        const response = await signUp?.attemptPhoneNumberVerification({
          code: text,
        });
        console.log(JSON.stringify(response, null, 2));

        const isComplete = response?.status === "complete";
        const missingRequirements = response?.status === "missing_requirements";

        if (isComplete) {
          await setActive!({ session: response.createdSessionId });
          router.replace("/(tabs)/home");
        }
      } else if (isSignIn) {
        const response = await signIn?.attemptFirstFactor({
          strategy: "phone_code",
          code: text,
        });

        if (response?.status === "complete") {
          await setActive!({ session: response.createdSessionId });
          router.replace("/(tabs)/home");
        }
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));

      const { errors } = err as { errors: ClerkAPIError[] };
      const firstError = errors[0];

      setError(firstError.longMessage || firstError.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    const firstFactors = signIn?.supportedFirstFactors;
    const phoneNumberId = firstFactors?.find(
      (factor) => factor.strategy === "phone_code",
    )?.phoneNumberId;

    try {
      setTimer(INITIAL_TIMER);

      if (isSignUp) {
        await signUp?.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
      } else if (isSignIn && phoneNumberId) {
        await signIn?.prepareFirstFactor({
          phoneNumberId,
          strategy: "phone_code",
        });
      }
    } catch (err) {
      console.log(err);

      const { errors } = err as { errors: ClerkAPIError[] };
      const firstError = errors[0];

      setError(firstError.longMessage || firstError.message);
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

  return { error, loading, timer, handleOtpFilled, resendOtp };
}
