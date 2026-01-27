/**
 * Markdown Editor Component
 *
 * Dual-mode editor with Edit and Preview tabs
 * Supports: **bold**, *italic*, lists (-, •)
 */

import { useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import { parseMarkdown } from '../../utils/markdownParser';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const MarkdownEditor = ({
  value,
  onChange,
  placeholder = 'Écrivez votre contenu ici...\n\nMarkdown supporté:\n**gras** *italique* - listes',
  rows = 8,
}: MarkdownEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Mode Toggle Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowPreview(false)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
            !showPreview
              ? 'bg-[hsl(var(--hype-blue))] text-white shadow-lg'
              : 'bg-[hsl(var(--muted))] text-muted-foreground hover:bg-[hsl(var(--muted))]/70'
          }`}
        >
          <Edit className="w-4 h-4" />
          Éditer
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
            showPreview
              ? 'bg-[hsl(var(--hype-blue))] text-white shadow-lg'
              : 'bg-[hsl(var(--muted))] text-muted-foreground hover:bg-[hsl(var(--muted))]/70'
          }`}
        >
          <Eye className="w-4 h-4" />
          Aperçu
        </button>
      </div>

      {/* Editor or Preview Content */}
      {!showPreview ? (
        /* Edit Mode - Textarea */
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] resize-none font-mono text-sm transition-all duration-300"
          />
          {/* Character Count */}
          <span className="absolute bottom-2 right-3 text-xs text-muted-foreground bg-[hsl(var(--input))] px-2 py-1 rounded">
            {value.length} caractères
          </span>
        </div>
      ) : (
        /* Preview Mode - Rendered Markdown */
        <div
          className="w-full px-4 py-3 bg-[hsl(var(--muted))]/20 border border-[hsl(var(--border))] rounded-lg text-foreground min-h-[200px] overflow-auto"
          style={{
            minHeight: `${rows * 1.5}rem`,
          }}
        >
          {value ? (
            <div
              dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
              className="prose prose-invert max-w-none
                prose-strong:text-[hsl(var(--hype-yellow))] prose-strong:font-bold
                prose-em:text-[hsl(var(--hype-neonBlue))] prose-em:italic
                prose-ul:list-disc prose-ul:pl-6
                prose-li:text-foreground prose-li:my-1"
            />
          ) : (
            <p className="text-muted-foreground italic">
              Aucun contenu à prévisualiser
            </p>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
        <span><strong className="font-mono">**texte**</strong> = gras</span>
        <span><strong className="font-mono">*texte*</strong> = italique</span>
        <span><strong className="font-mono">- item</strong> = liste</span>
      </div>
    </div>
  );
};
