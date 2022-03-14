import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

const StaticDatePicker = () => {
  const [date, changeDate] = useState(Date.now);

  // prettier-ignore
  return (
    <>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
      />
    </>
  );
};

export default StaticDatePicker;