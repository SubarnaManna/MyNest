import Header from "./components/header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home.jsx";
import Contacts from "./components/contact.jsx";
import About from "./components/about.jsx";
import Login_as_owner from "./components/login_as_owner.jsx";
// import Pgowner from "./components/pgowner.jsx";
import Signup_as_owner from "./components/signup_as_owner.jsx";
import Form from "./components/form.jsx";
import Profile from "./components/profile.jsx";
import Pgfullview from "./components/pgfullview.jsx";
import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import ErrorPage from "./components/error.jsx";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Display a user-friendly message or a fallback UI
      return <div><ErrorPage/></div>;
    }

    return this.props.children;
  }
}

const App = () => {
  const [formData, setformData] = useState(null);
  const [pgData, setpgData] = useState(null);
  const [address, setaddress] = useState(null);
  const [newuserId, setnewuserId] = useState(null);
  const [profileName, setprofileName] = useState(null);
  const [profileEmail, setprofileEmail] = useState(null);

  let newedit = (obj) => {
    setformData(obj);
  };

  let getLogin = (data) => {
    console.log(data);
    if (data !== "") {
      setnewuserId(data);
    } else {
      setnewuserId(null);
    }
  };
  let getUser = (data) => {
    if (data !== "") {
      setprofileName(data);
    } else {
      setprofileName(null);
    }
  };
  let getEmail = (data) => {
    if (data !== "") {
      setprofileEmail(data);
    } else {
      setprofileEmail(null);
    }
  };
  let funcPgview = (obj) => {
    setpgData(obj);
  };
  let event_to_address = (my_address) => {
    setaddress(my_address);
  };
  return (
    <>
      <ErrorBoundary>
        <Router>
          {newuserId === null ? (
            <Header isLogin={false} />
          ) : (
            <Header isLogin={true} />
          )}
          <Routes>
            <Route
              path="/"
              element={<Home event2={funcPgview} newevent={event_to_address} />}
            />
            <Route
              path="/home"
              element={<Home event2={funcPgview} newevent={event_to_address} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />
            <Route
              path="/profile"
              element={
                <Profile
                  newedit={newedit}
                  uId={newuserId}
                  login={getLogin}
                  user={getUser}
                  email={getEmail}
                  Pname={profileName}
                  Pemail={profileEmail}
                />
              }
            />
            <Route
              path="/pgowner"
              element={
                <Login_as_owner
                  brandedit={newedit}
                  login={getLogin}
                  user={getUser}
                  email={getEmail}
                />
              }
            />
            <Route path="/signup" element={<Signup_as_owner />} />
            <Route path="/form" element={<Form uId={newuserId} />} />
            <Route
              path="/editform"
              element={<Form uId={newuserId} Fdata={formData} />}
            />
            <Route
              path="/login"
              element={
                <Login_as_owner
                  login={getLogin}
                  user={getUser}
                  email={getEmail}
                />
              }
            />
            <Route
              path="/fulldetails"
              element={<Pgfullview pgObj={pgData} colAddress={address} />}
            />
            
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
};

Form.defaultProps = {
  Fdata: {
    OwnerName: "",
    OwnerEmail: "",
    ContactNumber: "",
    AdhaarNumber: "",
    OwnerFullAddress: "",
    OwnerState: "",
    City: "",
    Pincode: "",
    NearestPoliceStation: "",
    Landmark: "",
    NoOfRooms: "",
    NoOfBeds: "",
    NoOfAccomodation: "",
    AirConditioner: "",
    SeparateMeter: "",
    Refrigeretor: "",
    WifiAvailable: "",
    ImageUrl: "",
    Rent: "",
  },
};

export default App;
