import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";
import * as AC from "@bacons/apple-colors";
import { SearchSkeleton } from "@/components/ui/skeletonLoaders/searchCards";
import SearchSection from "@/functions/renderSearchContents";
import CategoryCard from "@/components/ui/cards/categoryCard";
import { ScrollView, StyleSheet, View } from "react-native";


const TabData = [
  { id: "0", title: "Top results" },
  { id: "1", title: "Movies" },
  { id: "2", title: "Shows" },
  { id: "3", title: "All" },
];

const SearchScreen = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query[0] : query;
  const [activeTab, setActiveTab] = useState("");
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
        // console.log(data)
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
<View>
   
      {/* Tab Bar */}
      {/* <TabBar
        tabs={TabData}
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabBarContainerStyle={styles.tabBarContainerStyle}
        tabStyle={[styles.tabStyle]}
        indicatorStyle={[styles.indicatorStyle]}
        tabBarTextStyle={[styles.tabBarTextStyle]}
      /> */}

        {!searchQuery && (
          <CategoryCard />
        )}
          
 
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
