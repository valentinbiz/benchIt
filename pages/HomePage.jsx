import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import park from "../creativeAssets/bench.png";
import benchIllustration from "../creativeAssets/bench-illustration.png";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import bookedBenchContext from "../contexts/bookedBenchContext";
import UserContext from "../contexts/UserContext";

function HomePage({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { bookedBench } = useContext(bookedBenchContext);
  const { user } = useContext(UserContext);
  //console.log(bookedBench);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.title}>BenchIt</Text>
          <Text style={styles.missionText}>
            Our mission is to{" "}
            <Text style={styles.accentColor}>combat loneliness</Text> by{" "}
            <Text style={styles.accentColor}>connecting individuals</Text> in
            their local community through the shared experience of{" "}
            <Text style={styles.accentColor}>sitting on a bench</Text>.
          </Text>
        </View>

        <View style={styles.viewContainer}>
          <Image source={benchIllustration} style={styles.picture} />
        </View>

        {!isLoggedIn ? (
          <View style={styles.viewContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
            <Text style={styles.text_separator}>OR</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <View style={styles.viewContainer}>
            <Text>Hello there, {user.displayName}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FCFEF7",
    fontFamily: "Cabin_400Regular",
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    marginTop: 50,
    fontSize: 60,
    fontFamily: "TitanOne",
  },
  picture: {
    width: 250,
    height: 250,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#B85F44",
    borderRadius: 20,
    padding: 10,
    width: 200,
    marginTop: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "#FCFEF7",
    fontFamily: "Cabin_Bold",
  },
  text_separator: {
    marginVertical: 5,
    fontFamily: "Cabin_Bold",
  },
  missionText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cabin_400Regular",
    marginHorizontal: 5,
  },
  accentColor: {
    color: "#B85F44",
    fontFamily: "Cabin_Bold"
  },
});

export default HomePage;
