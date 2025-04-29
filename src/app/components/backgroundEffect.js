'use client';

import { useRef, useEffect } from 'react';

export default function BackgroundEffect() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    const handleMouseMovement = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current = { x, y };
    };

    const handleMouseLeave = () => {
      overlay.style.background = `none`;
    };

    const animate = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.2;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.2;

      const { x, y } = currentPos.current;
      overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 200px)`;

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMovement);
    window.addEventListener('mouseleave', handleMouseLeave);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMovement);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed z-1 inset-0">
      <div ref={overlayRef} className="fixed z-[-1] inset-0  transition-all duration-200" />
    </div>
  );
}
