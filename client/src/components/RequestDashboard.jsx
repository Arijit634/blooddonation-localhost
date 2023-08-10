import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Select from "react-select"
import moment from "moment"

const RequestDashboard = () => {
  const history = useNavigate()

  const [userId, setUserId] = useState("")

  const [bloodRequestList, setBloodRequestList] = useState([])
  const [bloodGroup, setBloodGroup] = useState(null)
  const [pincode, setPincode] = useState("")


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

  useEffect(() => {
    axios.post("/getBloodRequestList", { blood_group: bloodGroup, pin_code: pincode }, {
      headers: {
        Accept: "application/json",
        'content-type': 'application/json; charset=utf-8',
      },
      Credential: "include"
    }).then((res) => {
      setBloodRequestList(res.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }, [bloodGroup, pincode]);

  const submitBloodRequest = async () => {
    // try {
    //   if(!bloodGroup){
    //     toast.error("Blood Group is Required");
    //     return;
    //   }
    //   if(pinCode==""){
    //     toast.error("Pincode is Required");
    //     return;
    //   }
    //   if(expiryDate==""){
    //     toast.error("Expiry Date is Required");
    //     return;
    //   }
    //   if(name==""){
    //     toast.error("Requester Name is Required");
    //     return;
    //   }
    //   if(email==""){
    //     toast.error("Contact Email is Required");
    //     return;
    //   }

    //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailPattern.test(email)) {
    //     toast.error('Please enter a valid email');
    //     return;
    //   }

    //   if(phone==""){
    //     toast.error("Contact Phone No. is Required");
    //     return;
    //   }

    //   await axios
    //     .post(
    //       `/generateBloodRequest`, 
    //       {
    //         blood_group: bloodGroup,
    //         pin_code: pinCode,
    //         expiry_date: expiryDate,
    //         name: name,
    //         email: email,
    //         phone: phone,
    //         message: message
    //       },
    //       {
    //         headers: {
    //           'Access-Control-Allow-Origin': '*',
    //           'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //           'content-type': 'application/json; charset=utf-8',
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       if (res.status === 201) {
    //         toast.success('Request Generated Successfully');
    //         window.location.reload()
    //       } else {
    //         window.alert('Something wrong');
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error(err.response.data.message);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <div className='m-5 p-3' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
        <h3>Blood Request Dashboard</h3>
        <div>

          <div className='row'>
            <div className='col-md-4'>
              <div><label className='required'>Blood Group</label></div>
              <Select
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(x => { return { label: x, value: x } })}
                value={bloodGroup == null ? null : { label: bloodGroup, value: bloodGroup }}
                onChange={(val) => { setBloodGroup(val==null?null:val.value); }}
                placeholder={"Select Blood Group"}
                isClearable
                styles={{ dropdownIndicator: (baseStyles) => ({ ...baseStyles, color: "#d93444" }) }}
              />
            </div>
            <div className='col-md-4'>
              <div><label className='required'>Pincode</label></div>
              <input type='text' className='form-control' value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
            </div>
          </div>

          <div>
            <div className='row' style={{fontWeight:"bold"}}>
                <div className='col-md-1 px-1'><span>Sl No.</span></div>
                <div className='col-md-1 px-1'><span>Blood Group</span></div>
                <div className='col-md-1 px-1'><span>Pincode</span></div>
                <div className='col-md-2 px-1'><span>Expiry Date</span></div>
                <div className='col-md-2 px-1'><span>Name</span></div>
                <div className='col-md-3 px-1'><span>Email</span></div>
                <div className='col-md-1 px-1'><span>Contact No.</span></div>
                {/* <div className='col-md-3 px-1'><span>Message</span></div> */}
            </div>
            {
              bloodRequestList.length == 0 ? <div>No Request Currently</div> :
                bloodRequestList.map((obj, i) => {
                  return (
                    <div className='row'>
                      <div className='col-md-1 px-1'><span>{i+1}</span></div>
                      <div className='col-md-1 px-1'><span>{obj.blood_group}</span></div>
                      <div className='col-md-1 px-1'><span>{obj.pin_code}</span></div>
                      <div className='col-md-2 px-1'><span>{moment(obj.expiry_date).format("lll")}</span></div>
                      <div className='col-md-2 px-1'><span>{obj.name}</span></div>
                      <div className='col-md-3 px-1'><span>{obj.email}</span></div>
                      <div className='col-md-1 px-1'><span>{obj.phone}</span></div>
                      {/* <div className='col-md-3 px-1'><span>{obj.message}</span></div> */}
                      {/* <button className='btn btn-danger' onClick={() => { submitBloodRequest() }}>Submit</button> */}
                    </div>
                  )
                })
            }
          </div>

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

export default RequestDashboard

