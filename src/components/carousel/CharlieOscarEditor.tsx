/**
 * Charlie Oscar Style Editor
 *
 * Editor for the minimalist white carousel style
 * with multiple slide types and export functionality
 */

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Type,
  Settings,
  Palette,
  User,
  FileText,
  Quote,
  Hash,
} from 'lucide-react';
import { CharlieOscarCanvas } from './CharlieOscarCanvas';
import { ImageUploader } from '../common/ImageUploader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type {
  CharlieOscarBranding,
  CharlieOscarSlide,
  CharlieOscarSlideContent,
  CharlieOscarIntroContent,
  CharlieOscarContentSlide,
  CharlieOscarConclusionContent,
} from '../../types/carousel.types';
import {
  DEFAULT_CHARLIE_OSCAR_BRANDING,
  createCharlieOscarIntroSlide,
  createCharlieOscarContentSlide,
  createCharlieOscarConclusionSlide,
  CHARLIE_OSCAR_DIMENSIONS,
} from '../../types/carousel.types';

const ACCENT_COLORS = [
  { name: 'Orange', value: '#F97316' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Hype', value: '#18636B' },
  { name: 'Gold', value: '#F59E0B' },
];

export function CharlieOscarEditor() {
  const canvasRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // State with localStorage persistence
  const [branding, setBranding] = useLocalStorage<CharlieOscarBranding>(
    'charlie-oscar-branding',
    DEFAULT_CHARLIE_OSCAR_BRANDING
  );

  const [slides, setSlides] = useLocalStorage<CharlieOscarSlide[]>(
    'charlie-oscar-slides',
    [
      createCharlieOscarIntroSlide(),
      createCharlieOscarContentSlide(1),
      createCharlieOscarContentSlide(2),
      createCharlieOscarConclusionSlide(),
    ]
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showBranding, setShowBranding] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const currentSlide = slides[currentSlideIndex];

  // Update branding
  const updateBranding = useCallback(
    <K extends keyof CharlieOscarBranding>(key: K, value: CharlieOscarBranding[K]) => {
      setBranding({ ...branding, [key]: value });
    },
    [branding, setBranding]
  );

  // Update slide content
  const updateSlideContent = useCallback(
    (key: string, value: any) => {
      const newSlides = [...slides];
      newSlides[currentSlideIndex] = {
        ...newSlides[currentSlideIndex],
        content: {
          ...newSlides[currentSlideIndex].content,
          [key]: value,
        } as CharlieOscarSlideContent,
      };
      setSlides(newSlides);
    },
    [slides, currentSlideIndex, setSlides]
  );

  // Add slide
  const addSlide = useCallback(
    (type: 'intro' | 'content' | 'conclusion') => {
      let newSlide: CharlieOscarSlide;
      if (type === 'intro') {
        newSlide = createCharlieOscarIntroSlide();
      } else if (type === 'content') {
        const contentCount = slides.filter((s) => s.content.type === 'content').length;
        newSlide = createCharlieOscarContentSlide(contentCount + 1);
      } else {
        newSlide = createCharlieOscarConclusionSlide();
      }
      setSlides([...slides, newSlide]);
      setCurrentSlideIndex(slides.length);
    },
    [slides, setSlides]
  );

  // Delete slide
  const deleteSlide = useCallback(
    (index: number) => {
      if (slides.length <= 1) return;
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);
      if (currentSlideIndex >= newSlides.length) {
        setCurrentSlideIndex(newSlides.length - 1);
      }
    },
    [slides, currentSlideIndex, setSlides]
  );

  // Export single slide
  const exportSlide = useCallback(async (slideIndex: number) => {
    const slideId = slides[slideIndex].id;
    const canvas = canvasRefs.current.get(slideId);
    if (!canvas) return null;

    try {
      const dataUrl = await toPng(canvas, {
        width: CHARLIE_OSCAR_DIMENSIONS.width,
        height: CHARLIE_OSCAR_DIMENSIONS.height,
        pixelRatio: 1,
      });
      return dataUrl;
    } catch (error) {
      console.error('Export error:', error);
      return null;
    }
  }, [slides]);

  // Export all slides
  const exportAllSlides = useCallback(async () => {
    setIsExporting(true);
    setExportProgress(0);

    for (let i = 0; i < slides.length; i++) {
      const dataUrl = await exportSlide(i);
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `carousel-slide-${i + 1}.png`;
        link.href = dataUrl;
        link.click();
      }
      setExportProgress(((i + 1) / slides.length) * 100);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsExporting(false);
    setExportProgress(0);
  }, [slides, exportSlide]);

  // Navigation
  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const getSlideTypeIcon = (type: string) => {
    switch (type) {
      case 'intro':
        return <Type className="w-4 h-4" />;
      case 'content':
        return <FileText className="w-4 h-4" />;
      case 'conclusion':
        return <Quote className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  // Calculate preview scale
  const previewScale = Math.min(480 / CHARLIE_OSCAR_DIMENSIONS.width, 0.45);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left Panel - Editor */}
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {/* Branding Toggle */}
        <button
          onClick={() => setShowBranding(!showBranding)}
          className="px-4 py-3 bg-[hsl(var(--hype-card))] border border-[hsl(var(--border))] rounded-xl flex items-center justify-between hover:bg-[hsl(var(--muted)/0.3)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[hsl(var(--hype-yellow))]" />
            <span className="font-semibold text-foreground">Paramètres Branding</span>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-muted-foreground transition-transform ${
              showBranding ? 'rotate-90' : ''
            }`}
          />
        </button>

        {/* Branding Panel */}
        {showBranding && (
          <div className="p-5 bg-[hsl(var(--hype-card))] border border-[hsl(var(--border))] rounded-xl space-y-4">
            {/* Profile Image */}
            <div className="max-w-[120px]">
              <ImageUploader
                label="Photo"
                value={branding.profileImage}
                onChange={(url) => updateBranding('profileImage', url)}
                aspectRatio="1/1"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-[hsl(var(--hype-yellow))]" />
                Username
              </label>
              <input
                type="text"
                value={branding.username}
                onChange={(e) => updateBranding('username', e.target.value)}
                placeholder="@username"
                className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Catégorie 1</label>
                <input
                  type="text"
                  value={branding.primaryCategory}
                  onChange={(e) => updateBranding('primaryCategory', e.target.value)}
                  className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Catégorie 2</label>
                <input
                  type="text"
                  value={branding.secondaryCategory}
                  onChange={(e) => updateBranding('secondaryCategory', e.target.value)}
                  className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Palette className="w-4 h-4 text-[hsl(var(--hype-yellow))]" />
                Couleur d'accent
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateBranding('accentColor', color.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      branding.accentColor === color.value
                        ? 'border-white scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={(e) => updateBranding('accentColor', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Nom copyright</label>
                <input
                  type="text"
                  value={branding.copyrightName}
                  onChange={(e) => updateBranding('copyrightName', e.target.value)}
                  className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Label footer</label>
                <input
                  type="text"
                  value={branding.footerLabel}
                  onChange={(e) => updateBranding('footerLabel', e.target.value)}
                  className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
                />
              </div>
            </div>
          </div>
        )}

        {/* Slides Navigation */}
        <div className="p-4 bg-[hsl(var(--hype-card))] border border-[hsl(var(--border))] rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              Slides ({slides.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => addSlide('intro')}
                className="px-3 py-1.5 text-xs bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                + Intro
              </button>
              <button
                onClick={() => addSlide('content')}
                className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                + Contenu
              </button>
              <button
                onClick={() => addSlide('conclusion')}
                className="px-3 py-1.5 text-xs bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                + Conclusion
              </button>
            </div>
          </div>

          {/* Slide Pills */}
          <div className="flex flex-wrap gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  index === currentSlideIndex
                    ? 'bg-[hsl(var(--hype-blue))] border-[hsl(var(--hype-blue))] text-white'
                    : 'bg-[hsl(var(--muted)/0.3)] border-[hsl(var(--border))] text-muted-foreground hover:text-foreground'
                }`}
              >
                {getSlideTypeIcon(slide.content.type)}
                <span className="text-sm font-medium">
                  {index + 1}. {slide.content.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Slide Editor */}
        {currentSlide && (
          <div className="p-5 bg-[hsl(var(--hype-card))] border border-[hsl(var(--border))] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {getSlideTypeIcon(currentSlide.content.type)}
                Slide {currentSlideIndex + 1}: {currentSlide.content.type}
              </h3>
              <button
                onClick={() => deleteSlide(currentSlideIndex)}
                disabled={slides.length <= 1}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Intro Slide Fields */}
            {currentSlide.content.type === 'intro' && (
              <IntroSlideEditor
                content={currentSlide.content}
                onUpdate={updateSlideContent}
                accentColor={branding.accentColor}
              />
            )}

            {/* Content Slide Fields */}
            {currentSlide.content.type === 'content' && (
              <ContentSlideEditor
                content={currentSlide.content}
                onUpdate={updateSlideContent}
              />
            )}

            {/* Conclusion Slide Fields */}
            {currentSlide.content.type === 'conclusion' && (
              <ConclusionSlideEditor
                content={currentSlide.content}
                onUpdate={updateSlideContent}
              />
            )}
          </div>
        )}

        {/* Export Button */}
        <button
          onClick={exportAllSlides}
          disabled={isExporting}
          className="px-6 py-4 bg-gradient-to-r from-[hsl(var(--hype-blue))] to-[hsl(var(--hype-neonBlue))] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Exportation... {Math.round(exportProgress)}%
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              Exporter toutes les slides ({slides.length})
            </>
          )}
        </button>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:w-[500px] flex flex-col gap-4">
        {/* Preview Container */}
        <div className="p-2 bg-[hsl(var(--hype-card))] border border-[hsl(var(--border))] rounded-xl">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-semibold text-foreground">Aperçu direct</h3>
            <span className="text-[10px] text-muted-foreground uppercase">
              {CHARLIE_OSCAR_DIMENSIONS.width} × {CHARLIE_OSCAR_DIMENSIONS.height}
            </span>
          </div>

          {/* Slide Navigation */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1.5 rounded-lg bg-[hsl(var(--muted)/0.3)] hover:bg-[hsl(var(--muted)/0.5)] transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-1.5 rounded-lg bg-[hsl(var(--muted)/0.3)] hover:bg-[hsl(var(--muted)/0.5)] transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Canvas Preview */}
          <div
            className="flex justify-center overflow-hidden rounded-lg bg-gray-900/50"
            style={{
              height: `${CHARLIE_OSCAR_DIMENSIONS.height * previewScale + 10}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
              }}
            >
              {currentSlide && (
                <CharlieOscarCanvas
                  ref={(el) => {
                    if (el) canvasRefs.current.set(currentSlide.id, el);
                  }}
                  branding={branding}
                  slide={currentSlide}
                />
              )}
            </div>
          </div>
        </div>

        {/* Slide Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`aspect-[9/16] rounded-lg border-2 overflow-hidden transition-all ${
                index === currentSlideIndex
                  ? 'border-[hsl(var(--hype-yellow))] ring-2 ring-[hsl(var(--hype-yellow))]'
                  : 'border-[hsl(var(--border))] hover:border-[hsl(var(--hype-blue))]'
              }`}
            >
              <div
                style={{
                  transform: 'scale(0.08)',
                  transformOrigin: 'top left',
                  width: `${CHARLIE_OSCAR_DIMENSIONS.width}px`,
                  height: `${CHARLIE_OSCAR_DIMENSIONS.height}px`,
                }}
              >
                <CharlieOscarCanvas
                  ref={(el) => {
                    if (el) canvasRefs.current.set(slide.id, el);
                  }}
                  branding={branding}
                  slide={slide}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Intro Slide Editor Component
function IntroSlideEditor({
  content,
  onUpdate,
  accentColor,
}: {
  content: CharlieOscarIntroContent;
  onUpdate: (key: string, value: any) => void;
  accentColor: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Sous-titre</label>
        <input
          type="text"
          value={content.subtitle}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Ex: 3 Choses à Faire"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Lignes du titre (une par ligne)
        </label>
        <textarea
          value={content.titleLines.join('\n')}
          onChange={(e) => onUpdate('titleLines', e.target.value.split('\n'))}
          placeholder="Avant De&#10;Mettre Ton&#10;Site Web En"
          rows={3}
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          Mot en couleur
          <span
            className="w-4 h-4 rounded"
            style={{ backgroundColor: accentColor }}
          />
        </label>
        <input
          type="text"
          value={content.highlightedWord}
          onChange={(e) => onUpdate('highlightedWord', e.target.value)}
          placeholder="Ex: Ligne"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
        />
      </div>
    </div>
  );
}

// Content Slide Editor Component
function ContentSlideEditor({
  content,
  onUpdate,
}: {
  content: CharlieOscarContentSlide;
  onUpdate: (key: string, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Numéro</label>
        <input
          type="number"
          value={content.number}
          onChange={(e) => onUpdate('number', parseInt(e.target.value) || 1)}
          min={1}
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground w-24"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Titre</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: GTmetrix"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          value={content.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Description de l'outil..."
          rows={3}
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">URL du site (optionnel)</label>
        <input
          type="text"
          value={content.websiteUrl || ''}
          onChange={(e) => onUpdate('websiteUrl', e.target.value)}
          placeholder="Ex: gtmetrix.com"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground"
        />
      </div>

      <div className="max-w-[200px]">
        <ImageUploader
          label="Screenshot"
          value={content.screenshot}
          onChange={(url) => onUpdate('screenshot', url)}
          aspectRatio="16/9"
        />
      </div>
    </div>
  );
}

// Conclusion Slide Editor Component
function ConclusionSlideEditor({
  content,
  onUpdate,
}: {
  content: CharlieOscarConclusionContent;
  onUpdate: (key: string, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Texte principal</label>
        <textarea
          value={content.mainText}
          onChange={(e) => onUpdate('mainText', e.target.value)}
          placeholder="Avoir 100/100 sur ces outils ne garantit pas le succès,"
          rows={2}
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground font-bold">
          Phrase en gras (emphasis)
        </label>
        <input
          type="text"
          value={content.boldPhrase}
          onChange={(e) => onUpdate('boldPhrase', e.target.value)}
          placeholder="mais ne pas tester garantit l'échec."
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground font-bold"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Texte de support</label>
        <textarea
          value={content.supportingText}
          onChange={(e) => onUpdate('supportingText', e.target.value)}
          placeholder="Utilise ces outils comme un filet de sécurité..."
          rows={3}
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground resize-none"
        />
      </div>
    </div>
  );
}
