import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState({});

  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const inputLogin = async (e) => {
    try {
      e.preventDefault();
      const { gmail, password } = data;

      // Check if it is admin login
      if (gmail === process.env.REACT_APP_ADMIN_EMAIL && password === process.env.REACT_APP_ADMIN_PASSWORD) {
        // Perform admin login
        dispatch({ type: 'ADMIN_LOGIN', payload: true });
        dispatch({ type: 'USER', payload: false }); // Reset user login status
        localStorage.setItem('adminLoggedIn', JSON.stringify(true)); // Store admin login status in local storage
        localStorage.setItem('user', JSON.stringify(false)); // Reset user login status in local storage
        history('/admin');
      } else {
        // Perform normal user login
        await axios
          .post(
            '/login',
            { gmail, password },
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
              toast.success('Login Successfully');
              dispatch({ type: 'USER', payload: true });
              dispatch({ type: 'ADMIN_LOGIN', payload: false }); // Reset admin login status
              localStorage.setItem('user', JSON.stringify(true)); // Store user login status in local storage
              localStorage.setItem('adminLoggedIn', JSON.stringify(false)); // Reset admin login status in local storage
              history('/');
            } else {
              window.alert('Something wrong');
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <form>
          <input
            onChange={inputData}
            placeholder="Enter your gmail.."
            type="email"
            name="gmail"
            id=""
            className="form-control"
          />
          <input
            onChange={inputData}
            placeholder="Enter your password.."
            type="password"
            name="password"
            id=""
            className="form-control"
          />
          <button className="btn btn-sm btn-primary w-100" onClick={inputLogin}>
            Login
          </button>
          <div>
            <p>or</p>
            <Link to={'/signup'}>SignUp</Link>
          </div>
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
  );
};

export default Login;
