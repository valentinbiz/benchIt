import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import BenchSessions from "../components/BenchSessions";

function Schedule() {
  const [benches, setBenches] = useState([
    {
      benchId: 1,
      img: "../creativeAssets/bench.png",
      benchName: "Serenity Bench",
      benchAddress: "12 Oxford Road, Manchester",
    },
    {
      benchId: 2,
      img: "../creativeAssets/bench.png",
      benchName: "Serenity Bench",
      benchAddress: "1 Oxford Road, Manchester",
    },
  ]);
  return (
    <View style={styles.mainContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Schedule Page</Text>
        <Text style={styles.message}>
          {" "}
          You currently have <Text style={styles.accentColor}>2</Text> sessions
          booked
        </Text>
        {benches.map((bench) => {
          return (
            <BenchSessions
              key={bench.benchId}
              img={require("../creativeAssets/bench-illustration-2.png")}
              title={bench.benchName}
              address={bench.benchAddress}
              bg={"#fcfef7"}
            />
          );
        })}
      </View>

      <View></View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "#FCFEF7",
    height: "100%"
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
    
  },
  header: {
    marginTop: 50,
    fontSize: 32,
    color: "#342C2C",
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  message: {
    color: "#342C2C",
    textAlign: "center",
    fontFamily: "Cabin_400Regular",
    marginBottom: 10
  },
  accentColor: {
    color: "#B85F44"
  }
});

export default Schedule;
