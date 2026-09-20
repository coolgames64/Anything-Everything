import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

export default function GhostHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled ? 'backdrop-blur-xl bg-[#F7F7F2]/70 border-b border-[#E5E5E0]' : 'bg-transparent border-b border-transparent'
    )}>
      <div className="px-[5vw] md:px-[8vw] h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-lg sm:text-xl md:text-2xl tracking-tight text-[#1A1A1A] leading-none whitespace-nowrap">
          ANYTHING<span className="text-[#E03C31]">&</span>EVERYTHING
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/70">
          <Link to="/" className="hover:text-[#1A1A1A] transition">Catalog</Link>
          <a href="#cloud" className="hover:text-[#1A1A1A] transition">Objects</a>
          <a href="#about" className="hover:text-[#1A1A1A] transition">Era</a>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1A1A1A] min-h-[44px] px-3 hover:text-[#E03C31] transition"
          aria-label="Open cart"
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E03C31] text-[#F7F7F2] text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}