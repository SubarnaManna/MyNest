import React, { useState, useEffect } from "react";
import "../style/showpg.css";
import { storage } from "./accomodation.js";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const Showpg = (props) => {
  const navigate = useNavigate();
  const [imgUrl, setimgUrl] = useState("");
  let eventFunc = () => {
    props.event1(props.obj);
    navigate("/fulldetails");
  }
  useEffect(() => {
    let getUrlImage = async () => {
      const storageRef = ref(storage, `${props.obj.OwnerUserId}&${props.obj.AdhaarNumber}/${props.obj.ImageUrl}`);
      let url = await getDownloadURL(storageRef);
      setimgUrl(url);
    }
    getUrlImage();
  }, []);

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl])
  return (
    <div>
      <div className="pg-card-show">
        <div className="pg-inner-card-show" data-aos="flip-up">
          <img
            className="pg-card-img"
            src={imgUrl !== "" ? imgUrl : "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1580286746/Website/CMS-Uploads/fmbctxc7r2oosciiiaqt.jpg"}
            alt=""
          />
          {/* <h2 className="pg-name">Hello World PG</h2> */}
          <p className="address">
            {props.obj.OwnerFullAddress + ", " + "near " + props.obj.Landmark + ", " + props.obj.City + ", " + props.obj.OwnerState}
            <p>{props.obj.City} : {props.obj.Pincode}</p>
          </p>
          <h3 className="pg-room-price">{props.obj.Rent}</h3>
          <button className="view-pg-details" onClick={eventFunc}>View PG Details</button>
        </div>
      </div>
    </div>
  );
};

export default Showpg;