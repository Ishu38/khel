import TapMatchScene from './scenes/TapMatchScene.js';
import MazeRunnerScene from './scenes/MazeRunnerScene.js';
import QuizAdventureScene from './scenes/QuizAdventureScene.js';

/**
 * Maps game type IDs to their Phaser scene classes.
 */
const sceneMap = {
  tap_match: [TapMatchScene],
  drag_sort: [TapMatchScene],       // reuses tap-match for MVP, will specialize later
  maze_runner: [MazeRunnerScene],
  word_builder: [TapMatchScene],     // reuses for MVP
  quiz_adventure: [QuizAdventureScene],
  strategy_sim: [QuizAdventureScene], // reuses for MVP
  code_and_play: [QuizAdventureScene],
  multiplayer_race: [MazeRunnerScene],
};

export function getScenesForGameType(gameType) {
  return sceneMap[gameType] || [TapMatchScene];
}
