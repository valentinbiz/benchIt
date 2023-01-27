import AccountSettings from "./pages/AccountSettings";
import Navbar from "./pages/Navbar";
import { StyleSheet, View, Text} from "react-native";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


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
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;


