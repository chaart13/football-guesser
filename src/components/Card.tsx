import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { IGameData } from "../utils/types";
import CustomButton from "./CustomButton";

interface CardProps {
  card: IGameData;
  flipCard: (id: IGameData["id"]) => void;
  disabled: boolean;
}

const Card = ({ card, flipCard, disabled }: CardProps) => {
  const createAnimatedStyles = (cardRotate: number, isFront: boolean) => {
    return useAnimatedStyle(() => {
      const rotateValue = interpolate(
        cardRotate,
        [0, 1],
        [0 + Number(isFront && 180), 180 + Number(isFront && 180)]
      );
      return {
        transform: [
          {
            rotateY: withTiming(`${rotateValue}deg`, { duration: 500 }),
          },
        ],
      };
    });
  };

  return (
    <View style={{ width: `${100 / 3}%` }}>
      {card.guessed ? (
        <View style={styles.item} />
      ) : (
        <CustomButton
          onPress={() => !disabled && !card.rotate.value && flipCard(card.id)}
          outerStyles={{ paddingRight: 10 }}
          noOpacity
        >
          <Animated.View
            style={[
              styles.item,
              styles.frontCard,
              createAnimatedStyles(card.rotate.value, true),
            ]}
          >
            <Image
              style={styles.image}
              source={{
                uri:
                  typeof card.imageURL === "string" ? card.imageURL : undefined,
              }}
            />
            <Image
              style={styles.cardFrame}
              source={require("../../assets/cardholder.png")}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.item,
              styles.backCard,
              createAnimatedStyles(card.rotate.value, false),
            ]}
          >
            <Image source={require("../../assets/cardback.png")} />
          </Animated.View>
        </CustomButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    marginBottom: 10,
    alignItems: "center",
  },
  backCard: {
    backfaceVisibility: "hidden",
  },
  frontCard: {
    position: "absolute",
    width: "100%",
    backfaceVisibility: "hidden",
  },
  cardFrame: {
    position: "absolute",
  },
  image: {
    marginTop: 7,
    width: 80,
    height: 80,
  },
});

export default Card;
