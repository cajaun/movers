import useApiData from "./useApiData";

export const useMovies = {
  trending: () => useApiData("movie", "trending", { timeWindow: "week" }),
  nowPlaying: () => useApiData("movie", "now_playing"),
  popular: () => useApiData("movie", "popular"),
  upcoming: () => useApiData("movie", "upcoming"),
  topRated: () => useApiData("movie", "top_rated"),
  mostVoted: () => useApiData("movie", "discover", { sort_by: "vote_count.desc" }),
  topGrossing: () => useApiData("movie", "discover", { sort_by: "revenue.desc" }),
  // genre: (id: string) => useApiData("movie", "discover", { with_genres: id }),
};

