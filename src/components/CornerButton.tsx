import React from "react";
import { Image, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IStackParamList } from "../utils/types";
import CustomButton from "./CustomButton";

interface IBackProps {
  pause?: boolean;
  handleClick?: () => void;
  navigation: NativeStackNavigationProp<
    IStackParamList,
    "Settings" | "Leaderboard" | "Game" | "Pause"
  >;
}

const CornerButton = ({ pause, handleClick, navigation }: IBackProps) => {
  const source = pause
    ? require("../../assets/pause.png")
    : require("../../assets/cancel.png");

  handleClick ??= () => {
    navigation.goBack();
  };

  return (
    <CustomButton outerStyles={styles.button} onPress={handleClick}>
      <Image source={source} />
    </CustomButton>
  );
};

export default CornerButton;

const styles = StyleSheet.create({
  button: { position: "absolute", top: 55, left: 15 },
});
