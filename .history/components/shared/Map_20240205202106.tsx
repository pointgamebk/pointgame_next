"use client";

import { useRef, useState, useEffect } from "react";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  const mapRef = useRef(null);

  useEffect(() => {});
  return <div>{address}</div>;
};

export default Map;
