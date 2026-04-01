import env from '../config/env.js';

/**
 * Non-blocking proxy to the FastAPI AI engine.
 * All calls are async — never blocks the Express event loop.
 */
export async function callEngine(path, body = null, method = 'POST') {
  const url = `${env.engineUrl}${path}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.text();
    const err = new Error(`Engine error [${response.status}]: ${errorBody}`);
    err.status = response.status;
    throw err;
  }

  return response.json();
}
