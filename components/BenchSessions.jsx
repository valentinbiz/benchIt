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
}) {
  const handleBookSession = () => {
    console.log("Book Session clicked");
    behaviour(target);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        backgroundColor: bg,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Image source={img} style={{ width: 40, height: 40, borderRadius: 15 }} />

      <View style={{ width: 180 }}>
        <Text
          style={{
            color: "#345c74",
            fontSize: 15,
            paddingHorizontal: 20,
            width: 170,
          }}
        >
          {title}
        </Text>
        {sessionTime ? (
          <View>
            <Text
              style={{
                color: "#345c74",
                fontSize: 13,
                paddingLeft: 20,
                paddingRight: 10,
              }}
            >
              {sessionTime}
            </Text>
          </View>
        ) : null}
        <Text
          style={{
            color: "#0000000",
            fontSize: 12,
            paddingHorizontal: 20,
          }}
        >
          {address}
        </Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#888888", borderRadius: 20 }}
        onPress={() => handleBookSession()}
      >
        <Text style={{ padding: 10 }}>Select!</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default BenchSessions;
