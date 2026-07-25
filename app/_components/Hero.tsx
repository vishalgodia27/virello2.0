import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Backpack, MapPinned, Wallet, Plane, Globe2, Send } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
const suggestion = [
  {
    title: "I have 5 days. Where should I go?",
    icon: <Plane className="h-5 w-5 text-sky-500" />,
  },
  {
    title: "Plan a budget trip under ₹20,000",
    icon: <Wallet className="h-5 w-5 text-emerald-500" />,
  },
  {
    title: "Suggest a weekend getaway near me",
    icon: <MapPinned className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Build my Europe itinerary",
    icon: <Backpack className="h-5 w-5 text-violet-500" />,
  },
];
const Hero = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center text-center px-6">
      {/* Content */}
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Your heart knows the destination.
          <span className="text-sky-600"> We'll get you there.</span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          Plan unforgettable journeys with AI—personalized itineraries, smart
          recommendations, and hassle-free travel planning.
        </p>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl relative ">
        <Textarea
          className="h-32 w-full resize-none border-none bg-transparent p-0 text-base text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:outline-none shadow-none"
          placeholder="✨ Share your dream destination, travel style, budget, or special wishes..."
        />
        <Button size={"icon"} className="absolute bottom-6 right-6">
          <Send className="h-4 w-4 " />
        </Button>
      </div>

      {/* Suggestion list */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {suggestion.map((item, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
          >
            {item.icon}
            <h2 className="text-sm font-medium text-gray-700">
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Video Section */}
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/yO7fQJKpqmI"
        thumbnailSrc="https://img.youtube.com/vi/yO7fQJKpqmI/maxresdefault.jpg"
        thumbnailAlt="Dummy Video Thumbnail"
      />
    </div>
  );
};

export default Hero;
