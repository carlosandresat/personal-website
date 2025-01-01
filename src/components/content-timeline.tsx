"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const ContentTimeline = ({
  timelineItems,
}: {
  timelineItems: {
    title: string;
    duration: string;
    description: string;
    image: string;
  }[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-col w-full max-w-screen-md mt-6">
      {timelineItems
        .slice(0, showAll ? timelineItems.length : 3)
        .map((item, index) => (
          <div key={index}>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image
                  src={item.image}
                  width={200}
                  height={200}
                  alt={item.title}
                  className="invert dark:invert-0"
                />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                {item.title}
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                {item.duration}
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">{item.description}</p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
          </div>
        ))}
      <Button onClick={handleToggle} className="rounded-full h-16 w-16">
        {showAll ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
};

export default ContentTimeline;
