import { cn } from "@/lib/utils";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import FeatherIcons from "@expo/vector-icons/Feather";
import { Tabs, usePathname } from "expo-router";
import type { ComponentProps } from "react";
import React from "react";
import { Platform, Text, View } from "react-native";

function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof FeatherIcons>["name"]>) {
  return (
    <FeatherIcons size={28} style={[{ marginBottom: 0 }, style]} {...rest} />
  );
}

export default function TabLayout() {
  const pathname = usePathname();
  const isNestedAccountScreen = pathname.startsWith("/account/") &&
    !["/account", "/account/"].includes(pathname);

  const showTabBar = !isNestedAccountScreen && pathname !== "/home/location";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#32b379",
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 76 : 56,
          paddingVertical: 5,
          display: showTabBar ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center">
              <TabBarIcon name="home" color={color} size={20} />
              <Text
                className={cn(
                  "text-sm font-medium",
                  focused ? "text-[#32B479]" : "text-gray-500",
                )}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center">
              <TabBarIcon name="shopping-cart" color={color} size={20} />
              <Text
                className={cn(
                  "text-sm font-medium",
                  focused ? "text-[#32B479]" : "text-gray-500",
                )}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center">
              <TabBarIcon name="user" color={color} size={20}/>

              <Text
                className={cn(
                  "text-sm font-medium",
                  focused ? "text-[#32B479]" : "text-gray-500",
                )}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
