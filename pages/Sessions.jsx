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
  StyleSheet,
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

function Sessions({ navigation }) {
  const [viewType, setViewType] = useState("List");
  const [clickedBench, setClickedBench] = useState(false);
  const { selectedBench, setSelectedBench } = useContext(selectedBenchContext);
  const { currAvailableSessions, setCurrAvailableSessions } = useContext(
    AvailableSessionsContext
  );
  const { currLocation, setCurrLocation } = useContext(LocationContext);

  const [viewRef, setViewRef] = useState(null);
  const [benches, setBenches] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const { user } = useContext(UserContext);

  const getBenches = () => {
    const docRefCollection = collection(db, "benches");
    getDocs(docRefCollection)
      .then((documents) => {
        const benchesArray = [];
        documents.forEach((doc) => benchesArray.push(doc.data()));
        setBenches(benchesArray);
      })
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const getAvailableSessions = (maxCap) => {
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

  console.log(setCurrAvailableSessions);
  useEffect(() => {
    getAvailableSessions(1);
    getBenches();
    getCurrLocation();
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
    <View style={styles.mainContent}>
      <Text style={styles.SessionsHeader}>Available sessions</Text>
      <ScrollView nestedScrollEnabled={true} ref={(ref) => setViewRef(ref)}>
        <View style={styles.SearchBar}>
          <TextInput
            placeholder="Search for sessions..."
            placeholderTextColor="#6C5B5B"
            style={styles.SearchInput}
          />
          <Image
            source={require("../creativeAssets/search-icon.png")}
            style={styles.SearchIcon}
          />
        </View>
        <ForecastCard></ForecastCard>
        <Text style={styles.toggleInfo}>
          Toggle between views to look for available sessions
        </Text>
        <View style={styles.ViewToggleCard}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setViewType("List")}
              style={styles.ViewToggleButton}
            >
              <Text style={styles.ViewToggleText}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewType("Map")}
              style={styles.ViewToggleButton}
            >
              <Text style={styles.ViewToggleText}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewType === "List" ? (
          <ScrollView style={styles.SessionsList} nestedScrollEnabled={true}>
            {benches
              .filter((bench) => {
                for (let i = 0; i < currAvailableSessions.length; i++) {
                  if (bench.benchName === currAvailableSessions[i].benchName) {
                    return bench;
                  }
                }
              })
              .map((bench) => {
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
          <MapComponent
            benches={benches.filter((bench) => {
              for (let i = 0; i < currAvailableSessions.length; i++) {
                if (bench.benchName === currAvailableSessions[i].benchName) {
                  return bench;
                }
              }
            })}
          />
        )}
        <View style={styles.SessionsButton}>
          {clickedBench ? (
            <>
              <Text style={styles.pickedBench}>
                You have picked {clickedBench.benchName}
              </Text>
              <FormButton
                buttonTitle={"Continue"}
                onPress={() => navigation.navigate("NewBooking")}
              />
            </>
          ) : null}
        </View>
        <View style={styles.SessionsButton}>
          <FormButton
            buttonTitle={"Create new session"}
            onPress={() => navigation.navigate("NewSessions")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleInfo: {
    color: "#FCFEF7",
    fontSize: 12,
    fontFamily: "Cabin_400Regular",
    backgroundColor: "#342C2C",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    zIndex: 2,
    marginBottom: -8,
  },
  toggleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    backgroundColor: "#FCFEF7",
    height: "100%",
  },
  pickedBench: {
    fontFamily: "Cabin_400Regular",
  },
  GreetingMessage: {
    fontSize: 30,
    paddingTop: 50,
    fontFamily: "Cabin_400Regular",
    textAlign: "center",
  },
  SearchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#342C2C",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  SearchInput: {
    fontSize: 16,
    width: 280,
    paddingLeft: 12,
    fontFamily: "Cabin_400Regular",
    color: "#342C2C",
  },
  SearchIcon: {
    marginHorizontal: 12,
    height: 24,
    width: 24,
  },
  ViewToggleCard: {
    flexDirection: "row",
    backgroundColor: "#342C2C",
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  ViewToggleButton: {
    backgroundColor: "#B85F44",
    width: "40%",
    borderRadius: 14,
    padding: 2,
    marginHorizontal: 10,
  },
  ViewToggleText: {
    textAlign: "center",
    color: "#FCFEF7",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Cabin_Bold",
  },
  SessionsHeader: {
    marginTop: 40,
    color: "#342C2C",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionsList: {
    height: 350,
  },
  SessionsButton: {
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default Sessions;

// {"benchCity": "Liverpool", "benchDescription": "Mysterious bench set aside from Prince Rupert's Tower", "benchId": 10, "benchName": "Whispering Willow Bench", "benchPicture": "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", "latitude": "53.418877980620884", "longitude": "-2.970565414361296"}
