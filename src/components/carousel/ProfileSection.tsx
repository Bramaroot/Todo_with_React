/**
 * Profile Section Component
 *
 * Displays and edits user profile (photo, name, position)
 * Modes: read-only display or inline editing with save/cancel
 */

import { User, Save, X, Pencil } from 'lucide-react';
import { useState } from 'react';
import { ImageUploader } from '../common/ImageUploader';
import type { CarouselProfile } from '../../types/carousel.types';

interface ProfileSectionProps {
  profile: CarouselProfile;
  onUpdate: (profile: CarouselProfile) => void;
}

export const ProfileSection = ({ profile, onUpdate }: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    onUpdate({ ...tempProfile, updatedAt: new Date() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  // Update tempProfile when profile changes externally
  if (!isEditing && profile !== tempProfile) {
    setTempProfile(profile);
  }

  return (
    <div className="p-4 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2 uppercase tracking-wide">
          <User className="w-4 h-4 text-[hsl(var(--hype-yellow))]" />
          Profil
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2.5 py-1 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded font-bold text-[10px] flex items-center gap-1.5 transition-all uppercase tracking-wider"
          >
            <Pencil className="w-3 h-3" />
            Modifier
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          {/* Profile Image Upload */}
          <div className="max-w-[100px]">
            <ImageUploader
              label="Photo"
              value={tempProfile.profileImage}
              onChange={(url) =>
                setTempProfile({ ...tempProfile, profileImage: url })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">
                Nom
              </label>
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, name: e.target.value })
                }
                placeholder="Votre nom"
                className="px-3 py-1.5 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--hype-blue))]"
              />
            </div>

            {/* Position Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">
                Poste
              </label>
              <input
                type="text"
                value={tempProfile.position}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, position: e.target.value })
                }
                placeholder="Votre titre"
                className="px-3 py-1.5 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--hype-blue))]"
              />
            </div>
          </div>

          {/* Portfolio URL Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">
              Portfolio
            </label>
            <input
              type="text"
              value={tempProfile.portfolio}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, portfolio: e.target.value })
              }
              placeholder="votre-site.com"
              className="px-3 py-1.5 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded text-xs text-foreground font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded font-bold text-[10px] flex items-center justify-center gap-1.5 uppercase"
            >
              <Save className="w-3 h-3" />
              Enregistrer
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-3 py-1.5 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-foreground rounded font-bold text-[10px] flex items-center justify-center gap-1.5 uppercase"
            >
              <X className="w-3 h-3" />
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Profile Image Display */}
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[hsl(var(--hype-blue))]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--hype-blue))] flex items-center justify-center text-white text-lg font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Profile Info Display */}
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground leading-tight">
              {profile.name}
            </h3>
            <p className="text-xs text-[hsl(var(--hype-yellow))] font-semibold">
              {profile.position}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
    </div>
  );
};
