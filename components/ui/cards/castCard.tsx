import { Image } from "expo-image";
import { Link } from "expo-router";
import {  Text, View } from "react-native";
import { label } from "@bacons/apple-colors";
import TouchableBounce from "../utils/touchableBounce";

export const CastCard = ({ person }: { person: any }) => (

  <TouchableBounce>
    <View className="" style={{ marginRight: 4, width: 100 }}>
      <Image
        source={{
          uri: person.profile_path
            ? `https://image.tmdb.org/t/p/w780${person.profile_path}`
            : "https://via.placeholder.com/100x150",
        }}
        style={{ width: 100, height: 150, borderRadius: 8 }}
        transition={300}
      />
      <Text
        style={{ fontSize: 14, color: label, marginTop: 4 }}
        numberOfLines={1}
      >
        {person.name}
      </Text>
      <Text
        style={{ fontSize: 12, color: label, opacity: 0.7 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {person.character}
      </Text>
    </View>
    </TouchableBounce>

);
