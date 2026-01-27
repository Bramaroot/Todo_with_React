/**
 * Utilitaires pour la gestion des dates
 */

/**
 * Formate une date en français
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Formate une date et heure en français
 */
export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Retourne une description relative de la date (aujourd'hui, demain, etc.)
 */
export function getRelativeDateLabel(date: Date | string | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(d);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === -1) return "Hier";
  if (diffDays < -1) return `Il y a ${Math.abs(diffDays)} jours`;
  if (diffDays > 1 && diffDays <= 7) return `Dans ${diffDays} jours`;

  return formatDate(d);
}

/**
 * Vérifie si une date est en retard
 */
export function isOverdue(date: Date | string | undefined): boolean {
  if (!date) return false;

  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  return d < now;
}

/**
 * Vérifie si une date est aujourd'hui
 */
export function isToday(date: Date | string | undefined): boolean {
  if (!date) return false;

  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  return d.toDateString() === today.toDateString();
}

/**
 * Vérifie si une date est demain
 */
export function isTomorrow(date: Date | string | undefined): boolean {
  if (!date) return false;

  const d = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return d.toDateString() === tomorrow.toDateString();
}

/**
 * Parse une date en langage naturel (ex: "demain", "dans 3 jours")
 */
export function parseNaturalDate(input: string): Date | null {
  const lower = input.toLowerCase().trim();
  const today = new Date();

  if (lower === "aujourd'hui" || lower === "aujourdhui") {
    return today;
  }

  if (lower === "demain") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  // Match "dans X jours"
  const daysMatch = lower.match(/dans (\d+) jours?/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    const future = new Date(today);
    future.setDate(future.getDate() + days);
    return future;
  }

  // Match "dans X semaines"
  const weeksMatch = lower.match(/dans (\d+) semaines?/);
  if (weeksMatch) {
    const weeks = parseInt(weeksMatch[1]);
    const future = new Date(today);
    future.setDate(future.getDate() + (weeks * 7));
    return future;
  }

  return null;
}
