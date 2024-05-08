import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

import { auth } from "@clerk/nextjs";

const Header = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <header className="w-full border-b bg-blue">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h5 className="text-green h5-bold">point.game</h5>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems id={userId} />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav id={userId} />
          </SignedIn>
          <SignedOut>
            <Link href="/leagues" className="w-36">
              <p className="text-white h5-bold">Leagues</p>
            </Link>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
