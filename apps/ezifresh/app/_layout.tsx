import {
  Asap_400Regular,
  Asap_500Medium,
  Asap_600SemiBold,
  useFonts,
} from "@expo-google-fonts/asap";
import React, { useEffect } from "react";
import Bootsplash from "react-native-bootsplash";

import "react-native-reanimated";
import "../global.css";

import Provider from "@/lib/providers";
import { useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter } from "expo-router";

const InitialLayout: React.FC = () => {
  const router = useRouter();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();

  const [fontsLoaded] = useFonts({
    Asap_400Regular,
    Asap_500Medium,
    Asap_600SemiBold,
  });

  const appIsReady = fontsLoaded && authLoaded;

  useEffect(() => {
    if (!appIsReady) return;

    // hide the splash screen
    Bootsplash.hide({ fade: true });

    if (isSignedIn) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)");
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
