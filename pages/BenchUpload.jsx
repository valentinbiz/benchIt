import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";

function BenchUpload({ navigation }) {
  const [address, setaddress] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Register a bench</Text>

        <FormInput
          labelValue={address}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Address"
          iconType="location-arrow"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={address}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Bench Name"
          iconType="edit"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={address}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Bench Description"
          iconType="info"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>
          In order to be able to publish a bench we require the accurate
          location and a picture of the said bench
        </Text>
        <View style={{ width: 300 }}>
          <FormButton
            buttonTitle="Capture Bench Image"
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            buttonTitle="Use GPS location"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
        <FormButton
          buttonTitle="Submit bench"
          colorScheme="#808080"
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
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
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
