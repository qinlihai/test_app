import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

const drawerWidth = 140;

export default function LeftNavigationBar() {
  return (
        <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Home', 'Students', 'Courses', 'Results'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <Link to={"/" + text.toLowerCase().replace("home", "")}>
                        <ListItemText primary={text} />
                      </Link>
                    </ListItemButton>
                  </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
  );
}
