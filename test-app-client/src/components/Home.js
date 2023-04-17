import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Container} from "@mui/material";

export default function Home() {
  return (
      <Container sx={{ flexGrow: 1, paddingTop: "50px" }}>
        <Typography variant="h6" component="div">
          This demo of Single Page Application is created by Lihai Qin

        </Typography>
      </Container>
  );
}
