import { useState, useRef, useEffect } from 'react';
import { Type, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { BRollCanvas } from './components/broll/BRollCanvas';
import { SettingsPanel } from './components/broll/SettingsPanel';
import { ImageUploader } from './components/broll/ImageUploader';
import { ExportButton } from './components/broll/ExportButton';
import { useLocalStorage } from './hooks/useLocalStorage';
import type {
  BRollSettings,
  BRollContent,
} from './types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_CONTENT,
} from './types/broll.types';

function BRollEditor() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // État avec sauvegarde automatique
  const [settings, setSettings] = useLocalStorage<BRollSettings>(
    'broll-settings',
    DEFAULT_SETTINGS
  );
  const [content, setContent] = useLocalStorage<BRollContent>(
    'broll-content',
    DEFAULT_CONTENT
  );

  const [showSettings, setShowSettings] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.4);

  // Calculer l'échelle du preview selon la taille de l'écran
  useEffect(() => {
    const updateScale = () => {
      const maxWidth = window.innerWidth < 768 ? window.innerWidth - 32 : 500;
      const scale = maxWidth / 1080;
      setPreviewScale(Math.min(scale, 0.5));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleContentChange = <K extends keyof BRollContent>(
    key: K,
    value: BRollContent[K]
  ) => {
    setContent({ ...content, [key]: value });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--secondary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.05),transparent_50%)]" />

      <div className="flex-1 flex flex-col lg:flex-row gap-8 p-4 md:p-8 relative z-10">
        {/* Panneau Principal - Contenu */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-black gradient-text mb-3 flex items-center justify-center lg:justify-start gap-4">
              <Sparkles className="w-12 h-12 text-[hsl(var(--secondary))]" />
              B-Roll Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Créez des visuels verticaux impactants pour TikTok et Reels en quelques secondes.
            </p>
          </div>

          {/* Formulaire de contenu */}
          <div className="flex flex-col gap-4 p-8 glass-card rounded-3xl border border-[hsl(var(--border))/0.5] shadow-glow">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-2">
              <Type className="w-6 h-6 text-[hsl(var(--primary))]" />
              Configuration du visuel
            </h2>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Headline (max 2 lignes)
              </label>
              <input
                type="text"
                value={content.headline}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                placeholder="Votre message principal"
                maxLength={60}
                className="px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 text-lg font-semibold"
              />
              <span className="text-xs text-muted-foreground">
                {content.headline.length}/60 caractères
              </span>
            </div>

            {/* Subheadline */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Subheadline (1 ligne)
              </label>
              <input
                type="text"
                value={content.subheadline}
                onChange={(e) => handleContentChange('subheadline', e.target.value)}
                placeholder="Votre message secondaire"
                maxLength={40}
                className="px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
              />
              <span className="text-xs text-muted-foreground">
                {content.subheadline.length}/40 caractères
              </span>
            </div>

            {/* Image de fond */}
            <ImageUploader
              label="Image d'arrière-plan (9:16)"
              value={content.backgroundImage}
              onChange={(url) => handleContentChange('backgroundImage', url)}
              aspectRatio="9/16"
            />
          </div>

          {/* Preview Mobile */}
          <div className="lg:hidden flex flex-col gap-4 items-center">
            <h3 className="text-lg font-semibold text-foreground">Preview</h3>
            <div
              className="bg-black rounded-lg shadow-2xl overflow-hidden"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
              }}
            >
              <BRollCanvas ref={canvasRef} settings={settings} content={content} />
            </div>
          </div>

          {/* Export Button */}
          <ExportButton canvasRef={canvasRef} filename="broll" />
        </div>

        {/* Panneau Latéral - Preview Desktop et Settings */}
        <div className="lg:w-[500px] flex flex-col gap-6">
          {/* Preview Desktop */}
          <div className="hidden lg:flex flex-col gap-4 items-center p-6 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold text-foreground">
                Preview 9:16
              </h3>
              <span className="text-xs text-muted-foreground">
                1080 × 1920
              </span>
            </div>

            <div
              className="bg-black rounded-lg shadow-2xl overflow-hidden"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
              }}
            >
              <BRollCanvas ref={canvasRef} settings={settings} content={content} />
            </div>
          </div>

          {/* Toggle Settings Button Mobile */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="lg:hidden px-4 py-3 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            {showSettings ? (
              <>
                <ChevronLeft className="w-5 h-5" />
                Masquer les paramètres
              </>
            ) : (
              <>
                Paramètres Branding
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Settings Panel */}
          <div className={`${showSettings ? 'block' : 'hidden'} lg:block`}>
            <SettingsPanel settings={settings} onChange={setSettings} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-4 text-center text-xs text-muted-foreground relative z-10">
        <p>
          Vos paramètres sont sauvegardés automatiquement • Format optimisé 9:16 pour réseaux sociaux
        </p>
      </div>
    </div>
  );
}

export default BRollEditor;
