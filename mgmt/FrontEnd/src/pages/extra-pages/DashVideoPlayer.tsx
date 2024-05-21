import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, url, true);

      return () => {
        player.reset();
      };
    }
  }, [url]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoPlayer;
