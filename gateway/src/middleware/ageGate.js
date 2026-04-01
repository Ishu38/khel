import { GAME_TYPES, getStageForAge } from '@khel/shared';

/**
 * Enforce developmental stage guardrails.
 * A child's age determines which game types they can access.
 */
export function enforceAgeGate(req, res, next) {
  const { childAge, gameType } = req.body;
  if (childAge == null || !gameType) return next();

  const gameTypeDef = Object.values(GAME_TYPES).find(gt => gt.id === gameType);
  if (!gameTypeDef) {
    return res.status(400).json({ error: `Unknown game type: ${gameType}` });
  }

  if (childAge < gameTypeDef.minAge || childAge > gameTypeDef.maxAge) {
    const stage = getStageForAge(childAge);
    return res.status(403).json({
      error: 'Game type not available for this age group',
      childAge,
      childStage: stage.label,
      gameType: gameTypeDef.label,
      allowedAgeRange: [gameTypeDef.minAge, gameTypeDef.maxAge],
    });
  }

  next();
}
