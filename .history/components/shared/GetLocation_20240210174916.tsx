"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GetLocation = () => {
  const [location, setLocation] = useState("");
  const getLocation = async (lat: number, lng: number) => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    const { Geocoder } = (await loader.importLibrary(
      "geocoding"
    )) as google.maps.GeocodingLibrary;

    const geocoder = new Geocoder();

    const geocoderResponse = await geocoder.geocode({ location: { lat, lng } });
    setLocation(geocoderResponse.results[5].address_components[0].long_name);
    console.log(geocoderResponse.results[5].address_components[0].long_name);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        //console.log(coords);
        getLocation(coords.latitude, coords.longitude);
      });
    }
  }, []);

  return (
    <div>
      <h4 className="text-white h4-bold">
        {location !== "" ? `Location: ${location}` : "Location: Loading..."}
      </h4>
    </div>
  );
};

export default GetLocation;
