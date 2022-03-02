import React,{useState, useEffect} from "react";
import {
  Typography,
  Container, 
  CssBaseline, 
  GlobalStyles,
  } from '@mui/material';

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Tasks from "./Components/Tasks";
import AddTask from './Components/AddTask';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    textCus: {
      primary: '#003979',
      secondary: '#E8F3FE',
      danger: '#D60707',
    },
    backgroundCus : {
      primary: '#003979',
      secondary: '#E8F3FE',
      danger: '#D60707',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "#E8F3FE" },
          }}
        />
      <Container maxWidth="md">
        
        <AddTask />

      </Container>
    </ThemeProvider>
  );
}

export default App;
