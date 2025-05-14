import { renderMedia } from "@/functions/renderMovieDetails";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MovieSkeleton } from "@/components/ui/skeletonLoaders/movieSkeleton";
import { fetchApiData } from "@/functions/fetchApiData";
import { Image } from "expo-image";
import ParallaxScrollView from "@/components/ui/parallax-scroll-view";
import MediaParallax from "@/components/mediaParallax";
import { SymbolView } from "expo-symbols";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import * as AC from "@bacons/apple-colors";

export { ErrorBoundary } from "expo-router";

export default function Movie() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [screen, setScreen] = useState<React.ReactNode>(<MovieSkeleton />);

  const [media, setMedia] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const mediaData = await fetchApiData<any>(
          `https://api.themoviedb.org/3/movie/${id}`
        );

 
        setMedia(mediaData);

        const result = await renderMedia(id, "movie", mediaData);
        setScreen(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadContent();
  }, [id]);

  // console.log(media);
  if (!media) {
    return <MovieSkeleton />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#000" }}
      media={media}
      type="movie"
      headerImage={
        <Animated.View 
        style={{
          backgroundColor: AC.systemGray5,
          width: "100%",
          // height: 300,
        }}
      >
         {media.backdrop_path && (
          <Image
            contentFit="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/original${media.backdrop_path}`,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            transition={300}
          />
         )}
        </Animated.View>
      }
      headerForeground={<MediaParallax media={media} type="movie" />}
    >
      

      <React.Suspense fallback={<MovieSkeleton />}>{screen}</React.Suspense>
    </ParallaxScrollView>
  );
}
