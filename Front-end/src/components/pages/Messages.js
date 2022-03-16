import classes from "./Messages.module.css";
import { Box } from "@mui/system";
import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import ChatLog from "../layout/ChatLog";
import { TextField } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Messages() {
  return (
    <Box>
      <h2 className={classes.title}>Messages</h2>
      <ChatLog />

      <div className={classes.message}>
        <span className={classes.urgent}>
          !
        </span>
        <TextField label="Message here..." variant="outlined" size="normal" className={classes.message_input} />
      <span className={classes.send}><ArrowUpwardIcon/></span>
      </div>
      <SimpleBottomNavigation />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Box>
  );
}

export default Messages;
