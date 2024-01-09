import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IStackParamList } from "../utils/types";

import Heading from "../components/Heading";
import CornerButton from "../components/CornerButton";
import { icons } from "../utils/utils";
import { useCustomContext } from "../context/context";
import CustomButton from "../components/CustomButton";

const Pause = ({
  navigation,
}: NativeStackScreenProps<IStackParamList, "Pause">) => {
  const { volume, changeVolume } = useCustomContext();

  return (
    <View style={styles.container}>
      <CornerButton
        navigation={navigation}
        handleClick={() => {
          navigation.navigate("Game", { continue: true });
        }}
      />
      <Heading text="Pause" />

      <View style={styles.frame}>
        <Image resizeMode="cover" source={require("../../assets/border.png")} />
        <View style={styles.textBlock}>
          <CustomButton
            onPress={() => {
              navigation.navigate("Game", { restart: true });
            }}
          >
            <Image source={require("../../assets/restart.png")} />
          </CustomButton>
          <CustomButton
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Image source={require("../../assets/menu.png")} />
          </CustomButton>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <CustomButton onPress={() => changeVolume({ source: "sound" })}>
          <Image source={icons.sound[volume?.sound ? "on" : "off"]} />
        </CustomButton>
        <CustomButton onPress={() => changeVolume({ source: "music" })}>
          <Image source={icons.music[volume?.music ? "on" : "off"]} />
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    alignItems: "center",
  },
  line: {
    height: 4,
    width: "80%",
    marginBottom: 5,
    backgroundColor: "#EEE61B",
    borderRadius: 1,
  },
  frame: {
    marginVertical: 80,
  },
  textBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Pause;
