import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingPart {
  id: string;
  type: "engine" | "brake" | "tire" | "battery" | "filter" | "spark" | "belt";
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  duration: number;
}

const partEmojis = {
  engine: "🔧",
  brake: "🛞", 
  tire: "🚗",
  battery: "🔋",
  filter: "🛠️",
  spark: "⚡",
  belt: "🔩"
};

const partNames = {
  engine: "Engine Part",
  brake: "Brake Disc", 
  tire: "Tire",
  battery: "Battery",
  filter: "Air Filter",
  spark: "Spark Plug",
  belt: "Timing Belt"
};

export function PartsDeliveryMotionBG() {
  const [parts, setParts] = useState<FloatingPart[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    const generatePart = (): FloatingPart => {
      const types = Object.keys(partEmojis) as Array<keyof typeof partEmojis>;
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Start from random edge
      const edge = Math.floor(Math.random() * 4);
      let startX, startY, targetX, targetY;
      
      switch(edge) {
        case 0: // Top
          startX = Math.random() * windowSize.width;
          startY = -100;
          targetX = Math.random() * windowSize.width;
          targetY = windowSize.height + 100;
          break;
        case 1: // Right  
          startX = windowSize.width + 100;
          startY = Math.random() * windowSize.height;
          targetX = -100;
          targetY = Math.random() * windowSize.height;
          break;
        case 2: // Bottom
          startX = Math.random() * windowSize.width;
          startY = windowSize.height + 100;
          targetX = Math.random() * windowSize.width;
          targetY = -100;
          break;
        default: // Left
          startX = -100;
          startY = Math.random() * windowSize.height;
          targetX = windowSize.width + 100;
          targetY = Math.random() * windowSize.height;
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        startX,
        startY,
        targetX,
        targetY,
        size: Math.random() * 30 + 20, // 20-50px
        delay: Math.random() * 2,
        duration: Math.random() * 15 + 10 // 10-25 seconds
      };
    };

    const interval = setInterval(() => {
      setParts(prevParts => {
        // Remove old parts and add new ones
        const activeParts = prevParts.filter(part => 
          Date.now() - parseInt(part.id, 36) < part.duration * 1000
        );
        
        // Add new part occasionally
        if (Math.random() < 0.7 && activeParts.length < 12) {
          return [...activeParts, generatePart()];
        }
        
        return activeParts;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-automotive-black-900/50 via-transparent to-automotive-black-800/30" />
      
      <AnimatePresence>
        {parts.map((part) => (
          <motion.div
            key={part.id}
            initial={{ 
              x: part.startX, 
              y: part.startY,
              opacity: 0,
              scale: 0.5,
              rotate: 0
            }}
            animate={{ 
              x: part.targetX, 
              y: part.targetY,
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.5, 1, 1, 0.8],
              rotate: [0, 180, 360]
            }}
            exit={{ 
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: part.duration,
              delay: part.delay,
              ease: "linear",
              opacity: { times: [0, 0.1, 0.8, 1] },
              scale: { times: [0, 0.1, 0.8, 1] }
            }}
            className="absolute"
            style={{
              fontSize: `${part.size}px`,
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))'
            }}
          >
            <div className="relative group">
              {/* Part emoji */}
              <div className="text-gold-400 group-hover:scale-110 transition-transform">
                {partEmojis[part.type]}
              </div>
              
              {/* Delivery trail effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-transparent"
                style={{
                  width: `${part.size * 2}px`,
                  height: `2px`,
                  left: `-${part.size}px`,
                  top: `${part.size / 2}px`
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: part.delay
                }}
              />
              
              {/* Part label on hover */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-automotive-black-800/90 text-gold-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {partNames[part.type]}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Delivery trucks moving across screen */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`truck-${i}`}
            initial={{ x: -100, y: 100 + i * 200 }}
            animate={{ 
              x: windowSize.width + 100,
              y: 100 + i * 200 + Math.sin(Date.now() / 1000 + i) * 20
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 7
            }}
            className="absolute text-4xl"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))'
            }}
          >
            🚛
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating delivery boxes */}
      <AnimatePresence>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`box-${i}`}
            initial={{ 
              x: Math.random() * windowSize.width,
              y: windowSize.height + 50,
              rotate: 0
            }}
            animate={{ 
              x: Math.random() * windowSize.width,
              y: -50,
              rotate: 360
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 6
            }}
            className="absolute text-2xl opacity-60"
          >
            📦
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
}