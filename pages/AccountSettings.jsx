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

export default function AccountSettings() {
  const [image, setImage] = useState(null);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
    }
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
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                <Text>{image ? "Edit" : "Upload"} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text> You are logged in as Mitch! </Text>

          <FormButton
            buttonTitle={`Name: ${"Mitch!! 🙋🏼‍♂️"}`}
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            buttonTitle={`Location: ${"Manchester"}`}
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            buttonTitle="Change Password"
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            buttonTitle="Change Email"
            onPress={() => navigation.navigate("Camera")}
          />
          <FormButton
            buttonTitle={`Log out`}
            onPress={() => navigation.navigate("Camera")}
          />
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
    paddingTop: 30,
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
});
