const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';

import Hero from '@/components/shop/Hero';
import ObjectCloud from '@/components/shop/ObjectCloud';
import Footer from '@/components/shop/Footer';

const HERO_IMAGE = 'https://media.db.com/images/public/6aaf9f587aa3618c040ccd51/aa08f3a38_generated_57f3b0e3.jpg';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Product.list('-created_date', 50)
      .then(p => { setProducts(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <Hero heroImage={HERO_IMAGE} />
      {loading ? (
        <div className="px-[8vw] py-[20vh] text-center text-[#1A1A1A]/50 font-display text-2xl">
          Loading the catalog…
        </div>
      ) : (
        <ObjectCloud products={products} />
      )}
      <Footer />
    </main>
  );
}