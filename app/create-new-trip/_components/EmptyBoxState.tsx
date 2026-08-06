
// import React from 'react'
// import { suggestion } from '@/app/_components/Hero'
// import { Sparkles } from 'lucide-react'

// const EmptyBoxState = () => {
//   return (
//     <div className="mt-7 mb-5 flex flex-col items-center text-center">
//       <div className="mb-2 flex items-center justify-center rounded-full bg-sky-50 p-3">
//         {/* <Sparkles className="h-6 w-6 text-sky-500" /> */}
//       </div>

//       <h2 className="text-xl font-bold text-gray-900">
//         Start Planning <strong className="text-sky-500">a new trip using AI</strong>
//       </h2>
//       <p className="mt-2 max-w-md text-sm text-gray-500">
//         Pick a suggestion below or describe your dream trip and let  build the perfect itinerary.
//       </p>

//       <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
//         {suggestion.map((item, index) => (
//           <div
//                 key={index}
//             className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
//           >
//             <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
//               {item.icon}
//             </span>
//             <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default EmptyBoxState
import React from "react";
import { suggestion } from "@/app/_components/Hero";

type EmptyBoxStateProps = {
  onSelectSuggestion: (text: string) => void;
};

const EmptyBoxState = ({ onSelectSuggestion }: EmptyBoxStateProps) => {
  return (
    <div className="mt-7 mb-5 flex flex-col items-center text-center">
      <div className="mb-2 flex items-center justify-center rounded-full bg-sky-50 p-3"></div>

      <h2 className="text-xl font-bold text-gray-900">
        Start Planning <strong className="text-sky-500">a new trip using AI</strong>
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        Pick a suggestion below or describe your dream trip and let AI build the
        perfect itinerary.
      </p>

      <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {suggestion.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectSuggestion(item.title)}
            className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
              {item.icon}
            </span>

            <h2 className="text-sm font-medium text-gray-700">
              {item.title}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyBoxState;