import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './adminpanel.scss';
const ViewMessages = (userData) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    // Fetch user messages from the server
    fetch("http://localhost:5000/getAllUserMessages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, userData);
        setdata(data.data);
      });
  }, []);

  const deleteMessage = (userId, messageId) => {
    if (window.confirm("Delete this message?")) {
      axios
        .post("/deleteMessage", { userId, messageId })
        .then((response) => {
          alert(response.data.message);
          // Refresh the message list after successful deletion
          setdata((prevData) => {
            const updatedData = prevData.map((user) => {
              if (user._id === userId) {
                user.messages = user.messages.filter(
                  (message) => message._id !== messageId
                );
              }
              return user;
            });
            return updatedData;
          });
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
            <th>Message</th>
            <th>Date</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
          {data.map((user) => {
            return user.messages.map((message, index) => (
              <tr key={index}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.phone}</td>
                <td>{message.message}</td>
                <td>{new Date(message.date).toLocaleDateString()}</td>
                <td>{new Date(message.date).toLocaleTimeString()}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteMessage(user._id, message._id)}
                  />
                </td>
              </tr>
            ));
          })}
        </thead>
      </table>
    </div>
  );
};

export default ViewMessages;
