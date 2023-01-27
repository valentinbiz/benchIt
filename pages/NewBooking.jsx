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
import CalendarAgenda from "../components/Calendar";
import FormButton from "../components/FormButton";

import { Agenda } from "react-native-calendars";
import { useState } from "react";
import { padding } from "@mui/system";

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
                          { name: "Cycling: 12:00", time: "12:00" },
                          { name: "Walking" },
                          { name: "Running" },
                        ],
                        "2022-12-02": [{ name: "Writing" }],
                        "2022-12-03": [{ name: "Writing" }],
                        "2022-12-04": [{ name: "Writing" }],
                        "2022-12-05": [{ name: "Writing" }],
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
                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable> */}
                </View>
              </View>
            </Modal>
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Select an available session</Text>
          </Pressable>
          <FormButton buttonTitle="Book this session" />
        </View>
        <FormButton buttonTitle={"Continue"} />
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
