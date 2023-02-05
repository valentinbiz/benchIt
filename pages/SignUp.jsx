import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import isLoggedInContext from "../contexts/IsLoggedInContext";
import UserContext from "../contexts/UserContext";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import mole from "../assets/mole.png";

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
        .then(() => {
          const user = {
            user_id: auth.currentUser.uid,
            displayName: displayName,
            email: email,
            password: password,
            bookedSessions: [],
          };
          setUser(user);
          const userRef = doc(db, "users", auth.currentUser.uid);
          setDoc(userRef, user, { merge: true });
        })
        .then(() => {
          navigation.navigate("Home");
          setIsLoggedIn(true);
        })
        .catch((err) => alert(err.message));
    }
  };
  return (
    <KeyboardAvoidingView style={styles.mainContent}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <Image source={mole} style={styles.picture} />
          </View>
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
            <Text></Text>
            <FormButton buttonTitle="Sign up" onPress={() => handleSignUp()} />
          </View>

          {/* {Platform.OS === "android" ? ( */}
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
          {/* ) : null} */}
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.SeparatorText2, styles.blueText]}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 75,
    height: 50,
  },
  SeparatorText2: {
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "Cabin_Bold",
    marginBottom: 30,
  },
  viewContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 2,
  },
  mainContent: {
    height: "100%",
    backgroundColor: "#FCFEF7",
  },
  formCard: {
    marginTop: -4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#342C2C",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
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

const benches = [
  {
    benchAddress: "Prince Rupert Park",
    benchCity: "Liverpool",
    benchDescription: "Mysterious bench set aside from Prince Rupert's Tower",
    benchId: "bench_10",
    benchName: "Whispering Willow Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.418877980620884",
    longitude: "-2.970565414361296",
  },
  {
    benchAddress: "Green escape in the middle of Alexandra Park",
    benchCity: "Manchester",
    benchDescription: "Green escape in the middle of Alexandra Park",
    benchId: "bench_3",
    benchName: "Eternity Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.45154559856414",
    longitude: "-2.2481028093276825",
  },
  {
    benchAddress: "Everton Park and Garden",
    benchCity: "Manchester",
    benchDescription:
      "Concrete bench with a great view of the Cotton Marina. Amazing views at sunset",
    benchId: "bench_1",
    benchName: "Serenity bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.48281185518784",
    longitude: "-2.2231092858106725",
  },
  {
    benchAddress: "Buille Hill Park",
    benchCity: "Manchester",
    benchDescription:
      "Wooden bench overlooking Media City in Salford (close to entrance on Weaste Ln and Eccles Old Road)",
    benchId: "bench_6",
    benchName: "Elevated Escape Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.491559988416974",
    longitude: "-2.3093218713936987",
  },
  {
    benchAddress: "Roe Green Loopline",
    benchCity: "Manchester",
    benchDescription:
      "Wooden bench overlooking green pastures with cows walking around",
    benchId: "bench_7",
    benchName: "Cow Universe Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.49778040216307",
    longitude: "-2.3628549876774527",
  },
  {
    benchAddress: "Victoria Bridge/Greengate Square",
    benchCity: "Manchester",
    benchDescription:
      "Concrete benches overlooking Manchester Cathedral and Irwell River",
    benchId: "bench_5",
    benchName: "Serene Sanctuary Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.48514672138744",
    longitude: "-2.246205125736773",
  },
  {
    benchAddress: "Brewer Street",
    benchCity: "Manchester",
    benchDescription:
      "Bench overlooking the canal, offering a quiet retreate from the buzzing city center",
    benchId: "bench_2",
    benchName: "Dreamcatcher Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.4801961558684",
    longitude: "-2.2305466555388835",
  },
  {
    benchAddress: "Peel Park (next to the Joseph Brotherton statue)",
    benchCity: "Manchester",
    benchDescription: "New bench in Peel Park, overlooking Salford Uni",
    benchId: "bench_4",
    benchName: "Tranquility Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.487697849922384",
    longitude: "-2.269930658054493",
  },
  {
    benchAddress: "Mann Island Waterfront",
    benchCity: "Liverpool",
    benchDescription: "Bench overlooking the pier and the lights of Woodside",
    benchId: "bench_8",
    benchName: "Timeless Beauty Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.403268376898886",
    longitude: "-2.9962613973375887",
  },
  {
    benchAddress: "The Promenade New Brighton",
    benchCity: "Liverpool",
    benchDescription:
      "Concrete bench with a great view of the Irish Sea and the coasts of Merseyside",
    benchId: "bench_9",
    benchName: "Endless Horizon Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    latitude: "53.44015590261774",
    longitude: "-3.0557294589579387",
  },

  {
    benchAddress: "Pollard Street 12",
    benchCity: "Manchester",
    benchDescription:
      "Bench located next to the canal in a quiet new residential area",
    benchId: "bench_11",
    benchName: "Creative Mind Bench",
    benchPicture:
      "https://images.unsplash.com/photo-1638226815616-b7d5f68d76a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    latitude: "53.49222707326119",
    longitude: "-2.3132341507858696",
  },
];

export default SignUp;
