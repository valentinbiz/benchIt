import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";

function LogIn() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Sign Up Page</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            keyboardType="text"
            // secureTextEntry="true"
          />
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => Alert.alert(name, email, password)}
          >
            <Text>Log In</Text>
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
  
export default LogIn;
