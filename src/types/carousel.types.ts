/**
 * Types pour le Carousel Builder
 */

export interface CarouselProfile {
  profileImage: string; // base64
  name: string;
  position: string;
  portfolio: string; // Website URL
  createdAt: Date;
  updatedAt: Date;
}

export interface CarouselSlide {
  id: string; // UUID
  order: number; // 0-9
  title: string;
  image: string; // base64
  content: string; // markdown text
  logo?: string; // base64 custom logo
  techStack?: string[]; // Array of tech names (html, css, js, react, etc.)
  titleAlignment?: 'left' | 'center' | 'right';
  contentAlignment?: 'left' | 'center' | 'right' | 'justify';
  titleSize?: 'small' | 'medium' | 'large' | 'xl';
  contentSize?: 'small' | 'medium' | 'large';
  showCTA?: boolean; // Show Like & Subscribe CTA
  // Layout specific fields
  layout?: 'classic' | 'quote' | 'code' | 'bigNumber';
  codeSnippet?: string; // For code layout
  codeLanguage?: string; // For code layout
  bigNumber?: string; // For bigNumber layout
  quoteAuthor?: string; // For quote layout
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedProject {
  id: string;
  name: string;
  slides: CarouselSlide[];
  settings: CarouselGlobalSettings;
  updatedAt: Date;
}

export type BackgroundType = 'solid' | 'image' | 'gradient';
export type GradientDirection = 'to-r' | 'to-br' | 'to-b' | 'to-bl';

export interface CarouselGlobalSettings {
  primaryColor: string; // hex
  secondaryColor: string; // hex
  accentColor: string; // hex
  backgroundType: BackgroundType;
  backgroundColor?: string; // hex for solid
  backgroundImage?: string; // base64 for image (will be tiled/repeated)
  gradientStart?: string; // hex for gradient
  gradientEnd?: string; // hex for gradient
  gradientDirection?: GradientDirection;
}

export type PlatformId = 'tiktok';
export type ExportFormatType = 'png' | 'jpg';
export type AspectRatio = '1:1';
export type Resolution = 'basic' | 'high';

export interface ExportFormat {
  platform: PlatformId;
  format: ExportFormatType;
  aspectRatio: AspectRatio;
  width: number;
  height: number;
  resolution: Resolution;
}

export const EXPORT_FORMATS: Record<PlatformId, ExportFormat> = {
  tiktok: {
    platform: 'tiktok',
    format: 'png',
    aspectRatio: '1:1',
    width: 1200,
    height: 1200,
    resolution: 'basic',
  },
};

export const DEFAULT_PROFILE: CarouselProfile = {
  profileImage: '',
  name: 'Votre Nom',
  position: 'Votre Poste',
  portfolio: 'nouhou-ibrahim.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_SETTINGS: CarouselGlobalSettings = {
  primaryColor: '#18636B',
  secondaryColor: '#43A6B0',
  accentColor: '#F9C74C',
  backgroundType: 'solid',
  backgroundColor: '#0A0A0A',
};

export const DEFAULT_SLIDE: Omit<CarouselSlide, 'id'> = {
  order: 0,
  title: 'Titre de la slide',
  image: '',
  content: '',
  logo: '',
  techStack: [],
  titleAlignment: 'left',
  contentAlignment: 'left',
  titleSize: 'large',
  contentSize: 'medium',
  showCTA: false,
  layout: 'classic',
  codeSnippet: 'console.log("Hello World");',
  bigNumber: '50%',
  quoteAuthor: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
