// src/DashPlayer.tsx

import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

interface DashPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<DashPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, url, true);
      return () => {
        player.reset();
      };
    }
  }, [url]);
  //alert(url)
  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default VideoPlayer;
