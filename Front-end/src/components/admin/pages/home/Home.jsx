import Chart from "../../components/chart/Chart.jsx";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

import React, { useState } from 'react'
import Axios from 'axios'
import Cookies from "js-cookie"
export default function Home() {
  return (
    <div className="home">
      Hello {Cookies.get("firstName")}
      <FeaturedInfo />
      <Chart data={userData} title="Patients Analysis" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    

    </div>

  );
}