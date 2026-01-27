/**
 * Slides Accordion Component
 *
 * Container for all slides with drag-and-drop reordering
 * Uses HTML5 native drag-and-drop API
 */

import { useState } from 'react';
import { Layers } from 'lucide-react';
import { SlideAccordionItem } from './SlideAccordionItem';
import type { CarouselSlide } from '../../types/carousel.types';

interface SlidesAccordionProps {
  slides: CarouselSlide[];
  onUpdate: (id: string, updates: Partial<CarouselSlide>) => void;
  onDelete: (id: string) => void;
  onReorder: (slides: CarouselSlide[]) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const SlidesAccordion = ({
  slides,
  onUpdate,
  onDelete,
  onReorder,
  selectedId,
  onSelect,
}: SlidesAccordionProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', ''); // Required for Firefox

    // Optional: Create a drag image
    if (e.currentTarget instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggedIndex === null || draggedIndex === index) {
      setDragOverIndex(null);
      return;
    }

    setDragOverIndex(index);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Reorder slides array
    const newSlides = [...slides];
    const [draggedSlide] = newSlides.splice(draggedIndex, 1);
    newSlides.splice(dropIndex, 0, draggedSlide);

    // Update order property for each slide
    newSlides.forEach((slide, idx) => {
      slide.order = idx;
    });

    onReorder(newSlides);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Empty state
  if (slides.length === 0) {
    return (
      <div className="p-12 border-2 border-dashed border-[hsl(var(--border))] rounded-xl text-center bg-[hsl(var(--muted))]/10 animate-fadeIn">
        <Layers className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-lg text-muted-foreground mb-2">
          Aucune slide pour le moment
        </p>
        <p className="text-sm text-muted-foreground">
          Cliquez sur "Ajouter une slide" pour commencer votre carousel
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`transition-all duration-200 ${
            draggedIndex === index
              ? 'opacity-40 scale-95'
              : 'opacity-100 scale-100'
          } ${
            dragOverIndex === index
              ? 'transform translate-y-2'
              : ''
          }`}
        >
          <SlideAccordionItem
            slide={slide}
            index={index}
            isExpanded={selectedId === slide.id}
            onToggle={() => onSelect(selectedId === slide.id ? null : slide.id)}
            onUpdate={(updates) => onUpdate(slide.id, updates)}
            onDelete={() => onDelete(slide.id)}
          />
        </div>
      ))}

      {/* Drag Indicator */}
      {draggedIndex !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="px-6 py-3 bg-[hsl(var(--hype-blue))] text-white rounded-lg shadow-2xl font-semibold animate-pulse">
            Déplacer la slide {draggedIndex + 1}
          </div>
        </div>
      )}
    </div>
  );
};
