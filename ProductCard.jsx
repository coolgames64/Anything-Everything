import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const spanClasses = {
  small: 'col-span-1 md:col-span-2',
  medium: 'col-span-1 md:col-span-3',
  large: 'col-span-2 md:col-span-4',
  feature: 'col-span-2 md:col-span-6',
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className={spanClasses[product.scale] || 'col-span-1 md:col-span-3'}>
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-[#EDEDE8] aspect-[4/5]">
          <Image
            src={product.image_url}
            alt={product.name}
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            fittingType="fit"
          />
        </div>
        <div className="flex items-start justify-between mt-4 gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50">{product.category}</p>
            <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] mt-1 leading-tight truncate">{product.name}</h3>
          </div>
          <p className="font-display text-xl text-[#E03C31] whitespace-nowrap">£{product.price.toLocaleString()}</p>
        </div>
      </Link>
      <button
        onClick={() => addItem(product)}
        className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/70 hover:text-[#E03C31] transition min-h-[44px]"
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus size={16} /> Add to cart
      </button>
    </div>
  );
}