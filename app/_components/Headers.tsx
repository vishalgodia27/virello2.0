"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { useUser } from "@clerk/nextjs";
const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact-us",
    path: "/contact-us",
  },
];

function Header() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center px-10 py-5 margin=0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" height={35} width={35} />
        <h2 className="font-bold text-2xl">Virello</h2>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-8">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className='text-lg hover:scale-105 transition-all cursor-pointer text-colour:blue'>
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Button */}



      {/* Button */}
      {!user ? (
        <InteractiveHoverButton>
          Get Started
        </InteractiveHoverButton>
      ) : (
        <Link href="/create-new-trip">
          <InteractiveHoverButton>
            Create Trip
          </InteractiveHoverButton>
        </Link>
      )}
    </div>
  );
}

export default Header;