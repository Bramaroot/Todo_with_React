/**
 * Slide Accordion Item Component
 *
 * Individual collapsible accordion for a single slide
 * Contains: title input, image uploader, markdown editor
 * Supports drag handle for reordering
 */

import { ChevronDown, Trash2, GripVertical, FileText } from 'lucide-react';
import { ImageUploader } from '../broll/ImageUploader';
import { MarkdownEditor } from './MarkdownEditor';
import { TechStackSelector } from './TechStackSelector';
import type { CarouselSlide } from '../../types/carousel.types';

interface SlideAccordionItemProps {
  slide: CarouselSlide;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<CarouselSlide>) => void;
  onDelete: () => void;
}

export const SlideAccordionItem = ({
  slide,
  index,
  isExpanded,
  onToggle,
  onUpdate,
  onDelete,
}: SlideAccordionItemProps) => {
  return (
    <div className="bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype overflow-hidden transition-all duration-300 hover:shadow-hype-glow">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[hsl(var(--muted))]/20 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div
            className="cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-5 h-5 text-muted-foreground hover:text-[hsl(var(--hype-yellow))] transition-colors" />
          </div>

          {/* Slide Number Badge */}
          <span className="w-8 h-8 rounded-full bg-[hsl(var(--hype-blue))] text-white flex items-center justify-center font-bold text-sm shadow-lg">
            {index + 1}
          </span>

          {/* Slide Title */}
          <h3 className="text-lg font-semibold text-foreground text-left truncate max-w-[300px]">
            {slide.title || `Slide ${index + 1}`}
          </h3>

          {/* Slide Status Indicators */}
          <div className="flex gap-2">
            {slide.image && (
              <span className="px-2 py-0.5 rounded-full bg-[hsl(var(--hype-neonBlue))]/20 text-[hsl(var(--hype-neonBlue))] text-xs font-medium">
                Image
              </span>
            )}
            {slide.logo && (
              <span className="px-2 py-0.5 rounded-full bg-[hsl(var(--hype-yellow))]/20 text-[hsl(var(--hype-darkYellow))] text-xs font-medium">
                Logo
              </span>
            )}
            {slide.techStack && slide.techStack.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                {slide.techStack.length} tech
              </span>
            )}
            {slide.content && (
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-medium">
                Contenu
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-[hsl(var(--destructive))] hover:text-white rounded-lg transition-all duration-300"
            title="Supprimer cette slide"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Expand/Collapse Icon */}
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex flex-col gap-4 animate-fadeIn">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Titre de la slide
            </label>
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Titre accrocheur pour votre slide"
              maxLength={80}
              className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 text-lg font-semibold"
            />
            <span className="text-xs text-muted-foreground">
              {slide.title.length}/80 caractères
            </span>
          </div>

          {/* Image Upload */}
          <ImageUploader
            label="Image de la slide"
            value={slide.image}
            onChange={(url) => onUpdate({ image: url })}
            aspectRatio="1/1"
          />

          {/* Logo Upload (Custom) */}
          <ImageUploader
            label="Logo personnalisé (optionnel)"
            value={slide.logo || ''}
            onChange={(url) => onUpdate({ logo: url })}
            aspectRatio="1/1"
            isRound={true}
          />

          {/* Tech Stack Selector (Pre-built logos) */}
          <TechStackSelector
            value={slide.techStack || []}
            onChange={(techStack) => onUpdate({ techStack })}
          />

          {/* Markdown Content Editor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Contenu (Markdown supporté)
            </label>
            <MarkdownEditor
              value={slide.content}
              onChange={(content) => onUpdate({ content })}
              placeholder="Écrivez votre contenu ici...&#10;&#10;**Gras** pour les points importants&#10;*Italique* pour l'emphase&#10;- Listes pour organiser vos idées"
              rows={6}
            />
          </div>

          {/* Last Updated Info */}
          <div className="text-xs text-muted-foreground text-right">
            Dernière modification:{' '}
            {new Date(slide.updatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}
    </div>
  );
};
