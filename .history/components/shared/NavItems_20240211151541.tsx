"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use, useEffect } from "react";

const NavItems = () => {
  const pathname = usePathname();

  useEffect(() => {

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-white">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-green"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
