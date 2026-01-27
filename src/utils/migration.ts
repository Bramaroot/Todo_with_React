/**
 * Migration utility: B-Roll Generator → Carousel Builder
 *
 * Converts old localStorage data from the B-Roll Generator to the new Carousel Builder format.
 * Archives old data for fallback/recovery.
 */

import type { CarouselProfile, CarouselSlide, CarouselGlobalSettings } from '../types/carousel.types';
import { DEFAULT_SETTINGS, DEFAULT_PROFILE } from '../types/carousel.types';

interface OldBRollSettings {
  profileImage: string;
  name: string;
  position: string;
  accentColor: string;
  overlayOpacity: number;
  footerOpacity: number;
}

interface OldBRollContent {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  aspectRatio: string;
}

/**
 * Migrates B-Roll Generator data to Carousel Builder format
 * Run this once on app mount to convert existing user data
 */
export function migrateBRollToCarousel(): void {
  const brollSettings = localStorage.getItem('broll-settings');
  const brollContent = localStorage.getItem('broll-content');

  // Skip if no old data or migration already done
  if (!brollSettings && !brollContent) return;

  const alreadyMigrated = localStorage.getItem('carousel-profile') ||
                          localStorage.getItem('carousel-slides') ||
                          localStorage.getItem('carousel-settings');

  if (alreadyMigrated) {
    console.log('🔄 Carousel data already exists, skipping migration');
    return;
  }

  try {
    console.log('🚀 Starting B-Roll → Carousel migration...');

    // Migrate profile from broll-settings
    if (brollSettings) {
      const oldSettings: OldBRollSettings = JSON.parse(brollSettings);

      const profile: CarouselProfile = {
        profileImage: oldSettings.profileImage || '',
        name: oldSettings.name || DEFAULT_PROFILE.name,
        position: oldSettings.position || DEFAULT_PROFILE.position,
        portfolio: DEFAULT_PROFILE.portfolio,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      localStorage.setItem('carousel-profile', JSON.stringify(profile));
      console.log('✅ Profile migrated:', profile.name);

      // Migrate colors to global settings
      const settings: CarouselGlobalSettings = {
        ...DEFAULT_SETTINGS,
        accentColor: oldSettings.accentColor || DEFAULT_SETTINGS.accentColor,
      };

      localStorage.setItem('carousel-settings', JSON.stringify(settings));
      console.log('✅ Settings migrated');
    }

    // Migrate content to first slide (if content exists)
    if (brollContent) {
      const oldContent: OldBRollContent = JSON.parse(brollContent);

      if (oldContent.headline || oldContent.subheadline || oldContent.backgroundImage) {
        const slide: CarouselSlide = {
          id: crypto.randomUUID(),
          order: 0,
          title: oldContent.headline || 'Titre de la slide',
          image: oldContent.backgroundImage || '',
          content: oldContent.subheadline || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        localStorage.setItem('carousel-slides', JSON.stringify([slide]));
        console.log('✅ First slide created from B-Roll content');
      }
    }

    // Archive old data (don't delete immediately for safety)
    if (brollSettings) {
      localStorage.setItem('broll-settings-archived', brollSettings);
    }
    if (brollContent) {
      localStorage.setItem('broll-content-archived', brollContent);
    }
    localStorage.setItem('broll-migration-date', new Date().toISOString());

    console.log('✅ Migration from B-Roll to Carousel completed successfully');

    // Optional: Show notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Migration réussie', {
        body: 'Vos données B-Roll ont été migrées vers Carousel Builder',
        icon: '/favicon.ico',
      });
    }
  } catch (error) {
    console.error('❌ Migration error:', error);
    // Don't throw - fail silently to avoid breaking the app
  }
}

/**
 * Cleans up archived B-Roll data after 30 days
 * Call this periodically or on app mount
 */
export function cleanupArchivedData(): void {
  try {
    const archiveDate = localStorage.getItem('broll-migration-date');

    if (!archiveDate) return;

    const daysSinceArchive =
      (Date.now() - new Date(archiveDate).getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceArchive > 30) {
      localStorage.removeItem('broll-settings-archived');
      localStorage.removeItem('broll-content-archived');
      localStorage.removeItem('broll-migration-date');
      console.log('🧹 Cleaned up archived B-Roll data (30+ days old)');
    }
  } catch (error) {
    console.error('Error cleaning up archived data:', error);
  }
}

/**
 * Restores archived B-Roll data (rollback function)
 * Use this if migration goes wrong
 */
export function restoreArchivedBRollData(): boolean {
  try {
    const archivedSettings = localStorage.getItem('broll-settings-archived');
    const archivedContent = localStorage.getItem('broll-content-archived');

    if (!archivedSettings && !archivedContent) {
      console.warn('No archived data to restore');
      return false;
    }

    if (archivedSettings) {
      localStorage.setItem('broll-settings', archivedSettings);
    }
    if (archivedContent) {
      localStorage.setItem('broll-content', archivedContent);
    }

    console.log('✅ B-Roll data restored from archive');
    return true;
  } catch (error) {
    console.error('Error restoring archived data:', error);
    return false;
  }
}

/**
 * Checks localStorage usage and warns if approaching limit
 * localStorage limit is typically 5-10MB
 */
export function checkLocalStorageUsage(): void {
  try {
    const totalSize = new Blob(Object.values(localStorage)).size;
    const sizeMB = totalSize / (1024 * 1024);
    const limitMB = 5; // Conservative estimate
    const usagePercent = (sizeMB / limitMB) * 100;

    console.log(`📊 localStorage usage: ${sizeMB.toFixed(2)}MB (${usagePercent.toFixed(1)}%)`);

    if (usagePercent > 80) {
      console.warn('⚠️ localStorage is >80% full. Consider reducing image sizes.');
      alert(
        'Attention: Votre stockage local est presque plein (>80%). ' +
        'Pensez à réduire la taille de vos images pour éviter les erreurs.'
      );
    }
  } catch (error) {
    console.error('Error checking localStorage usage:', error);
  }
}
