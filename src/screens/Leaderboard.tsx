import React from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { IStackParamList } from "../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Heading from "../components/Heading";
import Separator from "../components/Separator";
import CornerButton from "../components/CornerButton";
import { convertToMinutes } from "../utils/utils";
import { useCustomContext } from "../context/context";

const Item = (item: Omit<ListRenderItemInfo<number>, "separators">) => (
  <View>
    <Image resizeMode="cover" source={require("../../assets/scoreItem.png")} />
    <View style={styles.textBlock}>
      <Text style={styles.title}>{`${item.index + 1}.`}</Text>
      <Text style={styles.title}>{convertToMinutes(item.item)}</Text>
    </View>
  </View>
);

const Leaderboard = ({
  navigation,
}: NativeStackScreenProps<IStackParamList, "Leaderboard">) => {
  const { scores } = useCustomContext();
  return (
    <View style={styles.container}>
      <CornerButton navigation={navigation} />
      <Heading text="Leaderboard" />
      <Separator />

      <View>
        <FlatList
          data={scores}
          renderItem={({ item, index }) => <Item index={index} item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  textBlock: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.65)",
    fontFamily: "LilitaOne_400Regular",
  },
});

export default Leaderboard;
