import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import PeopleIcon from "@mui/icons-material/People";
import { PermIdentity } from "@mui/icons-material";
import MedicationIcon from "@mui/icons-material/Medication";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const drawerWidth = 300;

const logout = () => {
  Cookies.remove("email");
  Cookies.remove("accountID");
  Cookies.remove("lastName");
  Cookies.remove("firstName");
  Cookies.remove("Usertype");
};

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Link to="/admin/dashboard" className="link">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon className="sidebarIcon" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <List>
        <Link to="/admin/users" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/status" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Status" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/flagged" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PermIdentity className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Flagged Patients" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/doctors" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MedicationIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Doctors" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin/assign" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIndIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Assign Patients" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin/activate" className="link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIndIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Activate Doctor" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/admin" className="link">
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon className="sidebarIcon" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar> */}
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
