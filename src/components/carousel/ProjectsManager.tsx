import { useState } from 'react';
import { Save, FolderOpen, Plus, Trash2, Folder } from 'lucide-react';
import type { SavedProject } from '../../types/carousel.types';

interface ProjectsManagerProps {
  currentProjectName: string;
  savedProjects: SavedProject[];
  onSave: (name: string) => void;
  onLoad: (project: SavedProject) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export const ProjectsManager = ({
  currentProjectName,
  savedProjects,
  onSave,
  onLoad,
  onDelete,
  onNew,
}: ProjectsManagerProps) => {
  const [nameInput, setNameInput] = useState(currentProjectName);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-hype-card rounded-xl border border-[hsl(var(--border))] shadow-hype p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Folder className="w-5 h-5 text-[hsl(var(--hype-blue))]" />
          Gestion de Projet
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-[hsl(var(--hype-blue))] hover:underline"
        >
          {isOpen ? 'Masquer' : 'Voir les projets'}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Nom du projet"
          className="flex-1 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))]"
        />
        <button
          onClick={() => onSave(nameInput)}
          className="px-4 py-2 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          title="Sauvegarder"
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
          title="Nouveau Projet"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
          {savedProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucun projet sauvegardé
            </p>
          ) : (
            savedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-[hsl(var(--muted))]/10 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20 transition-colors"
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium text-foreground truncate">
                    {project.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(project.updatedAt).toLocaleDateString()} • {project.slides.length} slides
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLoad(project)}
                    className="p-2 hover:bg-[hsl(var(--hype-blue))]/20 text-[hsl(var(--hype-blue))] rounded-md transition-colors"
                    title="Charger"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="p-2 hover:bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] rounded-md transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
