/**
 * Carousel Builder - Main Component
 *
 * Professional carousel creator for social media platforms
 * Supports: LinkedIn, Instagram, Twitter, YouTube, Notion
 */

import { useState, useEffect } from 'react';
import { Layers, Plus, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { ProfileSection } from './components/carousel/ProfileSection';
import { SlidesAccordion } from './components/carousel/SlidesAccordion';
import { GlobalSettingsPanel } from './components/carousel/GlobalSettingsPanel';
import { ProjectsManager } from './components/carousel/ProjectsManager';
import { PreviewPanel } from './components/carousel/PreviewPanel';
import { ExportPanel } from './components/carousel/ExportPanel';
import { useCarouselState } from './hooks/useCarouselState';
import { migrateBRollToCarousel, cleanupArchivedData } from './utils/migration';

function CarouselBuilder() {
  const {
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
    savedProjects,
    currentProjectName,
    saveProject,
    loadProject,
    deleteProject,
    startNewProject,
  } = useCarouselState();

  const [showSettings, setShowSettings] = useState(false);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  // Run migration on mount
  useEffect(() => {
    migrateBRollToCarousel();
    cleanupArchivedData();
  }, []);

  const canAddSlide = slides.length < 10;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hype-darkBlue))] via-background to-background opacity-50" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[hsl(var(--hype-neonBlue))] opacity-5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[hsl(var(--hype-yellow))] opacity-5 blur-[120px] rounded-full" />

      <div className="flex-1 flex flex-col gap-6 p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-hype-text mb-2 flex items-center justify-center gap-3">
            <Layers className="w-10 h-10 text-[hsl(var(--hype-neonBlue))]" />
            Carousel Builder
          </h1>
          <p className="text-muted-foreground">
            Créez des carrousels professionnels pour LinkedIn, Instagram et plus
          </p>
        </div>

        {/* Top Row - Settings & Export (Full Width) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Global Settings */}
          <GlobalSettingsPanel settings={settings} onChange={updateSettings} />

          {/* Export Panel */}
          <ExportPanel profile={profile} slides={slides} settings={settings} />
        </div>

        {/* Bottom Row - Editor (50%) | Preview (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Left: Editor Section (Scrollable) */}
          <div className="flex flex-col gap-6 overflow-auto pr-2">
            {/* Project Manager */}
            <ProjectsManager
              currentProjectName={currentProjectName}
              savedProjects={savedProjects}
              onSave={saveProject}
              onLoad={loadProject}
              onDelete={deleteProject}
              onNew={startNewProject}
            />

            {/* Profile Section */}
            <ProfileSection profile={profile} onUpdate={updateProfile} />

            {/* Slides Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Slides ({slides.length}/10)
                </h2>
                <div className="flex gap-2">
                  {slides.length > 0 && slides[0].image && (
                    <button
                      onClick={() => {
                        const firstImage = slides[0].image;
                        slides.forEach((slide, index) => {
                          if (index > 0) {
                            updateSlide(slide.id, { image: firstImage });
                          }
                        });
                      }}
                      className="px-3 py-2 bg-[hsl(var(--hype-yellow))] hover:bg-[hsl(var(--hype-yellow))]/80 text-black rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
                      title="Appliquer l'image de la slide 1 à toutes"
                    >
                      Copier image à toutes
                    </button>
                  )}
                  <button
                    onClick={addSlide}
                    disabled={!canAddSlide}
                    className="px-4 py-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg hover:shadow-hype-glow"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter
                  </button>
                </div>
              </div>

              {!canAddSlide && (
                <div className="px-4 py-2 bg-[hsl(var(--hype-yellow))]/20 border border-[hsl(var(--hype-yellow))]/50 rounded-lg text-sm text-foreground">
                  <strong>Limite atteinte:</strong> Maximum 10 slides
                </div>
              )}

              <SlidesAccordion
                slides={slides}
                onUpdate={updateSlide}
                onDelete={deleteSlide}
                onReorder={reorderSlides}
                selectedId={selectedSlideId}
                onSelect={setSelectedSlideId}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/80 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Tout réinitialiser
            </button>
          </div>

          {/* Right: Preview Section (Fixed) */}
          <div className="flex flex-col overflow-hidden">
            <PreviewPanel
              profile={profile}
              slides={slides}
              settings={settings}
              selectedSlideId={selectedSlideId}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-4 text-center text-xs text-muted-foreground relative z-10">
        <p>
          Vos paramètres sont sauvegardés automatiquement • Maximum 10 slides par carousel
        </p>
      </div>
    </div>
  );
}

export default CarouselBuilder;
