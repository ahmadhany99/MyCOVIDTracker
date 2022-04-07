import "./userList.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Cookies from "js-cookie";
import ToggleFlagged from "../../components/ToggleFlag";

export default function UserList() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        console.log(response.data.result);
        setPatients(response.data.result);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchPosts();
  }, []);
  const [patients, setPatients] = useState([]);

  // const handleDelete = (accountID) => {
  //   setData(data.filter((item) => item.accountID !== accountID));
  // };

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
              // onClick={() => handleDelete(params.row.accountID)}
            />
          </>
        );
      },
    },
  ];
  const makeID = (props) => {
    setTimeout(() => {
      Cookies.set("PatientID", props);
    }, 10);
  };

  const flagapatient = () => {
    try {
      const response = axios.post(
        "https://tranquil-wildwood-60713.herokuapp.com/api/flag/flagPatient",
        {
          flag: flag,
        }
      );
      console.log(response.data.result);
      setflag(response.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };
  const [flag, setflag] = useState();
  const [flagged, setFlagged] = useState(false);

  const handleChangeFlagged = () => {
    setFlagged((previousFlag) => {
      return !previousFlag;
    });
  };
  return (
    <div className="userList">
      <div className="userHeader">
        <h1>Patients </h1>

        <h1>ID,firstName,lastName</h1>
      </div>

      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {patients.map((values) => {
        return (
          <div className="userCard">
            <AccountCircleRoundedIcon fontSize="large" />

            <span
              className="userDetails"
              value={values.accountID}
              onClick={() => makeID(values.accountID)}
            >
              <Link to="/profile">
                <span>
                  {" "}
                  {values.accountID} : {values.lastName}, {values.firstName}
                </span>
              </Link>
            </span>
            {/* onclick=cookies.set() */}
            {/* //value={value.accountID} */}
            <ToggleFlagged
              flagged={flagged}
              handleChangeFlagged={handleChangeFlagged}
              id={values.accountID}
            />
          </div>
        );
      })}
    </div>
  );
}
