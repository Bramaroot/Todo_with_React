// Types partagés pour l'application Todo

export const PRIORITIES = ['Urgente', 'Moyenne', 'Basse'] as const;
export type Priority = typeof PRIORITIES[number];

export const RECURRENCE_TYPES = ['none', 'daily', 'weekly', 'monthly'] as const;
export type RecurrenceType = typeof RECURRENCE_TYPES[number];

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'file' | 'link' | 'image';
  size?: number;
}

export interface Todo {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  // Dates et rappels
  dueDate?: Date;
  reminderTime?: Date;

  // Catégories et tags
  tags: string[];
  category?: string;

  // Contenu enrichi
  notes?: string;
  subtasks: SubTask[];
  attachments: Attachment[];

  // Récurrence
  recurrence: RecurrenceType;

  // Statistiques
  timeSpent?: number; // en minutes
  estimatedTime?: number; // en minutes
}

export type FilterType = Priority | "Tous";

export type SortType =
  | "date-created"
  | "date-updated"
  | "priority"
  | "alphabetical"
  | "due-date"
  | "custom";

export interface TodoFilters {
  priority: FilterType;
  tags: string[];
  searchQuery: string;
  showCompleted: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface TodoStats {
  total: number;
  completed: number;
  urgent: number;
  overdue: number;
  dueToday: number;
  dueTomorrow: number;
}
