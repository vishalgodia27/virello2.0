// "use client";
// import React from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Backpack, MapPinned, Wallet, Plane, Send } from "lucide-react";
// import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
// import { ArrowBigDown } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";


// const suggestion = [
//   {
//     title: "I have 5 days. Where should I go?",
//     icon: <Plane className="h-5 w-5 text-sky-500" />,
//   },
//   {
//     title: "Plan a budget trip under ₹20,000",
//     icon: <Wallet className="h-5 w-5 text-emerald-500" />,
//   },
//   {
//     title: "Suggest a weekend getaway near me",
//     icon: <MapPinned className="h-5 w-5 text-orange-500" />,
//   },
//   {
//     title: "Build my Europe itinerary",
//     icon: <Backpack className="h-5 w-5 text-violet-500" />,
//   },
// ];

// const Hero = () => {
//   const {user}=useUser();
//   const router=useRouter();
//   const onSend=()=>{
//     if(!user)
//     {
//       router.push('/sign-in')
//       return ;
//     }
    


//   }


//   return (
//     <section className="flex flex-col items-center justify-center gap-12 px-6 pt-13 pb-20 text-center">
//       {/* Heading */}
//       <div className="flex max-w-3xl flex-col items-center gap-5">
//         <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
//           Your heart knows the destination.
//           <span className="text-sky-600"> We&apos;ll get you there.</span>
//         </h1>

//        <p className="max-w-2xl text-lg text-gray-600">
//   Plan unforgettable journeys with AI—smart, hassle-free travel planning.

//     </p>
//       </div>

//       {/* Input box */}
//       <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl">
//         <Textarea
//           className="h-32 w-full resize-none border-none bg-transparent p-0 pr-12 text-base text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
//           placeholder="Share your dream destination, travel style, budget, or special wishes..."
//         />
//         <Button
//           size="icon"
//           className="absolute bottom-5 right-5 "
//           onClick={()=>onSend()}
//         >
//           <Send className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Suggestion list */}
//       <div className="flex w-full max-w-5xl items-stretch justify-center gap-6">
//         {suggestion.map((item, index) => (
//           <div
//             key={index}
//             className="flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
//           >
//             {item.icon}
//             <h2 className="text-sm font-medium text-gray-700">
//               {item.title}
//             </h2>
//           </div>
//         ))}
//       </div>
//       <h2 className=" flex gap-2 justify-center text-center">
//         Need a quick tour?
//         <strong>See it in action </strong> <ArrowBigDown/>
//       </h2>
//       {/* Video Section */}
//       <div className="w-full max-w-3xl">
//         <HeroVideoDialog
//           className="block dark:hidden"
//           animationStyle="from-center"
//           videoSrc="https://www.youtube.com/embed/yO7fQJKpqmI"
//           thumbnailSrc="https://img.youtube.com/vi/yO7fQJKpqmI/maxresdefault.jpg"
//           thumbnailAlt="Dummy Video Thumbnail"
//         />
//       </div>
      
//     </section>
//   );
// };

// export default Hero;
"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Backpack, MapPinned, Wallet, Plane, Send, ArrowBigDown } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push('/create-new-trip')
  };

  return (
    <section className="flex flex-col items-center justify-center gap-12 px-6 pt-13 pb-20 text-center">
      {/* Heading */}
      <div className="flex max-w-3xl flex-col items-center gap-5">
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Your heart knows the destination.{" "}
          <SquigglyText className="text-sky-600">
            We&apos;ll get you there.
          </SquigglyText>
        </h1>

        <p className="max-w-2xl text-lg text-gray-600">
          Plan unforgettable journeys with AI—smart, hassle-free travel planning.
        </p>
      </div>

      {/* Input box */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl">
        <Textarea
          className="h-32 w-full resize-none border-none bg-transparent p-0 pr-12 text-base text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0"
          placeholder="Share your dream destination, travel style, budget, or special wishes..."
        />
        <Button
          size="icon"
          className="absolute bottom-5 right-5"
          onClick={() => onSend()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestion list */}
      <div className="flex w-full max-w-5xl items-stretch justify-center gap-6">
        {suggestion.map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
          >
            {item.icon}
            <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>
          </div>
        ))}
      </div>

      <h2 className="flex gap-2 justify-center text-center">
        Need a quick tour?
        <strong>See it in action</strong> <ArrowBigDown />
      </h2>

      {/* Video Section */}
      <div className="w-full max-w-3xl">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/yO7fQJKpqmI"
          thumbnailSrc="https://img.youtube.com/vi/yO7fQJKpqmI/maxresdefault.jpg"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </section>
  );
};

export default Hero;