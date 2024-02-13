"use client";

import { useRef, useEffect } from "react";
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

      const { Geocoder } = (await loader.importLibrary(
        "geocoding"
      )) as google.maps.GeocodingLibrary;

      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const geocoder = new Geocoder();
      const geocoderResponse = await geocoder.geocode({ address });
      const geocodedLocation = geocoderResponse.results[0];

      const position = {
        lat: geocodedLocation.geometry.location.lat(),
        lng: geocodedLocation.geometry.location.lng(),
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
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
  return <div style={{ height: "300px", maxWidth: "500px" }} ref={mapRef} />;
};

export default Map;
