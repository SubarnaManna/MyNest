import React, { useEffect } from "react";
import "../style/map.css";

export default function LocationMap(props) {
  var map;
  var directionsManager;
  let GetMap = () => {
    console.log("GetMAp is called");
    map = new window.Microsoft.Maps.Map("#myMap", {
      credentials:
        "AkumAVXFnC5DmfUvZfAu6zeP5jAHzdcNwPbusQ4OgzWklO41QRSiiKekoBaCKXdr",
      center: new window.Microsoft.Maps.Location(51.50632, -0.12714),
      mapTypeId: window.Microsoft.Maps.MapTypeId.road,
      zoom: 8,
    });

    //Load the directions module.
    window.Microsoft.Maps.loadModule("Microsoft.Maps.Directions", () => {
      //Create an instance of the directions manager.
      directionsManager =
        new window.Microsoft.Maps.Directions.DirectionsManager(map);
      directionsManager.setRequestOptions({
        routeMode: window.Microsoft.Maps.Directions.RouteMode.walking,
      });

      //Create waypoints to route between.
      var seattleWaypoint = new window.Microsoft.Maps.Directions.Waypoint({
        address: props.location.add1,
      });
      directionsManager.addWaypoint(seattleWaypoint);

      var workWaypoint = new window.Microsoft.Maps.Directions.Waypoint({
        address: props.location.add2,
      });
      directionsManager.addWaypoint(workWaypoint);

      //Add event handlers to directions manager.
      window.Microsoft.Maps.Events.addHandler(
        directionsManager,
        "directionsError",
        directionsError,
      );
      window.Microsoft.Maps.Events.addHandler(
        directionsManager,
        "directionsUpdated",
        directionsUpdated,
      );

      //Calculate directions.
      directionsManager.calculateDirections();
    });
  };

  let directionsUpdated = (e) => {
    //Get the current route index.
    var routeIdx = directionsManager.getRequestOptions().routeIndex;

    //Get the distance of the route, rounded to 2 decimal places.
    var distance = Math.round(e.routeSummary[routeIdx].distance * 100) / 100;

    //Get the distance units used to calculate the route.
    var units = directionsManager.getRequestOptions().distanceUnit;
    var distanceUnits = "";

    if (units === window.Microsoft.Maps.Directions.DistanceUnit.km) {
      distanceUnits = "km";
    } else {
      //Must be in miles
      distanceUnits = "miles";
    }

    //Time is in seconds, convert to minutes and round off.
    var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);

    document.getElementById("routeInfoPanel").innerHTML =
      "Distance: " +
      distance +
      " " +
      distanceUnits +
      "<br/>Walking Time with Traffic : " +
      time +
      " minutes";
  };

  let directionsError = (e) => {
    alert("Error: " + e.message + "\r\nResponse Code: " + e.responseCode);
  };

  useEffect(() => {
    // GetMap();
    (async () => {
      console.log("Establish Attribute called");
      let script = document.createElement("script");
      // let bingKey = await fetch("https://samples.azuremaps.com/api/GetBingMapsKey").then(r => r.text()).then(key => { return key });
      let bingKey =
        "AkumAVXFnC5DmfUvZfAu6zeP5jAHzdcNwPbusQ4OgzWklO41QRSiiKekoBaCKXdr";
      script.setAttribute(
        "src",
        `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingKey}`,
      );
      document.body.appendChild(script);
      console.log("Establish Atrribute finished");
    })();
  }, []);
  // Dynamic load the Bing Maps Key and Script
  // Get your own Bing Maps key at https://www.microsoft.com/maps

  return (
    <>
      <div id="myMap">
        <div id="routeInfoPanel"></div>
        <button id="showMap" onClick={GetMap} className="btn btn-warning">
          Show Map
        </button>
      </div>
    </>
  );
}
