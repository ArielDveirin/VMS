import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia, Box, Divider } from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import { useLocation } from 'react-router-dom';
import { QuestionAnswer } from '@mui/icons-material';

import ReactPlayer from "react-player"


const PlaySource = () => {


  useEffect(() => {
    async function fetchItems() {
        try {
          const response = await fetch('http://localhost:3002/getItems', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (response.ok) {
            const responseBody = await response.text();

          }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
  
      fetchItems();
  }, []);

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

//udp://@239.0.0.1:1234"
  return (
    
       <video width="750" height="500" controls>
        <source src={"udp://@239.0.0.1:1234"} type='video'/>
       </video>
  );
};

export default PlaySource;