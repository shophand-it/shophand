import { motion } from "framer-motion";

export function PartsDeliveryMotionBG() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-automotive-black-900/50 via-transparent to-automotive-black-800/30" />
      
      {/* Moving delivery trucks */}
      <motion.div
        className="absolute text-4xl top-20"
        animate={{
          x: [-100, 1400],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))'
        }}
      >
        🚛
      </motion.div>

      <motion.div
        className="absolute text-4xl top-40"
        animate={{
          x: [1400, -100],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 10
        }}
        style={{
          filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))'
        }}
      >
        🚛
      </motion.div>

      {/* Floating auto parts */}
      {['🔧', '🛞', '🔋', '🛠️', '⚡', '🔩'].map((partEmoji, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + index * 10}%`,
            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))'
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          {partEmoji}
        </motion.div>
      ))}

      {/* Delivery boxes */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`box-${index}`}
          className="absolute text-2xl opacity-60"
          style={{
            right: `${10 + index * 30}%`,
            bottom: `${10 + index * 15}%`,
          }}
          animate={{
            rotate: [0, 360],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 2
          }}
        >
          📦
        </motion.div>
      ))}

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

      {/* Delivery status indicator */}
      <div className="absolute top-4 right-4 bg-automotive-black-800/90 text-gold-400 text-xs px-3 py-1 rounded-full border border-gold-400/20">
        🚚 Live Delivery Network
      </div>
    </div>
  );
}