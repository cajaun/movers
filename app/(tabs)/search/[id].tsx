import { renderMedia } from "@/functions/renderMovieDetails";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { MovieSkeleton } from "@/components/ui/skeletonLoaders/movieSkeleton";

export { ErrorBoundary } from "expo-router";

export default function SearchDetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const { type } = useLocalSearchParams<{ type: string }>();

  const [screen, setScreen] = useState<React.ReactNode>(<MovieSkeleton />);

  useEffect(() => {
    const fetchScreen = async () => {
      if (type === "movie") {
        const result = await renderMedia(id, "movie");
        setScreen(result);
      } else if (type === "tv") {
        const result = await renderMedia(id, "tv");
        setScreen(result);
      }
    };

    fetchScreen();
  }, [id, type]);


  return (
    <BodyScrollView>
      <Stack.Screen
        options={{
          title: type === "movie" ? "Movie" : "Show",
        }}
      />
      <React.Suspense fallback={<MovieSkeleton />}>{screen}</React.Suspense>
    </BodyScrollView>
  );
}
