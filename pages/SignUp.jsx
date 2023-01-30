import React, { useContext, useState } from "react";
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import isLoggedInContext from "../contexts/IsLoggedInContext";

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
          const user = {
            user_id: auth.currentUser.uid,
            name: displayName,
            user_email: email,
            user_password: password,
          };
          const userRef = doc(db, "users", auth.currentUser.uid);
          setDoc(userRef, user, { merge: true });
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
        <Text style={styles.text}>Sign Up </Text>

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
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navButtonText}>
            Have an account? Go to Log In page!
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
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
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
  },
});

export default SignUp;
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
    benchName: "serenity bench",
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
    benchAddress: "ROe Green Loopline",
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
];
