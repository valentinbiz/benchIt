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
import { auth } from "../firebaseConfigOriginal";
import { AntDesign } from "@expo/vector-icons";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import InfoCard from "../components/InformationCard";

export default function Account({ navigation }) {
  const [image, setImage] = useState(image);
  const { setIsLoggedIn } = useContext(isLoggedInContext);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        navigation.navigate("Login");
      })
      .catch((err) => console.log(err));
  };

  const handlePress = () => navigation.navigate("AccountSettings");

  return (
    <ScrollView>
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
        <Text> You are logged in as Mitch! </Text>
      </View>
      <View>
        <InfoCard description={`Name: Mitch`}></InfoCard>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text>Go to Account Settings</Text>
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
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    elevation: 2,
    height: 200,
    width: 200,
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
    margin: 10,
  },
  buttonText: {
    color: "#FCFEF7",
    fontWeight: "bold",
  },
});
