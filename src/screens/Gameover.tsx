import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { IStackParamList } from "../utils/types";
import { convertToMinutes } from "../utils/utils";

import Heading from "../components/Heading";
import { useCustomContext } from "../context/context";
import CustomButton from "../components/CustomButton";

const Gameover = ({
  navigation,
  route,
}: NativeStackScreenProps<IStackParamList, "Gameover">) => {
  const { score } = route.params;
  const { scores, playWin } = useCustomContext();
  playWin();

  const topScore = scores[0];

  return (
    <View style={styles.container}>
      <Heading text="Game Over" />

      <View style={styles.frame}>
        <Image resizeMode="cover" source={require("../../assets/border.png")} />
        <View style={styles.textBlock}>
          <Text style={[styles.text, styles.score]}>
            SCORE - {convertToMinutes(score)}
          </Text>
          <Text style={[styles.text, styles.topScore]}>
            TOP SCORE - {convertToMinutes(topScore)}
          </Text>

          <CustomButton onPress={() => navigation.navigate("Menu")}>
            <Image source={require("../../assets/menu.png")} />
          </CustomButton>
        </View>
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
  text: {
    fontFamily: "LilitaOne_400Regular",
  },
  score: {
    color: "#15D461",
    fontSize: 32,
  },
  topScore: {
    color: "white",
    fontSize: 20,
    marginBottom: 40,
  },
});

export default Gameover;
