import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async ()=>({
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});

export default function WebViewScreen() {
//   useEffect(() => {
//     (async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if( status !== 'granted'){
//         Alert.alert("Permission is not granted");
//       }
//     })();
//   },[]);

   const permissionGranted = useRef(false);
   const navigation = useNavigation();

useEffect(() => {
  const sub =
    Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen =
          response.notification.request.content.data?.screen;

        if (screen === "VideoPlayer") {
          navigation.navigate("VideoPlayer");
        }
      }
    );

  return () => sub.remove();
}, []);


   const notifyOnWebLoad = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "WebView Loaded",
      body: "Website finished loading",
    },
    trigger: { seconds: 2 },
  });
};

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const result = await Notifications.requestPermissionsAsync();
        permissionGranted.current = result.status === "granted";
      } else {
        permissionGranted.current = true;
      }

      if (!permissionGranted.current) {
        Alert.alert("Notification permission not granted");
      }
    })();
  }, []);



  const triggerNotification = async () => {
    const {status} = await Notifications.getPermissionsAsync();
    if(status !== 'granted'){
      Alert.alert("Permission denied");
      return;
    }
    
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello",
      body: "Notification triggered from button press",
    },
    // trigger: null,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });  
  };

const triggerNotification2 = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission denied");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Open Video Player",
      body: "Tap to watch video",
      data: {
        screen: "VideoPlayer", // 🔥 navigation key
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
    },
  });
};


  return (
    <View style = {styles.container}>
      <StatusBar style="auto" />
      <WebView source={{ uri: "https://example.com" }} style={{ flex: 1 }}  onLoadEnd={notifyOnWebLoad} />
        <View style={styles.buttonView}>
            <View style={styles.button}>
                <Button title="Notify1" onPress={triggerNotification} />
            </View>
            <View style={styles.button}>
                <Button title="Notify2" onPress={triggerNotification2} />
            </View>
        </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
buttonView: {
    flex:1,
    flexDirection: 'row',
    padding:10
    },
button: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 20
    }
});
