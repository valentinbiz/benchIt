import { View, Text, StyleSheet } from "react-native";

const InfoCard = ({ description }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.description}> {description} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  description: {
    fontFamily: "Cabin_400Regular"
  }
});

export default InfoCard;
