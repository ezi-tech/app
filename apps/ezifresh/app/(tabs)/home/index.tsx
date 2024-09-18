import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { iconWithClassName } from "@/lib/icons/iconWithClassName";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  AlarmClock,
  Bike,
  ChevronRight,
  ChevronRightIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useProducts } from "@ezi/shopify";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [value, onChangeText] = React.useState("");

  return (
    <View className={cn("h-full w-full bg-white pt-2")}>
      <SafeAreaView
        className={cn("h-full w-full", Platform.OS !== "ios" && "mt-12")}
      >
        <ScrollView className="bg-white">
          <View className="flex gap-6">
            <ChangeLocation />
            <View className="flex h-full w-full flex-col items-start justify-start gap-5 px-5">
              <View className="relative flex w-full flex-row items-center justify-start gap-4 rounded-xl bg-[#F5F6F8] p-5">
                <Search size={24} color="gray" onPress={() => signOut()} />
                <TextInput
                  className={cn(
                    "flex flex-1 bg-transparent text-[15px] text-black placeholder:text-[15px] placeholder:text-black",
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
        </ScrollView>
      </SafeAreaView>

      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const ChangeLocation = () => {
  iconWithClassName(ChevronRightIcon);

  const router = useRouter();
  const { data, isLoading } = api.address.default.useQuery();

  return (
    <TouchableOpacity onPress={() => router.push("/home/location")}>
      <View className="flex w-full flex-row items-center gap-2 px-5">
        <MapPin size={28} strokeWidth={1.8} className="text-foreground" />
        <View>
          <Text className="text-sm -mb-1 text-muted-foreground">Deliver to</Text>
          <Text className="justify-center text-xl text-foreground">
            {isLoading ? "Loading..." : data?.name ?? data?.formattedAddress}
          </Text>
        </View>
        <ChevronRightIcon
          size={24}
          className="ml-auto text-muted-foreground"
        />
      </View>
    </TouchableOpacity>
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
    <View className="flex w-full flex-col items-start justify-start gap-5">
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-lg font-bold text-black">Popular Products</Text>
        <TouchableOpacity className="flex w-fit flex-row items-center gap-1 px-4 py-2 text-[15px] font-bold text-black">
          <Text className="font-medium">All</Text>
          <ChevronRight size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="pr-6">
            <ProductCard
              id={item.id}
              name={item.title}
              price={item.variants.edges[0].node.price.amount}
              image={
                item.images.edges[1]?.node.url ??
                "https://picsa.pro/profile.jpg"
              }
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

const ProductCard = ({
  id,
  name,
  image,
  price,
  time,
  rating,
  ratingCount,
}: any) => {
  const router = useRouter();
  return (
    <Pressable
      className="flex w-52 flex-col items-start justify-start gap-2 rounded-xl border border-border p-4"
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
          className="h-36 w-full rounded-md"
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
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex w-full flex-row items-center gap-2">
          <View className="flex w-fit flex-row items-center gap-1">
            <Bike size={14} color="gray" />
            <Text className="text-sm font-medium text-gray-500">
              Ksh {price}
            </Text>
          </View>
          <View className="flex w-fit flex-row items-center gap-1">
            <AlarmClock size={14} color="gray" />
            <Text className="text-sm font-medium text-gray-500">50-60 min</Text>
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
    <View className="flex w-full flex-col items-start justify-start gap-5">
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-lg font-bold text-black">Popular Vendors</Text>
        <TouchableOpacity className="flex w-fit flex-row items-center gap-1 px-4 py-2 text-[15px] font-bold text-black">
          <Text className="font-medium">All</Text>
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

const VendorCard = ({
  name,
  image,
  price,
  time,
  rating,
  ratingCount,
}: Vendor) => {
  return (
    <View className="flex min-w-full flex-col items-start justify-start gap-2">
      <View className="relative w-full">
        <Image
          source={{
            uri: image,
          }}
          className="h-40 w-full rounded-md"
          resizeMode="cover"
        />
        <View className="absolute bottom-2 right-2 flex w-fit flex-row items-center gap-1 rounded-md bg-white p-[6px]">
          <Star size={14} color="black" />
          <Text className="text-sm font-bold text-black">
            {rating}{" "}
            <Text className="text-sm font-normal text-black">
              ({ratingCount})
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex w-full flex-row items-center gap-2">
          <View className="flex w-fit flex-row items-center gap-1">
            <Bike size={14} color="gray" />
            <Text className="text-sm font-medium text-gray-500">
              Ksh {price}
            </Text>
          </View>
          <View className="flex w-fit flex-row items-center gap-1">
            <AlarmClock size={14} color="gray" />
            <Text className="text-sm font-medium text-gray-500">50-60 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
