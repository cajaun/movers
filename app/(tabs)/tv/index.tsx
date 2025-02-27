import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BodyScrollView } from "@/components/ui/utils/bodyScrollView";
import { SkeletonSection } from "@/components/ui/skeletonLoaders/movieCards";
import MediaSection from "@/functions/renderContents";

const TvScreen = () => {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <View className = "gap-y-6">
          <MediaSection title="Trending" type="tv" showCategory="trending" />
          <MediaSection title="Popular" type="tv" showCategory="popular" />
          <MediaSection title="Top Rated" type="tv" showCategory="topRated" />
          <MediaSection title="Most Voted" type="tv" showCategory="mostVoted" />
          <MediaSection
            title="On The Air"
            type="tv"
            showCategory="currentlyAiring"
          />
          <MediaSection
            title="Airing Today"
            type="tv"
            showCategory="airingToday"
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

export default TvScreen;
