
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
  }, [isVisible]);

  // Partículas más armónicas y transparentes
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      angleOffset: (i / 10) * Math.PI * 2, // Distribución inicial uniforme en círculo
      radius: 30 + (i * 8), // Radios crecientes pero compactos (30px a 110px)
      size: 24 + (i % 3) * 6, // Tamaños variados pero controlados
      speed: 0.008 + (i * 0.001), // Velocidades ligeramente distintas para dinamismo
      color: i % 3 === 0 ? 'text-brandRed' : 'text-brandNavy',
      // Más transparentes como se solicitó (0.15 a 0.3)
      opacity: 0.15 + (Math.random() * 0.15),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-transparent">
      {isVisible && particles.map((p) => {
        // Movimiento orbital suave pero manteniendo el símbolo "al derecho"
        const time = Date.now() * 0.001;
        const currentAngle = p.angleOffset + (time * p.speed);
        
        const x = mousePos.x + Math.cos(currentAngle) * p.radius - (p.size / 2);
        const y = mousePos.y + Math.sin(currentAngle) * p.radius - (p.size / 2);

        return (
          <div
            key={p.id}
            className={`absolute font-mono font-bold ${p.color} select-none will-change-transform transition-opacity duration-1000`}
            style={{
              left: 0,
              top: 0,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              // Eliminamos la rotación excesiva para que se lean "al derecho"
              // Solo una mínima oscilación de 5 grados para dar vida sin perder legibilidad
              transform: `translate3d(${x}px, ${y}px, 0) rotate(${Math.sin(time + p.id) * 5}deg)`,
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
