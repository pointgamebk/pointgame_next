"use client";

import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const position = { lat: 43.03, lng: -76.3 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 112,
        mapId: "GAME_LOCATION",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    };

    initMap();
  }, []);
  return <div style={{ height: "300px" }} ref={mapRef} />;
};

export default Map;
