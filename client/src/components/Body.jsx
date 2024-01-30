import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import User from "./User";

const Body = () => {
  const { state, dispatch } = useContext(UserContext);

  const UserVerify = async () => {
    try {
      await axios
        .get('/userVerify', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'content-type': 'application/json; charset=utf-8',
          },
        })
        .then((res) => {
          if (res.status === 201) {
            dispatch({ type: 'USER', payload: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserVerify();
  }, []);

  return (
    <>
      <div>
        <header className="continer-fluid ">
          <div className="header-top">
            <div className="container">
              <div className="row col-det"></div>
            </div>
          </div>
        </header>

        {/* ################# Slider Starts Here#######################-*/}
        <div className="slider-detail" id="slider">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="assets/images/slider/slider1.jpg" alt="First slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="bounceInDown">Donate Blood & Save a Life</h5>
                  <p className="bounceInLeft">
                    Welcome to our blood donation website, where saving lives is just a heartbeat, <br />
                    away. Discover the power of giving and join us in making a difference through <br />
                    the selfless act of donating blood.
                  </p>
                  <div className=" vbh">
                    <Link className="btn btn-success bounceInUp" to={"/donation-request"} style={{ color: "white" }}>Request Blood</Link>
                    <Link className="btn btn-success bounceInUp" to={"/contact"} style={{ color: "white" }}>Contact US</Link>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="assets/images/slider/ezgif.com-resize.jpg" alt="Third slide" />
                <div className="carousel-caption vdg-cur d-none d-md-block">
                  <h5 className="bounceInDown">Donate Blood & Save a Life</h5>
                  <p className="bounceInLeft">
                    Welcome to our blood donation website, where saving lives is just a heartbeat, <br />
                    away. Discover the power of giving and join us in making a difference through <br />
                    the selfless act of donating blood.
                  </p>
                  <div className=" vbh">
                    <>{state.user ? <Link className="btn btn-success bounceInUp" to={"/me"} style={{ color: "white" }}>Donate Blood</Link>:<Link className="btn btn-success bounceInUp" to={"/login"} style={{ color: "white" }}>Donate Blood</Link>}
                    </>
                    <Link className="btn btn-success bounceInUp" to={"/contact"} style={{ color: "white" }}>Contact US</Link>
                  </div>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        {/* ################# About Us Starts Here #######################-*/}
        <section id="about" className="contianer-fluid about-us">
          <div className="container">
            <div className="row session-title">
              <h2>About Us</h2>
            </div>
            <div className="row">
              <div className="col-md-6 text">
                <h2>About Blood Donors</h2>
                <p>
                  Blood donors are the unsung heroes who make a profound impact on countless lives. Their selfless act of
                  donating blood provides hope and healing to those in need. Every drop of donated blood is a lifeline
                  that can bring solace to accident victims, patients undergoing surgeries, individuals battling chronic
                  illnesses, and many others. The significance of blood donors cannot be overstated. By giving a part of
                  themselves, these compassionate individuals contribute to the well-being of their communities. Their
                  generosity and courage inspire others to follow suit, fostering a culture of empathy and support.
                  Together, blood donors are the backbone of our healthcare system, embodying the true essence of
                  humanity and saving lives with every precious donation.
                </p>
              </div>
              <div className="col-md-6 image">
                <img className="blood-group" style={{ width: '200px' }} src="https://e0.pxfuel.com/wallpapers/44/247/desktop-wallpaper-blood-donation-png-2-png.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* ################# Gallery Start Here #######################-*/}
        <div id="gallery" className="gallery container-fluid">
          <div className="container">
            <div className="row session-title">
              <h2>Checkout Our Gallery</h2>
            </div>
            <div className="gallery-row col">
              <div id="gg-screen" />
              <div className="gg-box">
                <div className="gg-element">
                  <img src="assets/images/gallery/g1.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g2.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g3.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g4.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g5.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g6.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g7.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g8.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g9.jpg" alt="" />
                </div>
                <div className="gg-element">
                  <img src="assets/images/gallery/g10.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ################# Donation Process Start Here #######################-*/}
        <section id="process" className="donation-care">
          <div className="container">
            <div className="row session-title">
              <h2>Donation Process</h2>
              <p style={{ textAlign: 'center' }}>The donation process from the time you arrive center until the time you leave</p>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6 vd">
                <div className="bkjiu">
                  <img src="assets/images/gallery/g1.jpg" alt="" />
                  <h4>
                    <b>1 - </b>Registration
                  </h4>
                  <p>Complete the registration process by providing your details and medical history.</p>
                  
                </div>
              </div>
              <div className="col-md-3 col-sm-6 vd">
                <div className="bkjiu">
                  <img src="assets/images/gallery/g2.jpg" alt="" />
                  <h4>
                    <b>2 - </b>Screening
                  </h4>
                  <p>Undergo a thorough screening process to ensure your eligibility for blood donation.</p>
                  
                </div>
              </div>
              <div className="col-md-3 col-sm-6 vd">
                <div className="bkjiu">
                  <img src="assets/images/gallery/g3.jpg" alt="" />
                  <h4>
                    <b>3 - </b>Donation
                  </h4>
                  <p>Proceed with the blood donation process under the supervision of trained professionals.</p>
                  
                </div>
              </div>
              <div className="col-md-3 col-sm-6 vd">
                <div className="bkjiu">
                  <img src="assets/images/gallery/g4.jpg" alt="" />
                  <h4>
                    <b>4 - </b>Save Lives
                  </h4>
                  <p>Your donated blood will be used to save lives and provide necessary medical treatments.</p>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Body;
