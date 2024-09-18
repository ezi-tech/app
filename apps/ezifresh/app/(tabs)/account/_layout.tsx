import { Stack } from "expo-router";

export default function AccountLayout() {
  const headerOptions = {
    headerShown: false,
    headerStyle: {
      // backgroundColor: "hsl(153, 56%, 45%)",
    },
    // headerTintColor: "#fff",
    headerTitleStyle: {
      fontSize: 24,
      marginBottom: 10,
      fontFamily: "Asap_600SemiBold",
    },
    headerShadowVisible: false,
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          ...headerOptions,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen
        name="addresses"
        options={{ ...headerOptions, headerTitle: "My Addresses" }}
      />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="support" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
      <Stack.Screen name="privacy" options={{ headerShown: false }} />
    </Stack>
  );
}
