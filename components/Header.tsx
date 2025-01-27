"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center bg-gradient-to-r from-darkPurple to-purple text-white justify-between">

      <div className="flex items-center">
        <Image
          height={150}
          width={100}
          alt="logo"
          src="/logo.png"
        />
        {user && (
          <p className="text-2xl font-rubik">
            {user?.firstName}
            {`'s`} Space
          </p>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        <Breadcrumbs />
      </div>

      <div className="mx-5">
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
