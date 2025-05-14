import React from 'react';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // Import for extracting params from the URL

export default function VideoScreen() {
  // Extract videoSource from search parameters
  const { videoSource } = useLocalSearchParams();

  // Check if videoSource is an array, and if so, pick the first item
  const videoUrl = Array.isArray(videoSource) ? videoSource[0] : videoSource;

  if (!videoUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No video source provided!</Text>
      </View>
    );
  }

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true; // Set video to loop
    player.play(); // Start the video immediately
  });

  // Handle playing state change
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.contentContainer}>
      {/* Video player */}
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Play/Pause control */}
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
