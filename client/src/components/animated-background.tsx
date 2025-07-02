import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Floating Car Icons */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 10,
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="30" viewBox="0 0 60 30" className="text-gold-500/30 fill-current">
          <path d="M10 20h40v2H10v-2zm45-8c1.1 0 2 .9 2 2v8h-4v-2c0-1.1-.9-2-2-2s-2 .9-2 2v2H35v-2c0-1.1-.9-2-2-2s-2 .9-2 2v2H11v-8c0-1.1.9-2 2-2h42zm-40-2l-3-6h8l3 6h-8zm35 0l-3-6h8l3 6h-8z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-32 right-20"
        animate={{
          x: -mousePosition.x * 15,
          y: mousePosition.y * 15,
          rotate: [0, -3, 3, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="25" viewBox="0 0 50 25" className="text-gold-500/20 fill-current">
          <path d="M8 18h34v2H8v-2zm37-6c.9 0 1.6.7 1.6 1.6v6.4h-3.2v-1.6c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v1.6H28v-1.6c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v1.6H9v-6.4c0-.9.7-1.6 1.6-1.6h34.4zm-32-2l-2.4-4.8h6.4l2.4 4.8h-6.4zm28 0l-2.4-4.8h6.4l2.4 4.8h-6.4z"/>
        </svg>
      </motion.div>

      {/* Floating Parts */}
      <motion.div
        className="absolute top-40 left-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold-500/25 fill-current">
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="20" r="8" fill="currentColor"/>
          <circle cx="20" cy="20" r="3" fill="black"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-1/3"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          rotate: [0, -360],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" className="text-gold-500/20 fill-current">
          <rect x="5" y="15" width="25" height="5" rx="2"/>
          <rect x="15" y="5" width="5" height="25" rx="2"/>
          <circle cx="17.5" cy="17.5" r="3" fill="black"/>
        </svg>
      </motion.div>

      {/* Delivery Route Lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(255,215,0)" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="rgb(255,215,0)" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="rgb(255,215,0)" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <motion.path
            d="M 100 200 Q 300 100 500 300 Q 700 500 900 400"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 200 500 Q 400 300 600 600 Q 800 400 1000 500"
            stroke="url(#routeGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Ambient Light Spots */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-gold-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Moving Delivery Truck */}
      <motion.div
        className="absolute"
        animate={{
          x: ["-100px", "calc(100vw + 100px)"],
          y: [300, 280, 320, 300],
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg width="80" height="40" viewBox="0 0 80 40" className="text-gold-500/40 fill-current">
          <rect x="10" y="20" width="50" height="15" rx="2"/>
          <rect x="5" y="25" width="15" height="8" rx="1"/>
          <circle cx="20" cy="35" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="35" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="25" y="15" width="20" height="5" rx="1"/>
          <text x="30" y="30" fontSize="8" fill="black">📦</text>
        </svg>
      </motion.div>

      {/* Twinkling Stars Effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}