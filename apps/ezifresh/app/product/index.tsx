import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ChevronRight,
  CircleMinus,
  CirclePlus,
  ShoppingCart,
} from "lucide-react-native";

import { useProduct } from "../../../../packages/shopify/src";
import { cn } from "@/lib/utils";

const storesData = [
  {
    name: "Pizza Hut Store",
    distance: "0.2km away",
    price: "Ksh 15.00",
    recommended: true,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Zucchini Store",
    distance: "2.2km away",
    price: "Ksh 17.00",
    recommended: false,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "FoodPlus Supermarket",
    distance: "0.2km away",
    price: "Ksh 19.00",
    recommended: false,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Carrefour Supermarket",
    distance: "0.2km away",
    price: "Ksh 20.00",
    recommended: false,
    image: "https://via.placeholder.com/150",
  },
];

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(storesData[0]);

  const productId = Array.isArray(id) ? id[0] : id || "";
  const { loading, error, data } = useProduct(productId);

  return (
    loading
      ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#32BB78" />
        </View>
      )
      : (
        <SafeAreaView className="h-full bg-white">
          <ScrollView>
            <View className="flex h-full w-full gap-4 bg-white px-5 py-1">
              <View className="relative flex w-full flex-row items-center justify-between">
                <Pressable onPress={() => router.back()}>
                  <ArrowLeft color="black" />
                </Pressable>
                <Text className="font-asap-semibold text-2xl mx-auto">
                  Product Details
                </Text>
                <ShoppingCart
                  size={20}
                  color="black"
                  onPress={() => router.push("/cart")}
                />
              </View>

              <FlatList
                data={data?.product?.images.edges}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.node.url as string }}
                    className="h-64 w-full rounded-md"
                    resizeMode="contain"
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1 }}
              />

              <Text className="font-asap-semibold text-2xl text-black">
                {data?.product?.title}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {data?.product?.description}
              </Text>
              <Text className="font-asap-semibold text-2xl text-black">
                {selectedStore.price}
              </Text>

              <View className="flex flex-row items-center justify-between">
                <Text className="font-asap-semibold text-2xl text-black">
                  Recommended Stores
                </Text>
                <Pressable onPress={() => setModalVisible(true)}>
                  <Text className="font-asap-medium text-sm text-red-600">
                    View All
                  </Text>
                </Pressable>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                  <SafeAreaView className="flex-1 justify-end bg-transparent bg-opacity-50">
                    <TouchableWithoutFeedback>
                      <View className="max-h-[50%] w-full bg-white rounded-t-2xl p-4 shadow-t-md gap-4">
                        <Text className="font-asap-semibold text-2xl text-black">
                          Select a store to buy from
                        </Text>
                        <FlatList
                          data={storesData}
                          renderItem={({ item }) => (
                            <Pressable
                              onPress={() => {
                                setSelectedStore(item);
                                setModalVisible(false);
                              }}
                            >
                              <View className="flex w-full flex-row gap-4 rounded-2xl border-[0.2px] border-gray-300 p-3 mb-2 items-center">
                                <Avatar alt="Avatar" className="h-12 w-12">
                                  <AvatarFallback>
                                    <Text className="text-xl">ST</Text>
                                  </AvatarFallback>
                                </Avatar>
                                <View className="flex-grow">
                                  <Text className="font-asap-semibold text-lg">
                                    {item.name}
                                  </Text>
                                  <Text className="text-sm text-muted-foreground">
                                    {item.distance}
                                  </Text>
                                  <Text className="font-asap-semibold mt-2 text-lg">
                                    {item.price}
                                  </Text>
                                </View>
                                {item.recommended && (
                                  <View className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-[#662E71] p-2">
                                    <Text className="text-[12px] font-semibold text-white">
                                      Recommended
                                    </Text>
                                  </View>
                                )}
                                <ChevronRight size={20} color="black" />
                              </View>
                            </Pressable>
                          )}
                          keyExtractor={(item) => item.name.toString()}
                          showsVerticalScrollIndicator={false}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </SafeAreaView>
                </TouchableWithoutFeedback>
              </Modal>

              {storesData.slice(0, 2).map((store, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedStore(store)}
                >
                  <View
                    className={cn(
                      "flex w-full flex-row gap-4 rounded-2xl border-[0.2px] border-gray-300 p-3",
                      selectedStore.name === store.name && "bg-[#F2F4EB]",
                    )}
                  >
                    <Avatar alt="Avatar" className="h-12 w-12">
                      <AvatarFallback>
                        <Text className="text-xl">ST</Text>
                      </AvatarFallback>
                    </Avatar>
                    <View>
                      <Text className="font-asap-semibold text-lg">
                        {store.name}
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {store.distance}
                      </Text>
                      <Text className="font-asap-semibold mt-2 text-lg">
                        {store.price}
                      </Text>
                    </View>
                    {store.recommended && (
                      <View className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-[#662E71] p-2">
                        <Text className="text-[12px] font-semibold text-white">
                          Recommended
                        </Text>
                      </View>
                    )}
                    <ChevronRight size={20} color="black" />
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <View className="flex flex-row gap-2 p-2">
            <View className="flex flex-row gap-8 rounded-full bg-[#F2F4EB] p-3">
              <Pressable onPress={() => setQuantity(Math.max(quantity - 1, 1))}>
                <CircleMinus size={28} color="#004A2B" />
              </Pressable>
              <Text className="text-lg font-semibold text-[#004A2B]">
                {quantity}
              </Text>
              <Pressable onPress={() => setQuantity(quantity + 1)}>
                <CirclePlus size={28} color="#004A2B" />
              </Pressable>
            </View>
            <Pressable
              className="flex flex-grow flex-row items-center justify-center gap-3 rounded-full bg-[#32BB78] p-3"
              onPress={() => router.push("/(tabs)")}
            >
              <ShoppingCart size={20} color="white" />
              <Text className="text-lg font-semibold text-white">
                Add to Cart
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )
  );
}
