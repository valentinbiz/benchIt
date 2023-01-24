import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  Image,
} from "react-native";
import park from "../creativeAssets/image_processing20201103-8805-fkmj5v.png";

function HomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>BenchIt</Text>
        <Text style={styles.missionText}>
          Our mission is to combat loneliness by connecting individuals in their
          local community through the shared experience of sitting on a bench.
          We aim to provide a platform for users to easily find and reserve
          benches in their area, facilitating the opportunity to meet new people
          and create meaningful connections.
        </Text>
      </View>
      <View style={styles.viewContainer}>
        <Image source={park} style={styles.picture} />
      </View>
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
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
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
  missionText: {
    fontSize: 10,
  },
  picture: {
    width: 300,
    height: 300,
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

export default HomePage;
