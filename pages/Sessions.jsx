import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import * as Location from "expo-location";
import BenchSessions from "../components/BenchSessions";
import MapComponent from "../components/MapComponent";
import ForecastCard from "../components/ForecastCard"

function Sessions() {
  const [viewType, setViewType] = useState("List");
  const [clickedButtons, setClickedButtons] = useState(false);
  const [benches, setBenches] = useState([]);
  const [currLocation, setCurrLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  const getBenches = () => {
    const docRefCollection = collection(db, "benches");
    getDocs(docRefCollection)
      .then((documents) => {
        const benchesArray = [];
        documents.forEach((doc) => benchesArray.push(doc.data()));
        setBenches(benchesArray);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBenches();
  }, []);

  async function getCurrLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrLocation([location.coords.latitude, location.coords.longitude]);
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currLocation) {
    text = JSON.stringify(currLocation);
  }

  return (
    <View>
      <ScrollView>
        <Text style={styles.GreetingMessage}> Welcome back, {auth.currentUser?.displayName}! </Text>
        <View style={styles.SearchBar}>
          <TextInput
            placeholder="Search for sessions!"
            placeholderTextColor="#345c74"
            style={styles.SearchInput}
          />
          <Image
            source={require("../creativeAssets/sear.png")}
            style={styles.SearchIcon}
          />
        </View>
        <View style={styles.ViewToggleCard}>
          <View>
            <Text style={styles.ViewToggleCard__header}>
              Check out these available bench sessions!
            </Text>
            <View style={styles.ViewToggleCard__direction}>
              <TouchableOpacity
                onPress={() => setViewType("List")}
                style={styles.ViewToggleButton}
              >
                <Text style={styles.ViewToggleText}>List</Text>
              </TouchableOpacity>
              <Text style={styles.ViewToggleText__separator}> / </Text>
              <TouchableOpacity
                onPress={() => setViewType("Map")}
                style={styles.ViewToggleButton}
              >
                <Text style={styles.ViewToggleText}> Map </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("../creativeAssets/undraw.png")}
            style={styles.ViewToggleImage}
          />
        </View>
        <ForecastCard></ForecastCard>
        <Text style={styles.SessionsHeader} > Available sessions {/* {text} current location */}</Text>
        {viewType === "List" ? (
          <ScrollView style={{ height: 300 }}>
            <View>
              <BenchSessions
                img={require("../creativeAssets/bench.png")}
                title="Serenity Bench"
                address="12 Oxford Road, Manchester"
                bg="#8888"
              />
              <BenchSessions
                img={require("../creativeAssets/bench.png")}
                title="Serenity Bench"
                address="12 Oxford Road, Manchester"
                bg="#8888"
              />
              <BenchSessions
                img={require("../creativeAssets/bench.png")}
                title="Serenity Bench"
                address="12 Oxford Road, Manchester"
                bg="#8888"
              />
              <BenchSessions
                img={require("../creativeAssets/bench.png")}
                title="Serenity Bench"
                address="12 Oxford Road, Manchester"
                bg="#8888"
              />
            </View>
          </ScrollView>
        ) : (
          <MapComponent benches={benches} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  GreetingMessage: {
    paddingHorizontal: 20,
    fontSize: 30,
    paddingTop: 30,
  },
  SearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  SearchInput: {
    fontSize: 12,
    width: 280,
    paddingHorizontal: 12,
  },
  SearchIcon: {
    height: 14,
    width: 14,
  },
  ViewToggleCard: {
    flexDirection: "row",
    backgroundColor: "#808080",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  ViewToggleButton: {
    flexDirection: "row",
    backgroundColor: "#f58084",
    alignItems: "center",
    marginTop: 15,
    width: 66,
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  ViewToggleText: {
    color: "#FFF",
    fontSize: 12,
  },
  ViewToggleCard__direction: { 
    flexDirection: "row", 
    height: 35 
  },
  ViewToggleCard__header: { 
    fontSize: 20, 
    width: 200 
  },
  ViewToggleText__separator: {
    marginTop: 15,
    fontSize: 20,
  },
  ViewToggleImage: { 
    marginLeft: -45, 
    marginTop: 35 
  },
  SessionsHeader: {
    color: "#345c74",
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Sessions;
