import { StyleSheet } from "react-native-web";

const sessionStyles = StyleSheet.create({
  toggleInfo: {
    color: "#FCFEF7",
    fontSize: 12,
    fontFamily: "Cabin_400Regular",
    backgroundColor: "#342C2C",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    zIndex: 2,
    marginBottom: -8,
  },
  toggleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    backgroundColor: "#FCFEF7",
    height: "100%",
  },
  pickedBench: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Cabin_400Regular",
    fontSize: 20,
  },
  GreetingMessage: {
    fontSize: 30,
    paddingTop: 50,
    fontFamily: "Cabin_400Regular",
    textAlign: "center",
  },
  SearchBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#342C2C",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  SearchInput: {
    fontSize: 16,
    width: 280,
    paddingLeft: 12,
    fontFamily: "Cabin_400Regular",
    color: "#342C2C",
  },
  SearchIcon: {
    marginHorizontal: 12,
    height: 24,
    width: 24,
  },
  ViewToggleCard: {
    flexDirection: "row",
    backgroundColor: "#342C2C",
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  ViewToggleButton: {
    backgroundColor: "#B85F44",
    width: "40%",
    borderRadius: 14,
    padding: 2,
    marginHorizontal: 10,
  },
  ViewToggleText: {
    textAlign: "center",
    color: "#FCFEF7",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Cabin_Bold",
  },
  SessionsHeader: {
    marginTop: 40,
    color: "#342C2C",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
  SessionsList: {
    height: 400,
  },
  SessionsButton: {
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default sessionStyles;
