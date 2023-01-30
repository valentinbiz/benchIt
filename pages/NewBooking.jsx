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
import { useState } from "react";
export default function NewBooking() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const handleSessionSelect = (session) => {
    setModalVisible(false);
    setSessionData(session);
    console.log(sessionData);
  };
  return (
    <>
      <View style={styles.buttonsContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Finalise your booking</Text>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../creativeAssets/undrawBooking.png")}
                style={{
                  height: 150,
                  width: 150,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                padding: 20,
                fontFamily: "Cabin_400Regular",
                textAlign: "center",
              }}
            >
              Please select one available session for Serenity Bench!
            </Text>
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
                      items={{
                        "2022-12-01": [
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                        ],
                        "2022-12-02": [
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                        ],
                        "2022-12-03": [
                          {
                            name: "Cycling:",
                            time: "12:00",
                            duration: "1 hour",
                          },
                        ],
                        "2022-12-04": [
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                        ],
                        "2022-12-05": [
                          {
                            name: "Cycling",
                            time: "12:00",
                            duration: "1 hour",
                          },
                        ],
                      }}
                      renderItem={(item, isFirst) => (
                        <TouchableOpacity style={styles.item}>
                          <Text style={styles.itemText}>{item.name}</Text>
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
                      selected={"2022-12-05"}
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
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Select an available session</Text>
          </Pressable>
          <View style={styles.bookSessionButton}>
            <FormButton
              colorScheme={"#342C2C"}
              buttonTitle="Book this session"
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
    borderColor: "#B6C1CD",
  },
  text: {
    alignSelf: "center",
    padding: 20,
    fontSize: 28,
    fontFamily: "Cabin_Bold",
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
    fontSize: 12,
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
    backgroundColor: "#342C2C",
    marginVertical: 10,
    // elevation: 2,
  },
  bookSessionButton: {
    fontFamily: "Cabin_Bold",
    width: "80%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonOpen: {
    // select ava session
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#B85F44",
    fontFamily: "Cabin_Bold",
  },
  buttonClose: {
    backgroundColor: "#342C2C",
    borderRadius: 20,
    padding: 10,
    fontFamily: "Cabin_Bold",
  },
  textStyle: {
    fontFamily: "Cabin_Bold",
    color: "#FCFEF7",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});



