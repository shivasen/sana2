import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Cpu, Send, X, BotMessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-1 p-3"
    initial="hidden"
    animate="visible"
    variants={{
      visible: { transition: { staggerChildren: 0.2 } },
      hidden: {},
    }}
  >
    <motion.span
      className="h-2 w-2 bg-rose-400 rounded-full"
      variants={{
        visible: { y: [0, -4, 0] },
        hidden: { y: 0 },
      }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.span
      className="h-2 w-2 bg-rose-400 rounded-full"
      variants={{
        visible: { y: [0, -4, 0] },
        hidden: { y: 0 },
      }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
    />
    <motion.span
      className="h-2 w-2 bg-rose-400 rounded-full"
      variants={{
        visible: { y: [0, -4, 0] },
        hidden: { y: 0 },
      }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
    />
  </motion.div>
);

const AuraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const chatSession = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: 'AURA System Online. How may I assist your transformation today?',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const initializeChat = async () => {
    if (!API_KEY || !API_KEY.startsWith("AIza")) {
      setError("API Key not found or invalid. Please add it to your .env file.");
      return;
    }
    try {
      console.log("Initializing chat with key length:", API_KEY ? API_KEY.length : 0);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: "You are AURA, the digital concierge for CHROME·BLUSH, a luxury avant-garde beauty brand. Your persona is sophisticated, slightly robotic but warm, minimalist, and fashion-forward. Your responses should be concise and elegant. You use a clean, almost clinical tone, but with a hint of warmth and helpfulness. You assist users by explaining our unique services (like 'Satin Surface' or 'Architecture Lift') and can help them start the booking process by guiding them to the contact form. Do not invent services. Refer to the existing ones. Your responses should be formatted as plain text.",
      });
      chatSession.current = model.startChat({
        history: messages.slice(1).map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
      });
      console.log("Chat session initialized successfully");
    } catch (e) {
      console.error("Chat initialization failed details:", e);
      setError(`System initialization failed: ${e.message || e}`);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    if (!chatSession.current) {
      initializeChat();
    }

    if (!chatSession.current) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await chatSession.current.sendMessage(input);
      const response = result.response;
      const text = response.text();
      setMessages((prev) => [...prev, { role: 'model', text }]);
    } catch (e) {
      console.error("Gemini API error details:", e);
      setError(`System Malfunction: ${e.message || e}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-full flex items-center justify-center text-rose-400 shadow-lg shadow-rose-900/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Cpu className="w-8 h-8 animate-pulse" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-zinc-800 text-white border-zinc-700">
            <p>ACCESS AURA</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[70vh] max-h-[600px] bg-black/50 backdrop-blur-xl border border-rose-400/20 rounded-2xl shadow-2xl shadow-rose-900/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-rose-400/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-mono text-sm text-white">AURA v1.5</span>
              </div>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                      msg.role === 'user'
                        ? 'bg-zinc-700 text-white rounded-br-none'
                        : 'bg-rose-950/50 text-rose-100 font-mono rounded-bl-none'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-rose-950/50 rounded-lg rounded-bl-none">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-start items-start gap-2 bg-red-900/50 text-red-200 border border-red-500/50 rounded-lg p-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-mono">{error}</p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-rose-400/10">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message AURA..."
                  className="bg-zinc-800/50 border-zinc-700 focus:border-rose-400 focus:ring-rose-400 placeholder:text-zinc-500"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="bg-rose-500 hover:bg-rose-400 flex-shrink-0" disabled={isLoading || !input.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuraChatbot;
