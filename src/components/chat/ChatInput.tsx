'use client'

import { useState, useRef } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onSendFile: (file: File) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, onSendFile, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSendFile(file)
      // Reset input para permitir selecionar o mesmo arquivo novamente
      e.target.value = ''
    }
  }

  const handleAttachClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex items-end gap-2 p-3 bg-gray-100 border-t border-gray-200">
      {/* Input de arquivo (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,image/*,application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Botão de anexo */}
      <button
        type="button"
        onClick={handleAttachClick}
        disabled={disabled}
        className={`
          flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full 
          bg-white hover:bg-gray-50 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        title="Anexar arquivo (PDF, imagem ou texto)"
        aria-label="Anexar arquivo"
      >
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </button>

      {/* Campo de texto */}
      <form onSubmit={handleSubmit} className="flex-1 flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Digite uma mensagem ou cole o texto da matrícula..."
            rows={1}
            className="w-full px-4 py-2.5 bg-white rounded-2xl border-0 resize-none focus:ring-2 focus:ring-brand-500 outline-none text-sm disabled:bg-gray-100 max-h-32"
            style={{ minHeight: '42px' }}
          />
        </div>

        {/* Botão enviar */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-brand-500 hover:bg-brand-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="Enviar mensagem"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  )
}
