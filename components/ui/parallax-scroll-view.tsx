import type { PropsWithChildren, ReactElement } from "react";
import {  StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useBottomTabOverflow } from "./utils/tabBarBackground";
import { useColorScheme } from "react-native";
import { MediaType } from "@/types/mediaType";
import MediaParallaxBlur from "../mediaParallax";

const HEADER_HEIGHT = 535;


type Props = PropsWithChildren<{
  headerImage: ReactElement;
  media: any;
  type: MediaType;
  headerForeground: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

const ParallaxScrollView = ({
  children,
  headerImage,
  headerForeground,
  media,
  type,
  headerBackgroundColor,
}: Props) => {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const title =  type === "movie" ? media.title : media.name;


  //  useAnimatedReaction(
  //   () => {
  //     return scrollOffset.value;
  //   },
  //   (scrollOffsetValue) => {
  //     console.log('Scroll Offset:', scrollOffsetValue); 
  //   },
  //   [scrollOffset] 
  // );

  const headerAnimatedStyle = useAnimatedStyle(() => {
   
  
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
      opacity: interpolate(
        scrollOffset.value,
        [400, 520],
        [1, 0]
      ),
    };
  });

  const StackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT / 1.2 ],
        [0, 1]
      ),
    };
  });

  

  return (
    <View style={styles.container}>
   

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>

        <MediaParallaxBlur media={media} type="movie" />

        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

export default ParallaxScrollView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "transparent",
    overflow: "hidden",
  },

  content: {
    flex: 1,

    gap: 16,
    overflow: "hidden",
  },
});
