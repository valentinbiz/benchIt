import React from "react";
import HomePage from "./HomePage";
import Sessions from "./Sessions";
import Account from "./Account";
import Schedule from "./Schedule";
import BenchUpload from "./BenchUpload";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Lets get together to decide on the icon pack https://oblador.github.io/react-native-vector-icons/

const home = "Home";
const login = "Login";
const signUp = "SignUp";
const account = "Account";
const sessions = "Sessions";
const schedule = "Schedule";
const benchUpload = "BenchUpload";

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
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
            iconName = focused ? "person" : "person-outline";
          } else if (routeName === schedule) {
            iconName = focused ? "alarm" : "alarm-outline";
          } else if (routeName === benchUpload) {
            iconName = focused ? "add" : "add-outline";
          }

          return <Ionicons name={iconName} size={32} color={"#B85F44"} />;
        },
        tabBarLabelStyle: styles.labelStyle,
        tabBarStyle: styles.tabBar
      })}
    >
      <Tab.Screen name={home} component={HomePage}></Tab.Screen>
      <Tab.Screen name={sessions} component={Sessions}></Tab.Screen>
      <Tab.Screen name={benchUpload} component={BenchUpload}></Tab.Screen>
      <Tab.Screen name={schedule} component={Schedule}></Tab.Screen>
      <Tab.Screen name={account} component={Account}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: "#342C2C",
    fontWeight: "600",
    marginBottom: 4
  },
  tabBar: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    height: 64,
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
