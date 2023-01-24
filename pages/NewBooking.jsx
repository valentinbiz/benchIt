import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";

function NewBooking() {

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>New Booking page </Text>
        </View>
        <View>
          <Text>This is a placeholder </Text>
          <Text>This is a placeholder b </Text>
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            // onPress={() => Alert.alert(name, email, password)}
          >
            <Text>Start Session!</Text>
          </TouchableHighlight>
        </View>
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
    input: {
      width: 350,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      borderRadius: 20,
      padding: 10,
      width: 200,
      margin: 20,
    },
  });
  
export default NewBooking;
