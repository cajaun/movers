import { View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import SectionListCard from "@/components/ui/cards/sectionListCard";

const validCategories = [
  "trending",
  "nowPlaying",
  "popular",
  "upcoming",
  "topRated",
  "mostVoted",
  "topGrossing",
] as const;

const isValidType = (t: any): t is "movie" | "tv" =>
  t === "movie" || t === "tv";

const isValidCategory = (c: any): c is (typeof validCategories)[number] =>
  validCategories.includes(c);

const SectionScreen = () => {
  const { id, type, category } = useLocalSearchParams();

  const selectedType = isValidType(type) ? type : undefined;
  const selectedCategory = isValidCategory(category) ? category : undefined;

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${
            Array.isArray(id)
              ? id.join(", ").charAt(0).toUpperCase() + id.join(", ").slice(1)
              : id.charAt(0).toUpperCase() + id.slice(1)
          } ${
            selectedType
              ? selectedType.charAt(0).toUpperCase() +
                selectedType.slice(1) +
                "s"
              : ""
          }`,
        
            headerTransparent: true,
            headerBlurEffect: "systemChromeMaterial",
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: true,
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
    
        }}
      />

      {selectedType && (
        <SectionListCard type={selectedType} movieCategory={selectedCategory} />
      )}
    </View>
  );
};

export default SectionScreen;
