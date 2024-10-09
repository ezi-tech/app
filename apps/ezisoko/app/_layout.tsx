import {
  Asap_400Regular,
  Asap_500Medium,
  Asap_600SemiBold,
  useFonts,
} from "@expo-google-fonts/asap";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import "react-native-reanimated";
import "../global.css";

import Provider from "@/lib/providers";
import { useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter } from "expo-router";
import { useSecureStore } from "@/hooks/useSecureStore";

const InitialLayout: React.FC = () => {
  const router = useRouter();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { value: onboarded } = useSecureStore("onboarding");

  const [fontsLoaded] = useFonts({
    Asap_400Regular,
    Asap_500Medium,
    Asap_600SemiBold,
  });

  const appIsReady = fontsLoaded && authLoaded;

  useEffect(() => {
    if (!appIsReady) return;

    if (isSignedIn && onboarded === "true") {
      router.replace("/(tabs)/home");
    } else if (!isSignedIn && onboarded === "true") {
      router.replace("/(auth)");
    } else {
      router.replace("/(onboarding)");
    }
  }, [appIsReady, isSignedIn, router]);

  return <Slot />;
};

const RootLayout: React.FC = () => (
  <Provider>
    <InitialLayout />
  </Provider>
);

export default RootLayout;
