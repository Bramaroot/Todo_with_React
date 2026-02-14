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
    <div className="p-6 bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-[hsl(var(--hype-yellow))]" />
          Profil
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg text-sm flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <Pencil className="w-4 h-4" />
            Modifier
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-4">
          {/* Profile Image Upload */}
          <ImageUploader
            label="Photo de profil"
            value={tempProfile.profileImage}
            onChange={(url) =>
              setTempProfile({ ...tempProfile, profileImage: url })
            }
            isRound
          />

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Nom
            </label>
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, name: e.target.value })
              }
              placeholder="Votre nom complet"
              maxLength={50}
              className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
            />
          </div>

          {/* Position Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Poste / Titre
            </label>
            <input
              type="text"
              value={tempProfile.position}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, position: e.target.value })
              }
              placeholder="Votre fonction professionnelle"
              maxLength={60}
              className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
            />
          </div>

          {/* Portfolio URL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Portfolio / Site Web
            </label>
            <input
              type="text"
              value={tempProfile.portfolio}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, portfolio: e.target.value })
              }
              placeholder="nouhou-ibrahim.com"
              maxLength={50}
              className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-foreground rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Profile Image Display */}
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[hsl(var(--hype-blue))] shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--hype-blue))] flex items-center justify-center text-white text-2xl font-bold border-4 border-[hsl(var(--hype-neonBlue))] shadow-lg">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Profile Info Display */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground">
              {profile.name}
            </h3>
            <p className="text-lg text-[hsl(var(--hype-yellow))] font-medium">
              {profile.position}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
