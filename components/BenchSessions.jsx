import React from "react";
import { Text, TouchableOpacity, View, Image, Button } from "react-native";
// import ProgressCircle from "react-native-progress-circle";

function BenchSessions({ img, title, address, bg }) {
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

      <View>
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
        <View>
          <Text
            style={{
              color: "#345c74",
              fontSize: 13,
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            9:30, Saturday, 19th Jan
          </Text>
        </View>
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
      >
        <Text style={{ padding: 10 }}>Book!</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default BenchSessions;
