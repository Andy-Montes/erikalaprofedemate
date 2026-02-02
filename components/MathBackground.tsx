import React, { useMemo, useState, useEffect, useRef } from 'react';

const MathBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();
  const currentPos = useRef({ x: -500, y: -500 });
  
  // Símbolos específicos solicitados
  const symbols = ['5', '7', '8', '3', 'π', '√'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      currentPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Suavizado de la posición (lerp)
      setMousePos(prev => ({
        x: prev.x + (currentPos.current.x - prev.x) * 0.12,
        y: prev.y + (currentPos.current.y - prev.y) * 0.12,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []); // Dependencia vacía para evitar reinicios constantes

  // Partículas más armónicas y transparentes
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      angleOffset: (i / 12) * Math.PI * 2,
      radius: 60 + (i * 20), 
      size: 18 + (i % 3) * 6,
      speed: 0.005 + (i * 0.001),
      color: i % 3 === 0 ? 'text-brandRed' : 'text-brandNavy',
      opacity: 0.2 + (Math.random() * 0.2),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-transparent">
      {isVisible && particles.map((p) => {
        const time = Date.now() * 0.001;
        const currentAngle = p.angleOffset + (time * p.speed);
        
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
              transform: `translate3d(${x}px, ${y}px, 0) rotate(${Math.sin(time + p.id) * 10}deg)`,
              pointerEvents: 'none',
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
