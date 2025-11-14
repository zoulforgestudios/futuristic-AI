import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Send, ArrowLeft } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
}

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Nova',
    avatar: '🌟',
    lastMessage: 'See you in the Zoulverse!',
    timestamp: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Cypher',
    avatar: '🔮',
    lastMessage: 'That AI mode was amazing',
    timestamp: '15m ago',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Echo',
    avatar: '⚡',
    lastMessage: 'Let\'s explore the map together',
    timestamp: '1h ago',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    name: 'Prism',
    avatar: '💎',
    lastMessage: 'Thanks for the help!',
    timestamp: '3h ago',
    unread: 0,
    online: false,
  },
];

export function ChatScreen() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hey! How are you?',
      sender: 'contact',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: 'I\'m great! Just exploring the new AI modes',
      sender: 'user',
      timestamp: '10:32 AM',
    },
  ]);

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    // Simulate reply
    setTimeout(() => {
      const replies = [
        'That sounds interesting!',
        'Tell me more about that',
        'I agree!',
        'Let\'s do it!',
      ];
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'contact',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  if (selectedContact) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#0B0018] via-[#1a0033] to-[#0B0018] pb-24">
        {/* Chat Header */}
        <div className="relative z-10 bg-[#0B0018]/80 backdrop-blur-xl border-b border-[#6A00FF]/30 p-4">
          <div className="flex items-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedContact(null)}
              className="p-2 rounded-lg bg-[#6A00FF]/20 text-[#00FFFF] hover:bg-[#6A00FF]/30 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6A00FF] to-[#00FFFF] flex items-center justify-center text-2xl">
              {selectedContact.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white">{selectedContact.name}</h3>
              <p className="text-xs text-[#00FFFF]">
                {selectedContact.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto pb-24">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-[#6A00FF] to-[#00FFFF] text-white'
                    : 'bg-white/5 border border-[#6A00FF]/30 text-white'
                }`}
                style={{
                  boxShadow:
                    message.sender === 'user'
                      ? '0 0 20px rgba(106, 0, 255, 0.4)'
                      : 'none',
                }}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-60 mt-1 block">{message.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="fixed bottom-20 left-0 right-0 bg-[#0B0018]/80 backdrop-blur-xl border-t border-[#6A00FF]/30 p-4">
          <div className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-[#6A00FF]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF]/50"
            />
            <button
              onClick={sendMessage}
              className="p-3 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#00FFFF] text-white hover:shadow-[0_0_20px_rgba(106,0,255,0.8)] transition-all"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0B0018] via-[#1a0033] to-[#0B0018] pb-24">
      {/* Header */}
      <div className="relative z-10 bg-[#0B0018]/80 backdrop-blur-xl border-b border-[#6A00FF]/30 p-4">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl mb-4 text-[#00FFFF]"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Messages
          </h2>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full bg-white/5 border border-[#6A00FF]/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF]/50"
            />
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-4 py-4 space-y-2 max-w-2xl mx-auto">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedContact(contact)}
            className="bg-white/5 backdrop-blur-sm border border-[#6A00FF]/30 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6A00FF] to-[#00FFFF] flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0B0018]" />
                )}
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white truncate">{contact.name}</h3>
                  <span className="text-xs text-gray-400">{contact.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
              </div>

              {/* Unread Badge */}
              {contact.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6A00FF] to-[#00FFFF] flex items-center justify-center">
                  <span className="text-xs text-white">{contact.unread}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
