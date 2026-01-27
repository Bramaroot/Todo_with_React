import { useEffect, useState } from "react";
import { Plus, Calendar, CheckCircle2, Heart, Search, SortAsc } from "lucide-react";
import TodoItemEnhanced from "./components/TodoItemEnhanced";
import { NotificationButton } from "./components/NotificationButton";
import type { Todo, Priority, FilterType, SortType } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  requestNotificationPermission,
  sendTaskReminder,
  scheduleNotification,
} from "./utils/notifications";
import { isOverdue, isToday, isTomorrow } from "./utils/dateUtils";

function AppEnhanced() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos-enhanced", []);
  const [filter, setFilter] = useState<FilterType>("Tous");
  const [sortBy, setSortBy] = useState<SortType>("date-created");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  // Demander la permission pour les notifications au chargement
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Planifier les rappels pour les tâches avec reminderTime
  useEffect(() => {
    const timeoutIds: number[] = [];

    todos.forEach((todo) => {
      if (todo.reminderTime && !todo.completed) {
        const now = new Date().getTime();
        const reminderTime = new Date(todo.reminderTime).getTime();

        if (reminderTime > now) {
          const timeoutId = scheduleNotification(
            `${todo.priority === "Urgente" ? "🔥" : todo.priority === "Moyenne" ? "⚡" : "📋"} Rappel de tâche`,
            new Date(todo.reminderTime),
            {
              body: todo.text,
              tag: `reminder-${todo.id}`,
              requireInteraction: todo.priority === "Urgente",
            }
          );
          if (timeoutId !== -1) {
            timeoutIds.push(timeoutId);
          }
        }
      }
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      subtasks: [],
      attachments: [],
      recurrence: "none",
    };

    setTodos([newTodo, ...todos]);
    setInput("");
    setPriority("Moyenne");
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(
    id: number,
    updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>
  ) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    );
  }

  function toggleSelectedTodos(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodos(newSelected);
  }

  function finishSelected() {
    const selectedTodosList = todos.filter((todo) => selectedTodos.has(todo.id));

    // Marquer comme complétés au lieu de supprimer
    setTodos(
      todos.map((todo) =>
        selectedTodos.has(todo.id)
          ? { ...todo, completed: true, completedAt: new Date() }
          : todo
      )
    );

    setSelectedTodos(new Set());

    // Envoyer une notification de félicitations
    if (selectedTodosList.length > 0) {
      new Notification("🎉 Tâches terminées!", {
        body: `Vous avez terminé ${selectedTodosList.length} tâche(s). Excellent travail!`,
      });
    }
  }

  // Get all unique tags from all todos
  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags)));

  function getFilteredAndSortedTodos() {
    let filtered = todos;

    // Filter by priority
    if (filter !== "Tous") {
      filtered = filtered.filter((todo) => todo.priority === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.text.toLowerCase().includes(query) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          todo.notes?.toLowerCase().includes(query)
      );
    }

    // Sort todos
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { Urgente: 0, Moyenne: 1, Basse: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];

        case "alphabetical":
          return a.text.localeCompare(b.text);

        case "due-date":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

        case "date-updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

        case "date-created":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente" && !t.completed).length;
  const moyenneCount = todos.filter((t) => t.priority === "Moyenne" && !t.completed).length;
  const basseCount = todos.filter((t) => t.priority === "Basse" && !t.completed).length;
  const totalCount = todos.filter((t) => !t.completed).length;
  const overdueCount = todos.filter((t) => isOverdue(t.dueDate) && !t.completed).length;
  const todayCount = todos.filter((t) => isToday(t.dueDate) && !t.completed).length;
  const tomorrowCount = todos.filter((t) => isTomorrow(t.dueDate) && !t.completed).length;

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hype-darkBlue))] via-background to-background opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[hsl(var(--hype-neonBlue))] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[hsl(var(--hype-yellow))] opacity-5 blur-[120px] rounded-full" />

        <div className="flex-1 flex justify-center items-start py-8 relative z-10">
          <div className="w-full max-w-5xl mx-4 flex flex-col gap-6 bg-hype-card p-8 rounded-2xl shadow-hype border border-[hsl(var(--border))] backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold gradient-hype-text mb-2 flex items-center justify-center gap-3">
                <Calendar className="w-10 h-10 text-[hsl(var(--hype-neonBlue))]" />
                Gestionnaire de tâches Pro
              </h1>
              <p className="text-muted-foreground">
                Organisez vos tâches avec style, efficacité et notifications
              </p>
            </div>

            {/* Formulaire d'ajout */}
            <div className="flex flex-col sm:flex-row gap-4 p-6 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-neonBlue))] transition-all duration-300">
              <input
                className="w-full px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] focus:border-transparent transition-all duration-300"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder="Nouvelle tâche..."
              />
              <select
                className="w-full sm:w-48 px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] focus:border-transparent transition-all duration-300"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="Urgente">🔥 Urgente</option>
                <option value="Moyenne">⚡ Moyenne</option>
                <option value="Basse">📋 Basse</option>
              </select>

              <button
                onClick={addTodo}
                className="px-6 py-3 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-hype-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
                disabled={!input.trim()}
              >
                <Plus className="w-5 h-5" />
                Ajouter
              </button>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une tâche..."
                  className="w-full pl-10 pr-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="px-4 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
                >
                  <option value="date-created">Plus récent</option>
                  <option value="date-updated">Modifié récemment</option>
                  <option value="priority">Priorité</option>
                  <option value="alphabetical">Alphabétique</option>
                  <option value="due-date">Date d'échéance</option>
                </select>
              </div>

              <NotificationButton />
            </div>

            {/* Statistiques et filtres */}
            <div className="space-y-4">
              {/* Stats cards */}
              {(overdueCount > 0 || todayCount > 0 || tomorrowCount > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {overdueCount > 0 && (
                    <div className="p-3 bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.3)] rounded-lg">
                      <div className="text-sm text-[hsl(var(--destructive))] font-medium">
                        ⚠️ En retard
                      </div>
                      <div className="text-2xl font-bold text-[hsl(var(--destructive))]">
                        {overdueCount}
                      </div>
                    </div>
                  )}
                  {todayCount > 0 && (
                    <div className="p-3 bg-[hsl(var(--hype-yellow)/0.1)] border border-[hsl(var(--hype-yellow)/0.3)] rounded-lg">
                      <div className="text-sm text-[hsl(var(--hype-darkYellow))] font-medium">
                        📅 Aujourd'hui
                      </div>
                      <div className="text-2xl font-bold text-[hsl(var(--hype-darkYellow))]">
                        {todayCount}
                      </div>
                    </div>
                  )}
                  {tomorrowCount > 0 && (
                    <div className="p-3 bg-[hsl(var(--hype-neonBlue)/0.1)] border border-[hsl(var(--hype-neonBlue)/0.3)] rounded-lg">
                      <div className="text-sm text-[hsl(var(--hype-neonBlue))] font-medium">
                        🗓️ Demain
                      </div>
                      <div className="text-2xl font-bold text-[hsl(var(--hype-neonBlue))]">
                        {tomorrowCount}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === "Tous"
                        ? "bg-[hsl(var(--hype-blue))] text-white shadow-hype-glow"
                        : "bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-blue))] hover:text-foreground"
                    }`}
                    onClick={() => setFilter("Tous")}
                  >
                    Tous ({totalCount})
                  </button>

                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === "Urgente"
                        ? "bg-[hsl(var(--destructive))] text-white shadow-lg"
                        : "bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))] hover:border-[hsl(var(--destructive))] hover:text-foreground"
                    }`}
                    onClick={() => setFilter("Urgente")}
                  >
                    🔥 Urgente ({urgentCount})
                  </button>

                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === "Moyenne"
                        ? "bg-[hsl(var(--hype-yellow))] text-black shadow-lg"
                        : "bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-yellow))] hover:text-foreground"
                    }`}
                    onClick={() => setFilter("Moyenne")}
                  >
                    ⚡ Moyenne ({moyenneCount})
                  </button>

                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === "Basse"
                        ? "bg-[hsl(var(--hype-neonBlue))] text-white shadow-lg"
                        : "bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-neonBlue))] hover:text-foreground"
                    }`}
                    onClick={() => setFilter("Basse")}
                  >
                    📋 Basse ({basseCount})
                  </button>
                </div>

                {selectedTodos.size > 0 && (
                  <button
                    className="px-4 py-2 bg-[hsl(var(--hype-neonBlue))] hover:bg-[hsl(var(--hype-yellow))] hover:text-black text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-hype-glow"
                    onClick={finishSelected}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Terminer ({selectedTodos.size})
                  </button>
                )}
              </div>

              {/* Liste des todos */}
              {getFilteredAndSortedTodos().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredAndSortedTodos().map((todo) => (
                    <div key={todo.id} className="animate-fadeIn">
                      <TodoItemEnhanced
                        isSelected={selectedTodos.has(todo.id)}
                        todo={todo}
                        onToggleSelect={toggleSelectedTodos}
                        onDelete={() => deleteTodo(todo.id)}
                        onEdit={editTodo}
                        availableTags={allTags}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col p-12 bg-[hsl(var(--muted)/0.2)] rounded-xl border-2 border-dashed border-[hsl(var(--border))]">
                  <div className="text-6xl mb-4 animate-pulse-slow">📝</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aucune tâche trouvée
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {searchQuery
                      ? `Aucun résultat pour "${searchQuery}"`
                      : filter === "Tous"
                      ? "Commencez par ajouter votre première tâche !"
                      : `Aucune tâche avec la priorité "${filter}"`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto bg-[hsl(var(--card))]/80 backdrop-blur-sm border-t border-[hsl(var(--border))] text-center py-4 text-muted-foreground relative z-10">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-[hsl(var(--destructive))] animate-pulse" /> by
            <a
              href="https://bramablog.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-hype-text font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Brama
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default AppEnhanced;
