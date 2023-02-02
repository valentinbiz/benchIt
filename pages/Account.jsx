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
import accountImage from "../assets/mole2.png";

export default function Account({ navigation }) {
  const [image, setImage] = useState(image);
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
        setIsLoggedIn(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePress = () => navigation.navigate("AccountSettings");

  return (
    <ScrollView style={styles.mainContent}>
      {/* <Text style={styles.header}>Your Account</Text> */}
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={accountImage} style={{ height: 150, width: 150 }} />
        </View>
        <View></View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Account Information</Text>
          <Text style={styles.infoText}>
            <Text style={styles.keyText}>Name</Text>
            <Text style={styles.valueText}> - {user.displayName}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.keyText}>Email</Text>
            <Text style={styles.valueText}> - {user.email}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.keyText}>Location</Text>
            <Text style={styles.valueText}> - {"Manchester"}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.keyText}>Biography</Text>
            <Text style={styles.valueText}>
              - Mitch, Match, Much. (Live, Laugh, Love)
            </Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.keyText}>Sessions attended</Text>
            <Text style={styles.valueText}> - 13</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleSignOut()}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableHighlight>
        <Text style={styles.SocialText}>OR</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.AccountSettings}>Go to Account Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontFamily: "Cabin_Bold",
    color: "#342C2C",
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 15,
  },
  SocialText: {
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  keyText: {
    // textDecorationLine: "underline",
    fontSize: 20,
  },
  valueText: {
    color: "#FCFEF7",
    fontFamily: "Cabin_400Regular",
  },
  infoHeader: {
    fontFamily: "Cabin_Bold",
    color: "#FCFEF7",
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    paddingHorizontal: 15,
    fontFamily: "Cabin_Bold",
    color: "#B85F44",
    fontSize: 18,
  },
  infoContainer: {
    padding: 10,
    paddingBottom: 15,
    width: "90%",
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: "#342C2C",
    borderRadius: 10,
  },
  mainContent: {
    backgroundColor: "#FCFEF7",
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
    height: 150,
    width: 150,
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
