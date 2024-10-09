import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { z } from "zod";

const signInSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number is too short" })
    .regex(/^\+254\d{9}$/, { message: "Please enter a valid phone number" }),
});

export function useSignInFlow({
  countryCode,
  phoneNumber,
}: {
  countryCode: string;
  phoneNumber: string;
}) {
  const router = useRouter();
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const fullPhone = `${countryCode}${phoneNumber}`;
    const result = signInSchema.safeParse({ phone: fullPhone });

    if (!result.success) {
      const firstError = result.error.errors[0];
      setError(firstError.message);

      return;
    }

    try {
      setLoading(true);

      // start the sign in flow
      const signInAttempt = await signIn?.create({
        identifier: fullPhone,
        strategy: "phone_code",
      });

      const isComplete = signInAttempt?.status === "complete";
      const requireOTP = signInAttempt?.status === "needs_first_factor";

      if (isComplete) {
        await setActive!({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else if (requireOTP) {
        router.push("/(auth)/otp");
      }
    } catch (err: unknown) {
      console.log("signInError", JSON.stringify(err, null, 2));
      const { errors } = err as { errors: ClerkAPIError[] };

      const firstError = errors[0];
      const isNewUser = firstError.code === "form_identifier_not_found";

      if (isNewUser) {
        await signUp
          ?.create({
            phoneNumber: fullPhone,
          })
          .then(async (signUpAttempt) => {
            const isComplete = signUpAttempt?.status === "complete";
            const isIncomplete =
              signUpAttempt?.status === "missing_requirements";

            if (isIncomplete) {
              // start the phone verification flow
              await signUp?.preparePhoneNumberVerification({
                strategy: "phone_code",
              });

              router.push("/(auth)/otp");
            } else if (isComplete) {
              await setActive!({ session: signUpAttempt.createdSessionId });

              router.replace("/(tabs)/home");
            }
          })
          .catch((err) => {
            console.log("signUpError", JSON.stringify(err, null, 2));

            const { errors } = err as { errors: ClerkAPIError[] };
            const firstError = errors[0];

            setError(firstError.message);
          });
      } else {
        setError(firstError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSignIn };
}
