import React from 'react';
import { Outlet } from 'react-router-dom';
import GhostHeader from './GhostHeader';
import CartDrawer from './CartDrawer';
import ConciergeChat from './ConciergeChat';

export default function ShopLayout() {
  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <GhostHeader />
      <Outlet />
      <CartDrawer />
      <ConciergeChat />
    </div>
  );
}