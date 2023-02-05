import React, { useContext } from "react";
import HomePage from "./HomePage";
import Sessions from "./Sessions";
import Account from "./Account";
import Schedule from "./Schedule";
import BenchUpload from "./BenchUpload";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import isLoggedInContext from "../contexts/IsLoggedInContext";
// Lets get together to decide on the icon pack https://oblador.github.io/react-native-vector-icons/

const home = "Home";
const login = "Login";
const signUp = "Sign Up";
const account = "Account";
const sessions = "Sessions";
const schedule = "Schedule";
const benchUpload = "Upload Bench";

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

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const { isLoggedIn } = useContext(isLoggedInContext);

  return (
    <>
      {isLoggedIn ? (
        <Tab.Navigator
          initialRouteName={home}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let routeName = route.name;
              if (routeName === home) {
                iconName = focused ? "home" : "home-outline";
              } else if (routeName === login) {
                iconName = focused ? "list-sharp" : "list-outline";
              } else if (routeName === account) {
                iconName = focused ? "person" : "person-outline";
              } else if (routeName === signUp) {
                iconName = focused ? "person-add" : "person-add-outline";
              } else if (routeName === sessions) {
                iconName = focused ? "book" : "book-outline";
                // iconName = focused ? "bookmark" : "bookmark-outline";
              } else if (routeName === schedule) {
                iconName = focused ? "time" : "time-outline";
                // iconName = focused ? "today" : "today-outline";
              } else if (routeName === benchUpload) {
                iconName = focused ? "md-add-circle" : "md-add-circle-outline";
              }

              return <Ionicons name={iconName} size={32} color={"#B85F44"} />;
            },
            tabBarLabelStyle: styles.labelStyle,
            tabBarStyle: styles.tabBar,
            tabBarHideOnKeyboard: true,
            headerStyle: {
              backgroundColor: "#FCFEF7",
            },
            headerTitleStyle: {
              fontSize: 32,
              flex: 1,
              fontFamily: "TitanOne",
              color: "#342C2C",
            },
            headerTitleAlign: "center",
            headerBackTitleStyle: {
              fontFamily: "Cabin_Bold",
            },
            headerTintColor: "#342C2C",
          })}
        >
          <Tab.Screen
            name={home}
            component={HomePage}
            options={{ headerShown: false }}
          ></Tab.Screen>
          <Tab.Screen
            name={sessions}
            component={Sessions}
            //options={{ headerShown: false }}
          ></Tab.Screen>
          <Tab.Screen
            name={benchUpload}
            component={BenchUpload}
            //options={{ headerShown: false }}
          ></Tab.Screen>
          <Tab.Screen
            name={schedule}
            component={Schedule}
            //options={{ headerShown: false }}
          ></Tab.Screen>
          <Tab.Screen
            name={account}
            component={Account}
            //options={{ headerShown: false }}
          ></Tab.Screen>
        </Tab.Navigator>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: "#342C2C",
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Cabin_Bold",
  },
  tabBar: {
    backgroundColor: "#FCFEF7",
    padding: 10,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
  },
  input: {
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    padding: 10,
    width: 200,
    margin: 20,
  },
});

export default Navbar;
