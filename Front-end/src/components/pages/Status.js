import { Box } from "@mui/system";
import classes from './Status.module.css';

import CheckboxLabels from "../layout/Checkbox";
import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";

function Status (){
    return (
        <Box>
            <h2 className={classes.title}>Update Status</h2>
            <CheckboxLabels/>
            <SimpleBottomNavigation/>
        </Box>
    )
}

export default Status;