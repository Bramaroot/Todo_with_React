/**
 * Global Settings Panel Component - Compact Version
 */

import { Settings, Palette, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '../common/ImageUploader';
import type { CarouselGlobalSettings, BackgroundType } from '../../types/carousel.types';

interface GlobalSettingsPanelProps {
  settings: CarouselGlobalSettings;
  onChange: (settings: CarouselGlobalSettings) => void;
}

export const GlobalSettingsPanel = ({
  settings,
  onChange,
}: GlobalSettingsPanelProps) => {
  const handleChange = <K extends keyof CarouselGlobalSettings>(
    key: K,
    value: CarouselGlobalSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-4 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype flex flex-col gap-3">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2">
        <Settings className="w-4 h-4 text-[hsl(var(--hype-yellow))]" />
        Personnalisation
      </h2>

      {/* Colors - Compact */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Palette className="w-3 h-3" />
          Couleurs
        </div>

        {/* Primary & Accent on same row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex gap-1">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-8 h-8 rounded border border-[hsl(var(--border))] cursor-pointer"
              title="Primaire"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-xs"
              placeholder="Primaire"
            />
          </div>
          <div className="flex gap-1">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-8 h-8 rounded border border-[hsl(var(--border))] cursor-pointer"
              title="Accent"
            />
            <input
              type="text"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-xs"
              placeholder="Accent"
            />
          </div>
        </div>
      </div>

      {/* Background - Compact */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <ImageIcon className="w-3 h-3" />
          Arrière-plan
        </div>

        {/* Background Type Selector */}
        <div className="flex gap-1">
          {(['solid', 'image', 'gradient'] as BackgroundType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleChange('backgroundType', type)}
              className={`flex-1 px-2 py-1 rounded border transition-all text-xs ${
                settings.backgroundType === type
                  ? 'border-[hsl(var(--hype-blue))] bg-[hsl(var(--hype-blue))]/10 text-foreground font-medium'
                  : 'border-[hsl(var(--border))] text-muted-foreground'
              }`}
            >
              {type === 'solid' && 'Uni'}
              {type === 'image' && 'Image'}
              {type === 'gradient' && 'Dégradé'}
            </button>
          ))}
        </div>

        {/* Type-Specific Controls */}
        {settings.backgroundType === 'solid' && (
          <div className="flex gap-1">
            <input
              type="color"
              value={settings.backgroundColor || '#0A0A0A'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-8 h-8 rounded border border-[hsl(var(--border))] cursor-pointer"
            />
            <input
              type="text"
              value={settings.backgroundColor || '#0A0A0A'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-xs"
            />
          </div>
        )}

        {settings.backgroundType === 'image' && (
          <ImageUploader
            label=""
            value={settings.backgroundImage || ''}
            onChange={(url) => handleChange('backgroundImage', url)}
            aspectRatio="1/1"
          />
        )}

        {settings.backgroundType === 'gradient' && (
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <input
                type="color"
                value={settings.gradientStart || '#18636B'}
                onChange={(e) => handleChange('gradientStart', e.target.value)}
                className="w-8 h-8 rounded border border-[hsl(var(--border))] cursor-pointer"
              />
              <input
                type="color"
                value={settings.gradientEnd || '#F9C74C'}
                onChange={(e) => handleChange('gradientEnd', e.target.value)}
                className="w-8 h-8 rounded border border-[hsl(var(--border))] cursor-pointer"
              />
              <select
                value={settings.gradientDirection || 'to-br'}
                onChange={(e) => handleChange('gradientDirection', e.target.value as any)}
                className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground text-xs"
              >
                <option value="to-r">→</option>
                <option value="to-br">↘</option>
                <option value="to-b">↓</option>
                <option value="to-bl">↙</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
