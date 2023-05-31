"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const isUserLoggedIn = true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [dropDownToggle, setDropDownToggle] = useState(false);

  useEffect(() => {
    const providersSet = async () => {
      const response: any = await getProviders();
      
      setProviders(response);
    };

    providersSet();
  }, [session]);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <div>
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo-text.svg"
            alt="Promptopia"
            width={120}
            height={120}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
            >
              Create Post
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold border hover:text-white py-2 px-4 border-blue-500 rounded-full"
            >
              SignOut
            </button>
            <Link href="/profile">
              <Image
                src= {`${session?.user?.image ? session.user.image : "/assets/images/profile.png"}`}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold border hover:text-white py-2 px-4 border-blue-500 rounded-full"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden xl:hidden flex relative">
        {session?.user ? (
          <div className="flex">
          <Image
            src="/assets/images/menu.svg"
            alt="Promptopia"
            width={35}
            height={35}
            className="rounded-full"
            onClick={() => setDropDownToggle((prev) => !prev)}
          />
          {dropDownToggle && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setDropDownToggle(false)}
              >
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setDropDownToggle(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                className="mt-5 w-full rounded-full bg-transparent border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white text-blue-500"
                onClick={() => {
                  setDropDownToggle(false);
                  signOut();
                }}
              >
                SignOut
              </button>
            </div>
          )}
        </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold border hover:text-white py-2 px-4 border-blue-500 rounded-full"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
