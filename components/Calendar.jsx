// import React from "react";

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   StatusBar,
//   Button,
// } from "react-native";

// import { Agenda } from "react-native-calendars";
// import FormButton from "./FormButton";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

// const CalendarAgenda = () => {
//   const [items, setItems] = React.useState({});

//   const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 20; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 9 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: "Item for " + strTime + " #" + j,
//               height: Math.max(10, Math.floor(Math.random() * 150)),
//               day: strTime,
//             });
//           }
//         }
//       }

//       const newItems = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };

//   const renderItem = (item) => {
//     console.log(item);
//     return (
//       <TouchableOpacity style={styles.item}>
//         <View>
//           <Text>{item.name}</Text>

//           <FormButton buttonTitle="Select session" />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={"2022-01-06"}
//         refreshControl={null}
//         showClosingKnob={true}
//         refreshing={false}
//         renderItem={renderItem}
//       />

//       <StatusBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderRadius: 15,
//   },

//   item: {
//     flex: 1,
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
// });

// export default CalendarAgenda;
