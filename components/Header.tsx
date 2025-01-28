"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex flex-wrap items-center bg-gradient-to-r from-darkPurple to-purple text-white justify-between">

      <div className="flex items-center w-full md:w-auto md:mb-0">
        <Image
          height={150}
          width={100}
          alt="logo"
          src="/logo.png"
        />
        <p className="text-2xl font-rubik truncate ml-2">
          {user ? `${user?.firstName}'s Space` : "Welcome"}
        </p>
      </div>

      <div className="mx-4 mb-3">
        <Breadcrumbs />
      </div>

      <div className="mx-5 mb-3 lg:mb-0">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
