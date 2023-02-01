import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
} from "react-native";
import FormButton from "../components/FormButton";

import { Agenda } from "react-native-calendars";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import selectedBenchContext from "../contexts/selectedBenchContext";
import bookedBenchContext from "../contexts/bookedBenchContext";
import bookedSessionContext from "../contexts/bookedSessionsContext";
import { NavigationHelpersContext } from "@react-navigation/native";
import AvailableSessionsContext from "../contexts/AvailableSessionsContext";

export default function NewBooking({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [sessionsForSpecificBench, setSessionsForSpecificBench] = useState();
  const [structuredData, setSctructuredData] = useState({});
  const { selectedBench } = useContext(selectedBenchContext);
  const { bookedBench, setBookedBench } = useContext(bookedBenchContext);
  const { bookedSessions, setBookedSessions } =
    useContext(bookedSessionContext);
  const { currAvailableSessions } = useContext(AvailableSessionsContext);

  const handleSessionSelect = (session) => {
    setModalVisible(false);
    setSessionData(session);
    // setBookedSessions(session);
  };

  const getSessions = () => {
    const filteredArr = currAvailableSessions.filter((session) => {
      if (session.benchName === selectedBench.benchName) {
        return session;
      }
    });
    setSessionsForSpecificBench(filteredArr);
  };
  const processData = () => {
    const formatDataObj = {};
    const sessions = sessionsForSpecificBench;
    for (const session of sessions) {
      // console.log(session, "<SESSION");
      let date = new Date(session.startTime.seconds * 1000);
      let formattedDate = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${
        date.getDate().toString().length === 1
          ? "0" + date.getDate()
          : date.getDate()
      }`;
      formatDataObj[formattedDate] = formatDataObj[formattedDate] || [];
      formatDataObj[formattedDate].push({
        name: session.benchName,
        time: formattedDate,
        duration: `1 hour session`,
        session: session,
        sessionDay: session.day,
        benchId: selectedBench.benchId,
      });
    }
    setSctructuredData(formatDataObj);
  };

  const handleBookFirebase = () => {
    const docRefCollection = doc(db, "sessions", `${selectedBench.benchId}`);
    getDoc(docRefCollection)
      .then((doc) => {
        const sessions = doc.data().result;
        console.log(sessions, "<<<session data");
        const desiredDay = sessionData.sessionDay;
        const sessionArray = sessions[desiredDay]
          ? sessions[desiredDay]
          : sessions;
        for (let i = 0; i < sessionArray.length; i++) {
          if (
            sessionArray[i].startTime.seconds ===
            sessionData.session.startTime.seconds
          ) {
            if (
              sessionArray[i].user_1 === null &&
              sessionArray[i].capacity > 0
            ) {
              sessionArray[i].user_1 = auth.currentUser.uid;
              sessionArray[i].capacity -= 1;
            } else if (
              sessionArray[i].user_1 !== null &&
              sessionArray[i].capacity > 0 &&
              sessionArray[i].capacity < 2
            ) {
              sessionArray[i].user_2 = auth.currentUser.uid;
              sessionArray[i].capacity -= 1;
            } else {
              console.log("Session is fully booked or capacity is negative.");
            }
            break;
          }
        }
        return setDoc(docRefCollection, { result: sessions });
      })
      .then(() => {
        setBookedBench([...bookedBench, selectedBench]);
        setBookedSessions([...bookedSessions, sessionData]);
        navigation.navigate("Schedule");
        console.log("Session updated successfully");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSessions();
  }, []);
  return (
    <>
      <View style={styles.buttonsContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Finalise your booking</Text>
            <View style={{ widht: 400 }}>
              <Image
                source={require("../creativeAssets/undrawBooking.png")}
                style={{
                  height: 150,
                  width: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 100,
                }}
              />
            </View>
            <Text style={{ fontSize: 30, padding: 20 }}>
              Please select one available session for Serenity Bench!
            </Text>
            <Text> </Text>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.container}>
                    <Agenda
                      items={structuredData}
                      renderItem={(item) => (
                        <TouchableOpacity style={styles.item}>
                          <Text style={styles.itemText}>
                            {item.name} {item.time.toLocaleString()}
                            {"\n"}({item.duration})
                          </Text>
                          <FormButton
                            buttonTitle="Select session"
                            
                            onPress={() => handleSessionSelect(item)}
                          />
                        </TouchableOpacity>
                      )}
                      theme={{
                        agendaDayTextColor: "#B85F44",
                        agendaDayNumColor: "#B85F44",
                        agendaTodayColor: "#342C2C",

                        textDefaultColor: "#FCFEF7",
                        agendaKnobColor: "#342C2C",
                        agendaBackgroundColor: "#342C2C",
                        calendarBackground: "#B85F44",
                        dotColor: "#342C2C", // dots
                        textDisabledColor: "#333",
                        selectedDayBackgroundColor: "#342C2C",
                        textSectionTitleColor: "#FCFEF7",
                      }}
                      style={{
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                      }}
                      refreshControl={null}
                      showClosingKnob={true}
                      refreshing={false}
                      selected={"2023-02-01"}
                    />
                  </View>
                  <FormButton
                    buttonTitle="Close Calendar"
                    colorScheme={"#342C2C"}
                    onPress={() => setModalVisible(false)}
                  >
                    Close
                  </FormButton>
                </View>
              </View>
            </Modal>
            {sessionData ? (
              <View style={{ marginTop: 200 }}>
                <Text>Session details: </Text>
                <Text> Activity: {sessionData.name}</Text>
                <Text> Time: {sessionData.time}</Text>
                <Text> Duration: {sessionData.duration}</Text>
              </View>
            ) : null}
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setModalVisible(true), processData();
            }}
          >
            <Text style={styles.textStyle}>Select an available session</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
            <FormButton
              buttonTitle="Book this session"
              onPress={() => handleBookFirebase()}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  infoContainer: {
    height: 100,
  },
  calendarContainer: {
    Width: 300,
    height: 500,
    alignItems: "center",
  },
  buttonsContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#b6c1cd",
  },
  text: {
    alignSelf: "center",
    padding: 20,
    fontSize: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "90%",
    borderRadius: 15,
    marginBottom: 10
  },
  item: {
    backgroundColor: "#342C2C",
    flex: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
    color: "black",
    justifyContent: "space-evenly",
  },
  itemText: {
    fontFamily: "Cabin_Bold",
    color: "#FCFEF7",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "60%",
    margin: 20,
    backgroundColor: "#B85F44",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
