/**
 * Slide Accordion Item Component
 *
 * Individual collapsible accordion for a single slide
 * Contains: title input, image uploader, markdown editor
 * Supports drag handle for reordering
 */

import { ChevronDown, Trash2, GripVertical, FileText, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Heart, Layout, Code, Quote, Hash } from 'lucide-react';
import { ImageUploader } from '../common/ImageUploader';
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
    <div className="bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype overflow-hidden transition-all duration-300">
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
          {/* Layout Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Type de Slide
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'classic', label: 'Classique', icon: Layout },
                { id: 'quote', label: 'Citation', icon: Quote },
                { id: 'code', label: 'Code', icon: Code },
                { id: 'bigNumber', label: 'Chiffre', icon: Hash },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => onUpdate({ layout: type.id as any })}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    (slide.layout || 'classic') === type.id
                      ? 'bg-[hsl(var(--hype-blue))]/20 border-[hsl(var(--hype-blue))] text-[hsl(var(--hype-blue))] shadow-sm'
                      : 'bg-[hsl(var(--input))] border-[hsl(var(--border))] text-muted-foreground hover:bg-[hsl(var(--muted))]/20'
                  }`}
                >
                  <type.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Inputs based on Layout */}
          {slide.layout === 'quote' && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-sm font-medium text-foreground">
                Auteur de la citation
              </label>
              <input
                type="text"
                value={slide.quoteAuthor || ''}
                onChange={(e) => onUpdate({ quoteAuthor: e.target.value })}
                placeholder="Ex: Steve Jobs"
                className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))]"
              />
            </div>
          )}

          {slide.layout === 'code' && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-sm font-medium text-foreground">
                Snippet de Code
              </label>
              <textarea
                value={slide.codeSnippet || ''}
                onChange={(e) => onUpdate({ codeSnippet: e.target.value })}
                placeholder="const future = 'bright';"
                rows={5}
                className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] font-mono text-sm"
              />
            </div>
          )}

          {slide.layout === 'bigNumber' && (
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-sm font-medium text-foreground">
                Chiffre Clé (Big Number)
              </label>
              <input
                type="text"
                value={slide.bigNumber || ''}
                onChange={(e) => onUpdate({ bigNumber: e.target.value })}
                placeholder="Ex: 50%"
                className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] text-xl font-bold"
              />
            </div>
          )}

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

          {/* Text Styling Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[hsl(var(--muted))]/10 rounded-lg border border-[hsl(var(--border))]">
            {/* Title Styling */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Type className="w-4 h-4" />
                Style du Titre
              </label>
              <div className="flex gap-2">
                {/* Alignment */}
                <div className="flex bg-[hsl(var(--input))] rounded-lg p-1 border border-[hsl(var(--border))]">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => onUpdate({ titleAlignment: align })}
                      className={`p-1.5 rounded-md transition-all ${
                        (slide.titleAlignment || 'left') === align
                          ? 'bg-[hsl(var(--hype-blue))] text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))]/20'
                      }`}
                      title={`Aligner à ${align === 'left' ? 'gauche' : align === 'center' ? 'centrer' : 'droite'}`}
                    >
                      {align === 'left' && <AlignLeft className="w-4 h-4" />}
                      {align === 'center' && <AlignCenter className="w-4 h-4" />}
                      {align === 'right' && <AlignRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
                {/* Size */}
                <select
                  value={slide.titleSize || 'large'}
                  onChange={(e) => onUpdate({ titleSize: e.target.value as any })}
                  className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-sm"
                >
                  <option value="small">Petit</option>
                  <option value="medium">Moyen</option>
                  <option value="large">Grand</option>
                  <option value="xl">XL</option>
                </select>
              </div>
            </div>

            {/* Content Styling */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Style du Contenu
              </label>
              <div className="flex gap-2">
                {/* Alignment */}
                <div className="flex bg-[hsl(var(--input))] rounded-lg p-1 border border-[hsl(var(--border))]">
                  {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => onUpdate({ contentAlignment: align })}
                      className={`p-1.5 rounded-md transition-all ${
                        (slide.contentAlignment || 'left') === align
                          ? 'bg-[hsl(var(--hype-blue))] text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))]/20'
                      }`}
                      title={`Aligner ${align}`}
                    >
                      {align === 'left' && <AlignLeft className="w-4 h-4" />}
                      {align === 'center' && <AlignCenter className="w-4 h-4" />}
                      {align === 'right' && <AlignRight className="w-4 h-4" />}
                      {align === 'justify' && <AlignJustify className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
                {/* Size */}
                <select
                  value={slide.contentSize || 'medium'}
                  onChange={(e) => onUpdate({ contentSize: e.target.value as any })}
                  className="flex-1 px-2 py-1 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-sm"
                >
                  <option value="small">Petit</option>
                  <option value="medium">Moyen</option>
                  <option value="large">Grand</option>
                </select>
              </div>
            </div>
          </div>

          {/* Call to Action Toggle */}
          <div className="flex items-center justify-between p-4 bg-[hsl(var(--muted))]/10 rounded-lg border border-[hsl(var(--border))]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[hsl(var(--hype-blue))]/20 rounded-lg text-[hsl(var(--hype-blue))]">
                <Heart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">Call to Action</span>
                <span className="text-xs text-muted-foreground">Afficher "Like & Abonne-toi" (idéal pour la dernière slide)</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={slide.showCTA || false}
                onChange={(e) => onUpdate({ showCTA: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[hsl(var(--muted))] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--hype-blue))]"></div>
            </label>
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
