import { Box } from "@mui/system";
import classes from "./ChatLog.module.css";

const chatlog = [
  { message: "hello doc", user: "patient", type: "Urgent!" },
  { message: "hello doc", user: "patient", type: "" },
  { message: "hello bro", user: "doctor", type: "" },
  {
    message:
      "Mauris interdum orci non nisi blandit condimentum. Mauris mollis neque purus, ac vulputate arcu rhoncus quis. Proin imperdiet porttitor volutpat. Quisque ut ante in ligula lobortis aliquam. Praesent vel sodales orci. Fusce in maximus odio. Duis et dui vitae arcu viverra consectetur sed vel nisl. Nullam a nisl quis velit ultricies vehicula malesuada id diam. Integer vitae rhoncus risus, quis elementum nibh.",
    user: "doctor",
    type: "",
  },
  { message: "hello doc", user: "patient", type: "Urgent!" },
];

function ChatLog() {
  return (
    <Box>
      {chatlog.map((value) => {
        if (value.user === "patient") {
          return (
            <div className={classes.patient}>
              <p>
                <span className={classes.urgent}>{value.type}</span>{" "}
                {value.message}
              </p>
            </div>
          );
        } else {
          return (
            <div className={classes.doctor}>
              <p>
                {value.type} {value.message}
              </p>
            </div>
          );
        }
      })}
    </Box>
  );
}

export default ChatLog;
