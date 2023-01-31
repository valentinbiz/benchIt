import React, { useState, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { StyleSheet, View, Text, Alert } from "react-native";
import BenchSessions from "../components/BenchSessions";
import FormButton from "../components/FormButton";
import bookedBenchContext from "../contexts/bookedBenchContext";
import bookedSessionContext from "../contexts/bookedSessionsContext";
import selectedBenchContext from "../contexts/selectedBenchContext";

function Schedule() {
  const { bookedBench, setBookedBench } = useContext(bookedBenchContext);
  const { bookedSession, setBookedSession } = useContext(bookedSessionContext);
  const { selectedBench } = useContext(selectedBenchContext);

  const handleCancelFirebase = () => {
    const docRefCollection = doc(db, "sessions", `${bookedBench.benchId}`);
    getDoc(docRefCollection)
      .then((doc) => {
        const sessions = doc.data().result;
        const desiredDay = bookedSession.sessionDay;
        console.log(desiredDay);
        const sessionArray = sessions[desiredDay];
        for (let i = 0; i < sessionArray.length; i++) {
          if (
            sessionArray[i].startTime.seconds ===
            bookedSession.session.startTime.seconds
          ) {
            sessionArray[i].user_1 = null;
            sessionArray[i].capacity += 1;
            console.log("found it");
            break;
          }
        }
        return setDoc(docRefCollection, { result: sessions });
      })
      .then(() => {
        setBookedBench(null);
        console.log("Session deleted successfully");
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Schedule Page</Text>
        {bookedBench ? (
          <>
            <Text> You currently have 2 sessions booked</Text>
            <BenchSessions
              img={require("../creativeAssets/bench-illustration-2.png")}
              title={bookedBench.benchName}
              address={bookedBench.benchAddress}
              sessionTime={bookedBench.st}
              buttonContent={"Cancel"}
            />
            <FormButton
              onPress={() => handleCancelFirebase()}
              buttonTitle={"Cancel appointment"}
            />
          </>
        ) : (
          <View>
            <Text>
              oh no! You don't currently have any sessions booked. Have a look
              at available sessions here:
            </Text>
            <FormButton />
          </View>
        )}
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
