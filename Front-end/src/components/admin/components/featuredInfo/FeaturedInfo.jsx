import "./featuredInfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from "axios";
import { useState,useEffect } from "react";

export default function FeaturedInfo() {
  useEffect(() => {
    const getallpatients = async () => {
      try {

        const response = await axios.get('https://tranquil-wildwood-60713.herokuapp.com/api/patient/countAllPatients')
        console.log(response.data[0].countAllPatients)
        setPatients(response.data[0].countAllPatients);
      }catch(err){
       console.log(err.response);
      }
    }
    getallpatients()
  },[])
  const [patients, setPatients] = useState([]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Patients</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{patients}</span>
          <span className="featuredMoneyRate">
           {patients}<ArrowUpwardIcon  className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Hospitalizations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">326</span>
          <span className="featuredMoneyRate">
            +50 <ArrowDownwardIcon className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Intensive Case</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">120</span>
          <span className="featuredMoneyRate">
            +3 <ArrowUpwardIcon className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}