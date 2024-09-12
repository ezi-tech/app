import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const {signOut} = useAuth();

  signOut
  return (
    <SafeAreaView>
      <Text className="text-red-500 text-3xl">This is the home screen</Text>
      <Button
        onPress={async() => {
         await signOut();
        }}
      >
        <Text className="text-green-700 font-bold">Click me</Text>
      </Button>
    </SafeAreaView>
  );
}
