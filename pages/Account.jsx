import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext";
import InfoCard from "../components/InformationCard";
import AccountSettings from "./AccountSettings";
import { Button } from "react-native";

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
import { auth } from "../firebaseConfig";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import FormInput from "../components/FormInput";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function Account({ navigation }) {
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigated = useNavigation();

  const msg = useContext(UserContext);
  const [image, setImage] = useState(image);

  const handlePress = () => {
    navigation.navigate("AccountSettings");
  };

  return (
    <>
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
          <Text> You are logged in as {msg}! </Text>
        </View>
        <View>
          <InfoCard description={`Name: ${msg}`}></InfoCard>
        </View>
        <View>
          <TouchableOpacity onPress={handlePress}>
            <Text>Go to Account Settings</Text>
          </TouchableOpacity>
          <TouchableHighlight
            style={styles.button}
            onPress={() => handleSignOut()}
          >
            <Text>Sign Out</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
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
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    padding: 10,
    width: 200,
    // margin: 20,
  },
});
