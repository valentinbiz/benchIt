import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import UserContext from "../contexts/UserContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";

function SignUp({ navigation }) {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { setUser } = useContext(UserContext);

  const handleSignUp = () => {
    if (password !== repeatPassword) {
      alert("Passwords must match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          return updateProfile(auth.currentUser, { displayName: displayName });
        })
        .then((result) => {
          console.log(result)
          setIsLoggedIn(true);
          navigation.navigate("Home");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContent}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formCard}>
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
          </View>

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
            <Text style={styles.navButtonText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    height: "100%",
    backgroundColor: "#FCFEF7"
  },
  formCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#342C2C",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FCFEF7",
  },
  header: {
    fontSize: 32,
    color: "#FCFEF7",
    fontFamily: "Cabin_Bold",
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
    fontFamily: "Cabin_400Regular",
  },
  SocialText: {
    textAlign: "center",
    fontFamily: "Cabin_Bold",
  },
});

export default SignUp;
