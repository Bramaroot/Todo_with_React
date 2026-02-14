/**
 * Preview Panel Component
 *
 * Live preview of selected slide with navigation
 * Scaled to fit container while maintaining aspect ratio
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { SlideCanvas } from './SlideCanvas';
import type {
  CarouselProfile,
  CarouselSlide,
  CarouselGlobalSettings,
} from '../../types/carousel.types';
import { EXPORT_FORMATS } from '../../types/carousel.types';

interface PreviewPanelProps {
  profile: CarouselProfile;
  slides: CarouselSlide[];
  settings: CarouselGlobalSettings;
  selectedSlideId: string | null;
}

export const PreviewPanel = ({
  profile,
  slides,
  settings,
  selectedSlideId,
}: PreviewPanelProps) => {
  const [previewScale, setPreviewScale] = useState(0.3);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find current slide
  const currentSlide =
    slides.find((s) => s.id === selectedSlideId) || slides[currentIndex] || null;

  // Update current index when selectedSlideId changes
  useEffect(() => {
    if (selectedSlideId) {
      const index = slides.findIndex((s) => s.id === selectedSlideId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [selectedSlideId, slides]);

  // Calculate preview scale based on container size
  useEffect(() => {
    const updateScale = () => {
      const containerWidth = window.innerWidth < 1024 ? window.innerWidth - 16 : 580;
      const scale = containerWidth / 1200; 
      setPreviewScale(Math.min(scale, 0.48));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (slides.length === 0) {
    return (
      <div className="p-6 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype flex flex-col items-center justify-center h-64">
        <Eye className="w-12 h-12 text-muted-foreground opacity-50 mb-3" />
        <p className="text-muted-foreground text-center">
          Aucune slide à prévisualiser
        </p>
      </div>
    );
  }

  if (!currentSlide) return null;

  // Use 1:1 format for preview (TikTok)
  const previewFormat = EXPORT_FORMATS.tiktok;

  return (
    <div className="p-1 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype flex flex-col gap-1 h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-1">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-[hsl(var(--hype-yellow))]" />
          Aperçu
        </h3>
        <span className="text-[10px] text-muted-foreground uppercase tracking-tight">
          {previewFormat.width}×{previewFormat.height}
        </span>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 flex justify-center items-center bg-[hsl(var(--muted))]/5 rounded-lg overflow-hidden relative">
        <div
          className="bg-black rounded-lg shadow-2xl"
          style={{
            transform: `scale(${previewScale})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
            width: `${previewFormat.width}px`,
            height: `${previewFormat.height}px`,
            margin: `-${(previewFormat.height * (1 - previewScale)) / 2}px -${(previewFormat.width * (1 - previewScale)) / 2}px`,
          }}
        >
          <SlideCanvas
            profile={profile}
            slide={currentSlide}
            settings={settings}
            format={previewFormat}
            includeProfile={true}
            slideNumber={currentIndex + 1}
            totalSlides={slides.length}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-2 py-1 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="w-3 h-3" />
          Préc.
        </button>

        <div className="flex-1 text-center">
          <span className="text-xs font-medium text-foreground">
            Slide {currentIndex + 1} / {slides.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
          className="px-2 py-1 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
        >
          Suiv.
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-1">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-[hsl(var(--hype-blue))] w-4'
                : 'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--hype-blue))]/50'
              }`}
            title={`Slide ${index + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
};
