"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const mapRef = useRef<typeof ReactMapGL | null>(null);
  return <div>{address}</div>;
};

export default Map;
