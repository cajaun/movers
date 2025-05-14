import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useHeaderSearch } from "@/hooks/useHeaderSearch"; // Update the import path as needed
import * as AC from "@bacons/apple-colors";
import { SearchSkeleton } from "@/components/ui/skeletonLoaders/searchCards";
import SearchSection from "@/functions/renderSearchContents";
import CategoryCard from "@/components/ui/cards/categoryCard";

const SearchScreen = () => {
  const searchQuery = useHeaderSearch({ placeholder: "Search Shows, Movies, and More",   hideWhenScrolling: false, });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = Constants.expoConfig?.extra?.TMDB_READ_API_KEY;

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery, apiKey]);

  return (
    <View style={styles.container}>
      {!searchQuery && <CategoryCard />}
      <React.Suspense fallback={<SearchSkeleton />}>
        <SearchSection
          results={results}
          loading={loading}
          searchQuery={searchQuery}
        />
      </React.Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  tabBarContainerStyle: {
    paddingHorizontal: 16,
    gap: 0,
  },
  tabStyle: {
    borderRadius: 10,
  },
  indicatorStyle: {
    borderRadius: 36,
    backgroundColor: AC.systemBlue,
  },
  tabBarTextStyle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default SearchScreen;
