import { fetchApiData } from "@/functions/fetchApiData";
import { useEffect, useState } from "react";
import {  Text, View } from "react-native";
import { HorizontalList } from "./ui/utils/horizontalList";
import { MediaType } from "@/types/mediaType";
import { Image } from "expo-image";
import { Link, usePathname } from "expo-router";
import { label } from "@bacons/apple-colors";
import TouchableBounce from "./ui/utils/touchableBounce";

function MediaCard({ media, type }: { media: any; type: MediaType }) {

  const pathname = usePathname();
  

  const linkTarget = pathname.includes('search') 
    ? `/search/${media.id}?type=${type}` 
    : `/${type}/${media.id}`;

  return (
    <Link href={linkTarget as any} asChild>
<TouchableBounce>
        <View style={{ width: 140, marginRight: 4 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w780${media.poster_path}`,
            }}
            style={{ width: 140, height: 210, borderRadius: 8 }}
            transition={300}
          />
          <Text
            style={{ fontSize: 14, color: label, marginTop: 4 }}
            numberOfLines={1}
          >
            {type === "movie" ? media.title : media.name}
          </Text>
        </View>
        </TouchableBounce>
    </Link>
  );
}

const SimilarMedia: React.FC<{ id: string; type: MediaType }> = ({
  id,
  type,
}) => {
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimilarMedia = async () => {
      const similarData = await fetchApiData<any>(
        `https://api.themoviedb.org/3/${type}/${id}/similar`
      );
      setSimilar(similarData.results);
      setLoading(false);
    };

    loadSimilarMedia();
  }, [id, type]);

  if (loading) {
    return <Text>Loading similar media...</Text>;
  }

  if (!similar?.length) {
    return null;
  }

  return (
    <HorizontalList title="More Like This">
      {similar.slice(0, 10).map((media: any) => (
        <MediaCard key={media.id} media={media} type={type} />
      ))}
    </HorizontalList>
  );
};

export default SimilarMedia;
