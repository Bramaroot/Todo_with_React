/**
 * Central type exports
 * Re-exports all types from individual type files
 */

// Carousel types (primary)
export * from './carousel.types';

// B-Roll types (deprecated but kept for reference)
// Explicitly re-export to avoid naming conflicts with carousel.types
export type {
  BRollSettings,
  BRollContent,
  BRollTemplate,
  SavedBRoll,
} from './broll.types';

export {
  DEFAULT_CONTENT,
  CANVAS_DIMENSIONS,
} from './broll.types';

// Rename conflicting exports from broll
export {
  DEFAULT_SETTINGS as BROLL_DEFAULT_SETTINGS,
} from './broll.types';

export type {
  AspectRatio as BRollAspectRatio,
} from './broll.types';

// Todo types
// Removed
