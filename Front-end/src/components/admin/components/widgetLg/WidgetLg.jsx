import "./widgetLg.css";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function WidgetLg() {
  useEffect(() => {
    const fetchTodaysDate = async () => {
      console.log("hhhhh");
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/status/get/all/date",
          {
            date: todaysDate,
          }
        );
        console.log("dddd" + response);
        setTodaysReport(response);
      } catch (error) {
        console.log("eji d" + error);
      }
      fetchTodaysDate();
    };
  });

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const todaysDate = moment().format("YYYY[-]MM[-]DD");
  console.log(todaysDate);

  const [todaysReport, setTodaysReport] = useState([]);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Today's patient status updated</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Patient</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">Status</td>
        </tr>
      </table>
    </div>
  );
}
