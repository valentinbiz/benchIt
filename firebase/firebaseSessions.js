// import * as firebase from "firebase/app";
// import "firebase/firestore";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAkaA0HcxiUFkiblOxf0TaYDijuWNpxroQ",
//   authDomain: "benchit-db.firebaseapp.com",
//   projectId: "benchit-db",
//   storageBucket: "benchit-db.appspot.com",
//   messagingSenderId: "836708736588",
//   appId: "1:836708736588:web:88fa586efdc06363d81ee9",
//   measurementId: "G-NWRVRMVX46",
// };

// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore(app);

// const startTime = 9; // 9am
// const endTime = startTime + 1; // 10am
// const interval = 60 * 60 * 1000; // 1 hour in milliseconds
// const benches = [
//   {
//     benchAddress: "Everton Park and Garden",
//     benchCity: "Manchester",
//     benchDescription:
//       "Concrete bench with a great view of the Cotton Marina. Amazing views at sunset",
//     benchId: "bench_1",
//     benchName: "serenity bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.48281185518784",
//     longitude: "-2.2231092858106725",
//   },
//   {
//     benchCity: "Liverpool",
//     benchDescription: "Mysterious bench set aside from Prince Rupert's Tower",
//     benchId: "bench_10",
//     benchName: "Whispering Willow Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.418877980620884",
//     longitude: "-2.970565414361296",
//   },
//   {
//     benchAddress: "Brewer Street",
//     benchCity: "Manchester",
//     benchDescription:
//       "Bench overlooking the canal, offering a quiet retreate from the buzzing city center",
//     benchId: "bench_2",
//     benchName: "Dreamcatcher Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.4801961558684",
//     longitude: "-2.2305466555388835",
//   },
//   {
//     benchAddress: "Green escape in the middle of Alexandra Park",
//     benchCity: "Manchester",
//     benchDescription: "Green escape in the middle of Alexandra Park",
//     benchId: "bench_3",
//     benchName: "Eternity Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.45154559856414",
//     longitude: "-2.2481028093276825",
//   },
//   {
//     benchAddress: "Peel Park (next to the Joseph Brotherton statue)",
//     benchCity: "Manchester",
//     benchDescription: "New bench in Peel Park, overlooking Salford Uni",
//     benchId: "bench_4",
//     benchName: "Tranquility Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.487697849922384",
//     longitude: "-2.269930658054493",
//   },
//   {
//     benchAddress: "Victoria Bridge/Greengate Square",
//     benchCity: "Manchester",
//     benchDescription:
//       "Concrete benches overlooking Manchester Cathedral and Irwell River",
//     benchId: "bench_5",
//     benchName: "Serene Sanctuary Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.48514672138744",
//     longitude: "-2.246205125736773",
//   },
//   {
//     benchAddress: "Buille Hill Park",
//     benchCity: "Manchester",
//     benchDescription:
//       "Wooden bench overlooking Media City in Salford (close to entrance on Weaste Ln and Eccles Old Road)",
//     benchId: "bench_6",
//     benchName: "Elevated Escape Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.491559988416974",
//     longitude: "-2.3093218713936987",
//   },
//   {
//     benchAddress: "ROe Green Loopline",
//     benchCity: "Manchester",
//     benchDescription:
//       "Wooden bench overlooking green pastures with cows walking around",
//     benchId: "bench_7",
//     benchName: "Cow Universe Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.49778040216307",
//     longitude: "-2.3628549876774527",
//   },
//   {
//     benchAddress: "Mann Island Waterfront",
//     benchCity: "Liverpool",
//     benchDescription: "Bench overlooking the pier and the lights of Woodside",
//     benchId: "bench_8",
//     benchName: "Timeless Beauty Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.403268376898886",
//     longitude: "-2.9962613973375887",
//   },
//   {
//     benchAddress: "The Promenade New Brighton",
//     benchCity: "Liverpool",
//     benchDescription:
//       "Concrete bench with a great view of the Irish Sea and the coasts of Merseyside",
//     benchId: "bench_9",
//     benchName: "Endless Horizon Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     latitude: "53.44015590261774",
//     longitude: "-3.0557294589579387",
//   },
// ];

// benches.forEach((bench) => {
//   for (let i = 0; i < 10; i++) {
//     const start = new Date(
//       new Date().setHours(startTime + i, 0, 0, 0)
//     ).getTime();
//     const end = new Date(new Date().setHours(endTime + i, 0, 0, 0)).getTime();
//     db.collection("sessions").doc().set({
//       benchName: bench.benchName,
//       location: bench.location,
//       startTime: start,
//       endTime: end,
//       booked: false,
//     });
//     console.log(i);
//   }
// });
