import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { IGameData, IStackParamList } from "../utils/types";
import {
  IMAGES_COUNT,
  changeMove,
  convertToMinutes,
  swapCards,
} from "../utils/utils";

import GridView from "../components/GridView";
import Card from "../components/Card";
import CornerButton from "../components/CornerButton";
import Separator from "../components/Separator";
import Heading from "../components/Heading";
import { useCustomContext } from "../context/context";

const Game = ({
  navigation,
  route,
}: NativeStackScreenProps<IStackParamList, "Game">) => {
  const { addScore, images, loadImages } = useCustomContext();

  const [newGame, setNewGame] = useState(true);
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState(0);
  const [nextMove, setNextMove] = useState<(string | number)[] | null>(null);
  const [nextMoveTimer, setNextMoveTimer] = useState(0);

  const [cards, setCards] = useState<IGameData[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [choice1, setChoice1] = useState<IGameData | null>(null);
  const [choice2, setChoice2] = useState<IGameData | null>(null);

  const shuffleCards = () => {
    const shuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        guessed: false,
        rotate: { value: 0 },
      }));
    setCards(shuffled);
    resetChoices();
    setNewGame(false);
    loadImages();
  };

  const resetChoices = () => {
    setChoice1(null);
    setChoice2(null);
    setDisabled(false);
  };

  const handleFlip = (id: number) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          choice1 ? setChoice2(card) : setChoice1(card);
          card.rotate.value = 1;
        }
        return card;
      })
    );
  };

  if (!nextMoveTimer) {
    if (nextMove) {
      const newCards = swapCards({ nextMove, cards });
      setCards(newCards!);
    }

    setNextMove(changeMove());
    setNextMoveTimer(7);
  }

  if (images.length === IMAGES_COUNT && newGame) {
    shuffleCards();
  }

  useEffect(() => {
    if (newGame) {
      return;
    }

    let globalTimerInterval: NodeJS.Timeout,
      nextMoveTimerInterval: NodeJS.Timeout;

    const clearIntervals = () => {
      clearInterval(globalTimerInterval);
      clearInterval(nextMoveTimerInterval);
    };

    if (pause) {
      clearIntervals();
      return;
    }

    globalTimerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    nextMoveTimerInterval = setInterval(() => {
      setNextMoveTimer((prev) => prev - 1);
    }, 1000);
    return clearIntervals;
  }, [newGame, pause]);

  useEffect(() => {
    if (pause) {
      navigation.setParams({ continue: false, restart: false });
      if (route.params?.restart) {
        setNewGame(true);
        shuffleCards();
        setTimer(0);
        setNextMoveTimer(7);
      }

      setPause(false);
    }
  }, [route.params]);

  useEffect(() => {
    if (!choice2) {
      return;
    }
    setDisabled(true);

    setTimeout(() => {
      let gameOn = false;
      const newCards = cards.map((card) => {
        if (card.id === choice1!.id || card.id === choice2!.id) {
          choice1?.imageId === choice2?.imageId
            ? (card.guessed = true)
            : (card.rotate.value = 0);
        }
        if (!card.guessed) {
          gameOn = true;
        }
        return card;
      });

      if (gameOn) {
        setCards(newCards);
        resetChoices();
      } else {
        setPause(true);
        addScore(timer);
        navigation.navigate("Gameover", {
          score: timer,
        });
      }
    }, 500);
  }, [choice2]);

  return (
    <View style={styles.container}>
      <CornerButton
        pause
        navigation={navigation}
        handleClick={() => {
          setPause(true);
          navigation.navigate("Pause");
        }}
      />
      <View style={styles.timer}>
        <Text style={[styles.timerText, styles.text]}>
          {convertToMinutes(timer)}
        </Text>
      </View>
      <Separator />

      <GridView>
        {cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            flipCard={handleFlip}
            disabled={disabled}
          />
        ))}
      </GridView>

      <Separator double />
      <Heading>
        <View style={styles.nextMove}>
          <Text style={[styles.nextMoveFrom, styles.text]}>
            {nextMove?.[0]}
          </Text>
          <Image source={require("../../assets/swap.png")} />
          <Text style={[styles.nextMoveTo, styles.text]}>{nextMove?.[1]}</Text>
        </View>
      </Heading>
      <Text
        style={[styles.nextMoveTimerText, styles.text]}
      >{`0${nextMoveTimer}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },
  timer: {},
  text: {
    fontFamily: "LilitaOne_400Regular",
  },
  timerText: {
    fontSize: 32,
    color: "white",
  },
  item: {
    height: 100,
    backgroundColor: "pink",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nextMoveTimerText: {
    fontSize: 20,
    color: "white",
  },
  nextMove: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  nextMoveFrom: {
    fontSize: 24,
    color: "#FDF530",
  },
  nextMoveTo: {
    fontSize: 24,
    color: "#39DC7A",
  },
});
export default Game;
