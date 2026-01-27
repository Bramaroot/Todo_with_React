/**
 * Types pour le générateur B-Roll
 */

export interface BRollSettings {
  // Branding persistant
  profileImage: string;
  name: string;
  position: string;
  accentColor: string;

  // Opacités
  overlayOpacity: number; // 0-1
  footerOpacity: number; // 0-1
}

export type AspectRatio = '9:16' | '1:1' | '16:9';

export interface BRollContent {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  aspectRatio: AspectRatio;
}

export interface BRollTemplate {
  id: string;
  name: string;
  thumbnail: string;
  defaultSettings: Partial<BRollSettings>;
  defaultContent: Partial<BRollContent>;
}

export interface SavedBRoll {
  id: string;
  name: string;
  settings: BRollSettings;
  content: BRollContent;
  createdAt: Date;
  thumbnail?: string;
}

export const DEFAULT_SETTINGS: BRollSettings = {
  profileImage: '',
  name: 'Votre Nom',
  position: 'Votre Poste',
  accentColor: '#18636B', // Hype blue par défaut
  overlayOpacity: 0.5,
  footerOpacity: 0.6, // Réduit pour plus de transparence
};

export const DEFAULT_CONTENT: BRollContent = {
  headline: 'Votre Headline Ici',
  subheadline: 'Votre subheadline ici',
  backgroundImage: '',
  aspectRatio: '1:1', // Format carré par défaut
};

// Dimensions du canvas selon le format
export const CANVAS_DIMENSIONS = {
  '9:16': { width: 1080, height: 1920, name: 'Vertical (Stories)' },
  '1:1': { width: 1080, height: 1080, name: 'Carré (Posts)' },
  '16:9': { width: 1920, height: 1080, name: 'Horizontal (YouTube)' },
};
