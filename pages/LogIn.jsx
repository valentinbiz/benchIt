import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

function LogIn() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Log In Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
  },
});

export default LogIn;
