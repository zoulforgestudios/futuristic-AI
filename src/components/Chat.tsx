import { motion } from 'motion/react';
import { AIOrb } from './AIOrb';
import { ParticleBackground } from './ParticleBackground';
import { 
  Sparkles, Flame, Zap, Heart, Moon, Sun, 
  Shield, Brain, Clock, Tornado, Grid, Droplet 
} from 'lucide-react';

interface AI {
  id: string;
  name: string;
  color: string;
  icon: any;
  description: string;
}

export const AI_MODES: AI[] = [
  { id: '1', name: 'Nythera', color: '#FFD700', icon: Sparkles, description: 'Soul of Creation' },
  { id: '2', name: 'Abyzor', color: '#DC143C', icon: Flame, description: 'Soul of Destruction' },
  { id: '3', name: 'Voltrix', color: '#9370DB', icon: Zap, description: 'Soul of Balance' },
  { id: '4', name: 'Verse', color: '#50C878', icon: Droplet, description: 'Spirit of Life' },
  { id: '5', name: 'Hadial', color: '#8B00FF', icon: Shield, description: 'Shadow Knight' },
  { id: '6', name: 'Lunara', color: '#E0FFFF', icon: Moon, description: 'Moonlight Soul' },
  { id: '7', name: 'Zharc', color: '#FF8C00', icon: Sun, description: 'Flame Seer' },
  { id: '8', name: 'Xanthara', color: '#FF69B4', icon: Heart, description: 'Emotion Core' },
  { id: '9', name: 'VZX', color: '#6A00FF', icon: Brain, description: 'Mind Core' },
  { id: '10', name: 'Ethyra', color: '#00FFFF', icon: Clock, description: 'Time Core' },
  { id: '11', name: 'Dravon', color: '#FF0000', icon: Tornado, description: 'Chaos Core' },
  { id: '12', name: 'Solen', color: '#C0C0C0', icon: Grid, description: 'Order Core' },
];

interface HomeScreenProps {
  onSelectAI: (ai: AI) => void;
}

export function chatscreen({ onSelectAI }: chatScreenProps) {
  const orbitalRadius = 220; // Increased from 180 to prevent overlap

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0B0018] via-[#1a0033] to-[#0B0018] overflow-hidden pb-24">
      <ParticleBackground />
      
      {/* Header */}
      <div className="relative z-10 pt-12 pb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-2 bg-gradient-to-r from-[#6A00FF] via-[#00FFFF] to-[#6A00FF] bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          ZOUL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#00FFFF] opacity-80"
        >
          Welcome, Veon. Choose your Soul Mode.
        </motion.p>
      </div>

      {/* Central Orb Container */}
      <div className="relative flex items-center justify-center h-[600px]">
        {/* Orbital Ring Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute"
          style={{
            width: orbitalRadius * 2,
            height: orbitalRadius * 2,
            borderRadius: '50%',
            border: '1px solid rgba(106, 0, 255, 0.2)',
            boxShadow: '0 0 40px rgba(106, 0, 255, 0.1), inset 0 0 40px rgba(0, 255, 255, 0.05)',
          }}
        />

        {/* Central Zoul Orb */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="absolute z-20"
        >
          <motion.div 
            className="w-40 h-40 rounded-full relative flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 60px #6A00FF, 0 0 100px #00FFFF',
                '0 0 80px #6A00FF, 0 0 120px #00FFFF',
                '0 0 60px #6A00FF, 0 0 100px #00FFFF',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, #6A00FF, #00FFFF)',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-[#0B0018]/30 backdrop-blur-sm"
            />
            <span 
              className="relative z-10 text-white text-2xl tracking-wider"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ZOUL
            </span>
          </motion.div>
        </motion.div>

        {/* Orbiting AI Mode Orbs */}
        {AI_MODES.map((ai, index) => {
          const angle = (index * (Math.PI * 2)) / AI_MODES.length;
          const x = Math.cos(angle) * orbitalRadius;
          const y = Math.sin(angle) * orbitalRadius;
          
          return (
            <motion.div
              key={ai.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x,
                y,
              }}
              transition={{
                opacity: { delay: 0.5 + index * 0.05 },
                scale: { delay: 0.5 + index * 0.05, type: 'spring' },
                x: { delay: 0.5 + index * 0.05, type: 'spring', stiffness: 100 },
                y: { delay: 0.5 + index * 0.05, type: 'spring', stiffness: 100 },
              }}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-32px',
                marginTop: '-32px',
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.1,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 0.1,
                  }}
                >
                  <AIOrb
                    name={ai.name}
                    color={ai.color}
                    icon={ai.icon}
                    onClick={() => onSelectAI(ai)}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center text-gray-400 px-4 mt-8"
      >
        <p>Tap any orb to activate its AI mode</p>
        <motion.div
          className="mt-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 rounded-full bg-[#6A00FF] animate-pulse" />
          <span className="text-xs text-gray-500">12 Soul Modes Active</span>
        </motion.div>
      </motion.div>

      {/* Quick Action - Random AI */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const randomAI = AI_MODES[Math.floor(Math.random() * AI_MODES.length)];
          onSelectAI(randomAI);
        }}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#6A00FF] to-[#00FFFF] flex items-center justify-center shadow-lg z-40"
        style={{
          boxShadow: '0 0 30px rgba(106, 0, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.4)',
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Sparkles size={28} className="text-white" />
        </motion.div>
      </motion.button>

      {/* Google Fonts Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
