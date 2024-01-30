import "./App.scss";
import React, { createContext, useReducer, useState } from "react";
import { initialState, reducer } from "./reducer/UseReducer.js";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ViewMessages from "./components/ViewMessages";
import Body from "./components/Body";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Me from "./components/Me";
import Logout from "./components/Logout";
import Contact from "./components/Contact";
import UserData from "./components/UserData";
import DonationRequest from "./components/DonationRequest";
import RequestDashboard from "./components/RequestDashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [responce, setResponce] = useState();

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Me" element={<Me />} />
            <Route path="/userdata" element={<UserData />} />
            <Route path="/donation-request" element={<DonationRequest />} />
            <Route path="/request-dashboard" element={<RequestDashboard />} />
            {state.adminLoggedIn ? (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/viewmessages" element={<ViewMessages />} />
              </>
            ) : (
              <>
                <Route path="/admin" element={<Navigate to="/login" />} />
                <Route
                  path="/viewmessages"
                  element={<Navigate to="/login" />}
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
