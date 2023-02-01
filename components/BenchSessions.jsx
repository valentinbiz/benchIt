import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

function BenchSessions({
  img,
  title,
  address,
  bg,
  behaviour,
  sessionTime,
  target,
  buttonContent,
  city,
}) {
  const handleBookSession = () => {
    behaviour(target);
  };

  return (
    <TouchableOpacity style={[styles.BenchCard, { backgroundColor: bg }]}>
      <Image source={img} style={styles.Image} />

      <View style={{ width: 180 }}>
        <Text style={styles.Title}>{title}</Text>
        {sessionTime ? (
          <View>
            <Text style={styles.SessionTimeText}>{sessionTime}</Text>
          </View>
        ) : null}
        <Text style={styles.AddressText}>{address} </Text>
        <Text style={styles.AddressText}>{city} </Text>
      </View>
      <TouchableOpacity
        style={styles.SelectButton}
        onPress={() => handleBookSession()}
      >
        <Text style={styles.SelectButtonText}>
          {buttonContent ? buttonContent : "Select"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  BenchCard: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 5,
    borderColor: "#342C2C",
    borderWidth: 1,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  Title: {
    color: "#B85F44",
    fontSize: 15,
    paddingHorizontal: 20,
    width: 170,
    fontFamily: "Cabin_400Regular",
  },
  SessionTimeText: {
    color: "#342C2C",
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 10,
    fontFamily: "Cabin_400Regular",
  },
  AddressText: {
    color: "#342C2C",
    fontSize: 12,
    paddingHorizontal: 20,
    fontFamily: "Cabin_400Regular",
  },
  SelectButton: {
    backgroundColor: "#342C2C",
    borderRadius: 20,
  },
  SelectButtonText: {
    color: "#FCFEF7",
    fontWeight: "600",
    padding: 10,
    fontFamily: "Cabin_400Regular",
  },
});
export default BenchSessions;
