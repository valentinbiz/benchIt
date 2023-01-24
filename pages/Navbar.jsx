import React from "react";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Sessions from "./Sessions";
import NewBooking from "./NewBooking";
import Account from "./Account";
import Schedule from "./Schedule";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons"

const home = "HomePage"
const login= "Login"
const signUp = "SignUp"
const account = "Account"
const newBooking = "NewBooking"
const sessions = "Sessions"
const schedule = "Schedule"

const Tab = createBottomTabNavigator()

const Navbar = () => {

    return (
        <NavigationContainer>
        <Tab.Navigator 
        initialRouteName={home}
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName; 
                let routeName = route.name
                if(routeName === home){
                    iconName = focused ? "home" : "home-outline"
                } else if (routeName === login){
                    iconName = focused ? "list" : "list-outline"
                } else if (routeName === Account ){
                    iconName = focused ? "settings" : "settings-outline"
                }

                return <Ionicons name={iconName} size={size} color={color}/>

            }
        })}>

        <Tab.Screen name={home} component={HomePage}></Tab.Screen>
        <Tab.Screen name={login} component={LogIn}></Tab.Screen>
        <Tab.Screen name={account} component={Account}></Tab.Screen>
        <Tab.Screen name={newBooking} component={NewBooking}></Tab.Screen>
        <Tab.Screen name={sessions} component={Sessions}></Tab.Screen>
        <Tab.Screen name={signUp} component={SignUp}></Tab.Screen>
        <Tab.Screen name={schedule} component={Schedule}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
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
