import { useRef, useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  return <div>{address}</div>;
};

export default Map;
