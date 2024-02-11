"use client";

import { useEffect, useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState({});

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
