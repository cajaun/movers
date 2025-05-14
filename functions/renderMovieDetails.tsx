import { ScrollView, View } from "react-native";
import React from "react";
import MediaDetails from "@/components/mediaDetails";
import { MediaType } from "@/types/mediaType";
import MediaCast from "@/components/mediaCast";
import SimilarMedia from "@/components/similarMedia";
import * as AC from "@bacons/apple-colors";

export async function renderMedia(id: string, type: MediaType, media?: any) {
  // console.log(media)
  return (
    <View style={{ backgroundColor: AC.systemBackground }}>
      <React.Suspense fallback={<MovieSkeleton />}>
        <MediaDetails media={media} type={type} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <MediaCast id={id} type={type} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <SimilarMedia id={id} type={type} />
      </React.Suspense>
    </View>
  );
}

function MovieSkeleton() {
  return (
    <View style={{ gap: 16 }}>
      <View
        style={{ height: 300, backgroundColor: "rgba(120,120,128,0.12)" }}
      />
      <View
        style={{
          height: 100,
          backgroundColor: "rgba(120,120,128,0.12)",
          margin: 16,
        }}
      />
    </View>
  );
}

function ListSkeleton() {
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          height: 24,
          width: 200,
          backgroundColor: "rgba(120,120,128,0.12)",
          marginBottom: 12,
          marginHorizontal: 16,
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              width: 140,
              height: 210,
              backgroundColor: "rgba(120,120,128,0.12)",
              marginHorizontal: 4,
              borderRadius: 8,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
