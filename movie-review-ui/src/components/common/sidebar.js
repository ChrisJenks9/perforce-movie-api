import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as Settings } from "@mui/icons-material";
import { styled } from "@mui/system";

const drawerWidth = 200;

const SidebarContainer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  "& .MuiDrawer-paper": {
    width:  drawerWidth,
    overflowX: "hidden",
  },
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menuItems = [
    { text: "Add Movie", icon: <Settings /> },
    { text: "Movie Details", icon: <Settings /> },
    { text: "Submit Movie Review", icon: <Settings /> },
    { text: "Average Ratings", icon: <Settings /> },
    { text: "Top Rated Movies", icon: <Settings /> },
  ];

  const renderMenuItems = () => {
    return menuItems.map(({ text, icon }) => (
        <ListItem button key={text}>
            {<ListItemText primary={text} />}
        </ListItem>
    ))
  }

  return (
    <SidebarContainer variant="permanent" open={open}>
      <List>
        {renderMenuItems()}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;