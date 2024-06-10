import React from 'react';
import { Grid, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import VideoPlayer from './DashVideoPlayer';

const MultiSources = () => {
  const location = useLocation();
  const currentPath = location.search;
  const streamNum = currentPath.slice(-1);
  const streamUrlTwo = `http://localhost:4000/files/stream2/stream.mpd`;
  const streamUrlThree = `http://localhost:4000/files/stream3/stream.mpd`;
  const streamUrlFour = `http://localhost:4000/files/stream4/stream.mpd`;
  const streamUrlFive = `http://localhost:4000/files/stream5/stream.mpd`;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <VideoPlayer url={streamUrlThree} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <VideoPlayer url={streamUrlTwo} />
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default MultiSources;
