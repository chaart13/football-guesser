import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IStackParamList } from "../utils/types";

import Heading from "../components/Heading";
import Separator from "../components/Separator";
import Scroll from "../components/Scroll";
import CornerButton from "../components/CornerButton";
import { icons } from "../utils/utils";
import { useCustomContext } from "../context/context";
import CustomButton from "../components/CustomButton";

const Settings = ({
  navigation,
}: NativeStackScreenProps<IStackParamList, "Settings">) => {
  const { volume, changeVolume } = useCustomContext();

  return (
    <View style={styles.container}>
      <CornerButton navigation={navigation} />
      <Heading text="Settings" />
      <Separator />

      <View style={styles.frame}>
        <Image resizeMode="cover" source={require("../../assets/border.png")} />
        <View style={styles.textBlock}>
          <View style={styles.setting}>
            <CustomButton onPress={() => changeVolume({ source: "sound" })}>
              <Image source={icons.sound[volume?.sound ? "on" : "off"]} />
            </CustomButton>
            <Scroll
              value={volume!.sound}
              onVolumeChange={(value) =>
                changeVolume({ source: "sound", value })
              }
            />
          </View>
          <View style={styles.setting}>
            <CustomButton onPress={() => changeVolume({ source: "music" })}>
              <Image source={icons.music[volume?.music ? "on" : "off"]} />
            </CustomButton>
            <Scroll
              value={volume!.music}
              onVolumeChange={(value) =>
                changeVolume({ source: "music", value })
              }
            />
          </View>
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
    flex: 1,
    marginTop: 80,
  },
  textBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  setting: {
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default Settings;
