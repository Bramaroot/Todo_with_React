import { Trash2, AlertTriangle, Zap, Clock, Edit2, Check, X } from "lucide-react";
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
    <div className={`group p-4 bg-base-100 rounded-xl border border-base-300 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-primary/30 bg-primary/5' : ''
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(todo.id)}
            className="checkbox checkbox-primary checkbox-sm hover:scale-110 transition-transform duration-200"
            title="Sélectionner cette tâche"
          />
          
          {isEditing ? (
            <div className="flex-1 flex gap-2">
              <input
                className="input input-bordered input-sm flex-1"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
                title="Modifier le texte de la tâche"
                placeholder="Nouveau texte..."
              />
              <select
                className="select select-bordered select-sm w-32"
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
              <span className={`text-lg font-medium transition-all duration-300 ${
                isSelected ? 'line-through text-base-content/50' : 'text-base-content'
              }`}>
                {todo.text}
          </span>
            </div>
          )}
          
          {!isEditing && (
          <span
              className={`badge badge-sm font-semibold flex items-center gap-1 ${
              todo.priority === "Urgente"
                ? "badge-error"
                : todo.priority === "Moyenne"
                ? "badge-warning"
                  : "badge-success"
            }`}
          >
              {todo.priority === "Urgente" && <AlertTriangle className="w-3 h-3" />}
              {todo.priority === "Moyenne" && <Zap className="w-3 h-3" />}
              {todo.priority === "Basse" && <Clock className="w-3 h-3" />}
              <span>{todo.priority}</span>
          </span>
          )}
        </div>
        
        <div className="flex gap-1">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="btn btn-ghost btn-sm text-success hover:bg-success hover:text-success-content transition-all duration-300 transform hover:scale-110"
                title="Sauvegarder les modifications"
              >
                <Check className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCancel}
                className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content transition-all duration-300 transform hover:scale-110"
                title="Annuler les modifications"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost btn-sm text-primary hover:bg-primary hover:text-primary-content opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                title="Modifier cette tâche"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={onDelete} 
                className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                title="Supprimer cette tâche"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
