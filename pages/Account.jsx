import { Navigation } from "@mui/icons-material";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  TouchableOpacity
} from "react-native";
import { auth } from "../firebaseConfig"
import { useNavigation } from "@react-navigation/native";

function Account() {

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("Login");
    }).catch((err) => {console.log(err)});
  }
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Account Page</Text>
        </View>
        <View>
          <Text>This is a placeholder </Text>
          <Text>This is a placeholder b </Text>
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            // onPress={() => Alert.alert(name, email, password)}
          >
            <Text>Start Session!</Text>
          </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={() => handleSignOut()}>
      <Text>Sign Out</Text>
      </TouchableHighlight>
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
    input: {
      width: 350,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      borderRadius: 20,
      padding: 10,
      width: 200,
      margin: 20,
    },
  });
  
export default Account;
