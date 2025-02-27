import { Stack } from "expo-router";
import { useEffect, useState } from "react";
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

function MediaHero({ media, type }: { media: any; type: MediaType }) {
  const colorScheme = useColorScheme();


  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          backgroundColor: AC.systemGray5,
          width: "100%",
          height: 300,
        }}
      >
        {media.backdrop_path && (
          <View
            style={{
              position: "relative",
              width: "100%",
              height: 300,
            }}
          >
            <Image
              contentFit="cover"
              source={{
                uri: `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`,
              }}
              style={{
                width: "100%",
                height: 300,
              }}
              transition={300}
            />

            <LinearGradient
              colors={
                colorScheme === "dark"
                  ? ["transparent", "rgba(0,0,0,5)"]
                  : ["transparent", "rgba(255,255,255)"]
              } 
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 150,
              }}
            />
          </View>
        )}
      </View>

      <View
        style={{
          padding: 16,
          marginTop: -60,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: AC.systemGray5,
            width: 100,
            height: 150,
            borderRadius: 8,
            marginRight: 16,
          }}
        >
          {media.poster_path && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w780${media.poster_path}`,
              }}
              style={{
                width: 100,
                height: 150,
                borderRadius: 8,
                marginRight: 16,
              }}
              transition={300}
            />
          )}
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 8 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: label,
              marginBottom: 8,
            }}
          >
            {type === "movie" ? media.title : media.name}
          </Text>
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

const MediaDetails = ({ id, type }: { id: string; type: MediaType }) => {
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const title = type === "movie" ? media?.title : media?.name;

  useEffect(() => {
    const loadMediaDetails = async () => {
      try {
        const mediaData = await fetchApiData<any>(
          `https://api.themoviedb.org/3/${type}/${id}`
        );
        setMedia(mediaData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadMediaDetails();
  }, [id, type]);

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

  if (loading) return <MovieSkeleton />;

  return (
    <>
      <Stack.Screen
        options={{
          title: title || "Movie",
          headerStyle: {
            backgroundColor: AC.systemFill.toString(),
          },
        }}
      />

      <FadeIn>
        <MediaHero media={media} type={type} />
      </FadeIn>

      <FadeIn>
        <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: label, lineHeight: 24 }}>
            {media.overview}
          </Text>
        </View>
      </FadeIn>

      <FadeIn>
        <Lists title="About" items={listItems} />
      </FadeIn>
    </>
  );
};

export default MediaDetails;
