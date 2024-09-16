import {
  Asap_400Regular,
  Asap_500Medium,
  Asap_600SemiBold,
  useFonts,
} from "@expo-google-fonts/asap";
import React, { useEffect, useState } from "react";
import Bootsplash from "react-native-bootsplash";

import "react-native-reanimated";
import "../global.css";

import Provider from "@/lib/provider";
import { useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter } from "expo-router";

const InitialLayout: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Asap_400Regular,
    Asap_500Medium,
    Asap_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded && isLoaded) {
      setIsMounted(true);
    }
  }, [fontsLoaded, isLoaded]);

  useEffect(() => {
    if (!fontsLoaded || !isLoaded || !isMounted) return;
    Bootsplash.hide({ fade: true });

    if (isSignedIn) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)");
    }
  }, [fontsLoaded, isLoaded, isMounted, isSignedIn, router]);

  if (!fontsLoaded || !isLoaded) {
    return null;
  }

  return <Slot />;
};

const RootLayout: React.FC = () => (
  <Provider>
    <InitialLayout />
  </Provider>
);

export default RootLayout;
