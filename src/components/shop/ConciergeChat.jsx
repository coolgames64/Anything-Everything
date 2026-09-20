const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useRef, useState } from 'react';

import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';

const AGENT_NAME = 'order_concierge';
const GREETING = 'Good day — I\'m the concierge. Ask me anything about shipping, payment, or getting an object into your hands.';

export default function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [starting, setStarting] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsubscribe = db.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsubscribe;
  }, [conversation?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  const openPanel = async () => {
    setOpen(true);
    if (conversation) return;
    setStarting(true);
    try {
      const conv = await db.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: 'Order concierge' },
      });
      setConversation(conv);
    } finally {
      setStarting(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || !conversation || starting) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    await db.agents.addMessage(conversation, { role: 'user', content: text });
  };

  const thinking =
    messages.length > 0 && messages[messages.length - 1].role === 'user';

  return (
    <>
      <button
        onClick={openPanel}
        className={cn(
          'fixed bottom-5 right-5 z-[55] w-14 h-14 rounded-full bg-[#1A1A1A] text-[#F7F7F2] flex items-center justify-center hover:bg-[#E03C31] transition shadow-xl',
          open && 'hidden'
        )}
        aria-label="Open the order concierge"
      >
        <MessageCircle size={24} />
      </button>

      <div
        className={cn(
          'fixed bottom-0 right-0 md:bottom-5 md:right-5 z-[75] w-full md:w-[400px] h-[80vh] md:h-[600px] md:max-h-[85vh] bg-[#F7F7F2] border-[2px] border-[#1A1A1A] flex flex-col transition-all duration-300',
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        role="dialog"
        aria-label="Order concierge chat"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b-[2px] border-[#1A1A1A] shrink-0">
          <div>
            <h2 className="font-display text-lg text-[#1A1A1A] leading-none">The Concierge</h2>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 mt-1">Shipping · Payment · Fulfillment</p>
          </div>
          <button onClick={() => setOpen(false)} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1A1A1A] hover:text-[#E03C31] transition" aria-label="Close concierge">
            <X size={20} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5">
          <MessageBubble message={{ role: 'assistant', content: GREETING }} />
          {starting && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 mt-2">Connecting…</p>
          )}
          {messages.map((m, i) => <MessageBubble key={i} message={m} />)}
          {thinking && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/40">Considering…</p>
          )}
        </div>

        <div className="flex gap-2 p-4 border-t-[2px] border-[#1A1A1A] shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about an order…"
            className="flex-1 min-h-[48px] bg-transparent border-[2px] border-[#1A1A1A] px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#E03C31] transition placeholder:text-[#1A1A1A]/30"
          />
          <button
            onClick={send}
            disabled={!input.trim() || starting}
            className="min-h-[48px] min-w-[52px] bg-[#E03C31] text-[#F7F7F2] flex items-center justify-center hover:bg-[#1A1A1A] transition disabled:opacity-40"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}