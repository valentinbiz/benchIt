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
import selectedBenchContext from "./contexts/selectedBenchContext";
import bookedBenchContext from "./contexts/bookedBenchContext";
import { useState } from "react";
import { LogBox } from "react-native";
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
let headerStyling = {
  headerStyle: {
                  backgroundColor: "#FCFEF7",
                  textAlign: "center",
                },
                headerTitleStyle: {
                  fontSize: 24,
                  flex: 1,
                  fontFamily: "TitanOne",
                  color: "#B85F44",
                },
                headerTitleAlign: "center",
                headerBackTitleStyle: {
                  fontFamily: "Cabin_Bold"
                },
                headerTintColor: "#B85F44"
    }

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBench, setSelectedBench] = useState(null);
  const [bookedBench, setBookedBench] = useState(null);
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
        <selectedBenchContext.Provider
          value={{ selectedBench, setSelectedBench }}>
          <bookedBenchContext.Provider value={{ bookedBench, setBookedBench }}> 
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator screenOptions={headerStyling}>
            <Stack.Screen
              name="NavBar"
              component={Navbar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountSettings"
              component={AccountSettings}
              options={{ title: "Account Settings" }}
            />
            <Stack.Screen
              name="NewBooking"
              component={NewBooking}
              options={{ title: "New Booking" }}
            />
            <Stack.Screen
              name="Camera"
              component={BenchImageCapture}
              options={{ title: "Camera" }}
            />
            <Stack.Screen
              name="NewSessions"
              component={NewSessions}
              options={{ title: "New Sessions" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "Sign Up",
              }}
            />
            <Stack.Screen
              name="Login"
              component={LogIn}
              options={{ title: "Log In",}}
            />
          </Stack.Navigator>
        </NavigationContainer>
          </bookedBenchContext.Provider>
        </selectedBenchContext.Provider>
      </UserContext.Provider>
    </isLoggedInContext.Provider>
  );
};

export default App;