"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GetLocation = () => {
  const [location, setLocation] = useState({});

  const geocoder = new google.maps.Geocoder();

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords);
        const { latitude, longitude } = coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return <div className="text-white"></div>;
};

export default GetLocation;
