import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { useAuth } from "@clerk/clerk-expo";
import {
  AlarmClock,
  Bike,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  listProductsQuery,
  useProducts,
} from "../../../../packages/shopify/src";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const { signOut } = useAuth();
  const [value, onChangeText] = React.useState("");
  return (
    <ScrollView className="bg-white">
      <SafeAreaView>
        <View className="flex flex-col bg-white h-full items-start justify-start">
          <View className="flex flex-col p-5 w-full items-start h-full justify-start gap-5 bg-white">
            <ChangeLocation />
            <View className="relative flex flex-row w-full items-center justify-start bg-[#F5F6F8] p-5 rounded-xl gap-4">
              <Search size={24} color="gray" onPress={() => signOut()} />
              <TextInput
                className={cn(
                  "bg-transparent flex flex-1 placeholder:text-black placeholder:text-[15px] text-[15px] text-black",
                )}
                placeholder="Search for products"
                value={value}
                onChangeText={onChangeText}
              />
              <SlidersHorizontal size={24} color="gray" />
            </View>
            <ProductsSection />
            <VendorsSection />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const ChangeLocation = () => {
  return (
    <View className="flex flex-row w-full gap-3 items-center">
      <MapPin size={24} color="#000000" />
      <Text className="justify-center text-black text-lg font-normal">
        Naina 4, 1st Floor, Gitaru Kenya
      </Text>
    </View>
  );
};

// const products: Product[] = [
//   {
//     name: "Bananas",
//     image: "https://picsa.pro/profile.jpg",
//     price: 10,
//     time: 50,
//     rating: 4.5,
//     ratingCount: 135,
//   },
//   {
//     name: "Mangoes",
//     image: "https://picsa.pro/profile.jpg",
//     price: 20,
//     time: 50,
//     rating: 4.5,
//     ratingCount: 235,
//   },
//   {
//     name: "Spinach",
//     image: "https://picsa.pro/profile.jpg",
//     price: 20,
//     time: 50,
//     rating: 3.5,
//     ratingCount: 35,
//   },
//   {
//     name: "Tomatoes",
//     image: "https://picsa.pro/profile.jpg",
//     price: 20,
//     time: 50,
//     rating: 2.5,
//     ratingCount: 115,
//   },
// ];

const ProductsSection = () => {
  const { loading, error, data } = useProducts();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const products = data?.products?.edges.map((edge) => edge.node);
  return (
    <View className="flex flex-col w-full items-start justify-start gap-5">
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-black text-lg font-bold">Popular Products</Text>
        <TouchableOpacity className="w-fit flex flex-row items-center gap-1 text-black text-[15px] font-bold px-4 py-2">
          <Text className="font-medium">
            All
          </Text>
          <ChevronRight size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="pr-4">
            <ProductCard
              id={item.id}
              name={item.title}
              price={item.variants.edges[0].node.price.amount}
              image={item.images.edges[1]?.node.url ??
                "https://picsa.pro/profile.jpg"}
            />
          </View>
        )}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

interface Product {
  name: string;
  image: string;
  price: number;
  time: number;
  rating: number;
  ratingCount: number;
}

const ProductCard = (
  { id, name, image, price, time, rating, ratingCount }: any,
) => {
  const router = useRouter();
  return (
    <Pressable
      className="flex flex-col items-start justify-start w-60 gap-2"
      onPress={() => {
        router.push({
          pathname: "/product",
          params: {
            id,
          },
        });
      }}
    >
      <View className="relative w-full">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-36 rounded-md"
          resizeMode="contain"
        />
        {/* <View className="absolute bottom-2 right-2 rounded-md flex flex-row w-fit bg-white p-[6px] gap-1 items-center">
          <Star size={14} color="black" />
          <Text className="font-bold text-sm text-black">
            {rating}{" "}
            <Text className="font-normal text-sm text-black">
              ({ratingCount})
            </Text>
          </Text>
        </View> */}
      </View>
      <View>
        <Text className="font-semibold text-lg">{name}</Text>
        <View className="flex flex-row items-center w-full gap-2">
          <View className="flex flex-row items-center gap-1 w-fit">
            <Bike size={14} color="gray" />
            <Text className="font-medium text-sm text-gray-500">
              Ksh {price}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1 w-fit">
            <AlarmClock size={14} color="gray" />
            <Text className="font-medium text-sm text-gray-500">50-60 min</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const vendors: Vendor[] = [
  {
    name: "Pizza Inn - Shell Sigona",
    image: "https://picsa.pro/profile.jpg",
    price: 10,
    time: 50,
    rating: 4.5,
    ratingCount: 135,
  },
  {
    name: "KFC - Kikuyu",
    image: "https://picsa.pro/profile.jpg",
    price: 20,
    time: 50,
    rating: 4.5,
    ratingCount: 235,
  },
  {
    name: "Java - Kikuyu",
    image: "https://picsa.pro/profile.jpg",
    price: 20,
    time: 50,
    rating: 3.5,
    ratingCount: 35,
  },
  {
    name: "Chicken Inn - Kikuyu",
    image: "https://picsa.pro/profile.jpg",
    price: 20,
    time: 50,
    rating: 2.5,
    ratingCount: 115,
  },
];

interface Vendor {
  name: string;
  image: string;
  price: number;
  time: number;
  rating: number;
  ratingCount: number;
}

const VendorsSection = () => {
  return (
    <View className="flex flex-col w-full items-start justify-start gap-5">
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-black text-lg font-bold">Popular Vendors</Text>
        <TouchableOpacity className="w-fit flex flex-row items-center gap-1 text-black text-[15px] font-bold px-4 py-2">
          <Text className="font-medium">
            All
          </Text>
          <ChevronRight size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={vendors}
        renderItem={({ item }) => (
          <View className="pb-4">
            <VendorCard {...item} />
          </View>
        )}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const VendorCard = (
  { name, image, price, time, rating, ratingCount }: Vendor,
) => {
  return (
    <View className="flex flex-col items-start justify-start min-w-full gap-2">
      <View className="relative w-full">
        <Image
          source={{
            uri: image,
          }}
          className="w-full h-40 rounded-md"
          resizeMode="cover"
        />
        <View className="absolute bottom-2 right-2 rounded-md flex flex-row w-fit bg-white p-[6px] gap-1 items-center">
          <Star size={14} color="black" />
          <Text className="font-bold text-sm text-black">
            {rating}{" "}
            <Text className="font-normal text-sm text-black">
              ({ratingCount})
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-semibold text-lg">{name}</Text>
        <View className="flex flex-row items-center w-full gap-2">
          <View className="flex flex-row items-center gap-1 w-fit">
            <Bike size={14} color="gray" />
            <Text className="font-medium text-sm text-gray-500">
              Ksh {price}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1 w-fit">
            <AlarmClock size={14} color="gray" />
            <Text className="font-medium text-sm text-gray-500">50-60 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
