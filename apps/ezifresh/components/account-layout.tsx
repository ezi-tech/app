import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import { Text } from "./ui/text";

export function AccountLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View
        className={cn(
          "gap-5 border-b border-border/60",
          Platform.OS === "ios" ? "px-5 pb-6" : "p-6 pt-16",
        )}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-fit w-fit rounded-full"
        >
          <ArrowLeftIcon size={28} color="black" />
        </TouchableOpacity>

        <Text className="font-asap-semibold text-4xl">{title}</Text>
      </View>
      <ScrollView className="h-full bg-muted p-5">{children}</ScrollView>
    </SafeAreaView>
  );
}
