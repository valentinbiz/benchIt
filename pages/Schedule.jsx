import React, { useState, useContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { StyleSheet, View, Text, Alert, ScrollView, Image } from "react-native";
import BenchSessions from "../components/BenchSessions";
import FormButton from "../components/FormButton";
import bookedBenchContext from "../contexts/bookedBenchContext";
import bookedSessionContext from "../contexts/bookedSessionsContext";
import selectedBenchContext from "../contexts/selectedBenchContext";

import SchedulePic from "../creativeAssets/undraw-schedule.png";
function Schedule({ navigation }) {
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
      <View style={styles.buttonContainer}>
        <Image style={styles.image} source={SchedulePic}></Image>
      </View>
      <View>
        {bookedSessions.length > 0 ? (
          <>
            <Text style={styles.scheduleMessage}>
              You currently have{" "}
              <Text style={styles.accentColor}> {bookedSessions.length} </Text>{" "}
              session {"\n"} Unable to attend? Cancel and give the chance to
              someone else
            </Text>
            <View style={styles.session}>
              <ScrollView>
                {bookedSessions.map((session) => {
                  console.log(session.sessionDay);
                  return (
                    <BenchSessions
                      key={session.name}
                      img={require("../creativeAssets/bench-illustration-2.png")}
                      title={session.name}
                      address={bookedBench[0].benchAddress}
                      sessionTime={session.sessionTime}
                      sessionDay={session.sessionDay}
                      buttonContent={"Cancel"}
                      behaviour={createAlert}
                      target={session}
                      latitude={Number(bookedBench[0].latitude)}
                      longitude={Number(bookedBench[0].longitude)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        ) : (
          <View>
            <Text style={styles.scheduleMessage}>
              Oh no! You don't currently have any sessions booked. Have a look
              at available sessions here:
            </Text>
            <View style={styles.buttonContainer}>
              <FormButton
                btnHeight={40}
                buttonTitle={"Sessions"}
                onPress={() => {
                  navigation.navigate("Sessions");
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFEF7",
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    width: 300,
    height: 250,
  },
  schedule: {
    marginTop: 20,
    color: "#342C2C",
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  scheduleMessage: {
    fontFamily: "Cabin_400Regular",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 25,
  },
  header: {
    marginTop: 50,
    fontSize: 20,
    color: "#342C2C",
    textAlign: "center",
  },
  message: {
    color: "#342C2C",
    textAlign: "center",
    fontFamily: "Cabin_400Regular",
    marginBottom: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  session: {
    height: 400,
  },
  button: {
    alignContent: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  accentColor: {
    color: "#B85F44",
    fontFamily: "Cabin_Bold",
  },
});
export default Schedule;
