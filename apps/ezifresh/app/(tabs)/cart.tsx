import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  return (
    <SafeAreaView>
      <Text className="text-red-500 text-3xl">This is the cart screen</Text>
    </SafeAreaView>
  )
}