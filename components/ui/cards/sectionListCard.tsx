import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { useMovies } from "@/hooks/useMovies";
import { useShows } from "@/hooks/useShows";
import { useBottomTabOverflow } from "../utils/tabBarBackground";
import { useRouter } from "expo-router";
import { SearchSkeleton } from "../skeletonLoaders/searchCards";

interface SectionListCardProps {
  type: "movie" | "tv";
  movieCategory?: keyof typeof useMovies;
  showCategory?: keyof typeof useShows;
}

const SectionListCard: React.FC<SectionListCardProps> = ({ type, movieCategory, showCategory }) => {
  const { data: media, loading } =
    type === "movie" && movieCategory
      ? useMovies[movieCategory]() 
      : type === "tv" && showCategory
      ? useShows[showCategory]() 
      : { data: [], loading: true };


  const paddingBottom = useBottomTabOverflow();

  const router = useRouter();

  if (loading) return <SearchSkeleton />;
  if (!media.length) return null;

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 0.5,
            backgroundColor: AC.systemGray5,
            marginHorizontal: 16,
          }}
        />
      )}
      data={media}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 6, paddingBottom: paddingBottom }}
      renderItem={({ item }) => (
        <Pressable key={item.id} style={{ marginVertical: 6 }} onPress={() => router.push(`/(tabs)/${type}/${item.id}`)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              overflow: "hidden",
              padding: 8,
              marginHorizontal: 8,
            }}
          >
        
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: AC.systemGray5,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {item.poster_path && (
                <Image
                  contentFit="cover"
                  source={{
                    uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  transition={200}
                />
              )}
            </View>

         
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: AC.label,
                  marginBottom: 4,
                }}
              >
                {item.title || item.name}
              </Text>
              <Text style={{ fontSize: 14, color: AC.secondaryLabel }} numberOfLines={1}>
                {item.overview}
              </Text>
              <Text style={{ fontSize: 14, color: AC.secondaryLabel }} numberOfLines={1}>
                {item.release_date || item.first_air_date}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default SectionListCard;
