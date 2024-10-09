import { useCallback } from "react";
import {
  Image,
  ImageURISource,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import PaginationElement from "@/components/onboarding/Pagination";
import Button from "@/components/onboarding/Button";

const pages = [
  {
    text: "Manage All your orders in one place",
    description:
      "We provide you with a platform to manage your store, payments and orders in one place",
    image: "https://assets.ezifarmer.com/ezisoko.png",
  },
  {
    text: "Request your money at any time",
    description:
      "Payments are processed instantly and you can request your money at any time",
    image: "https://assets.ezifarmer.com/ezisoko.png",
  },
  {
    text: "Manage your store with ease",
    description:
      "Products can be added and managed with ease, you can also view your store analytics",
    image: "https://assets.ezifarmer.com/ezisoko.png",
  },
];

export default function App() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [],
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: { text: string; description: string; image: string };
    }) => {
      return (
        <View
          style={[{ width: SCREEN_WIDTH }]}
          className="flex flex-1 items-center px-8"
        >
          <Image
            source={{ uri: "https://assets.ezifarmer.com/ezisoko.png" }}
            resizeMode="contain"
            className="flex flex-grow h-40 w-64"
          />
          <View className="gap-4 my-20">
            <Text className="font-semibold text-[20px] text-center">
              {item.text}
            </Text>
            <Text className="font-normal text-[16px] text-center">
              {item.description}
            </Text>
          </View>
        </View>
      );
    },
    [x],
  );
  return (
    <SafeAreaView className="flex flex-1">
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View className="flex flex-row justify-between items-center px-5">
        <PaginationElement length={pages.length} x={x} />
        <Button
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}
