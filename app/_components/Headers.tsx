// "use client"
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
// import { useUser } from "@clerk/nextjs";
// const menuOptions = [
//   {
//     name: "Home",
//     path: "/",
//   },
//   {
//     name: "Pricing",
//     path: "/pricing",
//   },
//   {
//     name: "Contact-us",
//     path: "/contact-us",
//   },
// ];

// function Header() {
//   const { user } = useUser();
//   return (
//     <div className="flex justify-between items-center px-10 py-5 margin=0">
//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <Image src="/logo.svg" alt="logo" height={35} width={35} />
//         <h2 className="font-bold text-2xl">Virello</h2>
//       </div>

//       {/* Menu */}
//       <div className="flex items-center gap-8">
//         {menuOptions.map((menu, index) => (
//           <Link key={index} href={menu.path}>
//             <h2 className='text-lg hover:scale-105 transition-all cursor-pointer text-colour:blue'>
//               {menu.name}
//             </h2>
//           </Link>
//         ))}
//       </div>

//       {/* Button */}



//       {/* Button */}
//       {!user ? (
//         <InteractiveHoverButton>
//           Get Started
//         </InteractiveHoverButton>
//       ) : (
//         <Link href="/create-new-trip">
//           <InteractiveHoverButton>
//             Create Trip
//           </InteractiveHoverButton>
//         </Link>
//       )}
//     </div>
//   );
// }

// export default Header;
"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-
    ">
      <div className="flex items-center justify-between px-5 py-4 sm:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src="/logo.svg" alt="logo" height={32} width={32} className="sm:h-[35px] sm:w-[35px]" />
          <h2 className="text-xl font-bold sm:text-2xl">Virello</h2>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-8 md:flex">
          {menuOptions.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <h2 className="cursor-pointer text-lg text-gray-700 transition-all hover:scale-105 hover:text-sky-600">
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        {/* Desktop button */}
        <div className="hidden md:block">
          {!user ? (
            <Link href="/sign-in">
              <InteractiveHoverButton>Get Started</InteractiveHoverButton>
            </Link>
          ) : (
            <Link href="/create-new-trip">
              <InteractiveHoverButton>Create Trip</InteractiveHoverButton>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-80 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {menuOptions.map((menu, index) => (
            <Link key={index} href={menu.path} onClick={() => setIsOpen(false)}>
              <h2 className="rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-sky-600">
                {menu.name}
              </h2>
            </Link>
          ))}

          <div className="mt-3 px-3">
            {!user ? (
              <Link href="/sign-in" className="block" onClick={() => setIsOpen(false)}>
                <InteractiveHoverButton className="w-full">Get Started</InteractiveHoverButton>
              </Link>
            ) : (
              <Link href="/create-new-trip" className="block" onClick={() => setIsOpen(false)}>
                <InteractiveHoverButton className="w-full">Create Trip</InteractiveHoverButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;