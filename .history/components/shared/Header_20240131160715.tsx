import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center jusitfy-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.png"
            width={128}
            height={38}
            alt="pointgame logo"
          />
        </Link>
      </div>

      <div className="flex w-32 justify-end"></div>
    </header>
  );
};

export default Header;
