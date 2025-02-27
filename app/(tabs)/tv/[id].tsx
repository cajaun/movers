import { renderMedia } from "@/functions/renderMovieDetails";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { MovieSkeleton } from "@/components/ui/skeletonLoaders/movieSkeleton";

export { ErrorBoundary } from "expo-router";

export default function ShowDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // State to store the resolved screen component
  const [screen, setScreen] = useState<React.ReactNode>(<MovieSkeleton />);

  useEffect(() => {
    // Fetch the screen component dynamically when the id changes
    const fetchScreen = async () => {
      const result = await renderMedia(id, "tv");
      setScreen(result);
    };

    fetchScreen();
  }, [id]);

  return (
    <BodyScrollView>
            <Stack.Screen
        options={{
          title: "Show",
        }}
      />
      <React.Suspense fallback={<MovieSkeleton />}>{screen}</React.Suspense>
    </BodyScrollView>
  );
}

