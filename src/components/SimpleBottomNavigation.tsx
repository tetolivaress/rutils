import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MusicIcon from '@material-ui/icons/MusicNote';
import ImageIcon from '@material-ui/icons/Image';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function SimpleBottomNavigation() {
  const router = useRouter()
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: { xs: 0, lg: 'auto' },
        top: { xs: 'auto', lg: 0 },
        zIndex: 1000,
        left: 0,
        right: 0
      }}
    >
      <BottomNavigation showLabels
        onChange={(event, newValue) => {
          const newRoute = newValue ? 'mp3' : 'images'
          router.push(newRoute)
        }}
      >
          <BottomNavigationAction label="Image" icon={<ImageIcon />} />
          <BottomNavigationAction label="MP3" icon={<MusicIcon />} />
      </BottomNavigation>
    </Box>
  );
}
