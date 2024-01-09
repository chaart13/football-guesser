import { IMAGES_COUNT } from "./utils";

const API_BASE = "https://sofasport.p.rapidapi.com/v1";
const TOURNAMENT_ID = 17; // EPL
const SEASON_ID = 41886; // 2022 - 2023

type API = {
  data: {
    rating: {
      player: {
        id: number;
      };
    }[];
  };
};

async function callAPI(input: RequestInfo) {
  const response = await fetch(input, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY!,
      "X-RapidAPI-Host": process.env.EXPO_PUBLIC_API_HOST!,
    },
  });
  if (response.ok) {
    return response;
  }
  const errorMessage = "Unable to fetch data";
  throw Error(errorMessage);
}

async function getPlayerIds() {
  const response = await callAPI(
    `${API_BASE}/seasons/players-statistics/result?seasons_id=${SEASON_ID}&seasons_statistics_type=overall&unique_tournament_id=${TOURNAMENT_ID}`
  );
  const { data } = (await response.json()) as API;

  return data.rating
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
    .map((player) => player.player.id);
}

export async function fetchPlayers() {
  const playerIds = await getPlayerIds();
  const results = [];

  let i = 0;
  while (results.length !== IMAGES_COUNT) {
    const id = playerIds[i];
    try {
      const response = await callAPI(
        `${API_BASE}/players/photo?player_id=${id}`
      );
      const data = await response.blob();
      results.push({ id, data });
    } catch (error) {}
    i++;
  }

  return results;
}
