/**
 * Export Panel Component - TikTok 1:1 Only
 */

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportToPNG, validateExport } from '../../utils/exportUtils';
import { EXPORT_FORMATS } from '../../types/carousel.types';
import type { CarouselProfile, CarouselSlide, CarouselGlobalSettings, Resolution } from '../../types/carousel.types';

interface ExportPanelProps {
  profile: CarouselProfile;
  slides: CarouselSlide[];
  settings: CarouselGlobalSettings;
}

export const ExportPanel = ({ profile, slides, settings }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [resolution, setResolution] = useState<Resolution>('basic');
  const [imageFormat, setImageFormat] = useState<'png' | 'jpg'>('png');

  const handleExport = async () => {
    const validationError = validateExport(profile, slides);
    if (validationError) {
      if (validationError.includes('Attention')) {
        const confirm = window.confirm(validationError);
        if (!confirm) return;
      } else {
        alert(validationError);
        return;
      }
    }

    setIsExporting(true);

    try {
      const exportFormat = {
        ...EXPORT_FORMATS.tiktok,
        resolution,
        format: imageFormat
      };

      await exportToPNG(profile, slides, settings, exportFormat);

      alert(`✅ Export réussi! ${slides.length} slide(s) exportée(s).`);
    } catch (error) {
      console.error('Export error:', error);
      alert(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype flex flex-col gap-3">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2">
        <Download className="w-4 h-4 text-[hsl(var(--hype-yellow))]" />
        Exporter pour TikTok (1:1)
      </h2>

      {/* Format & Quality - Inline */}
      <div className="flex gap-2">
        {/* Image Format (PNG/JPG) */}
        <div className="flex gap-1 flex-1">
          <button
            onClick={() => setImageFormat('png')}
            disabled={isExporting}
            className={`flex-1 px-2 py-1 rounded border text-xs ${
              imageFormat === 'png'
                ? 'border-[hsl(var(--hype-blue))] bg-[hsl(var(--hype-blue))]/10 font-medium'
                : 'border-[hsl(var(--border))]'
            }`}
          >
            PNG
          </button>
          <button
            onClick={() => setImageFormat('jpg')}
            disabled={isExporting}
            className={`flex-1 px-2 py-1 rounded border text-xs ${
              imageFormat === 'jpg'
                ? 'border-[hsl(var(--hype-blue))] bg-[hsl(var(--hype-blue))]/10 font-medium'
                : 'border-[hsl(var(--border))]'
            }`}
          >
            JPG
          </button>
        </div>

        {/* Quality */}
        <div className="flex gap-1 flex-1">
          <button
            onClick={() => setResolution('basic')}
            disabled={isExporting}
            className={`flex-1 px-2 py-1 rounded border text-xs ${
              resolution === 'basic'
                ? 'border-[hsl(var(--hype-blue))] bg-[hsl(var(--hype-blue))]/10 font-medium'
                : 'border-[hsl(var(--border))]'
            }`}
          >
            Standard (1x)
          </button>
          <button
            onClick={() => setResolution('high')}
            disabled={isExporting}
            className={`flex-1 px-2 py-1 rounded border text-xs ${
              resolution === 'high'
                ? 'border-[hsl(var(--hype-blue))] bg-[hsl(var(--hype-blue))]/10 font-medium'
                : 'border-[hsl(var(--border))]'
            }`}
          >
            Haute (2x)
          </button>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting || slides.length === 0}
        className="px-4 py-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Export en cours...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Exporter {slides.length} slide{slides.length > 1 ? 's' : ''}
          </>
        )}
      </button>

      {/* Info - Compact */}
      <div className="text-xs text-muted-foreground text-center">
        Format: {imageFormat.toUpperCase()} • 1200×1200px (1:1)
      </div>
    </div>
  );
};
