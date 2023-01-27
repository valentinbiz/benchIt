import axios from "axios";

const api = axios.create({
  baseUrl: "http://dataservice.accuweather.com",
});

export const getGeoPosition = () => {
  const params = {
    params: { apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL", q: "53.5,-2.24" },
  };

  return api.get("/locations/v1/cities/geoposition/search", params);
};

export const getCurrConditions = () => {
  // const apiParams = {
  //   params: ,
  // };

  return api.get(`/currentconditions/v1/329260`, {
    apikey: "azevzStu0Se4qcapDPLKjNCs5JVONnVL",
    details: true,
  });
};
