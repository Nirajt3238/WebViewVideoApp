import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import AppButton from "../components/AppButton";

Notifications.setNotificationHandler({
  handleNotification: async ()=>({
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});

export default function WebViewScreen() {

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
        screen: "VideoPlayer",
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
    },
  });
};


  return (
    <ScreenLayout>
      <StatusBar style="auto" />

      <WebView
        source={{ uri: "https://example.com" }}
        style={{ flex: 1 }}
        onLoadEnd={notifyOnWebLoad}
      />

    <View style={styles.footer}>
      <View style={styles.button}>
        <AppButton title="Notify 1" onPress={triggerNotification} />
      </View>
      <View style={styles.button}>
        <AppButton
          title="Notify 2"
          variant="secondary"
          onPress={triggerNotification2}
        />
      </View>
    </View>
    </ScreenLayout>
   
  );
  
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});

