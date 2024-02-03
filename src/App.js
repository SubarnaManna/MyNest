/**
 * React imports 
 * BrowserRouter as Router for : Routing the Components.
 * Routes : helps in Components Switching.
 * Route : maps the application paths and the Components.
 * 
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, Component } from "react";





/**
 * ******** Application Components import Starts ********
 */
import Header from "./components/Common/header.jsx";
import Home from "./components/Home/home.jsx";
import Contacts from "./components/Contact/Contact.jsx";
import About from "./components/About/About.jsx";
import Login_as_owner from "./components/PG-Owner/Login_As_Owner.jsx";
// import Pgowner from "./components/pgowner.jsx";
import Signup_as_owner from "./components/PG-Owner/Signup_As_Owner.jsx";
import Form from "./components/PG-Owner/Form.jsx";
import Profile from "./components/PG-Owner/Profile.jsx";
import Pgfullview from "./components/PG/PG-Full-view.jsx";
import ErrorPage from "./components/Error-Page/error.jsx";
/**
 * ******** Application Components import Ends ********
 */




/** ******** Importing Context API (Starts Here) ******** */
import PGOwnerState from "./Contexts/API/PGOwnerAPI.mjs";
/** ******** Importing Context API (Ends Here) ******** */


/**
 * ******** Handeling uncertain Application Error ********
 */
class ErrorBoundary extends Component {
  // Setting  Default constructor to error false State  
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // if founds an error returns true 
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // runs when unable to catch the error 
  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  // rendering to Error Page if founds an error 
  render() {
    if (this.state.hasError) {
      // Display a user-friendly message or a fallback UI
      return <div><ErrorPage/></div>;
    }

    // Finally returning the children based on Error States
    return this.props.children;
  }
}

/**
 * Main App Component
 * 
 * Control : Routing the Components 
 * Context : Provides all Application Contexts to All of the Components 
 * 
 */
const App = () => {
/**
 * Application Route Map :               
 *  |_________"/"  
 *  |_________"/home"
 *  |_________"/about"
 *  |_________"/contact" 
 *  |_________"/profile"
 *  |_________"/pgowner"
 *  |_________"/signup"
 *  |_________"/form"
 *  |_________"/editform"
 *  |_________"/login"
 *  |_________"/fulldetails" 
 *               
 */



  return (
    <>
      <ErrorBoundary>
      <PGOwnerState>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/pgowner" element={<Login_as_owner /> }/>
            <Route path="/signup" element={<Signup_as_owner />} />
            <Route path="/form" element={<Form />} />
            <Route path="/editform" element={<Form />}/>
            <Route path="/login" element={ <Login_as_owner />}/>
            <Route path="/fulldetails" element={<Pgfullview />}/>
          </Routes>
        </Router>
        </PGOwnerState>
      </ErrorBoundary>
    </>
  );
};

// Form.defaultProps = {
//   Fdata: {
//     OwnerName: "",
//     OwnerEmail: "",
//     ContactNumber: "",
//     AdhaarNumber: "",
//     OwnerFullAddress: "",
//     OwnerState: "",
//     City: "",
//     Pincode: "",
//     NearestPoliceStation: "",
//     Landmark: "",
//     NoOfRooms: "",
//     NoOfBeds: "",
//     NoOfAccomodation: "",
//     AirConditioner: "",
//     SeparateMeter: "",
//     Refrigeretor: "",
//     WifiAvailable: "",
//     ImageUrl: "",
//     Rent: "",
//   },
// };

export default App;
