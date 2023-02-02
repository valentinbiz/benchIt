import React, { useState, useEffect } from "react";
import {ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig"
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image
} from "react-native";
import { Camera } from "expo-camera";
import cameraButtonStyles from "../styles/CameraButtonStyles";

const storageRef = ref(storage, "some-child1");


export default function BenchImageCapture({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    if (!camera) return;
    camera
      .takePictureAsync()
      .then((pic) => {
        setPreviewVisible(true);
        setCapturedImage(pic);
        console.log(capturedImage);
        return uploadBytes(storageRef, capturedImage.uri);
      })
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ width: 200, height: 200, backgroundColor: "pink" }}
              >
                <Image
                  source={require("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FbenchIt-5b0ddd5b-2a99-4f81-9a43-d9a1fd8670df/Camera/0af5cd62-90a1-4932-8f6f-6676e0b92af9.jpg")}
                ></Image>
              </View>
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={cameraButtonStyles.btnStyle}
              >
                <Text style={cameraButtonStyles.txtStyle}>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Upload Bench")}
                style={cameraButtonStyles.btnStyle}
                image={capturedImage}
              >
                <Text style={cameraButtonStyles.txtStyle}>Submit Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                ...cameraButtonStyles.btnStyle,
                position: "absolute",
                top: "5%",
                left: "5%",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={cameraButtonStyles.txtStyle}> Flip </Text>
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
}
