import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const FormButton = ({ buttonTitle, colorScheme, btnHeight, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer(colorScheme, btnHeight)}
      {...rest}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: (colorScheme, btnHeight) => ({
    marginTop: 4,
    marginBottom: 12,
    height: btnHeight ? btnHeight : 40,
    width: "90%",
    backgroundColor: colorScheme ? colorScheme : "#B85F44",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  }),
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#FCFEF7",
  },
});

export default FormButton;
