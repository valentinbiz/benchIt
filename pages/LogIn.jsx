import React, { useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import UserContext from "../contexts/UserContext";

function LogIn({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { setUser } = useContext(UserContext);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCreds) => {
      const user = userCreds.user;
      setUser({
        displayName: user.displayName,
        email: user.email,
      });
      console.log(user);
      console.log(user.displayName);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
        setIsLoggedIn(true);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Login</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Log in"
          onPress={() => handleLogin(email, password)}
        />

        {Platform.OS === "android" ? (
          <View>
            <Text style={styles.SeparatorText}>OR</Text>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.navButtonText}>Don't have an account?</Text>
        </TouchableOpacity>
        <Text style={[styles.SeparatorText, styles.blueText]}>OR</Text>
        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FCFEF7",
    height: "100%",
  },
  header: {
    fontSize: 30,
    color: "#342C2C",
    fontFamily: "Cabin_Bold",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 8,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#2e64e5",
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textDecorationLine: "underline",
    fontFamily: "Cabin_400Regular",
  },
  SeparatorText: {
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "Cabin_Bold",
  },
});

export default LogIn;
