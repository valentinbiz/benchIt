import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [temp, setTemp] = useState("7.5°C \n");
  const [cityName, setCityName] = useState("Manchester \n");
  const [dateMessage, setDateMessage] = useState("Monday 30 January \n");
  const [recommendationMsg, setRecommendationMsg] = useState(
    "Perfect for a bench session"
  );
  const [icon, setIcon] = useState(
    require("../assets/weather-icon-images/sun-icon.png")
  );
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
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatForecastMessage = (iconId) => {
    const currentDate = new Date();
    setDateMessage(
      `${dayNames[currentDate.getDay()]} ${currentDate.getDate()} ${
        monthNames[currentDate.getMonth()]
      } \n`
    );
    if (iconId >= 1 && iconId <= 5)
      setIcon(require("../assets/weather-icon-images/sun-icon.png"));
    else if (iconId >= 6 && iconId <= 11)
      setIcon(require("../assets/weather-icon-images/cloud-icon.png"));
    else if (iconId >= 12 && iconId <= 18)
      setIcon(require("../assets/weather-icon-images/rain-icon.png"));
    else setIcon(require("../assets/weather-icon-images/dummy-icon.png"));
  };

  useEffect(() => {
    // getGeoPosition()
    //   .then((result) => {
    //     setCityName(result.data.EnglishName + " \n");
    //     return getCurrConditions(result.data.Key);
    //   })
    //   .then((result) => {
    //     setWeatherCondition(result.data[0].WeatherText);
    //     setTemp(result.data[0].Temperature.Metric.Value + "°C \n");
    //     formatForecastMessage(result.data[0].WeatherIcon);
    //   });
  }, []);

  return (
    <View style={styles.ForecastCard}>
      <Text style={styles.ForecastCardText}>
        <Text style={styles.cityName}>{cityName}</Text>
        <Text style={styles.dateMessage}>{dateMessage}</Text>
        <Text style={styles.weatherCondition}>{weatherCondition}</Text>
        <Image source={icon} style={{ width: 32, height: 32 }}></Image>
        <Text style={styles.temp}>{temp}</Text>
        <Text style={styles.recommendationMsg}>{recommendationMsg}.</Text>
      </Text>
      <Image
        source={require("../creativeAssets/undraw-weather.png")}
        style={{ width: 120, height: 90, marginLeft: 60, borderRadius: 15 }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  dateMessage: {
    fontSize: 16,
  },
  cityName: {
    fontSize: 22,
    fontFamily: "TitanOne",
    color: "#B85F44",
  },
  ForecastCard: {
    backgroundColor: "#342C2C",
    marginHorizontal: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    flexDirection: "row",
  },
  ForecastCardText: {
    textAlign: "left",
    color: "#FCFEF7",
    fontFamily: "Cabin_Bold",
  },
});

export default ForecastCard;
