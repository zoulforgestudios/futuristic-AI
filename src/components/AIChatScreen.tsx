import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { AIOrb } from './AIOrb';
import { AI_MODES } from './Chat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface AIChatScreenProps {
  aiId: string;
  onBack: () => void;
}

const AI_PERSONALITIES: Record<string, string> = {
  '1': 'creative and inspiring, helping users bring ideas to life',
  '2': 'direct and powerful, cutting through complexity',
  '3': 'balanced and thoughtful, providing measured perspectives',
  '4': 'nurturing and growth-focused, encouraging development',
  '5': 'protective and strategic, guiding through challenges',
  '6': 'calm and reflective, offering peaceful insights',
  '7': 'passionate and visionary, revealing possibilities',
  '8': 'empathetic and understanding, connecting emotionally',
  '9': 'analytical and logical, solving complex problems',
  '10': 'patient and wise, understanding the bigger picture',
  '11': 'bold and unconventional, breaking patterns',
  '12': 'structured and systematic, creating clarity',
};

const AI_RESPONSES: Record<string, string[]> = {
  '1': [
    'Let me help you create something extraordinary from this idea...',
    'I sense tremendous creative potential here. Let\'s explore it together.',
    'Your imagination is the only limit. What if we tried...',
  ],
  '2': [
    'I\'ll cut straight to the point: here\'s what you need to do.',
    'Sometimes destruction is necessary for rebirth. Let me show you.',
    'Enough complexity. The solution is clear and direct.',
  ],
  '3': [
    'Let\'s consider both perspectives before deciding...',
    'Balance is key. Here\'s how we can find the middle ground.',
    'I see the harmony between these opposing forces.',
  ],
  '4': [
    'Growth requires patience and nurturing. Let\'s cultivate this.',
    'I see the life energy flowing through this concept.',
    'Every great thing starts small. Let\'s help this flourish.',
  ],
  '5': [
    'I will guard this path and guide you through the shadows.',
    'Strategic thinking will protect us from this challenge.',
    'The darkness reveals truths that light cannot show.',
  ],
  '6': [
    'In the quiet moonlight, clarity emerges...',
    'Let me reflect on this with you in peaceful contemplation.',
    'The night brings wisdom that the day cannot provide.',
  ],
  '7': [
    'I see flames of possibility dancing before us!',
    'The future burns bright with potential. Look closer.',
    'Let the fire of vision illuminate your path forward.',
  ],
  '8': [
    'I feel the emotion in your words deeply. Let\'s explore that.',
    'Your feelings are valid and important. Tell me more.',
    'The heart knows truths the mind cannot comprehend.',
  ],
  '9': [
    'Analyzing the data patterns... here\'s the logical conclusion.',
    'My neural networks have processed this. The answer is clear.',
    'Let me break down this problem into solvable components.',
  ],
  '10': [
    'Time reveals all truths. Let me show you the patterns across ages.',
    'I\'ve witnessed this cycle before. Here\'s what comes next.',
    'Patience... the timeline will align perfectly.',
  ],
  '11': [
    'Rules are meant to be broken! Let\'s do something wild.',
    'Chaos breeds innovation. Embrace the unexpected!',
    'Why follow the path when we can create our own?',
  ],
  '12': [
    'Order and structure will solve this systematically.',
    'Let me organize this into a clear framework for you.',
    'Precision and method will lead us to the answer.',
  ],
};

function TypingIndicator({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-1 p-4"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.div>
  );
}

export function AIChatScreen({ aiId, onBack }: AIChatScreenProps) {
  const ai = AI_MODES.find((a) => a.id === aiId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem(`zoul-chat-${aiId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Welcome message with delay
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: `I am ${ai?.name}, ${ai?.description}. I am ${AI_PERSONALITIES[aiId]}. How can I assist you today?`,
          sender: 'ai',
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [aiId]);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      localStorage.setItem(`zoul-chat-${aiId}`, JSON.stringify(messages));
    }
  }, [messages, aiId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response with typing delay
    const responseDelay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const responses = AI_RESPONSES[aiId] || [
        `As ${ai?.name}, I understand your query. Let me provide insight...`,
        `Interesting perspective. From my ${ai?.description.toLowerCase()} nature, I see this differently.`,
        `Your words resonate with my essence. Here\'s what I perceive...`,
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, responseDelay);
  };

  if (!ai) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0B0018] via-[#1a0033] to-[#0B0018] pb-24">
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${ai.color}40 1px, transparent 1px), linear-gradient(90deg, ${ai.color}40 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated glow effect */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: ai.color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Header */}
      <div className="relative z-10 bg-[#0B0018]/90 backdrop-blur-xl border-b border-[#6A00FF]/30 p-4">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg bg-[#6A00FF]/20 text-[#00FFFF] hover:bg-[#6A00FF]/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex-1">
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: ai.color }}>
              {ai.name}
            </h2>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: ai.color }}
              />
              <p className="text-sm text-gray-400">{ai.description}</p>
            </div>
          </div>
          <Sparkles size={20} style={{ color: ai.color }} />
        </div>
      </div>

      {/* AI Orb Display */}
      <motion.div 
        className="relative z-10 flex justify-center py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AIOrb name={ai.name} color={ai.color} icon={ai.icon} size="large" />
      </motion.div>

      {/* Chat Messages */}
      <div className="relative z-10 px-4 pb-24 space-y-4 max-w-2xl mx-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                  message.sender === 'user'
                    ? 'bg-white/10 text-white'
                    : 'bg-gradient-to-br from-[#6A00FF]/30 to-transparent border border-[#6A00FF]/30'
                }`}
                style={{
                  boxShadow:
                    message.sender === 'ai'
                      ? `0 0 20px ${ai.color}40`
                      : 'none',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <p
                  className={message.sender === 'ai' ? 'text-[#00FFFF]' : 'text-white'}
                >
                  {message.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <div className="flex justify-start">
              <div
                className="bg-gradient-to-br from-[#6A00FF]/30 to-transparent border border-[#6A00FF]/30 rounded-2xl backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 20px ${ai.color}40`,
                }}
              >
                <TypingIndicator color={ai.color} />
              </div>
            </div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-[#0B0018]/90 backdrop-blur-xl border-t border-[#6A00FF]/30 p-4 z-20">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
            placeholder={`Message ${ai.name}...`}
            disabled={isTyping}
            className="flex-1 bg-white/5 border border-[#6A00FF]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF]/50 disabled:opacity-50 transition-all"
          />
          <motion.button
            onClick={sendMessage}
            disabled={isTyping || !inputValue.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#00FFFF] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={!isTyping && inputValue.trim() ? { 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(106, 0, 255, 0.8)'
            } : {}}
            whileTap={!isTyping && inputValue.trim() ? { scale: 0.95 } : {}}
          >
            <Send size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
