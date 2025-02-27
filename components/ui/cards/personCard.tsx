import { POSTER_HEIGHT, POSTER_WIDTH } from "@/constants/constants";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {  Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";

const PersonCard = ({
  id,
  name,
  department,
  profilePath,
}: {
  id: number;
  name: string;
  department: string;
  profilePath: string | null;
}) => (
  <Link key={id} href={`/person/${id}`} asChild>
    <View
      style={{
        width: POSTER_WIDTH,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 12,
        overflow: "hidden",
        marginRight: 4,
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
        {profilePath && (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${profilePath}` }}
            style={{ borderRadius: 12, width: "100%", height: "100%" }}
            transition={200}
          />
        )}
      </View>
      <View style={{ padding: 8 }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: AC.label,
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: AC.secondaryLabel,
          }}
        >
          {department}
        </Text>
      </View>
    </View>
  </Link>
);

export default PersonCard;
