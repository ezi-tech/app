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
  SettingsIcon,
  UserIcon,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
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
    title: "Settings",
    icon: iconWithClassName(SettingsIcon),
    route: "/account/settings",
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
    title: "Terms & Conditions",
    icon: iconWithClassName(NotepadTextIcon),
    route: "/account/terms",
  },
  {
    title: "Privacy Policy",
    icon: iconWithClassName(LockKeyholeIcon),
    route: "/account/privacy",
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
    <SafeAreaView>
      <View className="grid gap-4 p-4">
        <Card className="flex w-full flex-row items-center gap-4 rounded-2xl p-4">
          <Avatar alt="Avatar" className="h-16 w-16">
            <AvatarFallback>
              <Text className="text-xl">
                {firstInitial}
                {lastInitial}
              </Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text className="text-2xl font-asap-semibold">
              {user?.fullName}
            </Text>
            <Text className="text-muted-foreground">
              {user?.phoneNumbers[0].phoneNumber}
            </Text>
          </View>
        </Card>
        <Card className="w-full rounded-2xl">
          {menuItems.map((item, idx) => (
            <Pressable
              key={item.title}
              className={cn(
                "flex flex-row items-center gap-4 border-muted p-4",
                idx !== menuItems.length - 1 && "border-b",
              )}
              onPress={() => router.push(item.route as Href<string | object>)}
            >
              <item.icon className="h-12 w-12 text-foreground/80" />
              <Text className="text-lg">{item.title}</Text>
            </Pressable>
          ))}
        </Card>
        <Pressable onPress={() => signOut()}>
          <Card className="w-full rounded-2xl">
            <View
              className={cn(
                "flex flex-row items-center gap-4 border-muted p-4",
              )}
            >
              <LogOut className="h-12 w-12 text-foreground/80" />
              <Text className="text-lg">Log Out</Text>
            </View>
          </Card>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
