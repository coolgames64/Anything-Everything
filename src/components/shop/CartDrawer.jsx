const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Image } from '@/components/ui/image';

import { cn } from '@/lib/utils';

const STEPS = ['cart', 'shipping', 'payment', 'review'];
const LABELS = ['Cart', 'Shipping', 'Payment', 'Review'];

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clear } = useCart();
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', country: '', card: '', exp: '', cvc: '' });
  const [submitting, setSubmitting] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const close = () => setIsOpen(false);

  const placeOrder = async () => {
    setSubmitting(true);
    try {
      await db.entities.Order.create({
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        total,
        customer_name: form.name,
        email: form.email,
        address: `${form.address}, ${form.city}, ${form.zip}, ${form.country}`,
        status: 'placed',
      });
      clear();
      setStep('done');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep('cart');
    setForm({ name: '', email: '', address: '', city: '', zip: '', country: '', card: '', exp: '', cvc: '' });
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-[#1A1A1A]/40 backdrop-blur-[2px] transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
      />
      <aside
        className={cn(
          'fixed top-0 right-0 z-[70] h-full w-full sm:w-[42vw] min-w-[360px] max-w-[640px] bg-[#F7F7F2] shadow-2xl transition-transform duration-500 ease-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-8 h-20 border-b-[2px] border-[#1A1A1A]">
          <h2 className="font-display text-2xl text-[#1A1A1A]">{step === 'done' ? 'Order Confirmed' : 'The Terminal'}</h2>
          <button onClick={close} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1A1A1A] hover:text-[#E03C31] transition" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {step !== 'done' && (
          <div className="px-6 md:px-8 py-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] flex-wrap">
            {LABELS.map((label, i) => (
              <span key={label} className={cn(i === stepIndex ? 'text-[#E03C31]' : 'text-[#1A1A1A]/40')}>
                {label}{i < 3 && <span className="text-[#1A1A1A]/20 ml-2">/</span>}
              </span>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4">
          {step === 'cart' && (
            items.length === 0 ? (
              <p className="text-[#1A1A1A]/50 mt-8 font-display text-xl">Your cart is empty. Begin acquiring objects.</p>
            ) : (
              <div className="space-y-6">
                {items.map(i => (
                  <div key={i.id} className="flex gap-4 border-b border-[#E5E5E0] pb-6">
                    <div className="w-20 h-24 bg-[#EDEDE8] overflow-hidden shrink-0">
                      <Image src={i.image_url} alt={i.name} className="w-full h-full" fittingType="fit" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-[#1A1A1A] leading-tight">{i.name}</h3>
                      <p className="text-[#E03C31] font-display text-lg mt-1">£{(i.price * i.qty).toLocaleString()}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQty(i.id, i.qty - 1)} className="w-8 h-8 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition" aria-label="Decrease quantity">−</button>
                        <span className="w-8 text-center text-[#1A1A1A]">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-8 h-8 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition" aria-label="Increase quantity">+</button>
                        <button onClick={() => removeItem(i.id)} className="ml-auto text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 hover:text-[#E03C31] min-h-[44px] transition">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {step === 'shipping' && (
            <div className="space-y-5">
              <Field label="Full name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <Field label="Address" value={form.address} onChange={v => setForm({ ...form, address: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={form.city} onChange={v => setForm({ ...form, city: v })} />
                <Field label="Postcode" value={form.zip} onChange={v => setForm({ ...form, zip: v })} />
              </div>
              <Field label="Country" value={form.country} onChange={v => setForm({ ...form, country: v })} />
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <Field label="Card number" value={form.card} onChange={v => setForm({ ...form, card: v })} placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" value={form.exp} onChange={v => setForm({ ...form, exp: v })} placeholder="MM/YY" />
                <Field label="CVC" value={form.cvc} onChange={v => setForm({ ...form, cvc: v })} placeholder="123" />
              </div>
              <p className="text-xs text-[#1A1A1A]/50">Demo checkout — no real payment is processed.</p>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">Ship to</p>
                <p className="text-[#1A1A1A] leading-relaxed">{form.name}<br />{form.address}, {form.city}, {form.zip}, {form.country}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">Payment</p>
                <p className="text-[#1A1A1A]">Card ending {form.card.slice(-4) || '••••'}</p>
              </div>
              <div className="border-t-[2px] border-[#1A1A1A] pt-4 space-y-2">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className="text-[#1A1A1A]/70">{i.name} × {i.qty}</span>
                    <span className="text-[#1A1A1A]">£{(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-display text-xl pt-2">
                  <span>Total</span>
                  <span className="text-[#E03C31]">£{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="flex flex-col items-center justify-center text-center h-full gap-4">
              <div className="w-16 h-16 rounded-full bg-[#E03C31] text-[#F7F7F2] flex items-center justify-center">
                <Check size={32} />
              </div>
              <h3 className="font-display text-3xl text-[#1A1A1A]">Acquired.</h3>
              <p className="text-[#1A1A1A]/60 max-w-xs">
                Your objects are now in motion. A confirmation has been dispatched to {form.email || 'your inbox'}.
              </p>
              <button
                onClick={() => { reset(); close(); }}
                className="mt-4 min-h-[44px] px-8 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition"
              >
                Continue browsing
              </button>
            </div>
          )}
        </div>

        {step !== 'done' && items.length > 0 && (
          <div className="px-6 md:px-8 py-6 border-t-[2px] border-[#1A1A1A]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/60">Total</span>
              <span className="font-display text-3xl text-[#E03C31]">£{total.toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              {stepIndex > 0 && (
                <button
                  onClick={() => setStep(STEPS[stepIndex - 1])}
                  className="flex-1 min-h-[52px] border-[2px] border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] hover:text-[#F7F7F2] transition"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              {step !== 'review' ? (
                <button
                  onClick={() => setStep(STEPS[stepIndex + 1])}
                  className="flex-[2] min-h-[52px] bg-[#E03C31] text-[#F7F7F2] text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={submitting}
                  className="flex-[2] min-h-[52px] bg-[#E03C31] text-[#F7F7F2] text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition disabled:opacity-50"
                >
                  {submitting ? 'Placing…' : 'Place order'}
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/60 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full min-h-[48px] bg-transparent border-b-[2px] border-[#1A1A1A] text-[#1A1A1A] text-lg outline-none focus:border-[#E03C31] transition py-2 placeholder:text-[#1A1A1A]/30"
      />
    </label>
  );
}