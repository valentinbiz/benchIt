import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import BenchSessions from "../components/BenchSessions";
import FormButton from "../components/FormButton";
import MapComponent from "../components/MapComponent";
import { UserContext } from "../components/UserContext";

function Sessions({ navigation }) {
  const [viewType, setViewType] = useState("List");
  const [clickedBench, setClickedBench] = useState(false);
  const [benches, setBenches] = useState([
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
  const msg = useContext(UserContext);

  const bookingSelect = (target) => {
    setClickedBench(target);
    console.log(clickedBench);
  };

  return (
    <View>
      <ScrollView nestedScrollEnabled={true}>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 30,
            paddingTop: 30,
          }}
        >
          Welcome back {msg}!
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
            placeholder="Search for sessions!"
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
            borderRadius: 30,
            paddingVertical: 20,
            paddingLeft: 30,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, width: 200 }}>
              Check out these available bench sessions!
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
            style={{ marginLeft: -5, marginTop: 5 }}
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
          Available sessions
        </Text>
        {viewType === "List" ? (
          <ScrollView style={{ height: 300 }} nestedScrollEnabled={true}>
            {benches.map((bench) => {
              return (
                <>
                  <BenchSessions
                    key={bench.benchId}
                    img={require("../creativeAssets/bench.png")}
                    title={bench.title}
                    address={bench.address}
                    bg={bench.bg}
                    behaviour={bookingSelect}
                    target={bench}
                  />
                </>
              );
            })}
          </ScrollView>
        ) : (
          <MapComponent />
        )}
        <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
          {clickedBench ? (
            <>
              <Text> You have picked {clickedBench.title}</Text>
              <FormButton
                buttonTitle={"Continue"}
                onPress={() => {
                  navigation.navigate("NewBooking");
                }}
              />
            </>
          ) : null}
        </View>
        <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
          <FormButton
            buttonTitle={"Create new session"}
            onPress={() => {
              navigation.navigate("NewSessions");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Sessions;
