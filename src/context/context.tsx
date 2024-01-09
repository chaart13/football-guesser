import React, { PropsWithChildren, createContext, useContext } from "react";
import * as hooks from "../utils/hooks";

export const Context = createContext<
  | (ReturnType<typeof hooks.useScores> &
      ReturnType<typeof hooks.useSound> &
      ReturnType<typeof hooks.useImages>)
  | null
>(null);

export const CustomContextProvider = ({ children }: PropsWithChildren) => {
  const { scores, addScore } = hooks.useScores();
  const { volume, changeVolume, playTap, playWin } = hooks.useSound();
  const { images, loadImages } = hooks.useImages();

  return (
    <Context.Provider
      value={{
        scores,
        addScore,
        volume,
        changeVolume,
        playTap,
        playWin,
        images,
        loadImages,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useCustomContext should be used within a CustomContextProvider"
    );
  }
  return context;
};
