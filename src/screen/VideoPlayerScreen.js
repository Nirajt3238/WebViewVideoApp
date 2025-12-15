import { View, Button, StyleSheet, Text } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";

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
    player.play(); // ✅ auto-play
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


      {/* CONTROLS */}
      <View style={styles.controls}>
        <Button title="Play" onPress={() => player.play()} />
        <Button title="Pause" onPress={() => player.pause()} />
        <Button
          title={muted ? "Unmute" : "Mute"}
          onPress={() => {
            player.muted = !muted;
            setMuted(!muted);
          }}
        />
      </View>

      {/* STREAM SWITCH */}
      <Text style={styles.label}>Switch Stream</Text>
      <View style={styles.controls}>
        <Button
          title="Stream 1"
          onPress={() => setCurrentStream(STREAMS.stream1)}
        />
        <Button
          title="Stream 2"
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
