import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

/**
 * Phaser.js game wrapper — mounts Phaser into a React ref.
 * Game scenes are passed in via the `scenes` prop.
 */
export default function PhaserGame({ width = 800, height = 600, scenes = [], gameData = null }) {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width,
      height,
      backgroundColor: '#f0f4ff',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: scenes,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    // Pass game data to the first scene
    if (gameData && scenes.length > 0) {
      gameRef.current.registry.set('gameData', gameData);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [scenes, gameData, width, height]);

  return <div ref={containerRef} style={{ width, height, margin: '0 auto' }} />;
}
