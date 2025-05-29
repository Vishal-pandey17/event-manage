"use client";

import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { TfiTicket } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b border-slate-200 border-spacing-0 bg-slate-100 h-24">
      <div className="hover-inverse flex items-center justify-center gap-2">
        <Link
          href={"/"}
          className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent"
        >
          <Image
            src={"/images/logo.png"}
            alt="logo"
            height={90}
            width={90}
            layout="responsive"
            className="hover-inverse w-full h-auto max-w-[120px] max-h-[120px] py-4"
          />
        </Link>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center justify-center gap-5 font-semibold max-md:hidden">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <HomeIcon />
            </div>
            <p>Home</p>
          </Link>

          <Link
            href={"/events"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <CgProfile />
            </div>
            <p>Events</p>
          </Link>

          <Link
            href={"/artists"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <PersonIcon />
            </div>
            <p>Artists</p>
          </Link>

          <Link
            href={"/tags"}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">
              <TfiTicket />
            </div>
            <p>Tags</p>
          </Link>

          {/* Show Create Event link only when user is logged in */}
          {session && (
            <Link
              href={"/create-event"}
              className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
            >
              <div className="scale-110">
                <IoMdAdd />
              </div>
              <p>Create Event</p>
            </Link>
          )}

          {/* Authentication Buttons */}
          {status === "loading" ? (
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session.user?.name}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 transition-opacity"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 transition-opacity"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;