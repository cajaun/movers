import { Stack } from "expo-router";
import { useEffect, useState, } from "react";
import { Text, useColorScheme, View } from "react-native";
import { FadeIn } from "./ui/utils/fadeIn";
import { label } from "@bacons/apple-colors";
import { MediaType } from "@/types/mediaType";
import { fetchApiData } from "@/functions/fetchApiData";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MovieSkeleton } from "./ui/skeletonLoaders/movieSkeleton";
import Lists from "./ui/list/lists";
import * as AC from "@bacons/apple-colors";
import RenderStarColors from "./ui/renderStars";
import ParallaxScrollView from "./ui/parallax-scroll-view";

function MediaHero({ media, type }: { media: any; type: MediaType }) {
  const colorScheme = useColorScheme();

  return (
    <View style={{ marginBottom: 24 }}>


      <View
        style={{
          padding: 16,
          flexDirection: "row",
        }}
      >
       
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
          
          <Text
            style={{
              fontSize: 15,
              color: label,
              opacity: 0.8,
              marginBottom: 8,
            }}
          >
            <RenderStarColors rating= {media.vote_average }/>
          </Text>
          
          <Text style={{ fontSize: 15, color: label, opacity: 0.8, marginBottom: 8 }}>
            {media.tagline}
          </Text>

          
        </View>
      </View>
    </View>
  );
}

const MediaDetails = ({ media, type}: { media: any, type: MediaType}) => {

  const title = type === "movie" ? media?.title : media?.name;

  // console.log(media.overview)


  const listItems = media
    ? [
        {
          label: type === "movie" ? "Release Date" : "First Air Date",
          value:
            type === "movie" && media.release_date
              ? new Date(media.release_date).toLocaleDateString()
              : "N/A",
        },
        {
          label: "Age Rating",
          value: media.adult ? "Adult" : "All Ages",
        },
        {
          label: type === "movie" ? "Runtime" : "Episode Runtime",
          value:
            type === "movie"
              ? `${media.runtime} minutes`
              : `${media.episode_run_time?.[0] || "N/A"} minutes`,
        },
        {
          label: "Budget",
          value: media.budget
            ? `$${(media.budget / 1000000).toFixed(1)}M`
            : "N/A",
        },
        {
          label: "Revenue",
          value: media.revenue
            ? `$${(media.revenue / 1000000).toFixed(1)}M`
            : "N/A",
        },
        {
          label: "Countries",
          value:
            media.production_countries
              ?.map((c: { name: string }) => c.name)
              .join(", ") || "N/A",
        },
        {
          label: "Languages",
          value:
            media.spoken_languages
              ?.map((l: { name: string }) => l.name)
              .join(", ") || "N/A",
        },
        {
          label: "Genres",
          value:
            media.genres?.map((g: { name: string }) => g.name).join(", ") ||
            "N/A",
        },
      ]
    : [];

  // if (loading) return <MovieSkeleton />;

  return (
    <>
      

      {/* <FadeIn>
        <MediaHero media={media} type={type} />
      </FadeIn> */}

      {/* <FadeIn>
        <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: label, lineHeight: 24 }}>
            {media.overview}
          </Text>
        </View>
      </FadeIn> */}

      <FadeIn>
        <View style={{marginTop: 24}}>
        <Lists title="About" items={listItems} />
        </View>

        
       
      </FadeIn>
    </>
  );
};

export default MediaDetails;
