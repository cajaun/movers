import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { useRouter } from "expo-router";
import SearchMediaCard from "@/components/ui/cards/searchMediaCard";
import { useBottomTabOverflow } from "@/components/ui/utils/tabBarBackground";


interface SearchSectionProps {
  results: {
    id: string;
    title: string;
    rating: number;
    poster_path: string | null;
    media_type: "movie" | "tv" | "person";
    overview: string;
    release_date: string;
  }[];
  loading: boolean;
  searchQuery: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  results,
  loading,
  searchQuery,
}) => {
  const router = useRouter();
  const paddingBottom = useBottomTabOverflow();
  const handleItemPress = (id: string, type: string) => {
    router.push(`/search/${id}?type=${type}`);
  };

  return (
    <View style={{paddingBottom: paddingBottom}}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={results}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              backgroundColor: AC.systemGray5,
              marginHorizontal: 16,
            }}
          />
        )}
        renderItem={({ item }) => (
          <SearchMediaCard item={item} handleItemPress={handleItemPress} />
        )}

        ListEmptyComponent={
          !loading && searchQuery ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No results found
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default SearchSection;
