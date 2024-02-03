import React, { useEffect, useState, useContext } from "react";
import "../../style/PG/pgcard.css";
import { storage } from "../../Firebase/RealtimeDatabase/accomodation.js";
import { ref , getDownloadURL } from "firebase/storage";
import { removeData } from "../../Firebase/RealtimeDatabase/accomodation.js";
import { useNavigate } from "react-router-dom";
import PGOwnerContext from "../../Contexts/Objects/PGOwnerContext.mjs";

const Pgcard = (props) => {
  const __PGOwnerContext = useContext(PGOwnerContext);
  const navigate = useNavigate();
  const [imgUrl,setimgUrl] = useState("");

  let delData = async()=>{
    let Delete = window.confirm("ARE YOU CONFIRM THAT YOU WANT TO DELETE THE DATA?");
    if(Delete){
      let rData = await removeData(`OwnerInformationTable/${__PGOwnerContext.formData.OwnerUserId}&${__PGOwnerContext.formData.AdhaarNumber}`);
      alert("Data Removed Successfully");
    }
  }

  let editData = ()=>{
    // props.edit(__PGOwnerContext.formData);
    // __PGOwnerContext.setformData(__PGOwnerContext.formData);
    navigate("/editform");
  }

  useEffect(()=>{
    const storageRef = ref(storage, `${__PGOwnerContext.formData.OwnerUserId}&${__PGOwnerContext.formData.AdhaarNumber}/${__PGOwnerContext.formData.ImageUrl}`);
    getDownloadURL(storageRef).then((url)=>{
      setimgUrl(url);
    }).catch((e)=>{
      console.log(e);
    });
  },[]);

  useEffect(()=>{
    console.log(imgUrl);
  },[imgUrl])

  return (
    <div className="pg-details-all" data-aos="zoom-in">
      <div className="pg-img"><img src={imgUrl} height="150px"/></div>
      <div className="pg-details">
        <h4>Ownername : {__PGOwnerContext.formData.OwnerName}</h4>
        <h4>PG address : {__PGOwnerContext.formData.OwnerFullAddress}</h4>
        <h4>City : {__PGOwnerContext.formData.City}</h4>
        <h4>State : {__PGOwnerContext.formData.OwnerState}</h4>
        <h4>Room Price(per month) : ₹{__PGOwnerContext.formData.Rent}</h4>
      </div>
      <div className="edit-delete-btn">
        <button className="edit" onClick={editData}>Edit</button>
        <button className="delete" onClick={delData}>Delete</button>
      </div>
    </div>
  );
};

export default Pgcard;