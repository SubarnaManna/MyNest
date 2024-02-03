import React, { useState } from 'react';
import {writeUserData} from "./accomodation.js";
import { storage } from "./accomodation.js";
import { ref , uploadBytes } from "firebase/storage";
import "../style/form.css";
import Spinner from './spinner.jsx';

const Form = (props) => {
  const [spin,setspin] = useState(false);
  const [Img,setImg] = useState(null);
  const [Data, setData] = useState({
    OwnerName : props.Fdata.OwnerName,
    OwnerEmail: props.Fdata.OwnerEmail,
    ContactNumber: props.Fdata.ContactNumber,
    AdhaarNumber: props.Fdata.AdhaarNumber,
    OwnerFullAddress: props.Fdata.OwnerFullAddress,
    OwnerState: props.Fdata.OwnerState,
    City: props.Fdata.City,
    Pincode: props.Fdata.Pincode,
    NearestPoliceStation: props.Fdata.NearestPoliceStation,
    Landmark: props.Fdata.Landmark,
    NoOfRooms: props.Fdata.NoOfRooms,
    NoOfBeds: props.Fdata.NoOfBeds,
    NoOfAccomodation: props.Fdata.NoOfAccomodation,
    AirConditioner: props.Fdata.AirConditioner,
    SeparateMeter: props.Fdata.SeparateMeter,
    Refrigeretor: props.Fdata.Refrigeretor,
    WifiAvailable: props.Fdata.WifiAvailable,
    ImageUrl: props.Fdata.ImageUrl,
    Rent: props.Fdata.Rent
  });

  let name;
  let value;
  let dataChange = (event)=>{
    name = event.target.name;
    value = event.target.value;
    setData({...Data,[name]:value});
  }

 let imgChange = (e)=>{
   setImg(e.target.files[0]);
 }
  
  let reset = ()=>{
    let Reset = window.confirm("Are you Want to Reset all Data?");
    if(Reset){
      setData({
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
  })
    }
  }
  
  let write = async ()=>{
    if(Data.OwnerName==="" || Data.OwnerEmail==="" || Data.ContactNumber==="" || Data.AdhaarNumber==="" || Data.OwnerFullAddress==="" || Data.OwnerState==="" || Data.City==="" || Data.Pincode==="" || Data.NearestPoliceStation==="" || Data.Landmark==="" || Data.NoOfRooms==="" || Data.NoOfBeds==="" || Data.NoOfAccomodation==="" || Data.AirConditioner==="" || Data.SeparateMeter==="" || Data.Refrigeretor==="" || Data.WifiAvailable==="" || Img.name==="" || Data.Rent===""){
      alert("Please Fill out all the below datails");
    }
    else if(Data.ContactNumber.length>10 || Data.ContactNumber.length<10){
      alert("Contact Number must be of 10 digits");
    }
    else{
    let Submit = window.confirm("Are you Want to submit Your Data?");
    if(Submit){  
      setspin(true);    
      await writeUserData(props.uId,Data.OwnerName,Data.OwnerEmail,Data.ContactNumber,Number.parseInt(Data.AdhaarNumber),Data.OwnerFullAddress,Data.OwnerState,Data.City.toUpperCase(),Data.Pincode,Data.NearestPoliceStation,Data.Landmark,Data.NoOfRooms,Data.NoOfBeds,Data.NoOfAccomodation,Data.AirConditioner,Data.SeparateMeter,Data.Refrigeretor,Data.WifiAvailable,Img.name,Data.Rent);

      const storageRef = ref(storage, `${props.uId}&${Data.AdhaarNumber}/${Img.name}`);
      
      let snapshot = await uploadBytes(storageRef, Img);
      if(snapshot){
        console.log("Image Upload Successfully");
      }
      setspin(false);
      alert("Data Added Successfully");
      setData({
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
  })
    }
  }
  }
  return (
    <>
    {spin && <Spinner/>}
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <h3 id="caption">LET'S BUILD A BETTER COMMUNITY TOGETHER</h3>
        </div>
      </div>
    </div>
    <div className="container-fluid my-5">
        <form>
            <h3 className="text-center all-caption">Landlord's Personal Details</h3><br/>
            <div className='land-lord'><div className="row">
                <div className="col mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="OwnerName" id="OwnerName" value={Data.OwnerName} onChange={dataChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">

                    <label className="form-label">Email ID</label>
                    <input type="email" className="form-control" name="OwnerEmail" id="OwnerEmail" value={Data.OwnerEmail} onChange={dataChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col mb-3">

                    <label className="form-label">Contact number</label>
                    <input type="tel" className="form-control" name="ContactNumber" id="ContactNumber" value={Data.ContactNumber} onChange={dataChange}/>

                </div>
                <div className="col mb-3">

                    <label className="form-label">Adhaar number</label>
                    <input type="text" className="form-control" name="AdhaarNumber" id="AdhaarNumber" value={Data.AdhaarNumber} onChange={dataChange}/>
                    <div id="AdhaarHelp" className="form-text">Please do not space in between numbers</div>
                </div>

            </div></div>
            
            <h4 className="text-center all-caption">Address Details</h4><br/>
            <div className='address-details'><div className="row">
                <div className="col mb-3">

                    <label className="form-label">Full Address</label>
                    <input type="text" className="form-control" name="OwnerFullAddress" id="OwnerFullAddress" value={Data.OwnerFullAddress} onChange={dataChange}/>

                </div>
            </div>
            <div className="row">
                <div className="col mb-3">

                    <label className="form-label">State</label>
                    <select className="form-select" id="State" name="OwnerState" onChange={dataChange}>
                        <option value="">Select Your State Here</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Bangladesh">Bangladesh</option>
                    </select>

                </div>
                <div className="col mb-3">

                    <label className="form-label">City</label>
                    <select className="form-select" id="City" name="City" onChange={dataChange}>
                        <option value="">Select Your City Here</option>
                        <option value="Hoogly">Hoogly</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Durgapur">Durgapur</option>
                        <option value="Kalyani">Kalyani</option>
                        <option value="Berhampore">Berhampore</option>
                        <option value="Hoogly">Hoogly</option>
                        <option value="North 24 Pargana">North 24 Pargana</option>
                        <option value="Asansol">Asansol</option>
                        <option value="Siliguri">Siliguri</option>
                        <option value="Bardhaman">Bardhaman</option>
                        <option value="Malda">Malda</option>                       
                    </select>

                </div>
                <div className="col mb-3">

                    <label className="form-label">Pincode</label>
                    <input type="tel" className="form-control" id="Pincode" name="Pincode" value={Data.Pincode} onChange={dataChange}/>

                </div>
            </div>
            <div className="row">
                <div className="col mb-3">

                    <label className="form-label">Nearest Police station</label>
                    <input type="text" className="form-control" id="NearestPoliceStation" name="NearestPoliceStation" value={Data.NearestPoliceStation} onChange={dataChange}/>

                </div>
                <div className="col mb-3">

                    <label className="form-label">Landmark (if any)</label>
                    <input type="text" className="form-control" id="Landmark" name="Landmark" value={Data.Landmark} onChange={dataChange}/>

                </div>
            </div></div>
            
            <h4 className="text-center all-caption">Accomodation Details</h4><br/>
            <div className='accomodation-details'><div className="row">
                <div className="col mb-3">

                    <label className="form-label">Number of Rooms Available</label>
                    <input type="number" className="form-control form-control-sm" id="NoOfRooms" name="NoOfRooms" value={Data.NoOfRooms} onChange={dataChange}/>

                </div>
                <div className="col mb-3">

                    <label className="form-label">Number of beds Available per room</label>
                    <input type="number" className="form-control form-control-sm" id="NoOfBeds" name="NoOfBeds" value={Data.NoOfBeds} onChange={dataChange}/>

                </div>
                <div className="col mb-3">

                    <label className="form-label">Maximum Number of accomodation per room</label>
                    <input type="number" className="form-control form-control-sm" id="NoOfAccomodation" name="NoOfAccomodation" value={Data.NoOfAccomodation} onChange={dataChange}/>

                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="form-label">Air Conditioner Available ? </label>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="AirConditioner" value = "Yes" id="AirConditioner" onChange={dataChange}/>
                        <label className="form-check-label">
                          Yes
                        </label>
                        
                    </div>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="AirConditioner" value="No" id="AirConditioner" onChange={dataChange}/>
                        <label className="form-check-label">
                          No
                        </label>
                        
                    </div>
                </div>
                <div className="col">
                    <label className="form-label">Separate Meter Available ? </label>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="SeparateMeter" value="Yes" id="SeparateMeter" onChange={dataChange}/>
                        <label className="form-check-label">
                          Yes
                        </label>
                        
                    </div>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="SeparateMeter" value="No" id="SeparateMeter" onChange={dataChange}/>
                        <label className="form-check-label">
                          No
                        </label>
                        
                    </div>
                </div>
                <div className="col">
                    <label className="form-label">Availability of Refrigeretor ? </label>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="Refrigeretor" value="Yes" id="Refrigeretor" onChange={dataChange}/>
                        <label className="form-check-label">
                          Yes
                        </label>
                        
                    </div>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="Refrigeretor" value="No" id="Refrigeretor" onChange={dataChange}/>
                        <label className="form-check-label">
                          No
                        </label>
                        
                    </div>
                </div>
                <div className="col">
                    <label className="form-label">Additional Wifi connection ? </label>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="WifiAvailable" value="Yes" id="WifiAvailable" onChange={dataChange}/>
                        <label className="form-check-label">
                          Yes (Extra 150/- per month for 5gb data per day)
                        </label>
                        
                    </div>
                    <div className="form-check">
                        
                        <input className="form-check-input" type="radio" name="WifiAvailable" value="No" id="WifiAvailable" onChange={dataChange}/>
                        <label className="form-check-label">
                          No
                        </label>
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="col mb-3">

                        <label className="form-label">Upload an Image</label>
                        <input type="file" className="form-control" accept='image/' id="ImageUrl" name="ImageUrl" onChange={imgChange}/>
    
                    </div>
                </div>
                <div className="col">
                    <div className="col mb-3">

                        <label className="form-label">Rent (per month in Rs.)</label>
                        <input type="number" className="form-control" id="Rent" name="Rent" value={Data.Rent} onChange={dataChange}/>
    
                    </div>
                </div>
            </div></div>
            <br/><br/>
            <div className="mb-3 form-check check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label">I hereby certify that, to the best of my knowledge, the provided
information is true and accurate.</label>
            </div>
            <br/>
        </form>
      <div className="d-flex justify-content-center"><button type="submit" className="btn btn-primary mx-5 col-1" onClick={write} >Submit</button>
      <button type="reset" className="btn btn-info mx-5 col-1" onClick={reset}>Reset</button></div>
    </div>
    </>
    
  );
};

export default Form;
