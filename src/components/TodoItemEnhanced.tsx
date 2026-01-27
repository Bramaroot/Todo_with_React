import {
  Trash2,
  AlertTriangle,
  Zap,
  Clock,
  Edit2,
  Check,
  X,
  Calendar,
  Bell,
  Tag as TagIcon,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import type { Todo, Priority } from "../types";
import { formatDate, isOverdue, getRelativeDateLabel } from "../utils/dateUtils";
import { DatePicker } from "./DatePicker";
import { TagInput } from "./TagInput";

type Props = {
  todo: Todo;
  onDelete: () => void;
  onEdit: (
    id: number,
    updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
  ) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  availableTags: string[];
};

const TodoItemEnhanced = ({
  todo,
  onDelete,
  onEdit,
  isSelected,
  onToggleSelect,
  availableTags,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);
  const [editReminderTime, setEditReminderTime] = useState(todo.reminderTime);
  const [editTags, setEditTags] = useState(todo.tags);
  const [editNotes, setEditNotes] = useState(todo.notes || "");

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, {
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate,
        reminderTime: editReminderTime,
        tags: editTags,
        notes: editNotes,
      });
      setIsEditing(false);
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate);
    setEditReminderTime(todo.reminderTime);
    setEditTags(todo.tags);
    setEditNotes(todo.notes || "");
    setIsEditing(false);
    setIsExpanded(false);
  };

  const hasAdditionalInfo =
    todo.dueDate || todo.reminderTime || todo.tags.length > 0 || todo.notes;

  return (
    <div
      className={`group rounded-xl border transition-all duration-300 ${
        isSelected
          ? "border-[hsl(var(--hype-neonBlue))] ring-2 ring-[hsl(var(--hype-neonBlue)/0.3)] bg-[hsl(var(--hype-neonBlue)/0.05)] shadow-hype-glow"
          : "border-[hsl(var(--border))] hover:border-[hsl(var(--hype-blue))] bg-[hsl(var(--card))]"
      } ${isOverdue(todo.dueDate) && !todo.completed ? "border-l-4 border-l-[hsl(var(--destructive))]" : ""}`}
    >
      {/* Main content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 flex-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(todo.id)}
              className="mt-1 w-5 h-5 rounded border-2 border-[hsl(var(--border))] bg-[hsl(var(--input))] checked:bg-[hsl(var(--hype-blue))] checked:border-[hsl(var(--hype-blue))] hover:scale-110 transition-all duration-200 cursor-pointer appearance-none checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:flex checked:after:items-center checked:after:justify-center"
              title="Sélectionner cette tâche"
            />

            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      placeholder="Texte de la tâche..."
                    />
                    <select
                      className="w-32 px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value as Priority)}
                    >
                      <option value="Urgente">🔥 Urgente</option>
                      <option value="Moyenne">⚡ Moyenne</option>
                      <option value="Basse">📋 Basse</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <DatePicker
                      label="Date d'échéance"
                      value={editDueDate}
                      onChange={setEditDueDate}
                    />
                    <DatePicker
                      label="Rappel"
                      value={editReminderTime}
                      onChange={setEditReminderTime}
                      showTime
                    />
                  </div>

                  <TagInput
                    tags={editTags}
                    onChange={setEditTags}
                    availableTags={availableTags}
                  />

                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      Notes
                    </label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Ajouter des notes..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-lg font-medium transition-all duration-300 ${
                        isSelected || todo.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-300 ${
                        todo.priority === "Urgente"
                          ? "bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border border-[hsl(var(--destructive)/0.3)]"
                          : todo.priority === "Moyenne"
                          ? "bg-[hsl(var(--hype-yellow)/0.15)] text-[hsl(var(--hype-darkYellow))] border border-[hsl(var(--hype-yellow)/0.3)]"
                          : "bg-[hsl(var(--hype-neonBlue)/0.15)] text-[hsl(var(--hype-neonBlue))] border border-[hsl(var(--hype-neonBlue)/0.3)]"
                      }`}
                    >
                      {todo.priority === "Urgente" && <AlertTriangle className="w-3 h-3" />}
                      {todo.priority === "Moyenne" && <Zap className="w-3 h-3" />}
                      {todo.priority === "Basse" && <Clock className="w-3 h-3" />}
                      <span>{todo.priority}</span>
                    </span>
                  </div>

                  {/* Quick info badges */}
                  {!isEditing && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {todo.dueDate && (
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-full border ${
                            isOverdue(todo.dueDate)
                              ? "bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)]"
                              : "bg-[hsl(var(--hype-neonBlue)/0.15)] text-[hsl(var(--hype-neonBlue))] border-[hsl(var(--hype-neonBlue)/0.3)]"
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {getRelativeDateLabel(todo.dueDate)}
                        </span>
                      )}
                      {todo.reminderTime && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(var(--hype-yellow)/0.15)] text-[hsl(var(--hype-darkYellow))] border border-[hsl(var(--hype-yellow)/0.3)]">
                          <Bell className="w-3 h-3" />
                          Rappel
                        </span>
                      )}
                      {todo.tags.length > 0 && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))]">
                          <TagIcon className="w-3 h-3" />
                          {todo.tags.length}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-1 items-start">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-[hsl(var(--hype-neonBlue))] hover:bg-[hsl(var(--hype-neonBlue))] hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                  title="Sauvegarder"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                  title="Annuler"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {hasAdditionalInfo && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title={isExpanded ? "Réduire" : "Développer"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-blue))] hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && !isEditing && (
        <div className="px-4 pb-4 space-y-3 border-t border-[hsl(var(--border))] pt-3">
          {todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[hsl(var(--hype-yellow)/0.15)] text-[hsl(var(--hype-darkYellow))] border border-[hsl(var(--hype-yellow)/0.3)] rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          {todo.notes && (
            <div className="bg-[hsl(var(--muted)/0.2)] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{todo.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItemEnhanced;
