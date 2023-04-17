import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import LeftNavigationBar from "./components/LeftNavigationBar";
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Home from "./components/Home";
import Students from "./components/Students";
import Results from "./components/Results";
import Courses from "./components/Courses";
import './common/app.css';

const App = () => {
  return <BrowserRouter>
  <Box sx={{ flexGrow: 1 }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Lihai's Dev Test for ShyftLabs
        </Typography>
      </Toolbar>
    </AppBar>
    <LeftNavigationBar />
    <Box component="main" sx={{ flexGrow: 1, paddingLeft: "140px" }}>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/home" element={<Home />}>
        </Route>
        <Route path="/students" element={<Students />}>
        </Route>
        <Route path="/courses" element={<Courses />}>
        </Route>
        <Route path="/results" element={<Results />}>
        </Route>
      </Routes>
    </Box>

  </Box>;
  </BrowserRouter>
};

export default App;




