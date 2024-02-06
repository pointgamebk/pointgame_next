"use client";

import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCoords = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Geocoder } = await loader.importLibrary("geocoding");

      const geocodedLocation = await new Geocoder().geocode({ address });
      console.log(geocodedLocation.results);
    };

    getCoords();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const { Geocoder } = (await loader.importLibrary(
        "geocoding"
      )) as google.maps.GeocodingLibrary;

      const geocoder = new Geocoder();

      const position = { lat: 43.03, lng: -76.3 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 13,
        mapId: "GAME_LOCATION",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new Marker({
        position,
        map,
        title: "Game Location",
      });
    };

    initMap();
  }, []);
  return <div style={{ height: "300px" }} ref={mapRef} />;
};

export default Map;
