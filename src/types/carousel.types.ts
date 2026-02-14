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

// ==========================================
// CHARLIE OSCAR STYLE CAROUSEL TYPES
// Style minimaliste fond blanc avec header noir
// ==========================================

export type CharlieOscarSlideType = 'intro' | 'content' | 'conclusion';

export interface CharlieOscarBranding {
  profileImage: string;
  username: string; // @username
  primaryCategory: string;
  secondaryCategory: string;
  accentColor: string;
  copyrightName: string;
  footerLabel: string;
}

export interface CharlieOscarIntroContent {
  type: 'intro';
  subtitle: string;
  titleLines: string[];
  highlightedWord: string;
}

export interface CharlieOscarContentSlide {
  type: 'content';
  number: number;
  title: string;
  description: string;
  screenshot: string;
  websiteUrl?: string;
}

export interface CharlieOscarConclusionContent {
  type: 'conclusion';
  mainText: string;
  boldPhrase: string;
  supportingText: string;
}

export type CharlieOscarSlideContent =
  | CharlieOscarIntroContent
  | CharlieOscarContentSlide
  | CharlieOscarConclusionContent;

export interface CharlieOscarSlide {
  id: string;
  content: CharlieOscarSlideContent;
}

export interface CharlieOscarProject {
  id: string;
  name: string;
  branding: CharlieOscarBranding;
  slides: CharlieOscarSlide[];
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_CHARLIE_OSCAR_BRANDING: CharlieOscarBranding = {
  profileImage: '',
  username: '@votreusername',
  primaryCategory: 'Développement Web',
  secondaryCategory: 'SEO',
  accentColor: '#F97316',
  copyrightName: 'Votre Nom',
  footerLabel: 'CONSEILS WEB',
};

export const createCharlieOscarIntroSlide = (): CharlieOscarSlide => ({
  id: crypto.randomUUID(),
  content: {
    type: 'intro',
    subtitle: '3 Choses à Faire',
    titleLines: ['Avant De', 'Mettre Ton', 'Site Web En'],
    highlightedWord: 'Ligne',
  },
});

export const createCharlieOscarContentSlide = (number: number): CharlieOscarSlide => ({
  id: crypto.randomUUID(),
  content: {
    type: 'content',
    number,
    title: `Outil ${number}`,
    description: 'Description de cet outil et pourquoi il est utile pour votre projet.',
    screenshot: '',
    websiteUrl: '',
  },
});

export const createCharlieOscarConclusionSlide = (): CharlieOscarSlide => ({
  id: crypto.randomUUID(),
  content: {
    type: 'conclusion',
    mainText: 'Avoir 100/100 sur ces outils ne garantit pas le succès,',
    boldPhrase: 'mais ne pas tester garantit l\'échec.',
    supportingText: 'Utilise ces outils comme un filet de sécurité, pas comme une obsession.',
  },
});

export const createDefaultCharlieOscarProject = (): CharlieOscarProject => ({
  id: crypto.randomUUID(),
  name: 'Nouveau Carousel',
  branding: DEFAULT_CHARLIE_OSCAR_BRANDING,
  slides: [
    createCharlieOscarIntroSlide(),
    createCharlieOscarContentSlide(1),
    createCharlieOscarContentSlide(2),
    createCharlieOscarConclusionSlide(),
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const CHARLIE_OSCAR_DIMENSIONS = {
  width: 1080,
  height: 1920,
};
