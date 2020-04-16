import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, Typography, Container, Box } from '@material-ui/core';
import Chat from './Chat'

function App() {
  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Chat/>
        </Container>
      </Box>
  );
}

export default App;
