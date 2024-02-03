import { useState } from "react";
import PGOwnerContext from "../Objects/PGOwnerContext.mjs";

const PGOwnerState = (props) => {


    const [pgData, setpgData] = useState(null);
    const [address, setaddress] = useState(null);
    const [formData, setformData] = useState(null);
    const [newuserId, setnewuserId] = useState(null);
    const [profileName, setprofileName] = useState(null);
    const [profileEmail, setprofileEmail] = useState(null);



    const resetForm = ()=>{
      setformData({
        OwnerName : "",
        OwnerEmail:"",
        ContactNumber:"",
        AdhaarNumber:"",
        OwnerFullAddress:"",
        OwnerState:"",
        City:"",
        Pincode:"",
        NearestPoliceStation:"",
        Landmark:"",
        NoOfRooms:"",
        NoOfBeds:"",
        NoOfAccomodation:"",
        AirConditioner:"",
        SeparateMeter:"",
        Refrigeretor:"",
        WifiAvailable:"",
        ImageUrl:"",
        Rent:""
        });
    }
    const newedit = (obj) => {
        setformData(obj);
      };    
      const getLogin = (data) => {
        console.log(data);
        setnewuserId(data===""?null:data);
      };
      const getUser = (data) => {
        setprofileName(data===""?null:data);
      };
      const getEmail = (data) => {
        setprofileEmail(data===""?null:data);
      };
      const funcPgview = (obj) => {
        setpgData(obj);
      };
      const event_to_address = (my_address) => {
        setaddress(my_address);
      };

    console.log("PG Owner State is Called...");

    return (
        <PGOwnerContext.Provider value={{
            // Variables 
            formData,
            pgData,
            address,
            newuserId,
            profileName,
            profileEmail,

            // Variable Setter Functions  
            setformData,
            setpgData,
            setaddress,
            setnewuserId,
            setprofileName,
            setprofileEmail,

            // Variable getter Functions  
            resetForm,
            newedit,
            getLogin,
            getUser,
            getEmail,
            funcPgview,
            event_to_address
            
            }}>
            {props.children}
        </PGOwnerContext.Provider>
    )
}

export default PGOwnerState;