import React from "react";
import { Image, StyleSheet, Text, View, BackHandler } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Separator from "../components/Separator";
import { IStackParamList } from "../utils/types";
import { convertToMinutes } from "../utils/utils";
import { useCustomContext } from "../context/context";
import CustomButton from "../components/CustomButton";

const Menu = ({
  navigation,
}: NativeStackScreenProps<IStackParamList, "Menu">) => {
  const { scores } = useCustomContext();
  const score = scores[0];

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} />
      <View style={styles.content}>
        <Separator isMenu />
        <Text style={styles.text}>
          {score ? `TOP SCORE - ${convertToMinutes(score)}` : "No Score Yet"}
        </Text>
        <CustomButton
          outerStyles={styles.play}
          onPress={() => navigation.navigate("Game")}
        >
          <Image source={require("../../assets/play.png")} />
        </CustomButton>
        <View style={styles.buttons}>
          <CustomButton onPress={() => navigation.navigate("Leaderboard")}>
            <Image source={require("../../assets/leaderboard.png")} />
          </CustomButton>
          <CustomButton onPress={() => navigation.navigate("Settings")}>
            <Image source={require("../../assets/settings.png")} />
          </CustomButton>
          <CustomButton onPress={() => BackHandler.exitApp()}>
            <Image source={require("../../assets/exit.png")} />
          </CustomButton>
        </View>
        <Separator isMenu />
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
  content: {
    flex: 1,
    width: "50%",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#15D461",
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 100,
    fontFamily: "LilitaOne_400Regular",
  },
  play: {
    marginBottom: 100,
  },
});
export default Menu;
