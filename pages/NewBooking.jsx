import { View, StyleSheet, Text } from "react-native";
import CalendarAgenda from "../components/Calendar";
import FormButton from "../components/FormButton";

export default function PlaygroundScreen() {
  return (
    <>
      <View style={styles.buttonsContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.infoContainer}>
            <Text>Finish booking</Text>
            <Text>Finish booking</Text>
            <Text>Finish booking</Text>
            <Text>Finish booking</Text>
            <Text>Finish booking</Text>
            <Text>Finish booking</Text>
          </View>
          <CalendarAgenda />
          <FormButton buttonTitle="Book this session" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    height: 100,
  },
  calendarContainer: {
    Width: 300,
    height: 500,
  },
  buttonsContainer: {
    borderColor: "#00000",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#b6c1cd",
  },
  text: {
    alignSelf: "center",
    padding: 20,
    fontSize: 16,
  },
});
