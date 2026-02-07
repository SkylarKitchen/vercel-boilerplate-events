"use client";

import { useState } from "react";

type FAQProps = {
  items: { question: string; answer: string }[];
};

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-border-tertiary">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
            >
              <span className="text-h6 text-fg-primary font-medium pr-4 group-hover:text-fg-secondary transition-colors">
                {item.question}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className={`shrink-0 text-fg-quaternary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                <line x1="8" y1="2" x2="8" y2="14" />
                <line x1="2" y1="8" x2="14" y2="8" />
              </svg>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="text-body-2 text-fg-tertiary pb-5 pt-2">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
