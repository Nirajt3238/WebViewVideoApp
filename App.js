// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button, Alert } from "react-native";
// import * as Notifications from 'expo-notifications';
// import { useEffect } from "react";

// Notifications.setNotificationHandler({
//   handleNotification: async ()=>({
//     shouldShowBanner: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false
//   }),
// });

// export default function App() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if( status !== 'granted'){
//         Alert.alert("Permission is not granted");
//       }
//     })();
//   },[]);

  // const triggerNotification = async () => {
  //   const {status} = await Notifications.getPermissionsAsync();
  //   if(status !== 'granted'){
  //     Alert.alert("Permission denied");
  //     return;
  //   }
    
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Hello",
  //     body: "Notification triggered from button press",
  //   },
  //   trigger: null,
  // });  
  // };

//   return (
//     <View style = {styles.container}>
//       <Text>Notification Example</Text>
//       <StatusBar style="auto" />
//       <Button title="Notify" onPress={triggerNotification} />
//     </View>
//   );
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WebViewScreen from "./src/screen/WebViewScreen";
import VideoPlayerScreen from "./src/screen/VideoPlayerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName="VideoPlayer"
      >
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{ title: "Video Player" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

