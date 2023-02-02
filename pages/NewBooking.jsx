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
        duration: `1 hour session`,
        session: session,
        sessionDay: date.toDateString(),
        sessionTime: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
      <View style={styles.mainContent}>
        <Text style={styles.SessionsHeader}>Finish booking</Text>
        <View style={styles.calendarContainer}>
          <View style={styles.infoContainer}>
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
            <View>
              <Text style={styles.SessionSubtitle}>
                Please select one available session for{" "}
                <Text style={styles.accentColor}>
                  {" "}
                  {selectedBench.benchName}!
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
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
                            {"\n"} {item.sessionTime} {" · "}
                            {item.name}
                            {"\n"} {item.sessionDay} {" · "} {item.duration}
                          </Text>
                          <View style={styles.buttonContainer}>
                            <FormButton
                              buttonTitle="Select session"
                              btnHeight={30}
                              onPress={() => handleSessionSelect(item)}
                            />
                          </View>
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
                    <View style={styles.buttonContainer}>
                      <FormButton
                        buttonTitle="Close Calendar"
                        colorScheme={"#342C2C"}
                        onPress={() => setModalVisible(false)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            {sessionData ? (
              <View style={styles.SessionsInfo}>
                <Text style={styles.SessionsInfo}>Session details: </Text>
                <Text style={styles.SessionInfoText}>
                  {" "}
                  Bench: {sessionData.name}
                </Text>
                <Text style={styles.SessionInfoText}>
                  {" "}
                  Time: {sessionData.sessionTime}
                </Text>
                <Text style={styles.SessionInfoText}>
                  {" "}
                  Date: {sessionData.sessionDay}
                </Text>
                <Text style={styles.SessionInfoText}>
                  {" "}
                  Address: {sessionData.session.benchAddress}
                </Text>
                <Text style={styles.SessionInfoText}> Duration: 1 hour</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <FormButton
              buttonTitle="Select a session"
              onPress={() => {
                setModalVisible(true), processData();
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FormButton
              buttonTitle="Book this session"
              colorScheme={"#342C2C"}
              onPress={() => handleBookFirebase()}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "#FCFEF7",
    height: "100%",
  },
  SessionsHeader: {
    marginTop: 40,
    color: "#342C2C",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionSubtitle: {
    marginTop: 15,
    color: "#342C2C",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionsInfo: {
    marginTop: 60,
    color: "#342C2C",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionInfoText: {
    color: "#342C2C",
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "Cabin_Bold",
  },
  accentColor: {
    color: "#B85F44",
    fontFamily: "Cabin_Bold",
  },
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
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
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
  },
  item: {
    backgroundColor: "#CFDAE4",
    flex: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
    color: "black",
    justifyContent: "space-evenly",
  },
  itemText: {
    fontFamily: "Cabin_400Regular",
    color: "black",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "60%",
    margin: 20,
    backgroundColor: "white",
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
    backgroundColor: "#B85F44",
  },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
});
