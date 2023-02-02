import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MapComponent({ benches, behaviour }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 53.483959,
    longitude: -2.244644,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation();

  const navigateToBookSession = (benchId) => {
    console.log("Book Session for ", benchId);
  };

  // const handleBookSession = () => {
  //   behaviour(target);
  // };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        provider={MapView.PROVIDER_GOOGLE}
      >
        {benches.map((bench) => {
          const benchCoords = {
            latitude: Number(bench.latitude),
            longitude: Number(bench.longitude),
          };
          return (
            <Marker
              coordinate={benchCoords}
              title={bench.benchName}
              description={bench.benchAddress}
              key={bench.benchId}
              onCalloutPress={() => behaviour(bench)}
            ></Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 300,
    padding: 20,
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  map: {
    width: "115%",
    height: "115%",
  },
  popUp: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#00000",
  },
});

export default MapComponent;
