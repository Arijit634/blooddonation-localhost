import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import "./userdata.scss"
import avater from "./avater.png"
import { UserContext } from '../App'
import { useLocation } from 'react-router-dom'
const Data = ({ blood, name, email, pin, phone }) => {

  return (
    <>
      <div className='card' >
        {/* <div className="header"></div> */}
        <img src={avater} alt="" />
        <div className="footer">
          <div>
            <h3><span className="material-symbols-outlined">person</span>{name}</h3>
          </div>
          <div>
            <h3><span className="material-symbols-outlined">email</span>{email}</h3>
          </div>
          <div>
            <h3><span className="material-symbols-outlined">call</span>{phone}</h3>
          </div>
          <div>
            <h3><span className="material-symbols-outlined">bloodtype</span>{blood}</h3>
          </div>
          <div>
            <h3><span className="material-symbols-outlined">location_on</span>{pin}</h3>
          </div>
        </div>

      </div>

    </>
  )
}


const UserData = () => {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation()
  const Length = location.state.Data.length;
  //for verify
  const UserVerify = async () => {
    try {
      await axios.get("/userVerify", {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'content-type': 'application/json; charset=utf-8'
        }
      }).then((res) => {
        if (res.status === 201) {
          dispatch({ type: "USER", payload: true });
        }
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    UserVerify();
  }, [])
  return (
    <>
      <div className='Userdata'>
        <h4>Search Result : </h4><h4 style={{ color: "#d93444", marginLeft: "5px" }}>{Length}</h4>
      </div>
      <section className='section'>
        {
          location.state.Data.map((item, index) => (
            <Data key={index} blood={item.blood} name={item.name} email={item.gmail} pin={item.pin} phone={item.mobile} />
          ))
        }

      </section>
    </>
  )
}

export default UserData
