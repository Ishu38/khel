import { useState, useEffect, useRef, useCallback } from 'react';

const SOUNDS = {
  correct: { frequency: 523.25, duration: 0.15, type: 'sine' },
  wrong: { frequency: 200, duration: 0.3, type: 'square' },
  complete: { frequency: [523.25, 659.25, 783.99], duration: 0.2, type: 'sine' },
  click: { frequency: 440, duration: 0.05, type: 'sine' },
  start: { frequency: [392, 523.25], duration: 0.15, type: 'sine' },
};

export function useAudio() {
  const [muted, setMuted] = useState(() => localStorage.getItem('khel_muted') === 'true');
  const [bgPlaying, setBgPlaying] = useState(false);
  const ctxRef = useRef(null);
  const bgOscRef = useRef(null);
  const bgGainRef = useRef(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playSound = useCallback((name) => {
    if (muted) return;
    const sound = SOUNDS[name];
    if (!sound) return;

    try {
      const ctx = getContext();
      const frequencies = Array.isArray(sound.frequency) ? sound.frequency : [sound.frequency];
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.15;
      gainNode.connect(ctx.destination);

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = sound.type;
        osc.frequency.value = freq;
        osc.connect(gainNode);
        const startTime = ctx.currentTime + i * sound.duration;
        osc.start(startTime);
        osc.stop(startTime + sound.duration);
      });

      // Fade out
      const totalDuration = frequencies.length * sound.duration;
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + totalDuration);
    } catch {
      // AudioContext may not be available
    }
  }, [muted, getContext]);

  const startBgMusic = useCallback(() => {
    if (muted || bgPlaying) return;
    try {
      const ctx = getContext();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.03;
      gainNode.connect(ctx.destination);
      bgGainRef.current = gainNode;

      // Simple ambient tone
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 261.63; // C4
      osc.connect(gainNode);
      osc.start();
      bgOscRef.current = osc;

      setBgPlaying(true);
    } catch {
      // Ignore
    }
  }, [muted, bgPlaying, getContext]);

  const stopBgMusic = useCallback(() => {
    try {
      bgOscRef.current?.stop();
      bgOscRef.current = null;
      bgGainRef.current = null;
    } catch {
      // Ignore
    }
    setBgPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      localStorage.setItem('khel_muted', String(next));
      if (next) stopBgMusic();
      return next;
    });
  }, [stopBgMusic]);

  useEffect(() => {
    return () => { stopBgMusic(); };
  }, [stopBgMusic]);

  return { muted, toggleMute, playSound, startBgMusic, stopBgMusic, bgPlaying };
}
