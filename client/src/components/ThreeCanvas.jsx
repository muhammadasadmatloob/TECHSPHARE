import React, { useEffect, useRef } from 'react';
import { TechSphere3DEngine } from '../graphics/TechSphere3DEngine';

export const ThreeCanvas = ({ radius = 2.4, particles = 1000 }) => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      engineRef.current = new TechSphere3DEngine(containerRef.current, {
        sphereRadius: radius,
        particleCount: particles,
        enableMouseFollow: true
      });
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
      }
    };
  }, [radius, particles]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] md:min-h-[500px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
