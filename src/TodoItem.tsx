import { useState } from "react";


type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type Props = {
  todo: Todo;
  onDelete: () => void;
  onEdit: (id: number, newText: string, newPriority: Priority) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, onEdit, isSelected, onToggleSelect }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  return (
    <div className={`group p-4 bg-[hsl(var(--card))] rounded-xl border transition-all duration-300 hover:shadow-hype ${isSelected
        ? 'border-[hsl(var(--hype-neonBlue))] ring-2 ring-[hsl(var(--hype-neonBlue)/0.3)] bg-[hsl(var(--hype-neonBlue)/0.05)] shadow-hype-glow'
        : 'border-[hsl(var(--border))] hover:border-[hsl(var(--hype-blue))]'
      }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(todo.id)}
            className="w-5 h-5 rounded border-2 border-[hsl(var(--border))] bg-[hsl(var(--input))] checked:bg-[hsl(var(--hype-blue))] checked:border-[hsl(var(--hype-blue))] hover:scale-110 transition-all duration-200 cursor-pointer appearance-none checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:flex checked:after:items-center checked:after:justify-center"
            title="Sélectionner cette tâche"
          />

          {isEditing ? (
            <div className="flex-1 flex gap-2">
              <input
                className="flex-1 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
                title="Modifier le texte de la tâche"
                placeholder="Nouveau texte..."
              />
              <select
                className="w-32 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                title="Modifier la priorité"
              >
                <option value="Urgente">Urgente</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
          ) : (
            <div className="flex-1">
              <span className={`text-lg font-medium transition-all duration-300 ${isSelected ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                {todo.text}
              </span>
            </div>
          )}

          {!isEditing && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-300 ${todo.priority === "Urgente"
                  ? "bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border border-[hsl(var(--destructive)/0.3)]"
                  : todo.priority === "Moyenne"
                    ? "bg-[hsl(var(--hype-yellow)/0.15)] text-[hsl(var(--hype-darkYellow))] border border-[hsl(var(--hype-yellow)/0.3)]"
                    : "bg-[hsl(var(--hype-neonBlue)/0.15)] text-[hsl(var(--hype-neonBlue))] border border-[hsl(var(--hype-neonBlue)/0.3)]"
                }`}
            >
              <span>{todo.priority}</span>
            </span>
          )}
        </div>

        <div className="flex gap-2 text-sm font-medium">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-[hsl(var(--hype-neonBlue))] bg-[hsl(var(--hype-neonBlue)/0.1)] hover:bg-[hsl(var(--hype-neonBlue))] hover:text-white rounded-lg transition-all duration-300"
                title="Sauvegarder"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-[hsl(var(--destructive))] bg-[hsl(var(--destructive)/0.1)] hover:bg-[hsl(var(--destructive))] hover:text-white rounded-lg transition-all duration-300"
                title="Annuler"
              >
                Annuler
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-blue))] hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Modifier"
              >
                Modifier
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Supprimer"
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
