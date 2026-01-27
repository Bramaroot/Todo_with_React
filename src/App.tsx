import { useEffect, useState } from "react";
import { Plus, Calendar, CheckCircle2, Heart } from "lucide-react";
import TodoItem from "./TodoItem";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
 
  //Tableau qi va contenir les todos
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  
  // Charger les todos depuis localStorage au démarrage
  useEffect(() => {
  const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Sauvegarder les todos dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Fontion qui permet d'ajouter les todos
  function addTodo() {
    //Verification si les champs sont valides
    if (input.trim() == "") {
      return;
    }

    //Creation de la nouvelle todo
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    //Enregistrement de la nouvelle todos a la liste des Todos
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
  }

  const getFilteredAndSortedTodos = () => {
    let filtered = todos;
    
    // Filtrage par priorité
    if (filter !== "Tous") {
      filtered = todos.filter((todo) => todo.priority === filter);
    }
    
    return filtered;
  };

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const moyenneCount = todos.filter((t) => t.priority === "Moyenne").length;
  const basseCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function editTodo(id: number, newText: string, newPriority: Priority) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
    );
    setTodos(newTodos);
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());
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
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });

    setTodos(newTodos);
    setSelectedTodos(new Set());
  }
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hype-darkBlue))] via-background to-background opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[hsl(var(--hype-neonBlue))] opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[hsl(var(--hype-yellow))] opacity-5 blur-[120px] rounded-full" />

        <div className="flex-1 flex justify-center items-start py-8 relative z-10">
          <div className="w-full max-w-4xl mx-4 flex flex-col gap-6 bg-hype-card p-8 rounded-2xl shadow-hype border border-[hsl(var(--border))] backdrop-blur-sm">
          {/* Header avec titre */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold gradient-hype-text mb-2 flex items-center justify-center gap-3">
              <Calendar className="w-10 h-10 text-[hsl(var(--hype-neonBlue))]" />
              Gestionnaire de tâches
            </h1>
            <p className="text-muted-foreground">Organisez vos tâches avec style et efficacité</p>
          </div>

          {/* Formulaire d'ajout */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-neonBlue))] transition-all duration-300">
            <input
              className="w-full px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] focus:border-transparent transition-all duration-300"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Hey Comrade, tu veux ajouter une nouvelle tâche ?"
            />
            <select
              className="w-full sm:w-48 px-4 py-3 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] focus:border-transparent transition-all duration-300"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              title="Sélectionner la priorité"
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

           
          {/* Statistiques et filtres */}
          <div className="space-y-4">

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
                  <div
                    key={todo.id}
                    className="animate-fadeIn"
                  >
                  <TodoItem
                    isSelected={selectedTodos.has(todo.id)}
                    todo={todo}
                    onToggleSelect={toggleSelectedTodos}
                    onDelete={() => deleteTodo(todo.id)}
                      onEdit={editTodo}
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
                  {filter === "Tous"
                    ? "Commencez par ajouter votre première tâche !"
                    : `Aucune tâche avec la priorité "${filter}"`}
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
        
        {/* Footer fixé en bas */}
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

export default App;
