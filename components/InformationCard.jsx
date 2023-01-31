import { View, Text, StyleSheet } from "react-native";

const InfoCard = ({ description }) => {
  return (
    <View style={styles.BenchCard}>
      <Text style={styles.Title}> {description} </Text>
    </View>
  );
};

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
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoCard;
