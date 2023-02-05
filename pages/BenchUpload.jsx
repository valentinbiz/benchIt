import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";

import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import newspaperIllustration from "../assets/newspaper-bench.png";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import LocationContext from "../contexts/LocationContext";
import triggerRenderBenchContext from "../contexts/benchesRenderContext";
import * as ImagePicker from "expo-image-picker";

async function BenchImageCapture() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
}

function BenchUpload({ navigation }) {
  const [address, setaddress] = useState("");
  const [benchName, setBenchName] = useState("");
  const [benchDescription, setBenchDescription] = useState("");
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { currLocation } = useContext(LocationContext);
  const [locationToBeUploaded, setLocationToBeUploaded] = useState([]);
  const [image, setImage] = useState(null);
  const { setTriggerRenderBenches } = useContext(triggerRenderBenchContext);

  const handleLocationUpload = () => {
    if (currLocation.length === 2) {
      setLocationToBeUploaded(currLocation);
      Alert.alert(
        "Location upload successfully",
        "Location has been uploaded with success",
        [
          {
            text: "Continue",
            onPress: () => console.log(locationToBeUploaded),
          },
        ]
      );
    } else {
      Alert.alert(
        "Location upload failed",
        "Location upload has failed. Please check you application permissions",
        [
          {
            text: "Continue",
            onPress: () => console.log(currLocation),
          },
        ]
      );
    }
  };
  const handleBenchUpload = () => {
    const benchToPost = {
      benchAddress: address,
      benchCity: "Manchester",
      benchDescription: benchDescription,
      benchId: "bench_11",
      benchName: benchName,
      benchPicture:
        "https://images.unsplash.com/photo-1638226815616-b7d5f68d76a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      latitude: currLocation[0],
      longitude: currLocation[1],
    };
    const benchRef = doc(db, "benches", "bench_11");
    setDoc(benchRef, benchToPost, { merge: true });
    Alert.alert(
      "Bench added succesfully!",
      "We are now one bench closer to beating loneliness!",
      [
        {
          text: "Continue",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
    setTriggerRenderBenches(true);
  };

  return (
    <KeyboardAvoidingView style={styles.mainContent}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Image source={newspaperIllustration} style={styles.picture} />
        </View>
        <View style={styles.formCard}>
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
          {!address && clicked ? (
            <Text style={{ color: "red", marginLeft: "5%" }}>
              Please enter location
            </Text>
          ) : (
            ""
          )}

          <FormInput
            labelValue={benchName}
            onChangeText={(benchName) => setBenchName(benchName)}
            placeholderText="Bench Name"
            iconType="edit"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!benchName && clicked ? (
            <Text style={{ color: "red", marginLeft: "5%" }}>
              Please enter a name for this bench
            </Text>
          ) : (
            ""
          )}
          <FormInput
            labelValue={benchDescription}
            onChangeText={(benchDescription) =>
              setBenchDescription(benchDescription)
            }
            placeholderText="Bench Description"
            iconType="info"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!benchDescription && clicked ? (
            <Text style={{ color: "red", marginLeft: "5%" }}>
              Please enter a description for this bench
            </Text>
          ) : (
            ""
          )}
          <Text style={styles.message}>
            Registering a bench requires the accurate location and a good
            picture of the bench
          </Text>

          <FormButton
            buttonTitle="Capture Bench Image"
            onPress={() => setImage(BenchImageCapture())}
          />
          <FormButton
            buttonTitle="Use GPS location"
            onPress={() => handleLocationUpload()}
          />
        </View>
        <View style={styles.SubmitPhotoContainer}>
          <FormButton
            buttonTitle="Submit bench"
            onPress={() => {
              handleBenchUpload();
            }}
          />
          <Text style={[styles.message, { fontSize: 12 }]}>
            Add all the details and you're ready to submit!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 50,
    height: 50,
  },
  viewContainer: {
    //marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  mainContent: {
    height: "100%",
    backgroundColor: "#FCFEF7",
  },
  formCard: {
    marginTop: -12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#342C2C",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFEF7",
  },
  text: {
    fontSize: 32,
    color: "#FCFEF7",
    fontFamily: "Cabin_Bold",
  },
  message: {
    textAlign: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    fontFamily: "Cabin_400Regular",
    color: "#FCFEF7",
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
  SubmitPhotoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#342C2C",
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
