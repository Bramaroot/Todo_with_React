/**
 * Carousel State Management Hook
 *
 * Centralized state management for Carousel Builder
 * Manages profile, slides, and settings with localStorage persistence
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type {
  CarouselProfile,
  CarouselSlide,
  CarouselGlobalSettings,
} from '../types/carousel.types';
import {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_SLIDE,
} from '../types/carousel.types';

export interface UseCarouselStateReturn {
  // Profile
  profile: CarouselProfile;
  updateProfile: (profile: CarouselProfile) => void;

  // Slides
  slides: CarouselSlide[];
  addSlide: () => void;
  updateSlide: (id: string, updates: Partial<CarouselSlide>) => void;
  deleteSlide: (id: string) => void;
  reorderSlides: (slides: CarouselSlide[]) => void;

  // Settings
  settings: CarouselGlobalSettings;
  updateSettings: (settings: CarouselGlobalSettings) => void;

  // Utility
  resetAll: () => void;
}

/**
 * Main carousel state management hook
 */
export function useCarouselState(): UseCarouselStateReturn {
  // Profile state
  const [profile, setProfile] = useLocalStorage<CarouselProfile>(
    'carousel-profile',
    DEFAULT_PROFILE
  );

  // Slides state
  const [slides, setSlides] = useLocalStorage<CarouselSlide[]>(
    'carousel-slides',
    []
  );

  // Settings state
  const [settings, setSettings] = useLocalStorage<CarouselGlobalSettings>(
    'carousel-settings',
    DEFAULT_SETTINGS
  );

  /**
   * Updates profile
   */
  const updateProfile = useCallback(
    (newProfile: CarouselProfile) => {
      setProfile(newProfile);
    },
    [setProfile]
  );

  /**
   * Adds a new slide at the end
   * Max 10 slides enforced in UI, but check here too
   */
  const addSlide = useCallback(() => {
    if (slides.length >= 10) {
      console.warn('Maximum 10 slides reached');
      alert('Limite atteinte: 10 slides maximum');
      return;
    }

    const newSlide: CarouselSlide = {
      ...DEFAULT_SLIDE,
      id: crypto.randomUUID(),
      order: slides.length,
      title: `Slide ${slides.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSlides([...slides, newSlide]);
  }, [slides, setSlides]);

  /**
   * Updates a specific slide by ID
   */
  const updateSlide = useCallback(
    (id: string, updates: Partial<CarouselSlide>) => {
      setSlides(
        slides.map((slide) =>
          slide.id === id
            ? { ...slide, ...updates, updatedAt: new Date() }
            : slide
        )
      );
    },
    [slides, setSlides]
  );

  /**
   * Deletes a slide by ID and reorders remaining slides
   */
  const deleteSlide = useCallback(
    (id: string) => {
      const confirm = window.confirm(
        'Êtes-vous sûr de vouloir supprimer cette slide ?'
      );

      if (!confirm) return;

      const filteredSlides = slides
        .filter((slide) => slide.id !== id)
        .map((slide, index) => ({
          ...slide,
          order: index,
          updatedAt: new Date(),
        }));

      setSlides(filteredSlides);
    },
    [slides, setSlides]
  );

  /**
   * Reorders slides (used for drag-and-drop)
   * Assumes slides array is already in the correct order
   */
  const reorderSlides = useCallback(
    (newSlides: CarouselSlide[]) => {
      // Ensure order property matches array index
      const orderedSlides = newSlides.map((slide, index) => ({
        ...slide,
        order: index,
        updatedAt: new Date(),
      }));

      setSlides(orderedSlides);
    },
    [setSlides]
  );

  /**
   * Updates global settings
   */
  const updateSettings = useCallback(
    (newSettings: CarouselGlobalSettings) => {
      setSettings(newSettings);
    },
    [setSettings]
  );

  /**
   * Resets all data to defaults
   * Clears localStorage and reloads
   */
  const resetAll = useCallback(() => {
    const confirm = window.confirm(
      'Êtes-vous sûr de vouloir tout réinitialiser ? ' +
      'Toutes vos données seront perdues.'
    );

    if (!confirm) return;

    // Clear carousel data
    localStorage.removeItem('carousel-profile');
    localStorage.removeItem('carousel-slides');
    localStorage.removeItem('carousel-settings');

    // Reload page to reset state
    window.location.reload();
  }, []);

  return {
    profile,
    updateProfile,
    slides,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    settings,
    updateSettings,
    resetAll,
  };
}
