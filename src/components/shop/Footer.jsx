import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="about" className="bg-[#1A1A1A] text-[#F7F7F2] px-[5vw] md:px-[8vw] py-[12vh] mt-[10vh]">
      <h2 className="font-display font-light text-5xl md:text-8xl leading-[0.9] mb-12">Acquire<br />anything.</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#F7F7F2]/20 pt-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#F7F7F2]/50 mb-3">Catalog</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#E03C31] transition">All objects</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#F7F7F2]/50 mb-3">House</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-[#E03C31] transition">The era</a></li>
            <li><a href="#about" className="hover:text-[#E03C31] transition">Provenance</a></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#F7F7F2]/50 mb-3">Care</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-[#E03C31] transition">Shipping</a></li>
            <li><a href="#about" className="hover:text-[#E03C31] transition">Returns</a></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#F7F7F2]/50 mb-3">Contact</p>
          <p className="text-sm text-[#F7F7F2]/70">concierge@anythingandeverything</p>
        </div>
      </div>
      <div className="mt-16 flex flex-col md:flex-row justify-between gap-2 text-[10px] uppercase tracking-[0.25em] text-[#F7F7F2]/40">
        <span>© 2026 Anything & Everything</span>
        <span>The definitive architecture for universal acquisition</span>
      </div>
    </footer>
  );
}