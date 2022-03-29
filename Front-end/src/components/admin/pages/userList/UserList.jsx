import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { applyMiddleware } from "redux";
import axios from "axios";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';


export default function UserList() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://tranquil-wildwood-60713.herokuapp.com/api/account/getAllPatients')
        setData(response.data);
      }catch(err){
  console.log(err.response.data);
      }
    }
    fetchPosts()
  },[])
  const [data, setData] = useState([]);

  const handleDelete = (accountID) => {
    setData(data.filter((item) => item.accountID !== accountID));
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

  return (
    <div className="userList">
      <div className="userHeader"><h1>Patients </h1>
     
      <h1 >ID,firstName,lastName</h1>
    
      </div>
      
        {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {data.map((value) => {
        return(
          <div className="userCard">
            <AccountCircleRoundedIcon fontSize="large"/>
              
            <span className="userDetails">
              <Link to="/profile"><span >  {value.accountID} : {value.lastName}, {value.firstName}</span></Link>  
            </span>
            <FlagOutlinedIcon font-size="large"/>
          </div>
        )
      })}
      
    </div>
  );
}