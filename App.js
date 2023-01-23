import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const docRef = doc(db, "benches", "J2nYpqRO9o8Iphd3nQuQ");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) { 
  console.log(docSnap.data());
} else {
  console.log("no such document");
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
