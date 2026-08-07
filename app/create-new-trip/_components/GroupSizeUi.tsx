"use client";
import { useState } from "react";
import { User, Users, Heart, Backpack, Check } from "lucide-react";

export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler seeking new adventures and unforgettable experiences.",
    icon: User,
    people: "1 Person",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers exploring the world together.",
    icon: Heart,
    people: "2 People",
    accent: "bg-rose-50 text-rose-600",
  },
  {
    id: 3,
    title: "Family",
    desc: "A fun-loving family enjoying memorable vacations together.",
    icon: Users,
    people: "3–5 People",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends ready for exciting trips and shared adventures.",
    icon: Backpack,
    people: "5+ People",
    accent: "bg-emerald-50 text-emerald-600",
  },
];

function GroupSizeUi({
  onSelect,
}: {
  onSelect?: (item: (typeof SelectTravelersList)[number]) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (item: (typeof SelectTravelersList)[number]) => {
    setSelected(item.id);
    onSelect?.(item);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 col-auto">
        {SelectTravelersList.map((item) => {
          const Icon = item.icon;
          const isSelected = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`group relative flex flex-col items-start rounded-2xl border bg-white p-4 text-left active:scale-[0.98]
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:shadow-lg
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                sm:p-5
                ${
                  isSelected
                    ? "border-sky-500 shadow-lg ring-1 ring-sky-500/30"
                    : "border-gray-200 hover:border-sky-300"
                }
              `}
            >
              {isSelected && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
              )}

              <div
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 sm:h-12 sm:w-12 ${item.accent}`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
              </div>

              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                {item.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                {item.desc}
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium sm:text-xs ${
                  isSelected
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }`}
              >
                {item.people}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GroupSizeUi;
