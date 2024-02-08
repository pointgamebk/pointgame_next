"use client";

import { useEffect, useState } from "react";

const GetLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log({ latitude, longitude });
      });
    }
  }, []);

  return <div className="text-white"></div>;
};

export default GetLocation;
