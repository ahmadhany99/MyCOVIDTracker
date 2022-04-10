import "./widgetLg.css";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useState } from "react";

export default function WidgetLg() {
  useEffect(() => {
    const fetchTodaysDate = async () => {
      console.log(todaysDate);
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/status/get/all/date",
          {
            date: todaysDate,
          }
        );
        console.log("dddd" + response.data.result[0].statusID);
        setTodaysReport(response.data.result);
      } catch (error) {
        console.log("eji d" + error);
      }
    };
    fetchTodaysDate();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const todaysDate = moment().format("YYYY[-]MM[-]DD");
  console.log(todaysDate);

  const [todaysReport, setTodaysReport] = useState([]);
  //console.log("hello doc: " + todaysReport[0].report);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Today's patient status updated</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Patient</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {todaysReport.map((values) => {
          return (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{values.patientID}</span>
              </td>
              <td className="widgetLgDate">{values.report}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
