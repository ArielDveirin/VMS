import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box, Divider } from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import { useLocation } from 'react-router-dom';
import { QuestionAnswer } from '@mui/icons-material';

import ReactPlayer from "react-player"
import VideoPlayer from './DashVideoPlayer';

const PlaySource = () => {



  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

  const currentPath = window.location.search;
  const streamNum = currentPath.slice(-1)
  var streamUrl="http://localhost:4000/files/stream#/stream.mpd".replace("#", streamNum)
  //alert(streamUrl)
  return (
    <div>
          <VideoPlayer url={streamUrl} />
    </div>
  );
};

export default PlaySource;