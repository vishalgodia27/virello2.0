import Image from "next/image";
import { Button } from "@base-ui/react";
import Hero from "./_components/Hero";
import PopluarcityList from "./_components/PopluarcityList";
export default function Home() {
  return (
    <div >
      <Hero/>
      <PopluarcityList/>
    </div>
  );
}
