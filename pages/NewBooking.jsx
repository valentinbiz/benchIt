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

export default function NewBooking() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [sessionsForSpecificBench, setSessionsForSpecificBench] = useState();
  const [structuredData, setSctructuredData] = useState({});
  const { selectedBench } = useContext(selectedBenchContext);
  const { setBookedBench } = useContext(bookedBenchContext);

  const handleSessionSelect = (session) => {
    setModalVisible(false);
    setSessionData(session);
  };

  const getSessions = () => {
    const docRefCollection = doc(db, "sessions", `${selectedBench.benchId}`);
    getDoc(docRefCollection)
      .then((doc) => {
        const sessionsArray = [];
        sessionsArray.push(doc.data());
        setSessionsForSpecificBench(sessionsArray);
      })
      .catch((error) => console.log(error));
  };

  const processData = () => {
    const formatDataObj = {};
    const sessions = sessionsForSpecificBench;

    for (const session of sessions) {
      for (const day in session.result) {
        let daySessions = session.result[day];
        for (const hourSession of daySessions) {
          let date = new Date(hourSession.startTime.seconds * 1000);
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
            name: hourSession.benchName,
            time: formattedDate,
            duration: `1 hour session`,
            session: hourSession,
            sessionDay: day,
          });
        }
      }
    }
    setSctructuredData(formatDataObj);
  };

  const handleBookFirebase = () => {
    const docRefCollection = doc(db, "sessions", `${selectedBench.benchId}`);
    getDoc(docRefCollection)
      .then((doc) => {
        const sessions = doc.data().result;
        const desiredDay = sessionData.sessionDay;
        const sessionArray = sessions[desiredDay];
        for (let i = 0; i < sessionArray.length; i++) {
          if (
            sessionArray[i].startTime.seconds ===
            sessionData.session.startTime.seconds
          ) {
            sessionArray[i].user_1 = auth.currentUser.uid;
            sessionArray[i].capacity -= 1;
            console.log("found it");
            break;
          }
        }
        return setDoc(docRefCollection, { result: sessions });
      })
      .then(() => {
        setBookedBench(selectedBench);
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
                      renderItem={(item, isFirst) => (
                        <TouchableOpacity style={styles.item}>
                          <Text style={styles.itemText}>
                            {" "}
                            {item.name}
                            {"\n"}
                            {item.time.toLocaleString()}
                            {"\n"} ({item.duration})
                          </Text>
                          <FormButton
                            buttonTitle="Select session"
                            btnHeight={30}
                            onPress={() => handleSessionSelect(item)}
                          />
                        </TouchableOpacity>
                      )}
                      theme={{
                        agendaDayTextColor: "black",
                        agendaDayNumColor: "green",
                        agendaTodayColor: "red",
                        agendaKnobColor: "gray",
                        agendaBackgroundColor: "gray",
                      }}
                      style={{ borderRadius: 15 }}
                      refreshControl={null}
                      showClosingKnob={true}
                      refreshing={false}
                      selected={"2023-02-01"}
                    />
                  </View>
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
  },
  item: {
    backgroundColor: "grey",
    flex: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
    color: "black",
  },
  itemText: {
    color: "black",
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
