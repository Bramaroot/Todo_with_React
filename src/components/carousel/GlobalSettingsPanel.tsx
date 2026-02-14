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
    <div className="p-3 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype flex flex-col gap-2">
      <h2 className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
        <Settings className="w-3.5 h-3.5" />
        Configuration Globale
      </h2>

      {/* Colors - Compact */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase">
          <Palette className="w-2.5 h-2.5" />
          Palette
        </div>

        {/* Primary & Accent on same row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex gap-1 items-center">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-6 h-6 rounded-sm border border-[hsl(var(--border))] cursor-pointer overflow-hidden"
              title="Primaire"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="flex-1 px-1.5 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-[9px]"
              placeholder="Primaire"
            />
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-6 h-6 rounded-sm border border-[hsl(var(--border))] cursor-pointer overflow-hidden"
              title="Accent"
            />
            <input
              type="text"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="flex-1 px-1.5 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-[9px]"
              placeholder="Accent"
            />
          </div>
        </div>
      </div>

      {/* Background - Compact */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase">
          <ImageIcon className="w-2.5 h-2.5" />
          Fond
        </div>

        {/* Background Type Selector */}
        <div className="flex gap-1">
          {(['solid', 'image', 'gradient'] as BackgroundType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleChange('backgroundType', type)}
              className={`flex-1 px-1.5 py-1 rounded border transition-all text-[9px] font-bold uppercase tracking-tighter ${
                settings.backgroundType === type
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))]'
                  : 'border-[hsl(var(--border))] text-muted-foreground'
              }`}
            >
              {type === 'solid' && 'Uni'}
              {type === 'image' && 'Image'}
              {type === 'gradient' && 'Degré'}
            </button>
          ))}
        </div>

        {/* Type-Specific Controls */}
        {settings.backgroundType === 'solid' && (
          <div className="flex gap-1 items-center">
            <input
              type="color"
              value={settings.backgroundColor || '#0A0A0A'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-6 h-6 rounded-sm border border-[hsl(var(--border))] cursor-pointer overflow-hidden"
            />
            <input
              type="text"
              value={settings.backgroundColor || '#0A0A0A'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="flex-1 px-1.5 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground font-mono text-[9px]"
            />
          </div>
        )}

        {settings.backgroundType === 'image' && (
          <div className="max-w-[80px]">
            <ImageUploader
              label=""
              value={settings.backgroundImage || ''}
              onChange={(url) => handleChange('backgroundImage', url)}
              aspectRatio="1/1"
            />
          </div>
        )}

        {settings.backgroundType === 'gradient' && (
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <input
                type="color"
                value={settings.gradientStart || '#18636B'}
                onChange={(e) => handleChange('gradientStart', e.target.value)}
                className="w-6 h-6 rounded-sm border border-[hsl(var(--border))] cursor-pointer overflow-hidden"
              />
              <input
                type="color"
                value={settings.gradientEnd || '#F9C74C'}
                onChange={(e) => handleChange('gradientEnd', e.target.value)}
                className="w-6 h-6 rounded-sm border border-[hsl(var(--border))] cursor-pointer overflow-hidden"
              />
              <select
                value={settings.gradientDirection || 'to-br'}
                onChange={(e) => handleChange('gradientDirection', e.target.value as any)}
                className="flex-1 px-1 py-0.5 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-foreground text-[9px]"
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
