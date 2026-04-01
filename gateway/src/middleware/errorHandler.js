export function errorHandler(err, req, res, _next) {
  console.error(`[khel] Error: ${err.message}`, err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: 'Validation error', details: messages });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate entry', field: Object.keys(err.keyValue)[0] });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
}
