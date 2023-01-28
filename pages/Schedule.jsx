import React from "react";
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
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Schedule Page</Text>
        <Text> You currently have 2 sessions booked</Text>
        <BenchSessions bg={"black"} />
        <BenchSessions bg={"black"} />
      </View>

      <View></View>
      <View></View>
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
});

export default Schedule;
