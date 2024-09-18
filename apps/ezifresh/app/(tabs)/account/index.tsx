import { iconWithClassName } from "@/assets/icons/iconWithClassName";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Href, useRouter } from "expo-router";
import {
  HelpCircleIcon,
  InfoIcon,
  LockKeyholeIcon,
  LogOutIcon,
  MapPinIcon,
  NotepadTextIcon,
  PackageIcon,
  UserIcon,
} from "lucide-react-native";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const menuItems = [
  {
    title: "Profile",
    icon: iconWithClassName(UserIcon),
    route: "/account/profile",
  },
  {
    title: "Orders",
    icon: iconWithClassName(PackageIcon),
    route: "/account/orders",
  },
  {
    title: "Addresses",
    icon: iconWithClassName(MapPinIcon),
    route: "/account/addresses",
  },
  {
    title: "Support",
    icon: iconWithClassName(HelpCircleIcon),
    route: "/account/support",
  },
  {
    title: "About Us",
    icon: iconWithClassName(InfoIcon),
    route: "/account/about",
  },
  {
    title: "Privacy Policy",
    icon: iconWithClassName(LockKeyholeIcon),
    route: "/account/privacy",
  },
  {
    title: "Terms & Conditions",
    icon: iconWithClassName(NotepadTextIcon),
    route: "/account/terms",
  },
];

const LogOut = iconWithClassName(LogOutIcon);

export default function MoreScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const userNameParts = user?.fullName?.split(" ");
  const firstInitial = userNameParts?.[0]?.[0];
  const lastInitial = userNameParts?.[userNameParts.length - 1]?.[0];

  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView className="h-full">
        <View
          className={cn(
            "flex w-full flex-row items-center gap-4 border-b border-border/60 bg-white",
            Platform.OS === "ios" ? "px-5 pb-6" : "p-5 pb-6",
          )}
        >
          <Avatar alt="Avatar" className="h-16 w-16">
            <AvatarFallback className="border-2 border-primary">
              <Text className="text-2xl">
                {firstInitial}
                {lastInitial}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text className="font-asap-medium text-2xl">
              {user?.fullName}
            </Text>
            <Text className="text-lg text-muted-foreground">
              {user?.phoneNumbers[0].phoneNumber}
            </Text>
          </View>
        </View>
        <ScrollView className="h-full bg-muted">
          <View className="flex gap-2 p-4">
            <Card className="w-full rounded-xl border-border/60 shadow shadow-foreground/5">
              {menuItems.map((item, idx) => (
                <Pressable
                  key={item.title}
                  className={cn(
                    "flex flex-row items-center gap-5 border-muted p-5",
                    idx !== menuItems.length - 1 && "border-b",
                  )}
                  onPress={() =>
                    router.push(item.route as Href<string | object>)
                  }
                >
                  <item.icon
                    strokeWidth={1.5}
                    className="h-12 w-12 text-muted-foreground"
                  />
                  <Text className="font-asap-medium text-xl">{item.title}</Text>
                </Pressable>
              ))}
            </Card>
            <Card className="w-full rounded-xl border-border/60 shadow-foreground/5">
              <Pressable onPress={() => signOut()}>
                <View
                  className={cn(
                    "flex flex-row items-center gap-5 border-muted p-5",
                  )}
                >
                  <LogOut
                    strokeWidth={1.5}
                    className="h-12 w-12 text-red-500"
                  />
                  <Text className="font-asap-medium text-xl text-red-500">
                    Log Out
                  </Text>
                </View>
              </Pressable>
            </Card>

            <View className="mb-20 mt-4 gap-1">
              <Text className="text-center text-muted-foreground">
                Version 1.0.0
              </Text>
              <Text className="text-center text-muted-foreground">
                © {new Date().getFullYear()} Ezifarmer Technologies Ltd. All
                rights reserved.
              </Text>
            </View>
          </View>

          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
