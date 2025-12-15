import { View, Button, StyleSheet, Text } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import AppButton from "../components/AppButton";

const STREAMS = {
  stream1: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  stream2: "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
};

export default function VideoPlayerScreen({ route }) {
  const initialUrl = route?.params?.url || STREAMS.stream1;
  const [currentStream, setCurrentStream] = useState(initialUrl);
  const [muted, setMuted] = useState(false);

  const player = useVideoPlayer(currentStream, (player) => {
    player.loop = true;
    player.play(); 
  });

  useEffect(() => {
    player.replace(currentStream);
    player.play();
  }, [currentStream]);

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        muted
      />


      <View style={styles.controls}>
        <AppButton title="Play" variant="secondary" onPress={() => player.play()} />
        <AppButton title="Pause" onPress={() => player.pause()} />
        <AppButton
        variant="secondary"
          title={muted ? "Unmute" : "Mute"}
          onPress={() => {
            player.muted = !muted;
            setMuted(!muted);
          }}
        />
      </View>

      <Text style={styles.label}>Switch Stream</Text>
      <View style={styles.controls}>
        <AppButton
          title="Stream 1"
          onPress={() => setCurrentStream(STREAMS.stream1)}
        />
        <AppButton
          title="Stream 2"
          variant="secondary"
          onPress={() => setCurrentStream(STREAMS.stream2)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  video: { flex: 1 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    textAlign: "center",
    color: "#fff",
    marginVertical: 6,
  },
});
