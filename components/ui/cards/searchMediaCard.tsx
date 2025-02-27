import React from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";

interface SearchMediaCardProps {
  item: {
    id: string;
    title: string;
    poster_path: string | null;
    media_type: "movie" | "tv" | "person";
    overview: string;
    release_date: string;
  };
  handleItemPress: (id: string, type: string) => void;
}

const SearchMediaCard: React.FC<SearchMediaCardProps> = ({ item, handleItemPress }) => {

  return (
    <Pressable onPress={() => handleItemPress(item.id, item.media_type)} style={{ marginVertical: 6 }}>
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
            {item.title}
          </Text>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel }} numberOfLines={1}>
            {item.overview}
          </Text>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel }} numberOfLines={1}>
            {item.release_date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchMediaCard;
