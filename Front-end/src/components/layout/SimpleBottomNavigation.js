import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlinedIcon />}
          href="/dashboard"
        />
        <BottomNavigationAction
          label="Message"
          icon={<ChatBubbleOutlineRoundedIcon />}
          href="/messages"
        />
        <BottomNavigationAction
          label="Calendar"
          icon={<CalendarTodayOutlinedIcon />}
          href="/calendar"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleOutlinedIcon />}
          href="/profile"
        />
      </BottomNavigation>
    </Box>
  );
}
