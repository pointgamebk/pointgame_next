"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const mapRef = useRef<typeof ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    padding: 0,
  });
  return <div>{address}</div>;
};

export default Map;
