import useApiData from "./useApiData";

export const useShows = {
  trending: () => useApiData("tv", "trending", { timeWindow: "week" }),
  airingToday: () => useApiData("tv", "airing_today"),
  currentlyAiring: () => useApiData("tv", "on_the_air"),
  popular: () => useApiData("tv", "popular"),
  topRated: () => useApiData("tv", "top_rated"),
  mostVoted: () => useApiData("tv", "discover", { sort_by: "vote_count.desc" }),
  // byYear: (year: number) => useApiData("tv", "discover", { first_air_date_year: year }),
};