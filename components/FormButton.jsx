import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const FormButton = ({ buttonTitle, colorScheme, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer(colorScheme)} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: (colorScheme) => ({
    marginTop: 10,
    height: 40,
    width: "100%",
    backgroundColor: colorScheme ? colorScheme : "#A3b18A",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  }),
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
  },
});

export default FormButton;
