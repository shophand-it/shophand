import React, { useEffect, useRef } from 'react';

interface NeuralNetworkBGProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: 'neural' | 'cyber' | 'luxury';
}

export function NeuralNetworkBG({ intensity = 'medium', color = 'neural' }: NeuralNetworkBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }> = [];

    const nodeCount = intensity === 'low' ? 8 : intensity === 'medium' ? 12 : 20;
    const connectionDistance = intensity === 'low' ? 150 : intensity === 'medium' ? 120 : 100;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    const getColors = () => {
      switch (color) {
        case 'neural':
          return {
            node: 'hsl(280, 100%, 70%)',
            connection: 'hsl(280, 100%, 70%)',
            glow: 'hsl(280, 100%, 70%)'
          };
        case 'cyber':
          return {
            node: 'hsl(180, 100%, 70%)',
            connection: 'hsl(180, 100%, 70%)',
            glow: 'hsl(180, 100%, 70%)'
          };
        case 'luxury':
          return {
            node: 'hsl(45, 100%, 65%)',
            connection: 'hsl(45, 100%, 65%)',
            glow: 'hsl(45, 100%, 65%)'
          };
        default:
          return {
            node: 'hsl(280, 100%, 70%)',
            connection: 'hsl(280, 100%, 70%)',
            glow: 'hsl(280, 100%, 70%)'
          };
      }
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      ctx.strokeStyle = colors.connection;
      ctx.lineWidth = 0.5;
      
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i >= j) return;
          
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.globalAlpha = opacity * 0.3;
            
            // Add glow effect
            ctx.shadowColor = colors.glow;
            ctx.shadowBlur = 3;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            
            ctx.shadowBlur = 0;
          }
        });
      });

      // Draw nodes
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = colors.node;
      
      nodes.forEach(node => {
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Add inner glow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = colors.node;
        ctx.globalAlpha = 0.8;
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      style={{ zIndex: -1 }}
    />
  );
}