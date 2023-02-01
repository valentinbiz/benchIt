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
import bookedSessionContext from "../contexts/bookedSessionsContext";

function HomePage({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { bookedSessions } = useContext(bookedSessionContext);
  const { bookedBench } = useContext(bookedBenchContext);
  const { user } = useContext(UserContext);

  let numberOfSessions = null;
  bookedSessions ? (numberOfSessions = bookedSessions.length) : null;

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

        {user.displayName === "Guest" ? (
          <View style={styles.viewContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableHighlight>
            <Text style={styles.text_separator}>OR</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <View style={styles.viewContainer}>
            <Text style={styles.greeting}>Hello there, {user.displayName}</Text>
            {numberOfSessions > 0 ? (
              <>
                <Text style={styles.text}>
                  You currently have
                  <Text style={styles.accentColor}> {numberOfSessions} </Text>
                  upcoming sessions. You can cancel the sessions in the Schedule
                  page or book more sessions!
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>
                  No upcoming sessions as of right now
                </Text>
                <Text style={styles.text}>
                  Check out the sessions page to book a bench!
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontFamily: "Cabin_400Regular",
    fontSize: 22,
    marginTop: 20,
  },
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
    color: "#342C2C",
    marginTop: 50,
    fontSize: 60,
    fontFamily: "TitanOne",
    marginBottom: 30,
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
    color: "#342C2C",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cabin_400Regular",
    marginHorizontal: 5,
  },
  text: {
    color: "#342C2C",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cabin_400Regular",
    marginHorizontal: 5,
    marginTop: 20,
  },
  accentColor: {
    color: "#B85F44",
    fontFamily: "Cabin_Bold",
  },
});

export default HomePage;
