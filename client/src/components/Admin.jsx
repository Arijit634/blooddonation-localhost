import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Admin = (userData) => {
  const [users, setUsers] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    // Fetch users data from the server
    fetch("http://localhost:5000/getAllUser", 
    {
      method:"GET",
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,userData);
      setdata(data.data);
    });
  }, []);


  const deleteUser = (id, name) => {
    if (window.confirm(`Delete? ${name} with id ${id}`)) {
      axios
        .post("http://localhost:5000/deleteUser", { userId: id })
        .then((response) => {
          alert(response.data.data);
          // Refresh the user list after successful deletion
          setdata(data.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <div>
      <h2>Admin Panel</h2>
      <table className="messages-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Blood Type</th>
            <th>Pin</th>
            <th>Delete</th>
          </tr>
          {data.map(i=>{
            return(
              <tr>
                <td>{i.name}</td>
                <td>{i.gmail}</td>
                <td>{i.mobile}</td>
                <td>{i.blood}</td>
                <td>{i.pin}</td>
                <td>
                  <FontAwesomeIcon icon={faTrash} onClick={()=>deleteUser(i._id,i.name)}/>
                </td>
              </tr>
            );
          })}
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.blood}</td>
              <td>{user.pin}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
