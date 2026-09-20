import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const STATUS_LABEL = {
  pending: 'Checking records…',
  running: 'Checking records…',
  in_progress: 'Checking records…',
  completed: 'Done',
  success: 'Done',
  failed: 'Failed',
  error: 'Failed',
};

function ToolStatus({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const failed = ['failed', 'error'].includes(toolCall.status);
  const label = STATUS_LABEL[toolCall.status] || 'Working…';
  return (
    <div className="mt-2 text-[10px] uppercase tracking-[0.25em]">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 hover:text-[#E03C31] transition">
        <span className={cn('w-1.5 h-1.5 rounded-full', failed ? 'bg-[#1A1A1A]/30' : 'bg-[#E03C31]')} />
        <span className={failed ? 'text-[#1A1A1A]/40' : 'text-[#1A1A1A]/50'}>{label}</span>
      </button>
      {expanded && (
        <pre className="mt-2 p-2 bg-[#1A1A1A] text-[#F7F7F2] text-[11px] tracking-normal whitespace-pre-wrap break-words">
          {toolCall.arguments_string}
        </pre>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex mb-3', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'max-w-[85%] px-4 py-3',
        isUser ? 'bg-[#1A1A1A] text-[#F7F7F2]' : 'bg-white border border-[#1A1A1A]/10 text-[#1A1A1A]'
      )}>
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed [&_p]:mb-2 last:[&_p]:mb-0">
            <ReactMarkdown>{message.content || ''}</ReactMarkdown>
          </div>
        )}
        {(message.tool_calls || []).map((tc, i) => <ToolStatus key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}