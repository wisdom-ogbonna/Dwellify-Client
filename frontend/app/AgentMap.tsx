// import React from 'react';
// import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';

// const { width } = Dimensions.get('window');

 export default function agentMap() {
   return (
    <></>
//     <View style={styles.container}>
//       {/* Map */}
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 25.101,
//           longitude: 55.209,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}
//       >
//         <Marker coordinate={{ latitude: 25.101, longitude: 55.209 }} />
//         <Marker coordinate={{ latitude: 25.106, longitude: 55.215 }} pinColor="green" />
//         <Polyline
//           coordinates={[
//             { latitude: 25.101, longitude: 55.209 },
//             { latitude: 25.106, longitude: 55.215 },
//           ]}
//           strokeColor="#00BFA6"
//           strokeWidth={4}
//         />
//       </MapView>

//       {/* Ride Detail Bottom Sheet */}
//       <View
//         style={[
//           styles.bottomSheet,
//           { width }
//         ]}
//       >
//         <Text style={styles.rideDetailsTitle}>Ride Details</Text>
//         <View style={styles.rowBetween}>
//           <View>
//             <Text style={styles.comfortTitle}>Comfort</Text>
//             <Text style={styles.comfortSubtitle}>Awesome rides with trusted Captains.</Text>
//           </View>
//           <Text style={styles.price}>AED 88 - 107</Text>
//         </View>
//       </View>
//     </View>
   );
 }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bottomSheet: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: 'white',
//     padding: 16,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 10,
//   },
//   rideDetailsTitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   comfortTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   comfortSubtitle: {
//     color: '#6B7280',
//     fontSize: 12,
//   },
//   price: {
//     color: '#00BFA6',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });
