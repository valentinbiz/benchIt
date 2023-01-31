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
  const { bookedSessions, setBookedSessions } =
    useContext(bookedSessionContext);
  const { selectedBench } = useContext(selectedBenchContext);

  const createAlert = (sessionToBeCancelled) =>
    Alert.alert(
      "Session cancellation",
      "Are you sure you want to cancel your session?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleCancelFirebase(sessionToBeCancelled),
        },
      ]
    );

  const handleCancelFirebase = (bookedSession) => {
    const docRefCollection = doc(db, "sessions", `${bookedSession.benchId}`);
    getDoc(docRefCollection)
      .then((doc) => {
        const sessions = doc.data().result;
        const desiredDay = bookedSession.sessionDay;
        const sessionArray = sessions[desiredDay]
          ? sessions[desiredDay]
          : sessions;
        for (let i = 0; i < sessionArray.length; i++) {
          if (
            sessionArray[i].startTime.seconds ===
            sessionData.session.startTime.seconds
          ) {
            if (sessionArray[i].user_1 === auth.currentUser.uid) {
              sessionArray[i].user_1 = null;
            } else if (sessionArray[i].user_2 === auth.currentUser.uid) {
              sessionArray[i].user_2 = null;
            }
            sessionArray[i].capacity += 1;
            break;
          }
        }
        return setDoc(docRefCollection, { result: sessions });
      })
      .then(() => {
        const newBookedBench = bookedBench.filter(
          (session) => session.benchName !== bookedSession.benchName
        );
        setBookedBench(newBookedBench);
        const newBookedSessions = bookedSessions.filter(
          (session) => session !== bookedSession
        );
        setBookedSessions(newBookedSessions);
        console.log("Session deleted successfully");
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Schedule Page</Text>
        {bookedSessions.length > 0 ? (
          <>
            <Text>You currently have {bookedSessions.length} session</Text>
            {bookedSessions.map((session) => {
              console.log(session);
              return (
                <BenchSessions
                  img={require("../creativeAssets/bench-illustration-2.png")}
                  title={session.name}
                  address={bookedBench.benchAddress}
                  sessionTime={session.time}
                  sessionDate={session.time}
                  buttonContent={"Cancel"}
                  behaviour={createAlert}
                  target={session}
                />
              );
            })}
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
