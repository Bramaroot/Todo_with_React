/**
 * Carousel Builder - Main Component
 *
 * Professional carousel creator for social media platforms
 * Supports: LinkedIn, Instagram, Twitter, YouTube, Notion
 *
 * Now includes 2 models:
 * - Classic: Dark cyber theme with tech stack logos
 * - Charlie Oscar: Minimalist white design with intro/content/conclusion slides
 */

import { useState, useEffect } from 'react';
import { Layers, Plus, RotateCcw, Grid3X3, FileText } from 'lucide-react';
import { ProfileSection } from './components/carousel/ProfileSection';
import { SlidesAccordion } from './components/carousel/SlidesAccordion';
import { GlobalSettingsPanel } from './components/carousel/GlobalSettingsPanel';
import { ProjectsManager } from './components/carousel/ProjectsManager';
import { PreviewPanel } from './components/carousel/PreviewPanel';
import { ExportPanel } from './components/carousel/ExportPanel';
import { CharlieOscarEditor } from './components/carousel/CharlieOscarEditor';
import { useCarouselState } from './hooks/useCarouselState';
import { migrateBRollToCarousel, cleanupArchivedData } from './utils/migration';
import { useLocalStorage } from './hooks/useLocalStorage';

type CarouselModel = 'classic' | 'charlie-oscar';

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

  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useLocalStorage<CarouselModel>('carousel-model', 'classic');

  // Run migration on mount
  useEffect(() => {
    migrateBRollToCarousel();
    cleanupArchivedData();
  }, []);

  const canAddSlide = slides.length < 10;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.05),transparent_50%)]" />

      <div className="flex-1 flex flex-col gap-4 p-3 md:p-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-1">
          <h1 className="text-3xl font-black gradient-text mb-1 flex items-center justify-center gap-3">
            <Layers className="w-8 h-8 text-[hsl(var(--primary))]" />
            Carousel Builder
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Créez des carrousels narratifs et impactants. 
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex justify-center mb-1">
          <div className="inline-flex p-1 glass-card rounded-xl gap-1.5">
            <button
              onClick={() => setSelectedModel('classic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-xs ${
                selectedModel === 'classic'
                  ? 'bg-[hsl(var(--primary))] text-black'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <div className="text-left">
                <div className="font-bold">Classic</div>
              </div>
            </button>
            <button
              onClick={() => setSelectedModel('charlie-oscar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-xs ${
                selectedModel === 'charlie-oscar'
                  ? 'bg-[hsl(var(--primary))] text-black'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <div className="text-left">
                <div className="font-bold">Modern Simple</div>
              </div>
            </button>
          </div>
        </div>

        {/* Conditional Rendering Based on Selected Model */}
        {selectedModel === 'charlie-oscar' ? (
          /* Charlie Oscar Model Editor */
          <CharlieOscarEditor />
        ) : (
          /* Classic Model Editor */
          <>
            {/* Top Row - Settings & Export (Full Width) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Global Settings */}
              <div className="text-xs">
                <GlobalSettingsPanel settings={settings} onChange={updateSettings} />
              </div>

              {/* Export Panel */}
              <div className="text-xs">
                <ExportPanel profile={profile} slides={slides} settings={settings} />
              </div>
            </div>

            {/* Bottom Row - Editor (50%) | Preview (50%) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
              {/* Left: Editor Section (Scrollable) */}
              <div className="flex flex-col gap-4 overflow-auto pr-2">
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
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                      Slides ({slides.length}/10)
                    </h2>
                    <div className="flex gap-1.5">
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
                          className="px-2 py-1 bg-[hsl(var(--hype-yellow))] hover:bg-[hsl(var(--hype-yellow))]/80 text-black rounded font-bold text-[10px] uppercase"
                          title="Copier image à toutes"
                        >
                          Copier image
                        </button>
                      )}
                      <button
                        onClick={addSlide}
                        disabled={!canAddSlide}
                        className="px-3 py-1 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded font-bold flex items-center gap-1 shadow-lg text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
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
          </>
        )}
      </div>

      {/* Footer Info */}
      <div className="py-4 text-center text-xs text-muted-foreground relative z-10">
        <p>
          Vos paramètres sont sauvegardés automatiquement • {selectedModel === 'charlie-oscar' ? 'Style minimaliste Charlie Oscar' : 'Maximum 10 slides par carousel'}
        </p>
      </div>
    </div>
  );
}

export default CarouselBuilder;
