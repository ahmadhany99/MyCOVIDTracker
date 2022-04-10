import Chart from "../../components/chart/Chart.jsx";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import classes from "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

import React, { useState } from 'react'
import Axios from 'axios'
import Cookies from "js-cookie"
export default function Home() {
  return (
    <div className="home">
      <h2 className={classes.hello}>
      Welcome, {Cookies.get("firstName")}
      </h2>
      <FeaturedInfo />
      <Chart data={userData} title="Users" grid dataKey="Active Users"/>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    

    </div>

  );
}