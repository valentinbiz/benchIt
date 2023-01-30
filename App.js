import AccountSettings from "./pages/AccountSettings";
import Navbar from "./pages/Navbar";
import { StyleSheet, View, Text, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewBooking from "./pages/NewBooking";
import BenchImageCapture from "./components/BenchImageCapture";
import NewSessions from "./pages/NewSessions";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import isLoggedInContext from "./contexts/IsLoggedInContext";
import UserContext from "./contexts/UserContext";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
let customFonts = {
  Cabin_400Regular: require("./assets/fonts/Cabin-Regular.ttf"),
  Cabin_Bold: require("./assets/fonts/Cabin-Bold.ttf"),
  TitanOne: require("./assets/fonts/TitanOne-Regular.ttf"),
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    displayName: "Guest",
    email: "",
    userId: 0,
    photoUrl: ""
  });
  const [appIsReady, setAppIsReady] = useState(false);
  // ignore async warning messages in app, still can't remove them from console :(
  // LogBox.ignoreAllLogs();
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(customFonts)
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;
   
  return (
    <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavBar"
              component={Navbar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountSettings"
              component={AccountSettings}
            />
            <Stack.Screen name="NewBooking" component={NewBooking} />
            <Stack.Screen name="Camera" component={BenchImageCapture} />
            <Stack.Screen name="NewSessions" component={NewSessions} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={LogIn} />
          </Stack.Navigator>
        </NavigationContainer>
    </UserContext.Provider>
    </isLoggedInContext.Provider>
  );
};

export default App;
