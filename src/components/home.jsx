import React, { useState } from "react";
import "../style/home.css";
import Showpg from "./showpg.jsx";
import SearchEngine from "./searchEngine.jsx";
import { listCard } from "./accomodation.js";
import No_data_found from "./no_data_found.jsx";

const Home = (props) => {
  const [searchCard, setsearchCard] = useState([]);
  const [seCondi, setseCondi] = useState({
    mode: "",
    val: "",
    address: "",
  });

  let handleUndefine = async () => {
    if (seCondi.mode === "location") {
      let response = await listCard("City", seCondi.val);
      console.log(response);
      if (response !== null || response !== undefined) {
        setsearchCard(response);
      } else {
        setsearchCard(response);
      }
    } else {
      let response = await listCard("Pincode", seCondi.val);
      console.log(response);
      if (response !== null || response !== undefined) {
        setsearchCard(response);
      } else {
        setsearchCard(response);
      }
    }
  };

  let homeLoc = async (sCond1) => {
    setseCondi({
      mode: "location",
      val: sCond1.location.toUpperCase(),
      address: sCond1.address,
    });
    console.log(sCond1.location);
    let str1 = sCond1.location.toUpperCase();
    let response = await listCard("City", str1);
    console.log(response);
    if (response !== null || response !== undefined) {
      setsearchCard(response);
    } else {
      setsearchCard(response);
    }
  };
  let homePin = async (sCond2) => {
    setseCondi({
      mode: "pincode",
      val: sCond2.pincode.toString(),
      address: sCond2.address,
    });
    console.log(sCond2.pincode);
    let pin = sCond2.pincode.toString();
    let response = await listCard("Pincode", pin);
    console.log(response);
    if (response !== null || response !== undefined) {
      setsearchCard(response);
    } else {
      setsearchCard(response);
    }
  };
  let fullviewevent = (obj) => {
    props.event2(obj);
    props.newevent(seCondi.address);
  };
  return (
    <>
      <div className="headline" data-aos="fade-right">
        <h1 id="caption">Comfortable, Connected, Convenient Living!</h1>
        <SearchEngine func1={homeLoc} func2={homePin} />
      </div>
      <div className="show-pg-cards">
      {searchCard === undefined && (
        <button className="show-btn" onClick={handleUndefine}>
          Show Pg
        </button>
      )}
      {searchCard === null || searchCard === undefined ? (
        <No_data_found type="PG" />
      ) : (
        
        Object.values(searchCard).map((e) => {
          return   <Showpg obj={e} event1={fullviewevent} />;
  
            
            

          
        })
      
      )}
      </div>
    </>
  );
};

export default Home;
