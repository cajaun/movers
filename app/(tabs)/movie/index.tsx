import {  StyleSheet, Text, useColorScheme, View } from "react-native";
import React, {  useState } from "react";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { SkeletonSection } from "@/components/ui/skeletonLoaders/movieCards";
import MediaSection from "@/functions/renderContents";
import TabBar from "@/components/ui/tabbar";
import * as AC from "@bacons/apple-colors";
import { useTheme } from "@react-navigation/native";


const MovieScreen = () => {


  const theme = useTheme();

  

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <View className = "gap-y-6">
          <MediaSection
            title="Trending"
            type="movie"
            movieCategory="trending"
          />
          <MediaSection title="Popular" type="movie" movieCategory="popular" />
          <MediaSection
            title="Upcoming"
            type="movie"
            movieCategory="upcoming"
          />
          <MediaSection
            title="Top Rated"
            type="movie"
            movieCategory="topRated"
          />
          <MediaSection
            title="Most Voted"
            type="movie"
            movieCategory="mostVoted"
          />
          <MediaSection
            title="Top Grossing"
            type="movie"
            movieCategory="topGrossing"
          />
        </View>





      </React.Suspense>
    </BodyScrollView>
  );
};

const Loading = () => (
  <View className = "gap-y-6">
    <SkeletonSection />
    <SkeletonSection />
    <SkeletonSection />
  </View>
);



export default MovieScreen;
