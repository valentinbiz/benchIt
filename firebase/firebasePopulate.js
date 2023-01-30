// import firebase from "firebase/app";
// import "firebase/firestore";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";

// const firestore = firebase.firestore();

// const benches = [
//   {
//     benchId: "bench1",
//     benchName: "Serenity Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Concrete bench with a great view of the Cotton Marina. Amazing views at sunset",
//     benchAddress: "Cotton Field Marina Promenada",
//     benchCity: "Manchester",
//     benchGeolocation: "53.48281185518784, -2.2231092858106725",
//   },
//   {
//     benchId: "bench2",
//     benchName: "Dreamcatcher Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Bench overlooking the canal, offering a quiet retreate from the buzzing city center",
//     benchAddress: "Brewer Street",
//     benchCity: "Manchester",
//     benchGeolocation: "53.4801961558684, -2.2305466555388835",
//   },
//   {
//     benchId: "bench3",
//     benchName: "Eternity Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription: "Green escape in the middle of Alexandra Park",
//     benchAddress: "Alexandra Park (next to the football pitch)",
//     benchCity: "Manchester",
//     benchGeolocation: "53.45154559856414, -2.2481028093276825",
//   },
//   {
//     benchId: "bench4",
//     benchName: "Tranquility Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription: "New bench in Peel Park, overlooking Salford Uni",
//     benchAddress: "Peel Park (next to the Joseph Brotherton statue)",
//     benchCity: "Manchester",
//     benchGeolocation: "53.487697849922384, -2.269930658054493",
//   },
//   {
//     benchId: "bench6",
//     benchName: "Serene Sanctuary Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Concrete benches overlooking Manchester Cathedral and Irwell River",
//     benchAddress: "Victoria Bridge/Greengate Square ",
//     benchCity: "Manchester",
//     benchGeolocation: "53.48514672138744, -2.246205125736773",
//   },
//   {
//     benchId: "bench7",
//     benchName: "Elevated Escape Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Wooden bench overlooking Media City in Salford (close to entrance on Weaste Ln and Eccles Old Road",
//     benchAddress: "Buille Hill Park",
//     benchCity: "Manchester",
//     benchGeolocation: "53.491559988416974, -2.3093218713936987",
//   },
//   {
//     benchId: "bench8",
//     benchName: "Cow Universe Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Wooden bench overlooking green pastures with cows walking around",
//     benchAddress: "ROe Green Loopline",
//     benchCity: "Manchester",
//     benchGeolocation: "53.49778040216307, -2.3628549876774527",
//   },
//   {
//     benchId: "bench9",
//     benchName: "Timeless Beauty Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription: "Bench overlooking the pier and the lights of Woodside",
//     benchAddress: "Mann Island Waterfront",
//     benchCity: "Liverpool",
//     benchGeolocation: "53.403268376898886, -2.9962613973375887",
//   },
//   {
//     benchId: "bench10",
//     benchName: "Endless Horizon Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription:
//       "Concrete bench with a great view of the Irish Sea and the coasts of Merseyside",
//     benchAddress: "The Promenade New Brighton",
//     benchCity: "Liverpool",
//     benchGeolocation: "53.44015590261774, -3.0557294589579387",
//   },
//   {
//     benchId: "bench11",
//     benchName: "Whispering Willow Bench",
//     benchPicture:
//       "https://images.unsplash.com/photo-1573079883023-62fc208b9d75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//     benchDescription: "Mysterious bench set aside from Prince Rupert's Tower",
//     benchAddress: "Everton Park and Garden",
//     benchCity: "Liverpool",
//     benchGeolocation: "53.418877980620884, -2.970565414361296",
//   },
// ];

// const populateBenchesCollection = () => {
//   benches.forEach((bench) => {
//     console.log(bench);
//     const docRef = doc(db, "benches", bench.benchId);
//     setDoc(docRef, bench);
//   });
// };

//

// export default populateBenchesCollection;

// .then(() => {
//     const startTime = new Date("2023-01-30T09:00:00");
//     const endTime = new Date("2023-01-30T10:00:00");
//     benches.forEach((bench) => {
//       const sessionRef = doc(db, `sessions/${bench.benchId}`);
//       const result = {};
//       for (let i = 0; i < 14; i++) {
//         const daySession = [];

//         for (let j = 0; j < 8; j++) {
//           const session = {
//             startTime: new Date(
//               startTime.getTime() + (i * 24 + j) * 60 * 60 * 1000
//             ),
//             endTime: new Date(
//               endTime.getTime() + (i * 24 + j) * 60 * 60 * 1000
//             ),
//             benchAddress: bench.benchAddress,
//             benchName: bench.benchName,
//             capacity: 2,
//             user_1: null,
//             user_2: null,
//           };
//           daySession.push(session);
//         }
//         result[`day_${i}`] = daySession;
//       }
//       setDoc(sessionRef, { result });
//     });
//   })
