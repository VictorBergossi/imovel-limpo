'use client'

import { ChatMessage } from '@/lib/types'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user'
  const isLoading = message.type === 'loading'

  if (isLoading) {
    return (
      <div className="flex justify-start mb-3">
        <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-[85%]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-gray-500">Digitando...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`
          rounded-2xl px-4 py-2 max-w-[85%] shadow-sm
          ${isUser 
            ? 'bg-[#DCF8C6] rounded-br-md' 
            : 'bg-white rounded-bl-md'
          }
        `}
      >
        <p className="text-gray-800 text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p className={`text-[10px] mt-1 ${isUser ? 'text-gray-500 text-right' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  )
}


