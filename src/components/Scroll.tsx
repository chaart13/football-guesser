import React from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";

interface IScrollProps {
  onVolumeChange: (value: number) => void;
  value: number;
}

const Scroll = ({ onVolumeChange, value }: IScrollProps) => {
  return (
    <View style={styles.outer}>
      <Slider
        style={styles.inner}
        value={value}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onSlidingComplete={(value) => onVolumeChange(value)}
        thumbTintColor="#15D461"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    height: 20,
    width: 150,
    padding: 5,
    borderRadius: 11,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  inner: {
    flex: 1,
  },
});
export default Scroll;
