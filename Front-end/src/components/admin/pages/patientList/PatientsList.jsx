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
import { id } from "date-fns/locale";


export default function UserList() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        console.log(response.data.result[0].accountID);
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
  var i=0
  const handleChangeFlagged = (props) => {
     for(i=0;i<patients.length;i++){
     console.log(patients[1].accountID)
     }
     props++
    console.log(patients[props].accountID)
    setFlagged((previousFlag) => {
      return !previousFlag;
    });
  };
  const Defineusertype = (event) => {
    setusertype(event.target.value);
  };
  const [usertypereg, setusertype] = useState("");
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
            >
              <Link to="/">
                <span>
                  {" "}
                  {values.accountID} : {values.lastName}, {values.firstName}
                </span>
              </Link>
            </span>
            {/* onclick=cookies.set() */}
            {/* //value={value.accountID} */}
           <button  onClick={Defineusertype} value={i}> <ToggleFlagged
              flagged={flagged}
              handleChangeFlagged={()=>handleChangeFlagged(i)}
              id={values.accountID}
            />
            {console.log(flagged)}
            </button>
          </div>
        );
      })}
    </div>
  );
}
