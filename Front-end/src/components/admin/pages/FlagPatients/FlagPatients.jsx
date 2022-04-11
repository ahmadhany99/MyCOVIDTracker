import "./Flagpatients.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagIcon from "@mui/icons-material/Flag";
import Cookies from "js-cookie";
import ToggleFlagged from "../../components/ToggleFlag";
import { Checkbox } from "@mui/material";

export default function FlaggedPatients() {
  useEffect(() => {
    const fetchFlaggedPatients = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/get/flag"
        );
        console.log(response.data);
        setFlaggedPatients(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    const numberOfPatients = async () => {
      try {
        const response = await axios.post(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/getDoctorsNumberOfPatients",
          {
            doctorID: Cookies.get("accountID"),
          }
        );
        console.log("hello" + response);
        setNbrOfPatients(response);
        setBannerStatus("Flagged Patients");
      } catch (error) {
        console.log(error);
        setNbrOfPatients(0);
        setBannerStatus("You have no flagged patients!");
        //console.log(nbrOfPatients);
      }
    };
    numberOfPatients();
    fetchFlaggedPatients();
  }, []);
  const [flaggedPatients, setFlaggedPatients] = useState([]);
  const [nbrOfPatients, setNbrOfPatients] = useState();

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

  const [flagged, setFlagged] = useState(false);
  const [flagmessage, setflagmessage] = useState(false);
  let navigate = useNavigate();
  const toggleFlag = (event) => () => {
    try {
      console.log("flaggingggg " + event);
      const response = axios
        .put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/rem/flag",
          {
            patientID: event,
          }
        )
        .then((response) => {
          console.log(response);
          setflagmessage(response.data.message);
        }).catch(error=>{
          console.log(error)
        })
        ;
    } catch (error) {
      console.log(error);
    }
  };
  const gotoProfile = (id, fname, lname) => () => {
    Cookies.set("patientID", id);
    Cookies.set("patientFirstName", fname);
    Cookies.set("patientLastName", lname);
    //console.log(patients);
    //console.log(Cookies.get("patientID"));
    setTimeout(navigate("/profile"), 5000);
  };
  const [bannerStatus, setBannerStatus] = useState();
  return (
    <div className="userList">
      <div className="userHeader">{bannerStatus}</div>

      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {flaggedPatients.map((values) => {
        if (values.doctorID == Cookies.get("accountID"))
          return (
            <div className="userCard">
              <AccountCircleRoundedIcon fontSize="large" />

              <span className="userDetails<">
                <p
                  className="patientLink"
                  onClick={gotoProfile(
                    values.patientID,
                    values.firstName,
                    values.lastName
                  )}
                >
                  {values.patientID} : {values.lastName}, {values.firstName}
                </p>
              </span>
              {/* onclick=cookies.set() */}
              {/* //value={value.accountID} */}
              <Checkbox onChange={toggleFlag(values.patientID)} />
            </div>
          );
      })}
      <h2>{flagmessage}</h2>
    </div>
  );
}
