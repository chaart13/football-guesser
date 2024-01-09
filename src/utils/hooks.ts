import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { IChangeProps, IGameData, ISoundProps } from "./types";
import { ToastAndroid } from "react-native";

import * as Api from "./api";

export const useImages = () => {
  const [images, setImages] = useState<
    Pick<IGameData, "imageId" | "imageURL">[]
  >([]);

  const loadImages = async () => {
    images.length = 0;
    try {
      const imageBlobs = await Api.fetchPlayers();
      for (const image of imageBlobs) {
        const { id, data } = image;
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(data);
        fileReaderInstance.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              imageId: id,
              imageURL: fileReaderInstance.result,
            },
          ]);
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return { images, loadImages };
};

export const useScores = () => {
  const [scores, setScores] = useState<number[]>([]);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("scores");
      if (!jsonValue) {
        return;
      }
      const scores = JSON.parse(jsonValue);
      setScores(scores);
    } catch (error) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const addScore = (newTime: number) => {
    const newScores = [...scores];
    const arrayLimit = 10;

    if (
      newScores.length === arrayLimit &&
      newTime > newScores[newScores.length - 1]
    ) {
      return;
    }

    let index;
    for (let i = 0; i < newScores.length; i++) {
      if (newTime < newScores[i]) {
        index = i;
        break;
      }
    }
    index ??= newScores.length;
    newScores.splice(index, 0, newTime);

    if (newScores.length > arrayLimit) {
      newScores.pop();
    }

    AsyncStorage.setItem("scores", JSON.stringify(newScores));
    setScores(newScores);
  };

  return { scores, addScore };
};

export const useSound = () => {
  const [playback, setPlayback] = useState<Audio.Sound | null>(null);
  const [tapSound, setTapSound] = useState<Audio.Sound | null>(null);
  const [winSound, setWinSound] = useState<Audio.Sound | null>(null);
  const [volume, setVolume] = useState<ISoundProps | null>(null);

  const loadData = async () => {
    const defaultValue = {
      sound: 1,
      music: 1,
    };

    try {
      const { sound: playBackSound } = await Audio.Sound.createAsync(
        require("../../assets/music/bensound-hipjazz.mp3"),
        { isLooping: true }
      );
      setPlayback(playBackSound);

      const { sound: tapSound } = await Audio.Sound.createAsync(
        require("../../assets/music/button2.mp3")
      );
      setTapSound(tapSound);

      const { sound: winSound } = await Audio.Sound.createAsync(
        require("../../assets/music/win_1.mp3")
      );
      setWinSound(winSound);

      const jsonValue = await AsyncStorage.getItem("sound");
      if (jsonValue) {
        const volume = JSON.parse(jsonValue);
        setVolume(volume);
        return;
      }

      AsyncStorage.setItem("sound", JSON.stringify(defaultValue));
      setVolume(defaultValue);
    } catch (error) {}
  };

  const playBackgroundMusic = () => {
    if (!playback) {
      return;
    }
    const shouldPlay = volume?.music! > 0;

    if (shouldPlay) {
      playback.playAsync();
    } else {
      playback.stopAsync();
    }
  };

  const playTap = () => {
    const shouldPlay = volume?.sound! > 0;
    if (shouldPlay) {
      tapSound?.replayAsync();
    }
  };

  const playWin = () => {
    const shouldPlay = volume?.music! > 0;
    if (shouldPlay) {
      winSound?.replayAsync();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!volume) {
      return;
    }

    playback?.setVolumeAsync(volume.music!);
    tapSound?.setVolumeAsync(volume.sound!);
    winSound?.setVolumeAsync(volume.music!);
    playBackgroundMusic();
  }, [volume]);

  useEffect(() => {
    return playback
      ? () => {
          playback.unloadAsync();
        }
      : undefined;
  }, [playback]);

  useEffect(() => {
    return tapSound
      ? () => {
          tapSound.unloadAsync();
        }
      : undefined;
  }, [tapSound]);

  useEffect(() => {
    return winSound
      ? () => {
          winSound.unloadAsync();
        }
      : undefined;
  }, [winSound]);

  const changeVolume = async ({ source, value }: IChangeProps) => {
    const newSound = value
      ? {
          ...volume,
          [source]: value,
        }
      : {
          ...volume,
          [source]: volume![source] > 0 ? 0 : 1,
        };

    AsyncStorage.setItem("sound", JSON.stringify(newSound));
    setVolume(newSound);
  };

  return { volume, changeVolume, playTap, playWin };
};
