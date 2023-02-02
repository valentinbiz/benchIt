import React, { useState, useEffect, useContext } from "react";
import FormButton from "../components/FormButton";
import InfoCard from "../components/InformationCard";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../contexts/UserContext";
import dogIllustration from "../assets/abstract-1044.png"
import accountImage from "../assets/mole2.png";

export default function AccountSettings() {
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Media Permissions not granted");
      // alert(
      //   "Please grant camera roll permissions inside your system's settings"
      // );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    
  }, []);

  const addImage = async () => {
    checkForCameraRollPermission();
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
    }
  };

  return (
    <>
      <ScrollView style={styles.mainContent}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {//image && (
              <Image
                source={accountImage}
                style={{ width: 200, height: 200 }}
              />
            //)
          }
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                <Text>{accountImage ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={20} color="#342C2C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <FormButton
            colorScheme={"#342C2C"}
            buttonTitle="Password Reset Email"
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            colorScheme={"#342C2C"}
            buttonTitle="Change Email"
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            colorScheme={"#342C2C"}
            buttonTitle="Delete Account"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
        <View style={styles.picContainer}>
          <Image
            source={dogIllustration}
            style={{ height: 250, width: 250 }}
          ></Image>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  picContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFEF7",
  },
  mainContent: {
    backgroundColor: "#FCFEF7",
    height: "100%",
  },
  infoHeader: {
    fontFamily: "Cabin_Bold",
    color: "#FCFEF7",
    fontSize: 28,
    marginBottom: 6,
    textAlign: "center",
    padding: 0,
  },
  infoText: {
    fontFamily: "Cabin_400Regular",
    color: "#FCFEF7",
    fontSize: 18,
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#342C2C",
    borderRadius: 10,
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    marginTop: 10
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
    opacity: 0.85,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FCFEF7",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
