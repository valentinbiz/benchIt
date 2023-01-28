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
    marginTop: 10,
    height: btnHeight ? btnHeight : 40,
    width: "100%",
    backgroundColor: colorScheme ? colorScheme : "#A3b18A",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  }),
  buttonText: {
    fontSize: 12,
    color: "#ffffff",
  },
});

export default FormButton;
