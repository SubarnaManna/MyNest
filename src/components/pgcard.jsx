import React, { useEffect, useState } from "react";
import "../style/pgcard.css";
import { storage } from "./accomodation.js";
import { ref , getDownloadURL } from "firebase/storage";
import { removeData } from "./accomodation.js";
import { useNavigate } from "react-router-dom";

const Pgcard = (props) => {
  const navigate = useNavigate();

  const [imgUrl,setimgUrl] = useState("");

  let delData = async()=>{
    let Delete = window.confirm("ARE YOU CONFIRM THAT YOU WANT TO DELETE THE DATA?");
    if(Delete){
      let rData = await removeData(`OwnerInformationTable/${props.obj.OwnerUserId}&${props.obj.AdhaarNumber}`);
      alert("Data Removed Successfully");
    }
  }

  let editData = ()=>{
    props.edit(props.obj);
    navigate("/editform");
  }

  useEffect(()=>{
    let getUrlImage = async()=>{
    const storageRef = ref(storage, `${props.obj.OwnerUserId}&${props.obj.AdhaarNumber}/${props.obj.ImageUrl}`);
    let url = await getDownloadURL(storageRef);
      setimgUrl(url);
    }
    getUrlImage();
  },[]);

  useEffect(()=>{
    console.log(imgUrl);
  },[imgUrl])

  return (
    <div className="pg-details-all" data-aos="zoom-in">
      <div className="pg-img"><img src={imgUrl} height="150px"/></div>
      <div className="pg-details">
        <h4>Ownername : {props.obj.OwnerName}</h4>
        <h4>PG address : {props.obj.OwnerFullAddress}</h4>
        <h4>City : {props.obj.City}</h4>
        <h4>State : {props.obj.OwnerState}</h4>
        <h4>Room Price(per month) : {props.obj.Rent}</h4>
      </div>
      <div className="edit-delete-btn">
        <button className="edit" onClick={editData}>Edit</button>
        <button className="delete" onClick={delData}>Delete</button>
      </div>
    </div>
  );
};

export default Pgcard;