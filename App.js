import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Sessions from "./pages/Sessions";
import NewBooking from "./pages/NewBooking";
import Account from "./pages/Account";
import Schedule from "./pages/Schedule";
import Navbar from "./pages/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "native-base";
import isLoggedInContext from "./contexts/IsLoggedInContext";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomePage} />
    //     <Stack.Screen name="LogIn" component={LogIn} />
    //     <Stack.Screen name="SignUp" component={SignUp} />
    //     <Stack.Screen name="Sessions" component={Sessions} />
    //     <Stack.Screen name="Account" component={Account} />
    //     <Stack.Screen name="NewBooking" component={NewBooking} />
    //     <Stack.Screen name="Schedule" component={Schedule} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <isLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <Navbar></Navbar>
</isLoggedInContext.Provider>
  );
};

export default App;
