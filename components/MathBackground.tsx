import React, { useMemo, useState, useEffect, useRef } from 'react';

const MathBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();
  const currentPos = useRef({ x: -500, y: -500 });
  
  const symbols = ['5', '7', '8', '3', 'π', '√'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      currentPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setMousePos(prev => ({
        x: prev.x + (currentPos.current.x - prev.x) * 0.15,
        y: prev.y + (currentPos.current.y - prev.y) * 0.15,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      angleOffset: (i / 12) * Math.PI * 2,
      radius: 40 + (i % 3) * 15, // Radio mucho más pequeño y cercano al cursor
      size: 16 + (i % 2) * 4,
      speed: 0.015 + (i * 0.002), // Un poco más rápido para dinamismo cercano
      color: i % 3 === 0 ? 'text-brandRed' : 'text-brandNavy',
      opacity: 0.3 + (Math.random() * 0.2),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-transparent">
      {isVisible && particles.map((p) => {
        const time = Date.now() * 0.001;
        const currentAngle = p.angleOffset + (time * p.speed);
        
        // Posición orbital compacta
        const x = mousePos.x + Math.cos(currentAngle) * p.radius - (p.size / 2);
        const y = mousePos.y + Math.sin(currentAngle) * p.radius - (p.size / 2);

        return (
          <div
            key={p.id}
            className={`absolute font-mono font-bold ${p.color} select-none will-change-transform`}
            style={{
              left: 0,
              top: 0,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              // Mantener siempre de frente (sin rotación en el eje Z excesiva)
              // Solo una oscilación muy sutil
              transform: `translate3d(${x}px, ${y}px, 0)`,
              pointerEvents: 'none',
              textShadow: '0 0 2px rgba(255,255,255,0.8)', // Ayuda a que no se ocluyan visualmente
            }}
          >
            {p.symbol}
          </div>
        );
      })}
    </div>
  );
};

export default MathBackground;
