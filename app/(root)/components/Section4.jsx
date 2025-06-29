/* components/ChoiceSlider.jsx */
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    title: "One Room and Parlour with Kitchen",
    desc: "Lorem ipsum dolor sit amet consectetur. Semper gravida a volutpat egestas risus scelerisque amet.",
    img: "/images/house-1.png", // replace with real images ➜ public/
  },
  {
    title: "Two-Bedroom Luxury Suite",
    desc: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    img: "/images/house-1.png",
  },
  {
    title: "Modern Duplex Apartment",
    desc: "Nunc facilisis, ligula id pretium mattis, elit sem tempus arcu, non feugiat diam metus non ligula.",
    img: "/images/house-1.png",
  },
  // add as many as you need…
];

export default function ChoiceSlider() {
  const [idx, setIdx] = useState(0);
  const total = slides.length;

  const prev = useCallback(() => {
    setIdx((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const next = useCallback(() => {
    setIdx((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  /* ——— UI ——— */
  return (
    <section className="py-8 lg:py-28 bg-white">
      {/* headline */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
          A World of <span className="text-amber-400">Choice</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-500 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur. Semper gravida a volutpat
          egestas risus scelerisque amet.
        </p>
      </div>
      <div className="px-[5%]">
        {/* slider */}
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          {/* slide wrapper */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {slides.map((s) => (
              <article
                key={s.title}
                className="min-w-full rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white"
              >
                {/* left panel */}
                <div className="flex flex-col justify-center px-10 py-14 lg:py-24 bg-neutral-50">
                  <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-5 max-w-md">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 max-w-md mb-8 leading-relaxed text-sm lg:text-base">
                    {s.desc}
                  </p>
                  <Link href="/search">
                    <button className="w-max rounded-md bg-neutral-900 text-white text-sm font-medium px-8 py-3 hover:bg-neutral-700 transition">
                      Explore More
                    </button>
                  </Link>
                </div>

                {/* right panel (image) */}
                <div className="relative h-64 sm:h-80 lg:h-[420px] w-full">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    priority
                    className="object-cover rounded-none"
                  />
                </div>
              </article>
            ))}
          </div>

          {/* bottom nav */}
          <div className="mt-10 flex items-center justify-between px-4">
            {/* slide counter */}
            <span className="px-6 py-2 rounded-md text-sm font-medium bg-neutral-100 text-neutral-600">
              {idx + 1} / {total}
            </span>

            {/* arrows */}
            <div className="flex items-center gap-6">
              <NavBtn aria="Previous slide" onClick={prev}>
                <ChevronLeft size={18} />
              </NavBtn>
              <NavBtn aria="Next slide" onClick={next}>
                <ChevronRight size={18} />
              </NavBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Navigation Button helper ——— */
function NavBtn({ aria, onClick, children }) {
  return (
    <button
      aria-label={aria}
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition"
    >
      {children}
    </button>
  );
}
