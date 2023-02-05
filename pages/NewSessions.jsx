import {
  getDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
// import { db, auth } from "../firebaseConfigOriginal";
import { db, auth } from "../firebase/firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import BenchSessions from "../components/BenchSessions";
import FormButton from "../components/FormButton";
import MapComponent from "../components/MapComponent";
import ForecastCard from "../components/ForecastCard";
import selectedBenchContext from "../contexts/selectedBenchContext";
import UserContext from "../contexts/UserContext";
import AvailableSessionsContext from "../contexts/AvailableSessionsContext";
import LocationContext from "../contexts/LocationContext";
import sessionStyles from "../styles/SessionStyles";
import triggerRenderBenchContext from "../contexts/benchesRenderContext";

function NewSessions({ navigation }) {
  const [viewType, setViewType] = useState("List");
  const [clickedBench, setClickedBench] = useState(false);
  const { selectedBench, setSelectedBench } = useContext(selectedBenchContext);
  const { setCurrAvailableSessions } = useContext(AvailableSessionsContext);
  const { currLocation, setCurrLocation } = useContext(LocationContext);

  const [viewRef, setViewRef] = useState(null);
  const [benches, setBenches] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const { user } = useContext(UserContext);
  const { triggerRenderBenchs, setTriggerRenderBenches } = useContext(
    triggerRenderBenchContext
  );

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

  const getAvailableBenches = (maxCap) => {
    const availableSessions = [];
    const docRefCollection = collection(db, "sessions");

    getDocs(docRefCollection)
      .then((docs) => {
        docs.forEach((doc) => {
          const sessions = doc.data().result;
          for (let day in sessions) {
            const sessionsInDay = sessions[day];
            sessionsInDay.forEach((session) => {
              if (session.capacity === maxCap) {
                availableSessions.push({ ...session, day });
              }
            });
          }
        });
        setCurrAvailableSessions(availableSessions);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBenches();
    getAvailableBenches(2);
    getCurrLocation();
    setTriggerRenderBenches(false);
  }, [triggerRenderBenchs]);

  async function getCurrLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrLocation([location.coords.latitude, location.coords.longitude]);
  }

  const bookingSelect = (target) => {
    setClickedBench(target);
    setSelectedBench(target);
    viewRef.scrollToEnd({ animation: true });
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currLocation) {
    text = JSON.stringify(currLocation);
  }

  return (
    <View style={sessionStyles.mainContent}>
      {/* <Text style={sessionStyles.SessionsHeader}>New sessions</Text> */}
      <ScrollView nestedScrollEnabled={true} ref={(ref) => setViewRef(ref)}>
        <View style={sessionStyles.SearchBar}>
          <TextInput
            placeholder="Search for benches..."
            placeholderTextColor="#6C5B5B"
            style={sessionStyles.SearchInput}
          />
          <Image
            source={require("../creativeAssets/search-icon.png")}
            style={sessionStyles.SearchIcon}
          />
        </View>
        <ForecastCard></ForecastCard>
        <Text style={sessionStyles.toggleInfo}>
          Toggle between views to look for available benches
        </Text>
        <View style={sessionStyles.ViewToggleCard}>
          <View style={sessionStyles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setViewType("List")}
              style={sessionStyles.ViewToggleButton}
            >
              <Text style={sessionStyles.ViewToggleText}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewType("Map")}
              style={sessionStyles.ViewToggleButton}
            >
              <Text style={sessionStyles.ViewToggleText}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewType === "List" ? (
          <ScrollView
            style={sessionStyles.SessionsList}
            nestedScrollEnabled={true}
          >
            {benches.map((bench) => {
              return (
                <BenchSessions
                  key={bench.benchId}
                  img={require("../creativeAssets/bench-illustration-2.png")}
                  title={bench.benchName}
                  address={bench.benchAddress}
                  bg={"#fcfef7"}
                  behaviour={bookingSelect}
                  city={bench.benchCity}
                  latitude={Number(bench.latitude)}
                  longitude={Number(bench.longitude)}
                  target={bench}
                />
              );
            })}
          </ScrollView>
        ) : (
          <MapComponent benches={benches} />
        )}
        <View style={sessionStyles.SessionsButton}>
          {clickedBench ? (
            <>
              <Text style={sessionStyles.pickedBench}>
                {" "}
                You have picked {clickedBench.benchName}
              </Text>
              <FormButton
                buttonTitle={"Continue"}
                onPress={() => navigation.navigate("NewBooking")}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default NewSessions;

// {"benchCity": "Liverpool", "benchDescription": "Mysterious bench set aside from Prince Rupert's Tower", "benchId": 10, "benchName": "Whispering Willow Bench", "benchPicture": "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", "latitude": "53.418877980620884", "longitude": "-2.970565414361296"}
