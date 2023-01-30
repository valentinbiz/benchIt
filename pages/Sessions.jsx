import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import React, { useEffect, useState, useContext } from "react";
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
import FormButton from "../components/FormButton";
import MapComponent from "../components/MapComponent";
import ForecastCard from "../components/ForecastCard";
import UserContext from "../contexts/UserContext";

function Sessions({ navigation }) {
  const [viewType, setViewType] = useState("List");
  const [clickedBench, setClickedBench] = useState(false);
  const [sessions, setSessions] = useState("12th January, 15:00");
  const [testBenches, setTestBenches] = useState([
    {
      benchId: 1,
      img: "../creativeAssets/bench.png",
      title: "Serenity Bench",
      address: "12 Oxford Road, Manchester",
      bg: "#8888",
    },
    {
      benchId: 2,
      img: "../creativeAssets/bench.png",
      title: "Serenity Bench",
      address: "1 Oxford Road, Manchester",
      bg: "white",
    },
    {
      benchId: 3,
      img: "../creativeAssets/bench.png",
      title: "Serenity Bench",
      address: "1dd2 Oxford Road, Manchester",
      bg: "salmon",
    },
    {
      benchId: 4,
      img: "../creativeAssets/bench.png",
      title: "Serenity Bench",
      address: "1a2 Oxford Road, Manchester",
      bg: "black",
    },
  ]);
  const [benches, setBenches] = useState([]);
  const [ errorMsg, setErrorMsg ] = useState(false);
  const [ currLocation, setCurrLocation ] = useState({});
  const { user } = useContext(UserContext);

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

  const bookingSelect = (target) => {
    setClickedBench(target);
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currLocation) {
    text = JSON.stringify(currLocation);
  }

  return (
    <View>
      <ScrollView nestedScrollEnabled={true}>
        <Text style={styles.GreetingMessage}>
          Welcome back, {auth.currentUser?.displayName || user.displayName}!
        </Text>
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
        <ForecastCard></ForecastCard>
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

        <Text style={styles.SessionsHeader}>
          {" "}
          Available sessions {/* {text} current location */}
        </Text>
        {viewType === "List" ? (
          <ScrollView style={styles.SessionsList} nestedScrollEnabled={true}>
            {benches.map((bench) => {
              return (
                <BenchSessions
                  key={bench.benchId}
                  img={require("../creativeAssets/bench-illustration-2.png")}
                  title={bench.benchName}
                  address={bench.benchAddress}
                  bg={"#fcfef7"}
                  behaviour={bookingSelect}
                  sessionTime={sessions}
                  target={bench}
                />
              );
            })}
          </ScrollView>
        ) : (
          <MapComponent benches={benches} />
        )}
        <View style={styles.SessionsButton}>
          {clickedBench ? (
            <>
              <Text> You have picked {clickedBench.benchName}</Text>
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
  GreetingMessage: {
    fontSize: 30,
    paddingTop: 50,
    fontFamily: "Cabin_400Regular",
    textAlign: "center"
  },
  SearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  SearchInput: {
    fontSize: 12,
    width: 280,
    paddingHorizontal: 12,
    fontFamily: "Cabin_400Regular",
  },
  SearchIcon: {
    height: 14,
    width: 14,
  },
  ViewToggleCard: {
    flexDirection: "row",
    backgroundColor: "#342C2C",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 20,
    paddingLeft: 30,
  },
  ViewToggleButton: {
    flexDirection: "row",
    backgroundColor: "#B85F44",
    alignItems: "center",
    marginTop: 15,
    width: 66,
    borderRadius: 14,
    paddingHorizontal: 10,
  },
  ViewToggleText: {
    textAlign: "center",
    color: "#FCFEF7",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Cabin_Bold",
  },
  ViewToggleCard__direction: {
    flexDirection: "row",
    height: 35,
  },
  ViewToggleCard__header: {
    color: "#FCFEF7",
    fontSize: 20,
    width: 200,
    fontFamily: "Cabin_400Regular",
  },
  ViewToggleText__separator: {
    color: "#FCFEF7",
    marginTop: 8,
    fontSize: 24,
    fontFamily: "Cabin_400Regular",
  },
  ViewToggleImage: {
    marginLeft: -45,
    marginTop: 20
  },
  SessionsHeader: {
    color: "#342C2C",
    fontSize: 24,
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionsList: {
    height: 300,
  },
  SessionsButton: {
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default Sessions;

// {"benchCity": "Liverpool", "benchDescription": "Mysterious bench set aside from Prince Rupert's Tower", "benchId": 10, "benchName": "Whispering Willow Bench", "benchPicture": "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", "latitude": "53.418877980620884", "longitude": "-2.970565414361296"}
