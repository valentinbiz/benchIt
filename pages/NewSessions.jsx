import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import BenchSessions from "../components/BenchSessions";
import FormButton from "../components/FormButton";
import MapComponent from "../components/MapComponent";
import AvailableSessionsContext from "../contexts/AvailableSessionsContext";
import selectedBenchContext from "../contexts/selectedBenchContext";

function NewSessions({ navigation }) {
  const [viewType, setViewType] = useState("List");
  const [clickedBench, setClickedBench] = useState(false);
  const [benches, setBenches] = useState([]);
  const { setCurrAvailableSessions } = useContext(AvailableSessionsContext);
  const { selectedBench, setSelectedBench } = useContext(selectedBenchContext);

  const bookingSelect = (target) => {
    setClickedBench(target);
    setSelectedBench(target);
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
                availableSessions.push(session);
              }
            });
          }
        });
        setCurrAvailableSessions(availableSessions);
      })
      .catch((error) => console.log(error));
  };

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
    getAvailableBenches(2);
  }, []);
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 30,
            paddingTop: 30,
          }}
        >
          Create your own booking
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFF",
            padding: 10,
            borderRadius: 12,
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <TextInput
            placeholder="Search for benches!"
            placeholderTextColor="#345c74"
            style={{
              fontSize: 12,
              width: 280,
              paddingHorizontal: 12,
            }}
          />
          <Image
            source={require("../creativeAssets/sear.png")}
            style={{ height: 14, width: 14 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#808080",
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            paddingVertical: 20,
            paddingLeft: 30,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, width: 200 }}>
              Select a bench you would like to book
            </Text>
            <View style={{ flexDirection: "row", height: 35 }}>
              <TouchableOpacity
                onPress={() => setViewType("List")}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#f58084",
                  alignItems: "center",
                  marginTop: 15,
                  width: 66,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 12,
                  }}
                >
                  List View
                </Text>
              </TouchableOpacity>
              <Text style={{ marginTop: 15, fontSize: 20 }}> / </Text>
              <TouchableOpacity
                onPress={() => setViewType("Map")}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#f58084",
                  alignItems: "center",
                  marginTop: 15,
                  width: 70,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 12,
                  }}
                >
                  Map view
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("../creativeAssets/undraw.png")}
            style={{ marginLeft: -5, marginTop: 0 }}
          />
        </View>
        <Text
          style={{
            color: "#345c74",
            fontSize: 20,
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Available benches
        </Text>
        {viewType === "List" ? (
          <View>
            <ScrollView style={{ height: 300 }} nestedScrollEnabled={true}>
              {benches.map((bench) => {
                return (
                  <>
                    <BenchSessions
                      key={bench.benchId}
                      img={require("../creativeAssets/bench.png")}
                      title={bench.benchName}
                      address={bench.benchAddress}
                      bg={"#fcfef7"}
                      behaviour={bookingSelect}
                      target={bench}
                    />
                  </>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <MapComponent />
        )}
        <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
          {clickedBench ? (
            <>
              <Text> You have picked {clickedBench.benchName}</Text>
              <FormButton
                buttonTitle={"Continue"}
                onPress={() => {
                  navigation.navigate("NewBooking");
                }}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

export default NewSessions;
