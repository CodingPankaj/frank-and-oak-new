"use client";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const AccordionTwo = ({ title, children, className }) => {
  const [isAccOpen, setIsAccOpen] = useState(false);
  return (
    <div className={className}>
      <div
        onClick={() => setIsAccOpen(!isAccOpen)}
        className="flex cursor-pointer items-center justify-between text-white"
      >
        <h3>{title}</h3>
        {isAccOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      <div
        className={`grid ${isAccOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all duration-300`}
      >
        <div className="row-span-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
