import { fetchApiData } from "@/functions/fetchApiData";
import { CastCard } from "./ui/cards/castCard";
import { HorizontalList } from "./ui/utils/horizontalList";
import { useEffect, useState } from "react";
import { MediaType } from "@/types/mediaType";
import { Text } from "react-native";

const MediaCast: React.FC<{ id: string; type: MediaType }> = ({ id, type }) => {
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCast = async () => {
      const credits = await fetchApiData<any>(`https://api.themoviedb.org/3/${type}/${id}/credits`);
      setCast(credits.cast);
      setLoading(false);
    };

    loadCast();
  }, [id, type]);

  if (loading) {
    return <Text>Loading cast...</Text>;
  }

  if (!cast?.length) {
    return null; 
  }

  return (
    <HorizontalList title="Cast & Crew">
      {cast.slice(0, 10).map((person: any) => (
        <CastCard key={person.id} person={person} />
      ))}
    </HorizontalList>
  );
};

export default MediaCast