import React, { useState, useContext } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import UserContext from "../contexts/UserContext";
import InfoCard from "../components/InformationCard";

export default function Account({ navigation }) {
  const [image, setImage] = useState(image);
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser({});
        // setIsLoggedIn(false);
      })
      .then(() => navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };

  const handlePress = () => navigation.navigate("AccountSettings");

  return (
    <ScrollView style={styles.mainContent}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <View>
            <TouchableOpacity>
              <Text></Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.GreetingMessage}>
          {" "}
          You are logged in as {user.displayName}! With Email {user.email}
        </Text>
      </View>
      <View>
        <InfoCard description={`Name: ${user.displayName}`}></InfoCard>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.AccountSettings}>Go to Account Settings</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleSignOut()}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    backgroundColor: "#FCFEF7",
  },
  GreetingMessage: {
    textAlign: "center",
    marginVertical: 5,
    fontFamily: "Cabin_400Regular",
  },
  AccountSettings: {
    fontSize: 18,
    fontWeight: "400",
    color: "#2e64e5",
    marginTop: 20,
    marginBottom: 10,
    textDecorationLine: "underline",
    fontFamily: "Cabin_400Regular",
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFEF7",
  },
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    marginTop: 100,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#B85F44",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#B85F44",
    borderRadius: 20,
    padding: 10,
    width: 200,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FCFEF7",
    fontFamily: "Cabin_Bold",
  },
});
