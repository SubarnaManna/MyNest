import React, { useState, useEffect, useContext } from "react";
import "../../style/PG/pgfullview.css";
import { storage } from "../../Firebase/RealtimeDatabase/accomodation.js";
import { ref, getDownloadURL } from "firebase/storage";
import Pgreview from "./PG-Review.jsx";
import { writeFeedback, listFeedback } from "../../Firebase/RealtimeDatabase/accomodation.js";
import LocationMap from "../Map/locationmap.jsx";
import PGOwnerContext from "../../Contexts/Objects/PGOwnerContext.mjs";

const Pgfullview = () => {

  const __PGOwnerContext = useContext(PGOwnerContext);

  const [imgUrl, setimgUrl] = useState("");
  const [feedData, setfeedData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [feedCardData, setfeedCardData] = useState([]);

  let myobject = {
    add1: __PGOwnerContext.address,
    add2:
      __PGOwnerContext.pgData.OwnerFullAddress +
      ", " +
      __PGOwnerContext.pgData.City +
      ", " +
      __PGOwnerContext.pgData.OwnerState,
  };

  let name;
  let value;
  let handleFeedChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setfeedData({ ...feedData, [name]: value });
  };

  let submitFeedback = async () => {
    if (
      feedData.name === "" ||
      feedData.email === "" ||
      feedData.feedback === ""
    ) {
      alert("Please fill all fields in your feedback");
    } else {
      let subFeed = window.confirm("Are you want to submit your Feedback?");
      if (subFeed) {
        await writeFeedback(
          __PGOwnerContext.pgData.AdhaarNumber,
          feedData.name,
          feedData.email,
          feedData.feedback,
        );
        alert("Feedback Added Successfully");
        gData();
        setfeedData({
          name: "",
          email: "",
          feedback: "",
        });
      }
    }
  };
  let gData = async () => {
    let response = await listFeedback(__PGOwnerContext.pgData.AdhaarNumber);
    console.log(response);
    if (response !== null || response !== undefined) {
      setfeedCardData(response);
    } else {
      setfeedCardData(response);
    }
  };

  useEffect(() => {
    let getFeedData = async () => {
      let response = await listFeedback(__PGOwnerContext.pgData.AdhaarNumber);
      console.log(response);
      if (response !== null || response !== undefined) {
        setfeedCardData(response);
      } else {
        setfeedCardData(response);
      }
    };

    let getUrlImage = async () => {
      const storageRef = ref(
        storage,
        `${__PGOwnerContext.pgData.OwnerUserId}&${__PGOwnerContext.pgData.AdhaarNumber}/${__PGOwnerContext.pgData.ImageUrl}`,
      );
      let url = await getDownloadURL(storageRef);
      setimgUrl(url);
    };
    getUrlImage();
    getFeedData();
  }, []);

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);
  useEffect(() => {
    console.log(feedCardData);
  }, [feedCardData]);

  return (
    <>
      <div className="pg-container">
        <div className="pg-img-text">
          <div className="pg-full-img">
            <img
              src={
                imgUrl !== ""
                  ? imgUrl
                  : "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1580286746/Website/CMS-Uploads/fmbctxc7r2oosciiiaqt.jpg"
              }
              alt=""
            />
          </div>
          <div className="pg-full-desc">
            <h1>Hello World</h1>
            <p>
              {__PGOwnerContext.pgData.OwnerFullAddress +
                ", near" +
                __PGOwnerContext.pgData.Landmark +
                ", " +
                __PGOwnerContext.pgData.City +
                ", " +
                __PGOwnerContext.pgData.OwnerState}
            </p>
            <p>
              {__PGOwnerContext.pgData.City} : {__PGOwnerContext.pgData.Pincode}
            </p>
            <h3>₹{__PGOwnerContext.pgData.Rent}</h3>
          </div>
        </div>
        {/* <GetMap location={__PGOwnerContext.pgData.OwnerFullAddress+" kolkata, 700010"}/> */}
        {/* <GetMap location={__PGOwnerContext.pgData.OwnerFullAddress.toLowerCase()} name="X-frame-Options"/> */}

        <div className="pg-info">
          <p class="room-info">Owner Name : {__PGOwnerContext.pgData.OwnerName}</p>
          <p class="room-info">Email Id : {__PGOwnerContext.pgData.OwnerEmail}</p>
          <p class="room-info"> Contact Number : {__PGOwnerContext.pgData.ContactNumber}</p>

          <p class="room-info">State : {__PGOwnerContext.pgData.OwnerState}</p>
          <p class="room-info">City : {__PGOwnerContext.pgData.City}</p>
          <p class="room-info">Pincode : {__PGOwnerContext.pgData.Pincode}</p>
          <p class="room-info">Landmark : {__PGOwnerContext.pgData.Landmark}</p>
          <p class="room-info">No of Rooms : {__PGOwnerContext.pgData.NoOfRooms}</p>
          <p class="room-info">No of Beds : {__PGOwnerContext.pgData.NoOfBeds}</p>
          <p class="room-info">
            Air conditioner available : {__PGOwnerContext.pgData.AirConditioner}
          </p>
          <p class="room-info">
            Separate Meter installed : {__PGOwnerContext.pgData.SeparateMeter}
          </p>
          <p class="room-info">Refrigetor : {__PGOwnerContext.pgData.Refrigeretor}</p>
          <p class="room-info">WiFi Available : {__PGOwnerContext.pgData.WifiAvailable}</p>
        </div>

        <LocationMap location={myobject} />

        <div className="review-form">
          <h2>Leave your Feedback</h2>
          <div className="review-form-input">
            <input
              type="text"
              name="name"
              value={feedData.name}
              onChange={handleFeedChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              value={feedData.email}
              onChange={handleFeedChange}
              id=""
              placeholder="email"
            />
          </div>
          <textarea
            placeholder="Your Feedback"
            name="feedback"
            value={feedData.feedback}
            onChange={handleFeedChange}
            id=""
            cols="70"
            rows="10"
          ></textarea>
          <div className="post-show-btn">
            <button type="submit" onClick={submitFeedback}>
              POST
            </button>
            <button onClick={gData}>Show Comments</button>
          </div>
        </div>
        {feedCardData === null || feedCardData === undefined ? (
          <h2 className="feedback-count">0 results found</h2>
        ) : (
          <h2 className="feedback-count">
            {Object.values(feedCardData).length} results found
          </h2>
        )}
        {feedCardData === null || feedCardData === undefined ? (
          <h3>No Comments Found</h3>
        ) : (
          Object.values(feedCardData).map((e) => {
            return <Pgreview obj={e} />;
          })
        )}
      </div>
    </>
  );
};

export default Pgfullview;
