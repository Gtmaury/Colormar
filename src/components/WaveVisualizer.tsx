/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';

interface WaveVisualizerProps {
  analyser: AnalyserNode | null;
  isRunning: boolean;
  baseColor?: string; // emerald, teal, etc.
}

export default function WaveVisualizer({ analyser, isRunning, baseColor = 'emerald' }: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-density Retina screens properly with DevicePixelRatio
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dynamic wave configuration
    interface Wave {
      phase: number;
      speed: number;
      amplitude: number;
      frequency: number;
      color: string;
      lineWidth: number;
    }

    const waves: Wave[] = [
      { phase: 0, speed: 0.02, amplitude: 22, frequency: 0.007, color: 'rgba(168, 85, 247, 0.45)', lineWidth: 2 },  // Purple
      { phase: Math.PI / 3, speed: 0.015, amplitude: 14, frequency: 0.012, color: 'rgba(99, 102, 241, 0.35)', lineWidth: 1.5 }, // Indigo
      { phase: Math.PI / 1.5, speed: 0.025, amplitude: 8, frequency: 0.018, color: 'rgba(217, 70, 239, 0.25)', lineWidth: 1 },  // Fuchsia
    ];

    // Real-time microphone/audio parameters mapping
    let animationFrameId: number;
    let idleCounter = 0;

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerY = height / 2;

      // Clear the canvas with trail tracing for subtle light motion blur
      ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Add a subtle tech grid in the background
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.08)';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isRunning && analyser) {
        // --- REAL-TIME AUDIO DRIVEN DRAWING ---
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Retrieve time-domain data for smooth oscillations, not bar columns
        analyser.getByteTimeDomainData(dataArray);

        // Render multiple layered reactive wave paths
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.lineWidth = layer === 0 ? 2.5 : 1.5;
          
          // Map colors based on selected track identity
          if (baseColor === 'indigo') {
            ctx.strokeStyle = layer === 0 ? 'rgba(99, 102, 241, 0.8)' : (layer === 1 ? 'rgba(129, 140, 248, 0.5)' : 'rgba(165, 180, 252, 0.3)');
          } else if (baseColor === 'violet') {
            ctx.strokeStyle = layer === 0 ? 'rgba(139, 92, 246, 0.8)' : (layer === 1 ? 'rgba(167, 139, 250, 0.5)' : 'rgba(196, 181, 253, 0.3)');
          } else if (baseColor === 'fuchsia') {
            ctx.strokeStyle = layer === 0 ? 'rgba(217, 70, 239, 0.8)' : (layer === 1 ? 'rgba(240, 171, 252, 0.5)' : 'rgba(244, 114, 182, 0.3)');
          } else {
            // Default purple theme
            ctx.strokeStyle = layer === 0 ? 'rgba(168, 85, 247, 0.8)' : (layer === 1 ? 'rgba(192, 132, 252, 0.5)' : 'rgba(216, 180, 254, 0.3)');
          }

          // Subtle glowing shadow
          ctx.shadowBlur = layer === 0 ? 12 : 0;
          ctx.shadowColor = baseColor === 'indigo' ? '#6366f1' : (baseColor === 'violet' ? '#8b5cf6' : '#a855f7');

          const sliceWidth = width / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            // Normalize audio sample to -1.0 to 1.0 range
            const v = dataArray[i] / 128.0; 
            const yOffset = (v - 1.0) * (height * 0.43); // scale wave swing

            // Apply a nice smooth windowing envelope (fade out at boundaries)
            const edgeMute = Math.sin((i / (bufferLength - 1)) * Math.PI);
            const calculatedY = centerY + (yOffset * edgeMute * (1 - layer * 0.25));

            if (i === 0) {
              ctx.moveTo(x, calculatedY);
            } else {
              ctx.lineTo(x, calculatedY);
            }

            x += sliceWidth;
          }

          ctx.stroke();
          ctx.shadowBlur = 0; // reset shadow
        }

      } else {
        // --- IDLE / MATH GENERATIVE DRAWING ---
        idleCounter += 1;
        
        waves.forEach((wave, index) => {
          ctx.beginPath();
          ctx.lineWidth = wave.lineWidth;
          
          // Slow down math when idle
          wave.phase += wave.speed;
          
          // Map colors based on selected track identity
          let strokeColor = wave.color;
          if (baseColor === 'indigo') {
            strokeColor = index === 0 ? 'rgba(99, 102, 241, 0.5)' : (index === 1 ? 'rgba(129, 140, 248, 0.35)' : 'rgba(165, 180, 252, 0.2)');
          } else if (baseColor === 'violet') {
            strokeColor = index === 0 ? 'rgba(139, 92, 246, 0.5)' : (index === 1 ? 'rgba(167, 139, 250, 0.35)' : 'rgba(196, 181, 253, 0.2)');
          } else if (baseColor === 'fuchsia') {
            strokeColor = index === 0 ? 'rgba(217, 70, 239, 0.5)' : (index === 1 ? 'rgba(240, 171, 252, 0.35)' : 'rgba(244, 114, 182, 0.2)');
          } else {
            strokeColor = index === 0 ? 'rgba(168, 85, 247, 0.5)' : (index === 1 ? 'rgba(192, 132, 252, 0.35)' : 'rgba(216, 180, 254, 0.2)');
          }
          
          ctx.strokeStyle = strokeColor;
          ctx.shadowBlur = index === 0 ? 6 : 0;
          ctx.shadowColor = baseColor === 'indigo' ? '#6366f1' : '#a855f7';

          for (let x = 0; x < width; x++) {
            // Apply edge attenuation so waves vanish smoothly at the ends
            const scale = Math.sin((x / width) * Math.PI);
            
            // Compose formula combining clean sine wave and slow secondary offset
            const offset = Math.sin(x * wave.frequency + wave.phase + (index * 1.5)) * wave.amplitude;
            const y = centerY + offset * scale;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        });
      }

      // Draw horizontal reference lines representing "acoustic boundaries"
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, isRunning, baseColor]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0f172a] border border-slate-800">
      <canvas 
        ref={canvasRef} 
        className="block h-full w-full"
        style={{ minHeight: '320px' }}
      />
      
      {/* Subtle coordinate labels for deep high tech aesthetics */}
      <div className="absolute left-4 top-4 flex space-x-4 text-[10px] font-mono text-slate-500 uppercase select-none pointer-events-none">
        <div>CH.A // RES_O</div>
        <div>STABLE_S</div>
      </div>
      <div className="absolute right-4 top-4 text-[10px] font-mono text-slate-500 uppercase select-none pointer-events-none">
        {isRunning ? (
          <span className="text-purple-400 animate-pulse">● SIG_INFLOW: ACTIVE</span>
        ) : (
          <span>○ SIG_INFLOW: DORMANT</span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 uppercase select-none pointer-events-none">
        AUDIO SPECTRUM CORE v1.0.4
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 uppercase select-none pointer-events-none">
        {isRunning ? 'SYNTH IN REAL-TIME' : 'MATH FLOAT MODEL'}
      </div>
    </div>
  );
}
