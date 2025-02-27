import { POSTER_HEIGHT, POSTER_WIDTH } from "@/constants/constants";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import TouchableBounce from "../utils/touchableBounce";

const MediaCard = ({
  id,
  title,
  rating,
  posterPath,
  type,
}: {
  id: number;
  title: string;
  rating: number;
  posterPath: string | null;
  type: "movie" | "tv" | "person";
}) => {
  return (
    <Link key={id} href={`/${type}/${id}`} asChild>
      <TouchableBounce >
        <View
          style={{
            width: POSTER_WIDTH,
            borderRadius: 12,
            marginRight: 4,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: POSTER_WIDTH,
              height: POSTER_HEIGHT,
              backgroundColor: AC.systemGray5,
              borderRadius: 12,
            }}
          >
            {posterPath && (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w780${posterPath}`,
                }}
                style={{ borderRadius: 12, width: "100%", height: "100%" }}
                transition={200}
              />
            )}
          </View>
          <View style={{ padding: 8 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: AC.label,
                marginBottom: 4,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      </TouchableBounce>
    </Link>
  );
};

export default MediaCard;
