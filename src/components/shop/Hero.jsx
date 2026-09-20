import React, { useRef } from 'react';
import { Image } from '@/components/ui/image';

export default function Hero({ heroImage }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };

  return (
    <section
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#F7F7F2]"
      onMouseMove={onMove}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={ref}
          className="transition-transform duration-300 ease-out w-[60vw] max-w-[620px] aspect-[4/5]"
          style={{ willChange: 'transform' }}
        >
          <Image src={heroImage} alt="Featured object" className="w-full h-full" fittingType="fit" />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-[5vw] md:px-[8vw] pb-[8vh]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]/60 mb-5">
          The definitive architecture for universal acquisition
        </p>
        <h1 className="font-display font-light text-[#1A1A1A] leading-[0.88] text-[19vw] md:text-[15vw] lg:text-[12vw]">
          THE EVERYTHING<br />ERA
        </h1>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#1A1A1A]" />
    </section>
  );
}