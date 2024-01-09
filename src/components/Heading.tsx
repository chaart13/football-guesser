import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface IHeadingProps {
  text?: string;
}

const Heading = ({ children, text }: PropsWithChildren<IHeadingProps>) => {
  return (
    <View>
      <Image resizeMode="cover" source={require("../../assets/heading.png")} />
      <View style={styles.textBlock}>
        {children || <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    fontFamily: "LilitaOne_400Regular",
  },
});

export default Heading;
