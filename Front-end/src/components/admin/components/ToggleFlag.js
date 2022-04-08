import React from "react";
import FlagOutlined from "@mui/icons-material/FlagOutlined";
import Flag from "@mui/icons-material/Flag";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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
            onClick={() => handleChangeFlagged()}
          />
        ) : (
          <FlagOutlined
            className="inactive"
            fontSize="large"
            sx={{ color: "red" }}
            onClick={() => handleChangeFlagged()}
          />
        )}
      </div>
    </>
  );
}
