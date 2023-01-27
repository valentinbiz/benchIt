import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { UserContext } from "../components/UserContext";
import park from "../creativeAssets/bench.png";
import { auth } from "../firebaseConfig";
import isLoggedInContext from "../contexts/IsLoggedInContext";

function HomePage({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const msg = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title}>BenchIt</Text>
          <Text style={styles.missionText}>
            Our mission is to combat loneliness by connecting individuals in
            their local community through the shared experience of sitting on a
            bench.
          </Text>
        </View>

        <View style={styles.viewContainer}>
          <Image source={park} style={styles.picture} />
        </View>

        {!isLoggedIn ? (
          <View style={styles.viewContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text>Sign Up</Text>
            </TouchableHighlight>
            <Text>or</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text>Log In</Text>
            </TouchableHighlight>
            <View>
              <Text>Welcome back, {msg}!</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 60,
  },

  picture: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    padding: 10,
    width: 200,
    // margin: 20,
  },
  missionText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default HomePage;
