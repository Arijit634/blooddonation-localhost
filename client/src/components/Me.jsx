import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import Select from "react-select"

const Me = () => {
  const history = useNavigate()
  const [data, setData] = useState({ name: "", gmail: "", mobile: "", blood: "", pin: "", donor_check: false });

  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({ name: "", gmail: "", mobile: "", blood: "", pin: "", donor_check: false });
  const [userId, setUserId] = useState("")

  useEffect(() => {
    axios.get("/getUser", {
      headers: {
        Accept: "application/json",
        'content-type': 'application/json; charset=utf-8',
      },
      Credential: "include"
    }).then((res) => {
      setUserId(res.data._id)
      setData({ ...data, name: res.data.name, gmail: res.data.gmail, mobile: res.data.mobile, pin: res.data.pin, blood: res.data.blood, donor_check: res.data.donor_check });
    }).catch((err) => {
      if(err.response && err.response.status === 401) {
        toast.warn("You have to login first");
        history("/login");
      } else {
        console.log(err);
      }
    });
  }, []);

  const userUpdate = async () => {
    try {
      const { name, gmail, mobile, blood, pin, donor_check } = editData;

      // Validate name (no numbers allowed)
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(name)) {
        toast.error('Please enter a valid name');
        return;
      }
      // Validate blood group
      const bloodGroupPattern = /^(A\+|A-|B\+|B-|O\+|O-|AB\+|AB-)$/i;
      if (!bloodGroupPattern.test(blood)) {
        toast.error('Please enter a valid blood group');
        return;
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(gmail)) {
        toast.error('Please enter a valid email');
        return;
      }

      await axios
        .put(
          `/me/update/${userId}`,
          { name, gmail, mobile, blood, pin, donor_check },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'content-type': 'application/json; charset=utf-8',
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success('Profile updated Successfully');
            window.location.reload()
          } else {
            window.alert('Something wrong');
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='form_con'>
        <button className='btn mx-1' style={{ backgroundColor: "blue", color: "white" }} onClick={() => { window.location.href = "/request-dashboard" }}>View Request Dashboard</button>
        <div className="form-title">
          <div className='d-flex justify-content-end align-items-center'>
            {
              editMode ?
                <>
                  <button className='btn mx-1' style={{ backgroundColor: "green", color: "white" }} onClick={() => { userUpdate() }}>Save</button>
                  <button className='btn mx-1' style={{ backgroundColor: "#6f458f", color: "white" }} onClick={() => { setEditMode(false); setEditData({ name: "", gmail: "", mobile: "", blood: "", pin: "", donor_check: false }); }}>Cancel</button>
                </>
                :
                <button className='btn mx-1' style={{ backgroundColor: "#6f458f", color: "white" }} onClick={() => { setEditMode(true); setEditData({ ...data }); }} >Edit</button>
            }
            <Link to="/" className="close-icon mx-2" >&#10006;</Link>
          </div>

          <h3>About Me</h3>
        </div>
        <form className="form-body">
          {
            editMode ?
              <>
                <h4>Name: <input type='text' className='mx-3 my-0 form-control d-inline' style={{ width: "fit-content", fontSize: "unset" }} value={editData.name} onChange={(e) => { setEditData({ ...editData, name: e.target.value }) }} /> </h4>
                <h4>Gmail: <input type='email' className='mx-3 my-0 form-control d-inline' style={{ width: "fit-content", fontSize: "unset" }} value={editData.gmail} onChange={(e) => { setEditData({ ...editData, gmail: e.target.value }) }} /></h4>
                <h4>Mobile No: <input type='text' className='mx-3 my-0 form-control d-inline' style={{ width: "fit-content", fontSize: "unset" }} value={editData.mobile} onChange={(e) => { setEditData({ ...editData, mobile: e.target.value }) }} /></h4>
                <h4 style={{ display: "flex", alignItems: "center", gap: "1em" }}>Blood:
                  <Select
                    options={[
                      { value: "A+", label: "A+" },
                      { value: "A-", label: "A-" },
                      { value: "B+", label: "B+" },
                      { value: "B-", label: "B-" },
                      { value: "O+", label: "O+" },
                      { value: "O-", label: "O-" },
                      { value: "AB+", label: "AB+" },
                      { value: "AB-", label: "AB-" },
                    ]}
                    value={editData.blood == "" ? null : { label: editData.blood, value: editData.blood }}
                    onChange={(val) => { setEditData({ ...editData, blood: val.value }) }}
                    placeholder={"Select Blood Group"}
                    noOptionsMessage={() => "Invalid Blood Group"}
                    styles={{ dropdownIndicator: (baseStyles) => ({ ...baseStyles, color: "#d93444" }) }}
                  />
                </h4>
                <h4>Pin: <input type='text' className='mx-3 my-0 form-control d-inline' style={{ width: "fit-content", fontSize: "unset" }} value={editData.pin} onChange={(e) => { setEditData({ ...editData, pin: e.target.value }) }} /></h4>
                <h4>Mark yourself as donor:
                  <label className="switch mx-3">
                    <input type="checkbox" checked={editData.donor_check} onChange={(e) => { setEditData({ ...editData, donor_check: e.target.checked }) }} />
                    <span className="slider round"></span>
                  </label>
                </h4>
              </>
              :
              <>
                <h4>Name: <span className='mx-3' style={{ color: "#d93444" }}>{data.name}</span></h4>
                <h4>Gmail: <span className='mx-3' style={{ color: "#d93444" }}>{data.gmail}</span></h4>
                <h4>Mobile No: <span className='mx-3' style={{ color: "#d93444" }}>{data.mobile}</span></h4>
                <h4>Blood: <span className='mx-3' style={{ color: "#d93444" }}>{data.blood}</span></h4>
                <h4>Pin: <span className='mx-3' style={{ color: "#d93444" }}>{data.pin}</span></h4>
                <h4 className='d-flex align-items-center'>Mark yourself as donor:
                  {
                    data.donor_check ?
                      <i className="fa fa-check px-0 mx-3 text-success" style={{ fontSize: "larger" }}></i>
                      :
                      <i className="fa fa-times px-0 mx-3 text-danger" style={{ fontSize: "larger" }}></i>
                  }
                </h4>
              </>
          }
        </form>
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

export default Me
