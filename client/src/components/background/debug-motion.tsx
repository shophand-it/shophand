import { motion } from "framer-motion";

export function DebugMotion() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Simple test animation */}
      <motion.div
        className="absolute top-10 left-10 text-6xl"
        animate={{
          x: [0, 200, 0],
          rotate: [0, 360, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🔧
      </motion.div>
      
      <motion.div
        className="absolute top-32 left-20 text-4xl"
        animate={{
          x: [0, 400, 0],
          y: [0, 100, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🚛
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        📦
      </motion.div>
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
        Motion Debug Active
      </div>
    </div>
  );
}