import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { TABLE } from "../utils/utils";

const GridView = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {TABLE.rows.map((item, i) => {
          return (
            <View key={i} style={styles.rowNumber}>
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.container2}>
        {TABLE.headers.map((item, i) => {
          return (
            <View key={i} style={{ width: `${100 / 3}%`, marginBottom: 10 }}>
              <View style={{ alignItems: "center", paddingRight: 10 }}>
                <Text style={styles.text}>{item}</Text>
              </View>
            </View>
          );
        })}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  container1: {
    flex: 1,
    marginTop: 30,
  },
  container2: {
    flex: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
  },
  rowNumber: {
    height: 100,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "LilitaOne_400Regular",
    fontSize: 20,
    color: "white",
  },
});
export default GridView;
