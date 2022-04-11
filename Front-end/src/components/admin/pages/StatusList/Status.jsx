import "../patientList/userList.css";
import "./productList.css";

import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function Status() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/status/get/all"
        );
        setData(response.data.result);
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchPosts();
  }, []);
  const [data, setData] = useState([]);

  const handleDelete = (uid) => {
    setData(data.filter((item) => item.uid !== uid));
  };

  const columns = [
    { field: "accountID", headerName: "accountID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.accountID}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.accountID)}
            />
          </>
        );
      },
    },
  ];

  data.sort((a, b) => a.statusID - b.statusID);

  return (
    <div className="userList">
      <h1 className="userHeader">Status </h1>
      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {data.map((value) => {
        const date = value.date;
        const cutDate = date.substring(0, 10);
        return (
          <div className="userCard">
            {value.patientID} : {cutDate} : {value.report}
          </div>
        );
      })}
    </div>
  );
}
