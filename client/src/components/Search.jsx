import axios from 'axios';
import React, { useState } from 'react'
import Select from "react-select"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const history = useNavigate()
  const [data, setData] = useState("");
  const [value, setValue] = useState(null);
  const [Data, setdata] = useState([]);
  const options = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ]

  const postData = async (e) => {
    e.preventDefault();
    try {
      const pin = data;
      const blood = value.value;

      const response = await axios.post(
        "/search",
        { pin, blood },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      if (response.status === 202) {
        setdata(response.data);
        console.log(Data, 41);
        toast.success("Data Found");
        history("/userdata", { state: { Data: response.data } });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Data Not Found");
      } else if (error.response && error.response.status === 401) {
        toast.warn("You have to login first");
        history("/login");
      } else {
        console.log(error);
      }
    }
  };



  return (
    <>
      <Select
        defaultValue={value}
        onChange={setValue}
        options={options}
        placeholder={"Select Blood Group"}
        noOptionsMessage={() => "Invalid Blood Group"}
        styles={{ dropdownIndicator: (baseStyles) => ({ ...baseStyles, color: "#d93444" }) }}
      />
      <input onChange={(e) => setData(e.target.value)} placeholder='Enter pin no' type="number" name="pin" id="" />
      <div className='searchIcon' onClick={postData}>
        <span className="material-symbols-outlined">search</span>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Search
