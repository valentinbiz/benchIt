import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import BenchSessions from "../components/BenchSessions";
import MapComponent from "../components/MapComponent";

// azevzStu0Se4qcapDPLKjNCs5JVONnVL

const api = axios.create({
  baseUrl: "http://dataservice.accuweather.com",
});

export const getGeoPosition = () => {
  const params = {
    params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", q: "53.5,-2.24" },
  };

  return api.get(
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
    params
  );
};

export const getCurrConditions = (locationKey) => {
  return axios.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
    {
      params: {
        apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL",
        details: true,
      },
    }
  );
};

function Sessions() {
  const [viewType, setViewType] = useState("List");
  const [clickedButtons, setClickedButtons] = useState(false);
  const [benches, setBenches] = useState([]);
  const [currLocation, setCurrLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [temp, setTemp] = useState(null);
  const [tempFeel, setTempFeel] = useState(null);
	const [cityName, setCityName] = useState(null);

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

    //getCurrLocation();
    getGeoPosition()
      .then((result) => {
	      setCityName(result.data.EnglishName);
        return result.data.Key;
      })
      .then((key) => {
        return getCurrConditions(key);
      })
      .then((result) => {
        setWeatherCondition(result.data[0].WeatherText.toLowerCase());
        setTemp(result.data[0].Temperature.Metric.Value);
        setTempFeel(result.data[0].RealFeelTemperature.Metric.Value);
      })
      .catch((err) => {
        console.log(err, "<< ERROR");
      });
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
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 30,
            paddingTop: 30,
          }}
        >
          Welcome back, {auth.currentUser?.displayName}!
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
                  List
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
                  Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("../creativeAssets/undraw.png")}
            style={{ marginLeft: -45, marginTop: 35 }}
          />
        </View>
        <Text>
          {" "}
          Current Condition: The weather in {cityName} is {weatherCondition}. The temperature is {temp}°C
	  {temp !== tempFeel ? (
		  <Text>but it really feels like {tempFeel}°C</Text>
	  ) : null}.
          Perfect for a bench session.
        </Text>
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
	  {/* {text} current location */}
        </Text>
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

export default Sessions;
