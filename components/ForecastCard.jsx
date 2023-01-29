import axios from "axios";
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from "react-native";

/* ====================== API functions ====================== */
const api = axios.create({ baseUrl: "" });

const getGeoPosition = () => {
  const params = { params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", q: "53.5,-2.24" } };
  return api.get(
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
    params
  );
};

const getCurrConditions = (locationKey) => {
  const params = { params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", details: true } };
  return axios.get(
    `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
    params
  );
};


function ForecastCard() {
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [temp, setTemp] = useState(null);
  const [tempFeel, setTempFeel] = useState(null);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    getGeoPosition()
      .then((result) => {
        setCityName(result.data.EnglishName);
        return getCurrConditions(result.data.Key);
      })
      .then((result) => {
        setWeatherCondition(result.data[0].WeatherText.toLowerCase());
        setTemp(result.data[0].Temperature.Metric.Value);
        setTempFeel(result.data[0].RealFeelTemperature.Metric.Value);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <View style={styles.ForecastCard}>
      <Text style={styles.ForecastCardText}>
        Currently, the weather in {cityName} is {weatherCondition}. 
        The temperature is {temp}°C
        {temp !== tempFeel ? <Text> but it really feels like {tempFeel}°C</Text>: null}.
        Perfect for a bench session.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ForecastCard: {
    backgroundColor: "#FCFEF7",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 15,
    borderWidth: 2,
    borderColor: "#B85F44",
  },
  ForecastCardText: {
    textAlign: "center",
    color: "#342C2C",
    fontFamily: "Cabin_400Regular",
  },
});
  



export default ForecastCard;