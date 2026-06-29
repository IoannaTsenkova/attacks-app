const SESSION_STORAGE_KEY = "attack_demo_session_id";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function getAnonymousSessionId() {
  if (typeof window === "undefined") {
    return null;
  }

  const existingSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = createSessionId();
  localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);

  return newSessionId;
}
