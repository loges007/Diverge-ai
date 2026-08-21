import { TestSession } from '../types/aut';

const STORAGE_KEYS = {
  SESSIONS: 'diverge_aut_sessions_v1',
  STREAK: 'diverge_aut_streak_v1',
  USED_ITEMS: 'diverge_aut_used_items_v1',
  SETTINGS: 'diverge_aut_settings_v1',
  STATS: 'diverge_aut_stats_v1'
};

export interface AppSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  defaultDuration: number; // 60, 120, 180
  darkMode: boolean;
}

export interface UserStreak {
  currentStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  bestStreak: number;
  totalSessions: number;
  totalIdeasLogged: number;
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        soundEnabled: parsed.soundEnabled ?? true,
        hapticEnabled: parsed.hapticEnabled ?? true,
        defaultDuration: parsed.defaultDuration ?? 120,
        darkMode: parsed.darkMode ?? false
      };
    }
  } catch {
    // fallback
  }
  return {
    soundEnabled: true,
    hapticEnabled: true,
    defaultDuration: 120,
    darkMode: false
  };
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function loadStreak(): UserStreak {
  const fallback: UserStreak = {
    currentStreak: 1,
    lastPlayedDate: '',
    bestStreak: 1,
    totalSessions: 0,
    totalIdeasLogged: 0
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveStreak(streak: UserStreak): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  } catch {
    // ignore
  }
}

export function loadSessions(): TestSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSession(session: TestSession): void {
  try {
    const sessions = loadSessions();
    const updated = [session, ...sessions].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function loadUsedItemIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USED_ITEMS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordUsedItemId(id: string): void {
  try {
    const used = loadUsedItemIds();
    if (!used.includes(id)) {
      used.push(id);
      localStorage.setItem(STORAGE_KEYS.USED_ITEMS, JSON.stringify(used));
    }
  } catch {
    // ignore
  }
}

export function resetUsedItems(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USED_ITEMS);
  } catch {
    // ignore
  }
}

export function recordSessionCompletion(session: TestSession): UserStreak {
  saveSession(session);
  recordUsedItemId(session.item.id);

  const streak = loadStreak();
  const today = new Date().toISOString().split('T')[0];
  const lastDate = streak.lastPlayedDate;

  let currentStreak = streak.currentStreak;

  if (!lastDate) {
    currentStreak = 1;
  } else if (lastDate === today) {
    // Same day, streak already counted
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      currentStreak += 1;
    } else {
      // Streak broken
      currentStreak = 1;
    }
  }

  const updated: UserStreak = {
    currentStreak,
    lastPlayedDate: today,
    bestStreak: Math.max(streak.bestStreak, currentStreak),
    totalSessions: streak.totalSessions + 1,
    totalIdeasLogged: streak.totalIdeasLogged + session.ideas.length
  };

  saveStreak(updated);
  return updated;
}
