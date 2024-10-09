import {
    Pressable,
  } from 'react-native';
  import React, { useCallback } from 'react';
  import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSecureStore } from '@/hooks/useSecureStore';
import { ChevronRight } from 'lucide-react-native';
  
  type Props = {
    currentIndex: Animated.SharedValue<number>;
    length: number;
    flatListRef: any;
  };
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  
  const Button = ({ currentIndex, length, flatListRef }: Props) => {
    const router = useRouter();
    const { setItem } = useSecureStore('onboarding');
    const rnBtnStyle = useAnimatedStyle(() => {
      return {
        width:
          currentIndex.value === length - 1 ? withSpring(140) : withSpring(50),
        height: 50,
      };
    }, [currentIndex, length]);
  
    const rnTextStyle = useAnimatedStyle(() => {
      return {
        opacity:
          currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
        transform: [
          {
            translateX:
              currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
          },
        ],
      };
    }, [currentIndex, length]);
  
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity:
          currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
        transform: [
          {
            translateX:
              currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
          },
        ],
      };
    }, [currentIndex, length]);
  
    const onPress = useCallback(() => {
      if (currentIndex.value === length - 1) {
        router.replace('/(auth)');
        setItem('true');
        return;
      } else {
        flatListRef?.current?.scrollToIndex({
          index: currentIndex.value + 1,
        });
      }
    }, []);
    return (
      <AnimatedPressable style={[rnBtnStyle]} onPress={onPress} className="flex flex-row px-6 py-4 rounded-full bg-[#32B479] items-center justify-center overflow-hidden mb-5">
        <Animated.Text style={[rnTextStyle]} className=" absolute text-white font-semibold text-[16px]">
          Get Started
        </Animated.Text>
        <Animated.View style={[imageAnimatedStyle]}>
          <ChevronRight size={24} color="white" />
        </Animated.View>
      </AnimatedPressable>
    );
  };
  
  export default Button;
