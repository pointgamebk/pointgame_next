"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use, useEffect } from "react";

const NavItems = () => {
  const id = "65c3d90aaef201acd0ab2ecf";
  const _headerLinks = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Create Game",
      route: "/games/create",
    },
    {
      label: "My Profile",
      route: `/profile/${id}`,
    },
  ];
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-white">
      {_headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-green"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            {link.label === "profile" ? (
              <Link href={`/bogus`}>{link.label}</Link>
            ) : (
              <Link href={link.route}>{link.label}</Link>
            )}
            {/* <Link href={link.route}>{link.label}</Link> */}
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
