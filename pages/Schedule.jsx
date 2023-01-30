import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import BenchSessions from "../components/BenchSessions";
import bookedBenchContext from "../contexts/bookedBenchContext";

function Schedule() {
  const { bookedBench } = useContext(bookedBenchContext);
  return (
    <SafeAreaView style={styles.container}>
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
