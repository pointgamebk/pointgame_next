"use client";

import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      console.log("initMap");
    };

    initMap();
  }, []);
  return <div>{address}</div>;
};

export default Map;
