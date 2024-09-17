import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import FeatherIcons from "@expo/vector-icons/Feather";
import { Tabs, usePathname } from "expo-router";
import type { ComponentProps } from "react";
import React from "react";
import { Platform } from "react-native";

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
  const isNestedAccountScreen =
    pathname.startsWith("/account/") &&
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
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: 3,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
