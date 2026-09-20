const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Image } from '@/components/ui/image';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem, setIsOpen } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.entities.Product.get(id)
      .then(p => { setProduct(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#1A1A1A]/50 font-display text-2xl">Loading object…</div>;
  }
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[#1A1A1A]/60 font-display text-2xl">Object not found.</p>
        <Link to="/" className="text-[#E03C31] underline">Return to catalog</Link>
      </div>
    );
  }

  const buyNow = () => { addItem(product, qty); setIsOpen(true); };

  return (
    <main className="pt-20">
      <div className="px-[5vw] md:px-[8vw] py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] min-h-[44px] transition">
          <ArrowLeft size={16} /> Back to catalog
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] bg-[#EDEDE8] order-1">
          <Image src={product.image_url} alt={product.name} className="w-full h-full" fittingType="fit" />
        </div>
        <div className="px-[5vw] md:px-[6vw] py-[8vh] flex flex-col justify-center order-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/50 mb-4">{product.category}</p>
          <h1 className="font-display font-light text-[#1A1A1A] text-5xl md:text-7xl leading-[0.95] mb-6">{product.name}</h1>
          <p className="font-display text-4xl text-[#E03C31] mb-8">£{product.price.toLocaleString()}</p>
          <p className="text-[#1A1A1A]/70 text-lg leading-relaxed max-w-md mb-8">{product.description}</p>
          <dl className="grid grid-cols-2 gap-y-5 gap-x-8 max-w-md mb-10 text-sm">
            {product.material && (
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50">Material</dt>
                <dd className="text-[#1A1A1A] mt-1">{product.material}</dd>
              </div>
            )}
            {product.dimensions && (
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50">Dimensions</dt>
                <dd className="text-[#1A1A1A] mt-1">{product.dimensions}</dd>
              </div>
            )}
          </dl>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60">Quantity</span>
            <div className="flex items-center border-[2px] border-[#1A1A1A]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition text-lg" aria-label="Decrease quantity">−</button>
              <span className="w-12 text-center text-[#1A1A1A] text-lg">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-12 h-12 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition text-lg" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <button onClick={buyNow} className="flex-1 min-h-[56px] bg-[#E03C31] text-[#F7F7F2] text-xs uppercase tracking-[0.25em] hover:bg-[#1A1A1A] transition">
              Buy now
            </button>
            <button
              onClick={() => { addItem(product, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
              className="flex-1 min-h-[56px] border-[2px] border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition flex items-center justify-center gap-2"
            >
              {added ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add to cart</>}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}