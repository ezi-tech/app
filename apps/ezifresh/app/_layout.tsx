import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Bootsplash from 'react-native-bootsplash';
import 'react-native-reanimated';
import '../global.css';
import Provider from '@/lib/provider';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const InitialLayout: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded && isLoaded) {
      setIsMounted(true);
    }
  }, [fontsLoaded, isLoaded]);

  useEffect(() => {
    if (!fontsLoaded || !isLoaded || !isMounted) return;
    Bootsplash.hide({ fade: true })

    if (isSignedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)');
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
