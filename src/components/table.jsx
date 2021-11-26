import React from "react";
import "./style.css";
import axios from "axios";

export default function Datatable({ data }) {
  const headers = data[0] && Object.keys(data[0]);

  const handleCellClick = (clickedUser) => {
    async function postApi() {
      await axios
        .post("https://jsonplaceholder.typicode.com/users", {
          name: clickedUser.name,
          email: clickedUser.email,
          phone: clickedUser.phone,
        })
        .then((response) => {
          console.log("Post", response.data);
        })
        .catch((error) => console.log(error));
    }
    postApi();
  };

  const handleUpdate = (value, userDetail) => {
    async function updateApi() {
      await axios
        .patch(`https://jsonplaceholder.typicode.com/users/${userDetail.id}`, {
          updateCompanyName: value,
          name: userDetail["name"],
        })
        .then((response) => {
          console.log("Update", response.data);
        })
        .catch((error) => console.log(error));
    }
    updateApi();
  };

  const debounce = (func, delay) => {
    console.log("inside debounce");
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearInterval(timer);
      timer = setTimeout(() => {
        func.apply(context, arguments);
      }, delay);
    };
  };

  const optimisedUpdate = debounce(handleUpdate, 200);

  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          {data[0] && headers.map((heading, i) => <th key={i}>{heading}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr>
            {headers.map((column) => (
              <td
                style={{ cursor: "pointer" }}
                onClick={() =>
                  !column === "company" ? handleCellClick(row) : ""
                }
              >
                {column === "company" ? (
                  <input
                    type="text"
                    defaultValue={row[column]}
                    onChange={(e) => optimisedUpdate(e.target.value, row)}
                  />
                ) : (
                  row[column]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
