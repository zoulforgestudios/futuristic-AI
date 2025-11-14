import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AIOrbProps {
  name: string;
  color: string;
  icon: LucideIcon;
  size?: 'small' | 'large';
  onClick?: () => void;
  angle?: number;
  distance?: number;
}

export function AIOrb({ name, color, icon: Icon, size = 'small', onClick, angle = 0, distance = 0 }: AIOrbProps) {
  const isSmall = size === 'small';
  const orbSize = isSmall ? 'w-16 h-16' : 'w-40 h-40';
  const iconSize = isSmall ? 24 : 48;

  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x,
        y,
      }}
      whileHover={{ 
        scale: 1.15,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onClick}
      className={`${orbSize} rounded-full cursor-pointer flex items-center justify-center relative group`}
      style={{
        background: `radial-gradient(circle, ${color}50, ${color}15)`,
        boxShadow: `0 0 30px ${color}60, inset 0 0 20px ${color}30`,
      }}
    >
      {/* Pulsing outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${color}40`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}30, transparent)`,
        }}
      />

      {/* Rotating accent */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}20, transparent)`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <Icon
          size={iconSize}
          style={{ color }}
          className="relative z-10 drop-shadow-[0_0_10px_currentColor]"
        />
      </motion.div>

      {/* Tooltip */}
      {isSmall && (
        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: -5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <div 
            className="px-3 py-1 rounded-lg backdrop-blur-sm"
            style={{
              background: `${color}20`,
              border: `1px solid ${color}40`,
              boxShadow: `0 0 15px ${color}30`,
            }}
          >
            <span className="text-xs font-medium" style={{ color }}>{name}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
