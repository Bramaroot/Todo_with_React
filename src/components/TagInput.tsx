import { Tag, X, Plus } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  availableTags?: string[];
  placeholder?: string;
}

export const TagInput = ({
  tags,
  onChange,
  availableTags = [],
  placeholder = "Ajouter un tag...",
}: TagInputProps) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleAddTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  const suggestions = availableTags.filter(
    (tag) => !tags.includes(tag) && tag.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Tag className="w-4 h-4" />
        Tags
      </label>

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-[hsl(var(--hype-yellow)/0.15)] text-[hsl(var(--hype-darkYellow))] border border-[hsl(var(--hype-yellow)/0.3)] rounded-full text-xs font-medium flex items-center gap-1 group"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-[hsl(var(--destructive))] transition-colors"
              title="Retirer le tag"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(input.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 text-sm"
          />
          <button
            onClick={() => handleAddTag(input)}
            disabled={!input.trim()}
            className="p-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Ajouter le tag"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-hype z-10 max-h-40 overflow-y-auto">
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="w-full text-left px-3 py-2 hover:bg-[hsl(var(--hype-blue)/0.1)] transition-colors text-sm text-foreground"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
