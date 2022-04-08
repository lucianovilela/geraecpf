import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, IconButton, Link, Button } from '@mui/material/';
export default function Copyright() {
  return (
    <AppBar
    position="static"
    color="default"
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Gerador de certificado "Fake" ICP-Brasil 
      </Typography>
      
    </Toolbar>
  </AppBar>
  );
}
