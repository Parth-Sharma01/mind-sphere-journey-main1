/**
 * Simple encryption/decryption utilities for journal entries
 * Uses a reversible XOR-based cipher for local storage
 */

const SECRET_KEY = 'mindsphere_journal_2024'; // Simple key for local encryption

export function encryptEntry(text: string): string {
  try {
    // Simple XOR-based encryption with base64 encoding
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      encrypted += String.fromCharCode(
        text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      );
    }
    // Encode to base64 for safe storage
    return btoa(encrypted);
  } catch (e) {
    console.error('Encryption failed:', e);
    return text;
  }
}

export function decryptEntry(encrypted: string): string {
  try {
    // Decode from base64
    const decoded = atob(encrypted);
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(
        decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      );
    }
    return decrypted;
  } catch (e) {
    console.error('Decryption failed:', e);
    return encrypted;
  }
}

/**
 * Save journal entry to encrypted localStorage
 */
export function saveJournalEntry(id: string, entry: string, date: Date = new Date()): void {
  const encrypted = encryptEntry(entry);
  const journalData = {
    id,
    encrypted,
    date: date.toISOString(),
    timestamp: date.getTime(),
  };

  const existingEntries = JSON.parse(localStorage.getItem('mindsphere_journal_entries') || '[]');
  const updatedEntries = existingEntries.filter((e: any) => e.id !== id);
  updatedEntries.push(journalData);
  localStorage.setItem('mindsphere_journal_entries', JSON.stringify(updatedEntries));
}

/**
 * Load and decrypt journal entry
 */
export function loadJournalEntry(id: string): string | null {
  const entries = JSON.parse(localStorage.getItem('mindsphere_journal_entries') || '[]');
  const entry = entries.find((e: any) => e.id === id);
  if (entry) {
    return decryptEntry(entry.encrypted);
  }
  return null;
}

/**
 * Get all journal entries (decrypted)
 */
export function getAllJournalEntries(): Array<{ id: string; content: string; date: string }> {
  const entries = JSON.parse(localStorage.getItem('mindsphere_journal_entries') || '[]');
  return entries
    .sort((a: any, b: any) => b.timestamp - a.timestamp)
    .map((e: any) => ({
      id: e.id,
      content: decryptEntry(e.encrypted),
      date: e.date,
    }));
}

/**
 * Delete journal entry
 */
export function deleteJournalEntry(id: string): void {
  const entries = JSON.parse(localStorage.getItem('mindsphere_journal_entries') || '[]');
  const filtered = entries.filter((e: any) => e.id !== id);
  localStorage.setItem('mindsphere_journal_entries', JSON.stringify(filtered));
}

/**
 * Save MeLodY OfLife data
 */
export function saveMelodyOfLifeData(data: {
  examType: string;
  preprationWhy: string;
  trueAmbition: string;
}): void {
  localStorage.setItem('mindsphere_melody_of_life', JSON.stringify({
    ...data,
    savedAt: new Date().toISOString(),
  }));
}

/**
 * Load MeLodY OfLife data
 */
export function loadMelodyOfLifeData() {
  const data = localStorage.getItem('mindsphere_melody_of_life');
  return data ? JSON.parse(data) : null;
}

/**
 * Save assessment results
 */
export function saveAssessmentResult(scores: Record<string, number>): void {
  const results = JSON.parse(localStorage.getItem('mindsphere_assessment_history') || '[]');
  results.push({
    scores,
    date: new Date().toISOString(),
    timestamp: Date.now(),
  });
  // Keep last 20 results
  const recent = results.slice(-20);
  localStorage.setItem('mindsphere_assessment_history', JSON.stringify(recent));
}

/**
 * Get assessment history
 */
export function getAssessmentHistory() {
  return JSON.parse(localStorage.getItem('mindsphere_assessment_history') || '[]');
}

/**
 * Get games performance data
 */
export function getGamePerformance(gameId: string) {
  const data = JSON.parse(localStorage.getItem('mindsphere_games_data') || '{}');
  return data[gameId] || [];
}

/**
 * Save game performance
 */
export function saveGamePerformance(
  gameId: string,
  performance: { score: number; time: number; accuracy: number }
): void {
  const data = JSON.parse(localStorage.getItem('mindsphere_games_data') || '{}');
  if (!data[gameId]) {
    data[gameId] = [];
  }
  data[gameId].push({
    ...performance,
    date: new Date().toISOString(),
    timestamp: Date.now(),
  });
  localStorage.setItem('mindsphere_games_data', JSON.stringify(data));
}
