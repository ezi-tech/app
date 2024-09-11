import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text className="text-red-500 text-3xl">This is the home screen</Text>
      <Button
        onPress={() => {
          console.log("Button clicked");
        }}
      >
        <Text className="text-green-700 font-bold">Click me</Text>
      </Button>
    </SafeAreaView>
  );
}
