import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FormInput = ({
  labelValue,
  placeholderText,
  iconPack,
  iconType,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        {iconPack === "AntDesign" ? (
          <AntDesign name={iconType} size={24} color="#342C2C" />
        ) : (
          <FontAwesome name={iconType} size={24} color="#342C2C" />
        )}
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#6C5B5B"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 5,
    width: 300,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#826E6E",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Cabin_400Regular",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 200,
    height: 60,
    fontSize: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#342C2C",
  },
});
