import React, { useState, useEffect } from "react";
import axios from "axios";
import Datatable from "../components/table";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const flattenObj = (ob) => {
    let result = {};
    for (const i in ob) {
      if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        for (const j in temp) {
          if (j === "city" || j === "name") result[i] = temp[j];
        }
      } else {
        result[i] = ob[i];
      }
    }
    return result;
  };

  useEffect(() => {
    async function getApi() {
      await axios
        .get("https://jsonplaceholder.typicode.com/users?_limit=10")
        .then((response) => {
          // console.log(response.data);
          const dataset = response.data;

          const newData = dataset.map((obj) => flattenObj(obj));
          // console.log("newData", newData);
          setData(newData);
        })
        .catch((error) => console.log(error));
    }
    getApi();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>USER DETAILS</h1>

      <div>
        <Datatable data={data} />
      </div>
    </div>
  );
}
