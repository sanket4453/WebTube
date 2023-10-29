import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonData = [
  "All",
  "Music",
  "Mixes",
  "Bajaj",
  "Sport Bike",
  "T-Series",
  "Computer Programming",
  "Cricket",
  "Matras",
  "Civil Services Exam",
  "Body-Bulding",
  "Bollywood Music",
  "Salman Khan",
  "Podcast",
  "Live",
];

const TRANSLATE_AMOUNT = 200;

const ButtonList = () => {
  const [isLeftVisible, setLeftVisible] = useState(false);
  const [isRightVisible, setRightVisible] = useState(false);
  const [translate, setTranslate] = useState(300);
  const containerRef = useRef(null);

  useEffect(() => {
    if(containerRef.current == null) return;

    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target
      if(container == null) return

      setLeftVisible(translate > 0);
      setRightVisible(translate + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current);

    return() => {
      observer.disconnect();
    }

  },[buttonData,translate])

  return (
    <div className="sticky fixed overflow-x-hidden px-8 " >
      <div className="sticky top-0  z-10 pb-2">
        <div className="overflow-x-hidden relative" ref={containerRef}  >
          <div
            
            className="flex whitespace-nowrap gap-3 transition-transform 
        w-[max-content]"
            style={{ transform: `translateX(-${translate}px)` }}
          >
            {buttonData.map((button, i) => (
              <Button key={i} text={button} />
            ))}
          </div>
          {isLeftVisible && (
            <div className="absolute left-0 top-1/2 text-white -translate-y-1/2 bg-gradient-to-r from-neutral-900 from-50% to-transparent w-24 h-full">
              <button
                className="h-full aspect-square w-auto p-1.5"
                onClick={() => {
                  setTranslate((translate) => {
                    const newTranslate = translate - TRANSLATE_AMOUNT;
                    if (newTranslate <= 0) return 0;
                    return newTranslate;
                  });
                }}
              >
                <ChevronLeft />
              </button>
            </div>
          )}

          {isRightVisible && (
            <div className="absolute right-0 top-1/2 text-white -translate-y-1/2 bg-gradient-to-l from-neutral-900 from-50% to-transparent w-24 h-full flex justify-end items-end">
              <button
                className="h-full aspect-square w-auto p-1.5"
                onClick={() => {
                  setTranslate((translate) => {
                    if (containerRef.current == null) return translate;
                    const newTranslate = translate + TRANSLATE_AMOUNT;
                    const edge = containerRef.current.scrollWidth;
                    const width = containerRef.current.clientWidth;

                    if (newTranslate + width >= edge) {
                      return edge - width;
                    }
                    return newTranslate;
                  });
                }}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonList;
