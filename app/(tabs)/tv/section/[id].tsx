import { View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import SectionListCard from "@/components/ui/cards/sectionListCard";

const movieCategories = [
  "trending", "nowPlaying", "popular", "upcoming",
  "topRated", "mostVoted", "topGrossing",
] as const;

const showCategories = [
  "trending", "popular", "topRated", "mostVoted",
  "airingToday", "currentlyAiring",
] as const;

const isValidType = (t: any): t is "movie" | "tv" => t === "movie" || t === "tv";

const isValidMovieCategory = (c: any): c is (typeof movieCategories)[number] =>
  movieCategories.includes(c);

const isValidShowCategory = (c: any): c is (typeof showCategories)[number] =>
  showCategories.includes(c);

const SectionScreen = () => {
  const { id, type, category } = useLocalSearchParams();

  const selectedType = isValidType(type) ? type : undefined;
  const selectedMovieCategory = selectedType === "movie" && isValidMovieCategory(category) ? category : undefined;
  const selectedShowCategory = selectedType === "tv" && isValidShowCategory(category) ? category : undefined;



  return (
    <View>
      <Stack.Screen options={{ title: Array.isArray(id) ? id.join(", ") : id }} />
      {selectedType && (
        <SectionListCard
          type={selectedType}
          movieCategory={selectedMovieCategory}
          showCategory={selectedShowCategory}
        />
      )}
    </View>
  );
};

export default SectionScreen;
