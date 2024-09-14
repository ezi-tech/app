import { Button } from "@/components/ui/button";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProducts } from "@ezi/shopify";

export default function HomeScreen() {
  const { data, loading } = useProducts();
  console.log("data", data, "loading", loading);

  if (loading) {
    return <Text>Loading...</Text>;
  }



  return (
    <SafeAreaView>
      {data?.products.edges.map(({ node }) => (
        <Text key={node.id} className="text-3xl text-red-500">
          {node.title}
        </Text>
      ))}
      <Button
        onPress={() => {
          console.log("Button clicked");
        }}
      >
        <Text className="font-bold text-green-700">Click me</Text>
      </Button>
    </SafeAreaView>
  );
}
