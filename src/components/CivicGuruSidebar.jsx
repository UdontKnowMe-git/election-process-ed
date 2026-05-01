import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import { useGemini } from '../hooks/useGemini';

const QUICK_ASKS = [
  "How do I register to vote?",
  "What is the Model Code of Conduct?",
  "How do EVMs work?",
  "What is a constituency?"
];

export const CivicGuruSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const { messages, isLoading, error, sendMessage } = useGemini();

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleQuickAsk = (text) => {
    if (isLoading) return;
    sendMessage(text);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#1A365D] text-[#FDFBF7] rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-[#102A4A] transition-colors border-2 border-[#E47A2E]"
            aria-label="Open Civic Guru Chat"
          >
            <MessageCircle className="w-6 h-6 text-[#E47A2E]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-[#FDFBF7]/90 backdrop-blur-2xl shadow-2xl z-50 flex flex-col border-l border-[#1A365D]/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#1A365D] text-[#FDFBF7] shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#E47A2E]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">Civic Guru</h3>
                  <span className="text-xs text-[#FDFBF7]/70 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
                    AI Assistant Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#FDFBF7]/10 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 styled-scrollbar relative">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#E47A2E]' : 'bg-[#1A365D]'
                      }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-[#1A365D] text-white rounded-tr-none'
                      : 'bg-white text-[#1A365D] border border-[#1A365D]/10 rounded-tl-none shadow-sm'
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-[#1A365D] flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#1A365D]/10 rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#1A365D]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-[#1A365D]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-[#1A365D]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-[#1A365D]/10">

              {/* Quick Asks (Only show if not loading and user hasn't typed much) */}
              {messages.length < 3 && !isLoading && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {QUICK_ASKS.map((ask, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAsk(ask)}
                      className="text-xs bg-[#1A365D]/5 hover:bg-[#1A365D]/10 text-[#1A365D] py-1.5 px-3 rounded-full transition-colors border border-[#1A365D]/10"
                    >
                      {ask}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex items-end gap-2 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask Civic Guru..."
                  className="w-full bg-[#FDFBF7] border border-[#1A365D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E47A2E] focus:ring-1 focus:ring-[#E47A2E] resize-none max-h-32 styled-scrollbar"
                  rows="1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 bg-[#E47A2E] text-white rounded-xl hover:bg-[#d66a1e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
              <p className="text-[10px] text-center text-[#1A365D]/40 mt-2">
                Civic Guru can make mistakes. Verify important information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 6px;
        }
      `}} />
    </>
  );
};
