import { useState, useEffect } from "react";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.TMDB_READ_API_KEY;

function useCategoryApiData(
  category: "movie" | "tv" | "person",
  endpoint: string,
  genreId: string | string[],
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const totalPages = 3; 
        const requests = [];

        for (let i = 1; i <= totalPages; i++) {
          let url = `https://api.themoviedb.org/3/discover/${category}?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=3000&page=${i}&with_genres=${genreId}`;
          requests.push(fetch(url).then((res) => res.json()));
        }



        const results = await Promise.all(requests);
        const movies = results.flatMap((result) => result.results); 

        setData(movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, endpoint, genreId]);

  return { data, loading, error };
}

export default useCategoryApiData;
