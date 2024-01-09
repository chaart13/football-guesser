import React, { PropsWithChildren, useCallback } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { useCustomContext } from "../context/context";

interface ICustomButtonProps {
  outerStyles?: StyleProp<ViewStyle>;
  noOpacity?: boolean;
  onPress: () => void;
}

const CustomButton = ({
  outerStyles,
  noOpacity,
  children,
  onPress,
}: PropsWithChildren<ICustomButtonProps>) => {
  const { playTap } = useCustomContext();

  const _style = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      { opacity: !noOpacity && pressed ? 0.5 : 1 },
      outerStyles && outerStyles,
    ],
    [outerStyles]
  );

  return (
    <Pressable
      style={_style}
      android_disableSound={true}
      onPress={() => {
        playTap();
        onPress();
      }}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({});
export default CustomButton;
