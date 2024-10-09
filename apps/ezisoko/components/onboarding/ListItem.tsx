import {
  View,
  useWindowDimensions,
  ImageURISource,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  item: { text: string; image: ImageURISource };
  index: number;
  x: Animated.SharedValue<number>;
};

const ListItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100]
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0]
    );
    return {
      opacity,
      width: SCREEN_WIDTH * 0.7,
      height: SCREEN_WIDTH * 0.7,
      transform: [{ translateY}],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100]
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0]
    );
    return {
      opacity,
      transform: [{ translateY}],
    };
  }, [index, x]);
  return (
    <View style={[{ width: SCREEN_WIDTH }]} className='flex flex-1 items-center justify-around px-5'>
      <Animated.Image
        source={item.image}
        style={rnImageStyle}
        resizeMode="contain"
      />
      <Animated.Text style={[rnTextStyle]} className="font-semibold text-[30px] text-center">
        {item.text}
      </Animated.Text>
    </View>
  );
};

export default React.memo(ListItem);
