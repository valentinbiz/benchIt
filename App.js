import AccountSettings from "./pages/AccountSettings";
import Navbar from "./pages/Navbar";
// import { StyleSheet, View, Text, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewBooking from "./pages/NewBooking";
import BenchImageCapture from "./components/BenchImageCapture";
import NewSessions from "./pages/NewSessions";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import isLoggedInContext from "./contexts/IsLoggedInContext";
import selectedBenchContext from "./contexts/selectedBenchContext";
import bookedBenchContext from "./contexts/bookedBenchContext";
import bookedSessionContext from "./contexts/bookedSessionsContext";
import UserContext from "./contexts/UserContext";
import LocationContext from "./contexts/LocationContext";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AvailableSessionsContext from "./contexts/AvailableSessionsContext";

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
    color: "#342C2C",
  },
  headerTitleAlign: "center",
  headerBackTitleStyle: {
    fontFamily: "Cabin_Bold",
  },
  headerTintColor: "#342C2C",
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBench, setSelectedBench] = useState(null);
  const [bookedBench, setBookedBench] = useState([]);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [user, setUser] = useState({
    displayName: "Guest",
    email: "mitch@gmail.com",
    userId: 0,
    photoUrl: "",
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const [currAvailableSessions, setCurrAvailableSessions] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);
  // ignore async warning messages in app, still can't remove them from console :(
  // LogBox.ignoreAllLogs();
  useEffect(() => {
    setIsLoggedIn(false);
    async function prepare() {
      try {
        await Font.loadAsync(customFonts);
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
          value={{ selectedBench, setSelectedBench }}
        >
          <bookedBenchContext.Provider value={{ bookedBench, setBookedBench }}>
            <bookedSessionContext.Provider
              value={{ bookedSessions, setBookedSessions }}
            >
              <AvailableSessionsContext.Provider
                value={{ currAvailableSessions, setCurrAvailableSessions }}
              >
                <LocationContext.Provider
                  value={{ currLocation, setCurrLocation }}
                >
                  <NavigationContainer onReady={onLayoutRootView}>
                    <Stack.Navigator
                      initialRouteName={"Home"}
                      screenOptions={headerStyling}
                    >
                      <Stack.Screen
                        name="NavBar"
                        component={Navbar}
                        options={{ headerShown: false }}
                      />
                      {isLoggedIn ? null : (
                        <Stack.Screen
                          name="Home"
                          component={HomePage}
                          options={{ headerShown: false }}
                        />
                      )}

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
                        options={{ headerShown: false }}
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
                        options={{ title: "Log In" }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </LocationContext.Provider>
              </AvailableSessionsContext.Provider>
            </bookedSessionContext.Provider>
          </bookedBenchContext.Provider>
        </selectedBenchContext.Provider>
      </UserContext.Provider>
    </isLoggedInContext.Provider>
  );
};

export default App;
