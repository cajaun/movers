import { renderMedia } from "@/functions/renderMovieDetails";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { MovieSkeleton } from "@/components/ui/skeletonLoaders/movieSkeleton";

export { ErrorBoundary } from "expo-router";

export default function Movie() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [screen, setScreen] = useState<React.ReactNode>(<MovieSkeleton />);

  useEffect(() => {
    const fetchScreen = async () => {
      const result = await renderMedia(id, "movie");
      setScreen(result);
    };

    fetchScreen();
  }, [id]);


  return (
    <BodyScrollView>
      <Stack.Screen
        options={{
          title: "Movie",
        }}
      />
      <React.Suspense fallback={<MovieSkeleton />}>{screen}</React.Suspense>
    </BodyScrollView>
  );
}
