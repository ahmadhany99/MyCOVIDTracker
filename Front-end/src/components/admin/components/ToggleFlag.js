import React from "react";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import Flag from "@mui/icons-material/Flag";

export default function ToggleFlagged({ flagged, handleChangeFlagged, id }) {
  console.log(id);
  return (
    <>
      <div className="toggle-wrapper">
        {flagged ? (
          <Flag
            className="active"
            fontSize="large"
            sx={{ color: "red" }}
            alt="yellow star"
            onClick={() => handleChangeFlagged()}
          />
        ) : (
          <FlagOutlined
            className="inactive"
            fontSize="large"
            sx={{ color: "red" }}
            alt="black and white star"
            onClick={() => handleChangeFlagged()}
          />
        )}
      </div>
    </>
  );
}
