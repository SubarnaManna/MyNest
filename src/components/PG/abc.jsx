import React, { useState, useEffect } from "react";
import "../style/showpg.css";
import { storage } from "./accomodation.js";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const ABC = () => {

    return (
        <>
            <div className="pg-card-show">
                <div className="pg-inner-card-show">
                    <img
                        className="pg-card-img"
                        src="https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180" alt=""
                    />
                    {/* <h2 className="pg-name">Hello World PG</h2> */}
                    <p className="address">
                    beleghata,kolka
                    </p>
                    <h3 className="pg-room-price">700</h3>
                    <button className="view-pg-details" >View PG Details</button>
                </div>
            </div>
        </>
    );
};

export default ABC;