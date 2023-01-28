import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";

function SignUp({ navigation }) {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const { setIsLoggedIn } = useContext(isLoggedInContext);

  const handleSignUp = () => {
    if (password !== repeatPassword) {
      alert("Passwords must match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          return updateProfile(auth.currentUser, { displayName: displayName });
        })
        .then(() => {
          setIsLoggedIn(true);
          navigation.navigate("Home");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Register your account</Text>

        <FormInput
          labelValue={displayName}
          onChangeText={(userName) => setDisplayName(userName)}
          placeholderText="Name"
          iconType="user"
          keyboardType="text"
          autoCapitalize="words"
          autoCorrect={false}
        />
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
        <FormInput
          labelValue={repeatPassword}
          onChangeText={(userPassword) => setRepeatPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton buttonTitle="Sign up" onPress={() => handleSignUp()} />

        {Platform.OS === "android" ? (
          <View>
            <Text style={styles.SocialText}>OR</Text>
            <SocialButton
              buttonTitle="Facebook Sign Up"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Google Sign Up"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>
            Already have an account?
          </Text>
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
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    color: "#2e64e5",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  SocialText: {
    textAlign: "center",
    fontWeight: "400",
  },
});

export default SignUp;
