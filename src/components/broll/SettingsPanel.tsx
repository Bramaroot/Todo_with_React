import { Settings, User, Briefcase, Palette, Layers } from 'lucide-react';
import type { BRollSettings } from '../../types';
import { ImageUploader } from './ImageUploader';

interface SettingsPanelProps {
  settings: BRollSettings;
  onChange: (settings: BRollSettings) => void;
}

export const SettingsPanel = ({ settings, onChange }: SettingsPanelProps) => {
  const handleChange = <K extends keyof BRollSettings>(
    key: K,
    value: BRollSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const PRESET_COLORS = [
    { name: 'Hype Blue', color: '#18636B' },
    { name: 'Hype Yellow', color: '#F9C74C' },
    { name: 'Neon Blue', color: '#43A6B0' },
    { name: 'Red', color: '#EF4444' },
    { name: 'Green', color: '#10B981' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Pink', color: '#EC4899' },
    { name: 'Orange', color: '#F97316' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] shadow-hype">
      <div className="flex items-center gap-2 pb-4 border-b border-[hsl(var(--border))]">
        <Settings className="w-5 h-5 text-[hsl(var(--hype-neonBlue))]" />
        <h2 className="text-xl font-bold text-foreground">
          Paramètres Branding
        </h2>
      </div>

      {/* Photo de profil */}
      <ImageUploader
        label="Photo de profil"
        value={settings.profileImage}
        onChange={(url) => handleChange('profileImage', url)}
        isRound
      />

      {/* Nom */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          Nom
        </label>
        <input
          type="text"
          value={settings.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Votre nom"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
        />
      </div>

      {/* Poste */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Poste / Fonction
        </label>
        <input
          type="text"
          value={settings.position}
          onChange={(e) => handleChange('position', e.target.value)}
          placeholder="Votre poste"
          className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
        />
      </div>

      {/* Couleur d'accent */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Couleur d'accent
        </label>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-2">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset.color}
              onClick={() => handleChange('accentColor', preset.color)}
              className={`h-12 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                settings.accentColor === preset.color
                  ? 'border-white ring-2 ring-[hsl(var(--hype-blue))]'
                  : 'border-[hsl(var(--border))]'
              }`}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            />
          ))}
        </div>

        {/* Sélecteur de couleur personnalisé */}
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={settings.accentColor}
            onChange={(e) => handleChange('accentColor', e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer border-2 border-[hsl(var(--border))]"
          />
          <input
            type="text"
            value={settings.accentColor}
            onChange={(e) => handleChange('accentColor', e.target.value)}
            placeholder="#18636B"
            className="flex-1 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 font-mono text-sm"
          />
        </div>
      </div>

      {/* Opacité Overlay */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Opacité Overlay
          </span>
          <span className="text-[hsl(var(--hype-neonBlue))]">
            {Math.round(settings.overlayOpacity * 100)}%
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={settings.overlayOpacity}
          onChange={(e) =>
            handleChange('overlayOpacity', parseFloat(e.target.value))
          }
          className="w-full accent-[hsl(var(--hype-blue))]"
        />
      </div>

      {/* Opacité Bande Inférieure */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Opacité Bande Inférieure
          </span>
          <span className="text-[hsl(var(--hype-neonBlue))]">
            {Math.round(settings.footerOpacity * 100)}%
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={settings.footerOpacity}
          onChange={(e) =>
            handleChange('footerOpacity', parseFloat(e.target.value))
          }
          className="w-full accent-[hsl(var(--hype-blue))]"
        />
      </div>

      <div className="pt-4 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-muted-foreground text-center">
          Ces paramètres seront sauvegardés automatiquement
        </p>
      </div>
    </div>
  );
};
