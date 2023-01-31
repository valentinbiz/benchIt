import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet } from "react-native";

/* ====================== API functions ====================== */
const api = axios.create({ baseUrl: "" });

const getGeoPosition = () => {
  const params = {
    params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", q: "53.5,-2.24" },
  };
  return api.get(
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
    params
  );
};

const getCurrConditions = (locationKey) => {
  const params = {
    params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", details: true },
  };
  return axios.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
    params
  );
};


function ForecastCard() {
  const [weatherCondition, setWeatherCondition] = useState("Sunny");
  const [temp, setTemp] = useState("7.5 \n");
  const [cityName, setCityName] = useState("Manchester \n");
  const [dateMessage, setDateMessage] = useState("Monday 30 January \n");
  const [recommendationMsg, setRecommendationMsg] = useState("Perfect for a bench session"); 
  const [icon, setIcon] = useState(require("../assets/weather-icon-images/dummy-icon.png"));
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

  const formatForecastMessage = (iconId) => {
    const currentDate = new Date();
    setDateMessage(`${dayNames[currentDate.getDay()]} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]},`);
    if (iconId >= 1 && iconId <= 5) setIcon(require("../assets/weather-icon-images/sun-icon.png"));
    else if (iconId >= 6 && iconId <= 11) setIcon(require("../assets/weather-icon-images/cloud-icon.png"));
    else if (iconId >= 12 && iconId <= 18) setIcon(require("../assets/weather-icon-images/rain-icon.png"));
    else setIcon(require("../assets/weather-icon-images/dummy-icon.png")); 
  };

  useEffect(() => {
    // getGeoPosition()
    //   .then((result) => {
    //     setCityName(result.data.EnglishName);
    //     return getCurrConditions(result.data.Key);
    //   })
    //   .then((result) => {
    //     setWeatherCondition(result.data[0].WeatherText.toLowerCase());
    //     setTemp(result.data[0].Temperature.Metric.Value);
    //     formatForecastMessage(result.data[0].WeatherIcon);
    //   });
  }, [])

  return (
    <View style={styles.ForecastCard}>
      <Text style={styles.ForecastCardText}>
        <Text style={styles.cityName}>{cityName}</Text>{" "}
        <Text style={styles.dateMessage}>{dateMessage}</Text>{" "}
        <Text style={styles.weatherCondition}>{weatherCondition}</Text>
        <Image source={icon} style={{ width: 32, height: 32 }}></Image>
        <Text style={styles.temp}>{temp}°C.</Text>{" "}
        <Text style={styles.recommendationMsg}>{recommendationMsg}.</Text>{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateMessage: {
    fontSize: 16,
  },
  cityName: {
    fontSize: 18,
    fontFamily: "Cabin_Bold",
    color: "#B85F44",
  },
  ForecastCard: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FCFEF7",
    // marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 15,
    width: 300,
    // borderWidth: 2,
    // borderColor: "#B85F44",
  },
  ForecastCardText: {
    textAlign: "right",
    color: "#342C2C",
    fontFamily: "Cabin_400Regular",
  },
});
  



export default ForecastCard;