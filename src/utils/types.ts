import { SharedValue } from "react-native-reanimated";

export interface IGameData {
  id: number;
  imageId: number;
  imageURL: string | ArrayBuffer | null;
  guessed: boolean;
  rotate: SharedValue<number>;
}

export type IStackParamList = {
  Menu: undefined;
  Game:
    | {
        continue?: boolean;
        restart?: boolean;
      }
    | undefined;
  Leaderboard: undefined;
  Settings: undefined;
  Pause: undefined;
  Gameover: { score: number };
};

export interface ISoundProps {
  sound: number;
  music: number;
}

export interface IChangeProps {
  source: "music" | "sound";
  value?: number;
  type?: string;
}
