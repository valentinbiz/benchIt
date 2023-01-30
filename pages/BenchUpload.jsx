import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function BenchUpload({ navigation }) {
  const [address, setaddress] = useState("");
  const [benchName, setBenchName] = useState("");
  const [benchDescription, setBenchDescription] = useState("");
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Register a bench</Text>

        <FormInput
          labelValue={address}
          onChangeText={(address) => setaddress(address)}
          placeholderText="Address"
          iconType="location-arrow"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={benchName}
          onChangeText={(benchName) => setBenchName(benchName)}
          placeholderText="Bench Name"
          iconType="edit"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={benchDescription}
          onChangeText={(benchDescription) => setBenchDescription(benchDescription)}
          placeholderText="Bench Description"
          iconType="info"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text
          style={styles.message}
        >
          Registering a bench requires the accurate location and a good picture of the bench
        </Text>

        <FormButton
          buttonTitle="Capture Bench Image"
          onPress={() => navigation.navigate("Camera")}
        />
        <FormButton
          buttonTitle="Use GPS location"
          onPress={() => navigation.navigate("Camera")}
        />

        <FormButton
          buttonTitle="Submit bench"
          colorScheme="#342C2C"
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  text: {
    fontSize: 32,
    color: "#342C2C",
    fontFamily: "Cabin_Bold",
  },
  message: {
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: "Cabin_400Regular"
  },
  forgotButton: {
    marginVertical: 35,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    elevation: 2,
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

export default BenchUpload;
