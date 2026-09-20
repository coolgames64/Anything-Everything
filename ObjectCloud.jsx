import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

export default function ObjectCloud({ products }) {
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category))).sort()],
    [products]
  );

  const visible = category === 'All'
    ? products
    : products.filter((p) => p.category === category);

  return (
    <section id="cloud" className="px-[5vw] md:px-[8vw] py-[10vh]">
      <div className="flex items-end justify-between mb-8 border-b-[2px] border-[#1A1A1A] pb-6">
        <h2 className="font-display font-light text-5xl md:text-7xl text-[#1A1A1A] leading-none">The Object Cloud</h2>
        <p className="hidden md:block text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60">
          {visible.length} artifacts
        </p>
      </div>

      <div
        className="flex gap-2 gap-y-2 flex-wrap mb-10 overflow-x-auto pb-2 -mx-1 px-1 md:flex-wrap md:overflow-visible"
        role="tablist"
        aria-label="Filter by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              'min-h-[40px] px-4 border text-[10px] uppercase tracking-[0.25em] whitespace-nowrap transition',
              category === c
                ? 'bg-[#1A1A1A] text-[#F7F7F2] border-[#1A1A1A]'
                : 'text-[#1A1A1A]/70 border-[#1A1A1A]/30 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-[#1A1A1A]/50 font-display text-xl py-12">No objects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-16">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}