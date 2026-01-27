/**
 * Gestion des notifications push
 */

/**
 * Demande la permission pour les notifications
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Les notifications ne sont pas supportées par ce navigateur');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Vérifie si les notifications sont activées
 */
export function areNotificationsEnabled(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

/**
 * Envoie une notification
 */
export function sendNotification(title: string, options?: NotificationOptions) {
  if (!areNotificationsEnabled()) {
    console.warn('Les notifications ne sont pas activées');
    return null;
  }

  const notification = new Notification(title, {
    icon: '/vite.svg',
    badge: '/vite.svg',
    vibrate: [200, 100, 200],
    ...options,
  });

  return notification;
}

/**
 * Planifie une notification pour plus tard
 */
export function scheduleNotification(
  title: string,
  date: Date,
  options?: NotificationOptions
): number {
  const now = new Date().getTime();
  const targetTime = new Date(date).getTime();
  const delay = targetTime - now;

  if (delay <= 0) {
    console.warn('La date de notification est déjà passée');
    return -1;
  }

  const timeoutId = window.setTimeout(() => {
    sendNotification(title, options);
  }, delay);

  return timeoutId;
}

/**
 * Annule une notification planifiée
 */
export function cancelScheduledNotification(timeoutId: number): void {
  window.clearTimeout(timeoutId);
}

/**
 * Envoie une notification de rappel pour une tâche
 */
export function sendTaskReminder(taskTitle: string, priority: string) {
  const priorityEmojis: Record<string, string> = {
    Urgente: '🔥',
    Moyenne: '⚡',
    Basse: '📋',
  };

  const emoji = priorityEmojis[priority] || '📝';

  sendNotification(`${emoji} Rappel de tâche`, {
    body: taskTitle,
    tag: `task-reminder-${Date.now()}`,
    requireInteraction: priority === 'Urgente',
  });
}

/**
 * Configure les notifications quotidiennes
 */
export function setupDailyReminders() {
  if (!areNotificationsEnabled()) {
    return;
  }

  // Planifie une notification quotidienne à 9h
  const now = new Date();
  const tomorrow9AM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    9,
    0,
    0
  );

  scheduleNotification('📋 Vos tâches du jour', tomorrow9AM, {
    body: "N'oubliez pas de vérifier vos tâches !",
    tag: 'daily-reminder',
  });
}
