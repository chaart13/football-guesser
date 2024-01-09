import React from "react";
import { StyleSheet, View } from "react-native";

interface ISeparatorProps {
  isMenu?: true;
  double?: true;
}

const Separator = ({ isMenu, double }: ISeparatorProps) => {
  return (
    <View style={isMenu ? styles.menu : styles.other}>
      <View style={styles.line} />
      {(isMenu || double) && <View style={styles.line} />}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    marginVertical: 30,
  },
  other: {
    width: "90%",
    marginVertical: 15,
  },
  line: {
    height: 4,
    marginBottom: 5,
    borderRadius: 1,
    backgroundColor: "#EEE61B",
  },
});

export default Separator;
