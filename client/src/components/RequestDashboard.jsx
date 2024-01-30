import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment";

const RequestDashboard = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();

  const [userId, setUserId] = useState("");
  const [isDonor, setIsDonor] = useState(false);

  const [bloodRequestList, setBloodRequestList] = useState([]);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    axios
      .get("/getUser", {
        headers: {
          Accept: "application/json",
          "content-type": "application/json; charset=utf-8",
        },
        Credential: "include",
      })
      .then((res) => {
        setUserId(res.data._id);
        setIsDonor(res.data.donor_check);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("You have to login first");
          history("/login");
        } else {
          console.log(err);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "/getBloodRequestList",
        { blood_group: bloodGroup, pin_code: pincode, status_filter: true },
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json; charset=utf-8",
          },
          Credential: "include",
        }
      )
      .then((res) => {
        setBloodRequestList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bloodGroup, pincode]);

  const acceptBloodRequest = async (brid) => {
    try {
      await axios
        .post(
          `/acceptBloodRequest`,
          {
            bloodRequestId: brid,
            acceptorId: userId,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "content-type": "application/json; charset=utf-8",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success("Request Accepted Successfully");
            window.location.reload();
          } else {
            window.alert("Something wrong");
          }
        })
        .catch((err) => {
          toast.warning(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="m-5 p-3"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <h3>Blood Request Dashboard</h3>
        <div>
          <div className="row">
            <div className="col-md-4">
              <div>
                <label className="required">Blood Group</label>
              </div>
              <Select
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (x) => {
                    return { label: x, value: x };
                  }
                )}
                value={
                  bloodGroup == null
                    ? null
                    : { label: bloodGroup, value: bloodGroup }
                }
                onChange={(val) => {
                  setBloodGroup(val == null ? null : val.value);
                }}
                placeholder={"Select Blood Group"}
                isClearable
                styles={{
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color: "#d93444",
                  }),
                }}
              />
            </div>
            <div className="col-md-4">
              <div>
                <label className="required">Pincode</label>
              </div>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="row" style={{ fontWeight: "bold" }}>
              <div className="col-md-1 px-1">
                <span>Sl No.</span>
              </div>
              <div className="col-md-1 px-1">
                <span>Blood Group</span>
              </div>
              <div className="col-md-1 px-1">
                <span>Pincode</span>
              </div>
              <div className="col-md-2 px-1">
                <span>Expiry Date</span>
              </div>
              <div className="col-md-2 px-1">
                <span>Name</span>
              </div>
              <div className="col-md-2 px-1">
                <span>Email</span>
              </div>
              <div className="col-md-1 px-1">
                <span>Contact No.</span>
              </div>
              {isDonor && (
                <div className="col-md-2 d-flex px-1 justify-content-center">
                  <span>Respond</span>
                </div>
              )}
            </div>
            {bloodRequestList.length == 0 ? (
              <div>No Request Currently</div>
            ) : (
              bloodRequestList.map((obj, i) => {
                return (
                  <div key={i} className="row">
                    <div className="col-md-1 px-1 d-flex align-items-center">
                      <span>{i + 1}</span>
                    </div>
                    <div className="col-md-1 px-1 d-flex align-items-center">
                      <span>{obj.blood_group}</span>
                    </div>
                    <div className="col-md-1 px-1 d-flex align-items-center">
                      <span>{obj.pin_code}</span>
                    </div>
                    <div className="col-md-2 px-1 d-flex align-items-center">
                      <span>{moment(obj.expiry_date).format("lll")}</span>
                    </div>
                    <div className="col-md-2 px-1 d-flex align-items-center">
                      <span>{obj.name}</span>
                    </div>
                    <div className="col-md-2 px-1 d-flex align-items-center">
                      <span>{obj.email}</span>
                    </div>
                    <div className="col-md-1 px-1 d-flex align-items-center">
                      <span>{obj.phone}</span>
                    </div>
                    {isDonor && (
                      <div className="col-md-2 px-1 d-flex align-items-center justify-content-center">
                        <svg
                          viewBox="0 0 48 48"
                          width="32px"
                          height="32px"
                          onClick={() => {
                            acceptBloodRequest(obj._id);
                          }}
                        >
                          <linearGradient
                            id="TpFkpHq7AGWb~Tkla4kyga"
                            x1="24"
                            x2="24"
                            y1="6.121"
                            y2="42.039"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#9dffce" />
                            <stop offset="1" stopColor="#50d18d" />
                          </linearGradient>
                          <path
                            fill="url(#TpFkpHq7AGWb~Tkla4kyga)"
                            d="M40,42H8c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2v32C42,41.1,41.1,42,40,42z"
                          />
                          <linearGradient
                            id="TpFkpHq7AGWb~Tkla4kygb"
                            x1="13"
                            x2="36"
                            y1="24.793"
                            y2="24.793"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset=".824" stopColor="#135d36" />
                            <stop offset=".931" stopColor="#125933" />
                            <stop offset="1" stopColor="#11522f" />
                          </linearGradient>
                          <path
                            fill="url(#TpFkpHq7AGWb~Tkla4kygb)"
                            d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414 c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414 c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })
            )}
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
  );
};

export default RequestDashboard;
