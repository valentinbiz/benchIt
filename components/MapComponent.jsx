import React, { useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

function MapComponent() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 53.483959,
    longitude: -2.244644,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        provider={MapView.PROVIDER_GOOGLE}
      >
        <Marker coordinate={mapRegion} title="Test bench">
          <Callout tooltip>
            <View style={styles.popUp}>
              <Text> Hello there</Text>
            </View>
          </Callout>
        </Marker>
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
    backgroundColor: "#808080",
    borderRadius: 30,
    height: 300,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  map: {
    width: "110%",
    height: "110%",
    borderRadius: 20,
  },
  popUp: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#00000",
  },
});

export default MapComponent;
