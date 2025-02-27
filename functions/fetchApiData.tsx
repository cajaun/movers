import Constants from 'expo-constants';

export async function fetchApiData<T>(url: string): Promise<T> {

  const apiKey = Constants.expoConfig?.extra?.TMDB_READ_API_KEY;
  
  const fullUrl = `${url}?api_key=${apiKey}`;

  const response = await fetch(fullUrl, {
    headers: {
      accept: 'application/json',
    },
  });

  const data = await response.json();
  return data;
}