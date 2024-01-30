import axios from 'axios'
import React, { useEffect ,useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import {UserContext} from "../App"

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();

  const Log = async () => {
    try {
      await axios.get("/logout").then((res) => {
        dispatch({ type: "USER", payload: false });
        localStorage.removeItem("loggedIn"); // Remove the login status from local storage
        history("/login");
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Log();
  }, []);

  return (
    <>
      <div>
        <p>Logout</p>
      </div>
    </>
  );
};

export default Logout