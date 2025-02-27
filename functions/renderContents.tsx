import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import React from "react";
import * as AC from "@bacons/apple-colors";
import * as Haptic from "expo-haptics";
import { SkeletonSection } from "@/components/ui/skeletonLoaders/movieCards";
import MediaCard from "@/components/ui/cards/mediaCard";
import { useMovies } from "@/hooks/useMovies";
import { useShows } from "@/hooks/useShows";
import { SymbolView } from "expo-symbols";
import { Link } from "expo-router";

interface MediaSectionProps {
  title: string;
  type: "movie" | "tv";
  movieCategory?: keyof typeof useMovies;
  showCategory?: keyof typeof useShows;
}

const MediaSection = ({ title, type, movieCategory, showCategory }: MediaSectionProps) => {
  const { data: media, loading } =
    type === "movie" && movieCategory
      ? useMovies[movieCategory]()
      : type === "tv" && showCategory
      ? useShows[showCategory]()
      : { data: [], loading: true };

  if (loading) return <SkeletonSection />;
  if (!media.length) return null;

  const { width } = Dimensions.get("window");
  const titleText = type === "movie" ? "Movies" : "Shows";
  const itemWidth = width * 0.33;

  return (
    <View>
      <Link href={`/(tabs)/${type}/section/${title.toLowerCase()}?type=${type}&category=${movieCategory || showCategory}`} asChild>
        <Pressable onPress={() => Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium)}>
          <View className="flex flex-row my-auto" style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: AC.label,
                marginBottom: 12,
                paddingLeft: 16,
              }}
            >
              {title} {titleText}
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 4,
              }}
            >
              <SymbolView name="chevron.right" type="hierarchical" size={18} weight="semibold" />
            </View>
          </View>
        </Pressable>
      </Link>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        data={media}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MediaCard key={item.id} id={item.id} title={item.title || item.name} rating={item.vote_average} posterPath={item.poster_path} type={type} />
        )}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
};

export default MediaSection;
