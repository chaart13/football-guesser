import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGameData } from "./types";

interface IAddProps {
  newTime: number;
  scores: number[];
}

interface ISwapProps {
  nextMove: (string | number)[] | null;
  cards: IGameData[];
}

export const icons = {
  sound: {
    on: require("../../assets/sound-on.png"),
    off: require("../../assets/sound-off.png"),
  },
  music: {
    on: require("../../assets/music-on.png"),
    off: require("../../assets/music-off.png"),
  },
};

export const TABLE = {
  headers: ["A", "B", "C"],
  rows: [1, 2, 3, 4],
};

export const IMAGES_COUNT = 6;

export const addScoreToLeaderboard = ({ newTime, scores }: IAddProps) => {
  const newScores = [...scores];
  const arrayLimit = 10;

  if (newScores.length && newTime > newScores[newScores.length - 1]) {
    return;
  }

  newScores.splice(
    newScores.findIndex((score) => score > newTime),
    0,
    newTime
  );

  if (newScores.length > arrayLimit) {
    newScores.pop();
  }

  AsyncStorage.setItem("scores", JSON.stringify(newScores));
  return newScores;
};

export function convertToMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export const swapCards = ({ nextMove, cards }: ISwapProps) => {
  if (!nextMove || !cards) {
    return;
  }

  const newCards = [...cards];
  if (typeof nextMove[0] === "number" && typeof nextMove[1] === "number") {
    const startFrom = 3 * (nextMove[0] - 1);
    const startTo = 3 * (nextMove[1] - 1);
    for (let i = 0; i < 3; i++) {
      const temp = newCards[startFrom + i];
      newCards[startFrom + i] = newCards[startTo + i];
      newCards[startTo + i] = temp;
    }
  } else if (
    typeof nextMove[0] === "string" &&
    typeof nextMove[1] === "string"
  ) {
    const startFrom = nextMove[0].charCodeAt(0) - 65;
    const startTo = nextMove[1].charCodeAt(0) - 65;
    for (let i = 0; i < 4; i++) {
      const temp = newCards[startFrom + i * 3];
      newCards[startFrom + i * 3] = newCards[startTo + i * 3];
      newCards[startTo + i * 3] = temp;
    }
  }
  return newCards;
};

export const changeMove = () => {
  const array = [...TABLE[Math.random() > 0.5 ? "headers" : "rows"]];
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};
