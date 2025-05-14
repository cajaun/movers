import React from "react";
import { WebView } from "react-native-webview";

interface VideoWebViewProps {
  mediaId: string; // Explicitly define the type of mediaId
}

const VideoWebView: React.FC<VideoWebViewProps> = ({ mediaId }) => (
  <WebView
    source={{ uri: `https://embed.su/embed/movie/${mediaId}` }}
    style={{ flex: 1 }}
    allowsInlineMediaPlayback
    javaScriptEnabled
    domStorageEnabled
  />
);

export default VideoWebView;
