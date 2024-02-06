"use client";

import { useRef, useState } from "react";

type MapProps = {
  address: string;
};

const Map = ({ address }: MapProps) => {
  return <div>{address}</div>;
};

export default Map;
