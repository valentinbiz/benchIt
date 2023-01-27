import AccountSettings from "./pages/AccountSettings";
import Navbar from "./pages/Navbar";
import { StyleSheet, View, Text } from "react-native";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewBooking from "./pages/NewBooking";
import BenchImageCapture from "./components/BenchImageCapture";
import NewSessions from "./pages/NewSessions";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserContext.Provider value="Fragiles">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="NavBar"
            component={Navbar}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="NewBooking" component={NewBooking} />
          <Stack.Screen name="Camera" component={BenchImageCapture} />
          <Stack.Screen name="NewSessions" component={NewSessions} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
