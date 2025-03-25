const saved = localStorage.getItem('sessionId');

export const sessionId = saved ? saved : crypto.randomUUID();

if (!saved) {
  localStorage.setItem('sessionId', sessionId);
}
