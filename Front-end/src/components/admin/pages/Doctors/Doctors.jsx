import "./Doctor.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Cookies from "js-cookie";

export default function DoctorsList() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/getAllDoctors"
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
  let navigate = useNavigate();
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
  const gotoProfile = (id, fname, lname) => () => {
    Cookies.set("doctorID", id);
    Cookies.set("doctorFirstName", fname);
    Cookies.set("doctorLastName", lname);
    setTimeout(navigate("/admin/profile"), 5000);
  };

  return (
    <div className="userList">
      <h1 className="userHeader">Doctors</h1>

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
              <span className="userDetails<">
                <p
                  className="patientLink"
                  onClick={gotoProfile(
                    values.accountID,
                    values.firstName,
                    values.lastName
                  )}
                >
                  {values.accountID} : {values.lastName}, {values.firstName}
                </p>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
