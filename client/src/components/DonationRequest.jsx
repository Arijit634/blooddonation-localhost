import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Select from "react-select"

const DonationRequest = () => {
  const history = useNavigate()

  const [userId, setUserId] = useState("")

  const [bloodGroup, setBloodGroup] = useState(null)
  const [pinCode, setPinCode] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios.get("/getUser", {
      headers: {
        Accept: "application/json",
        'content-type': 'application/json; charset=utf-8',
      },
      Credential: "include"
    }).then((res) => {
      setUserId(res.data._id)
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        toast.warn("You have to login first");
        history("/login");
      } else {
        console.log(err);
      }
    });
  }, []);

  const submitBloodRequest = async () => {
    try {
      if(!bloodGroup){
        toast.error("Blood Group is Required");
        return;
      }
      if(pinCode==""){
        toast.error("Pincode is Required");
        return;
      }
      if(expiryDate==""){
        toast.error("Expiry Date is Required");
        return;
      }
      if(name==""){
        toast.error("Requester Name is Required");
        return;
      }
      if(email==""){
        toast.error("Contact Email is Required");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error('Please enter a valid email');
        return;
      }

      if(phone==""){
        toast.error("Contact Phone No. is Required");
        return;
      }

      await axios
        .post(
          `/generateBloodRequest`, 
          {
            blood_group: bloodGroup,
            pin_code: pinCode,
            expiry_date: expiryDate,
            name: name,
            email: email,
            phone: phone,
            message: message
          },
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
            toast.success('Request Generated Successfully');
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
      <div className='m-5 p-3' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
        <h3>Blood Donation Request Form</h3>
        <div>

          <div className='row'>
            <div className='col-md-4'>
              <div><label className='required'>Blood Group</label></div>
              <Select
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(x => { return { label: x, value: x } })}
                value={bloodGroup == null ? null : { label: bloodGroup, value: bloodGroup }}
                onChange={(val) => { setBloodGroup(val.value) }}
                placeholder={"Select Blood Group"}
                styles={{ dropdownIndicator: (baseStyles) => ({ ...baseStyles, color: "#d93444" }) }}
              />
            </div>
            <div className='col-md-4'>
              <div><label className='required'>Pincode</label></div>
              <input type='text' className='form-control' value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
            </div>
            <div className='col-md-4'>
              <div><label className='required'>Expiry Date</label></div>
              <input type='date' className='form-control' value={expiryDate} onChange={(e) => { setExpiryDate(e.target.value) }} />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div><label className='required'>Requester Name</label></div>
              <input type='text' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className='col-md-4'>
              <div><label className='required'>Contact Email</label></div>
              <input type='email' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className='col-md-4'>
              <div><label className='required'>Contact Phone</label></div>
              <input type='text' className='form-control' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div><label>Requester Message</label></div>
              <textarea className='form-control' rows="5" value={message} onChange={(e) => { setMessage(e.target.value) }} />
            </div>
          </div>

          <button className='btn btn-danger' onClick={() => { submitBloodRequest() }}>Submit</button>

        </div>
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

export default DonationRequest

