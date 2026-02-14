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

      <div className="flex-1 flex flex-col gap-6 p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-black gradient-text mb-3 flex items-center justify-center gap-4">
            <Layers className="w-12 h-12 text-[hsl(var(--primary))]" />
            Carousel Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Créez des carrousels narratifs et impactants. 
            Utilisez le modèle <strong>Classic</strong> pour un style cyber-tech ou <strong>Charlie Oscar</strong> pour le minimalisme.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex p-1.5 glass-card rounded-2xl gap-2">
            <button
              onClick={() => setSelectedModel('classic')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                selectedModel === 'classic'
                  ? 'bg-[hsl(var(--primary))] text-black'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm font-bold">Classic</div>
                <div className="text-xs opacity-80">Dark cyber theme</div>
              </div>
            </button>
            <button
              onClick={() => setSelectedModel('charlie-oscar')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                selectedModel === 'charlie-oscar'
                  ? 'bg-[hsl(var(--primary))] text-black'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]'
              }`}
            >
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm font-bold">Modern Simple</div>
                <div className="text-xs opacity-80">Design épuré & pro</div>
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
                        className="px-4 py-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg"
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
