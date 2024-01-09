import { ImageBackground, StatusBar } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";

import { IStackParamList } from "./src/utils/types";

import Game from "./src/screens/Game";
import Menu from "./src/screens/Menu";
import Leaderboard from "./src/screens/Leaderboard";
import Settings from "./src/screens/Settings";
import Pause from "./src/screens/Pause";
import Gameover from "./src/screens/Gameover";
import { CustomContextProvider } from "./src/context/context";

const Stack = createNativeStackNavigator<IStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CustomContextProvider>
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor={"transparent"} translucent />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Group>
              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen
                name="Game"
                component={Game}
                initialParams={{ continue: false, restart: false }}
              />
              <Stack.Screen name="Leaderboard" component={Leaderboard} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: "transparentModal",
                animation: "fade_from_bottom",
                contentStyle: { backgroundColor: "rgba(4, 9, 6, 0.85)" },
              }}
            >
              <Stack.Screen name="Pause" component={Pause} />
              <Stack.Screen name="Gameover" component={Gameover} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </CustomContextProvider>
  );
};

export default App;
