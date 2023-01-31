import React, { useState, useContext } from "react";
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
import bookedBenchContext from "../contexts/bookedBenchContext";

function Schedule() {
  const { bookedBench } = useContext(bookedBenchContext);
  return (
    <View style={styles.container}>
      <View>
        <Text>Schedule Page</Text>
        {bookedBench ? (
          <>
            <Text> You currently have 2 sessions booked</Text>
            <BenchSessions
              img={bookedBench.benchPicture}
              title={bookedBench.benchName}
            />
          </>
        ) : null}

        <BenchSessions bg={"black"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
    height: "100%",
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
    marginBottom: 10,
  },
  accentColor: {
    color: "#B85F44",
  },
});

export default Schedule;
