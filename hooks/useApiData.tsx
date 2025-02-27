import { useState, useEffect } from "react";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.TMDB_READ_API_KEY;

function useApiData(
  category: "movie" | "tv" | "person",
  endpoint: string,
  queryParams: Record<string, string | number> = {}
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const isTrending = endpoint === "trending";
        let url: string;

        if (endpoint === "discover") {
          url = `https://api.themoviedb.org/3/discover/${category}?api_key=${apiKey}`;

          const queryString = new URLSearchParams(
            queryParams as Record<string, string>
          ).toString();
          if (queryString) {
            url += `&${queryString}`;
          }
          
        } else if (isTrending) {
          url = `https://api.themoviedb.org/3/trending/${category}/${
            queryParams.timeWindow || "week"
          }?api_key=${apiKey}`;
        } else {
          url = `https://api.themoviedb.org/3/${category}/${endpoint}?api_key=${apiKey}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: { accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, endpoint, JSON.stringify(queryParams)]);

  return { data, loading, error };
}

export default useApiData;



