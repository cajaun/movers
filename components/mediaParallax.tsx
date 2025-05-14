import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { MediaType } from "@/types/mediaType";

import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import Animated from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { easeGradient } from "react-native-easing-gradient";
import { BlurView } from "expo-blur";
import { PressableScale } from "@/components/ui/pressableScaleButton";
import { SymbolView } from "expo-symbols";
import { WebView } from "react-native-webview";

const MediaParallaxBlur = ({
  media,
  type,
}: {
  media: any;
  type: MediaType;
}) => {
  const { colors, locations } = easeGradient({
    colorStops: {
      0: { color: "transparent" },
      0.5: { color: "rgba(0,0,0,0.99)" },
      1: { color: "black" },
    },
  }) as {
    colors: [string, string, ...string[]];
    locations: [number, number, ...number[]];
  };

  console.log(media.id);
  const videoUrl = `https://embed.su/embed/movie/${media.id}`;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 535 - 300,
          left: 0,
          right: 0,
          zIndex: 0,
          height: 300,
        },
      ]}
    >
      <View
        style={[
          { position: "absolute", bottom: 0, zIndex: 2 },
          { width: "100%", height: "100%" },
        ]}
      >
        <MaskedView
          maskElement={
            <LinearGradient
              locations={locations}
              colors={colors}
              style={StyleSheet.absoluteFill}
            />
          }
          style={StyleSheet.absoluteFill}
        >
          <BlurView
            intensity={90}
            tint={"systemChromeMaterialDark"}
            style={StyleSheet.absoluteFill}
          />
        </MaskedView>

      
        <WebView
  source={{ uri: `https://embed.su/embed/movie/${media.id}` }}
  style={{ flex: 1 }}
  allowsInlineMediaPlayback
  javaScriptEnabled
  domStorageEnabled
  injectedJavaScript={`
    const adElements = document.querySelectorAll('.ad-class, .popup-class'); 
    adElements.forEach(el => el.remove());
  `}
  onMessage={(event) => {
    console.log('WebView message:', event.nativeEvent.data);
  }}
/>


        <View className="flex-1 justify-end  px-4 mb-5">
          <Text numberOfLines={3} className=" text-white mt-6">
            {media.overview}
          </Text>

          <Text numberOfLines={3} className="  text-white/60 mt-4">
            {media.genres?.map((g: { name: string }) => g.name).join(" • ")}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default MediaParallaxBlur;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 10000,
    height: 100000,
    borderRadius: 12,
    overflow: "hidden",
  },
});
