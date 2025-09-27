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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "text">("date");

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
    console.log(todos);
  }

  // Fonction de filtrage et de tri
  const getFilteredAndSortedTodos = () => {
    let filtered = todos;
    
    // Filtrage par priorité
    if (filter !== "Tous") {
      filtered = todos.filter((todo) => todo.priority === filter);
    }
    
    // Filtrage par recherche
    if (searchTerm.trim()) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Tri
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority": {
          const priorityOrder = { "Urgente": 3, "Moyenne": 2, "Basse": 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case "text":
          return a.text.localeCompare(b.text);
        case "date":
        default:
          return b.id - a.id; // Plus récent en premier
      }
    });
  };

  const filteredTodos = getFilteredAndSortedTodos();

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
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex flex-col">
        <div className="flex-1 flex justify-center items-start py-8">
          <div className="w-full max-w-4xl mx-4 flex flex-col gap-6 bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-300">
          {/* Header avec titre */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
              <Calendar className="w-10 h-10" />
              Gestionnaire de tâches
            </h1>
            <p className="text-base-content/70">Organisez vos tâches avec style</p>
          </div>

          {/* Formulaire d'ajout */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-base-200 rounded-xl border border-base-300">
            <input
              className="input input-bordered w-full focus:input-primary transition-all duration-300"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Hey Comrade, tu veux ajouter une nouvelle tâche ?"
            />
            <select
              className="select select-bordered w-full sm:w-48 focus:select-primary transition-all duration-300"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              title="Sélectionner la priorité"
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <button 
              onClick={addTodo} 
              className="btn btn-primary btn-lg hover:btn-secondary transition-all duration-300 transform hover:scale-105"
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
                  className={`btn btn-sm transition-all duration-300 ${
                    filter === "Tous" 
                      ? "btn-primary shadow-lg" 
                      : "btn-outline hover:btn-primary"
                  }`}
                  onClick={() => setFilter("Tous")}
                >
                  Tous ({totalCount})
                </button>

                <button
                  className={`btn btn-sm transition-all duration-300 ${
                    filter === "Urgente" 
                      ? "btn-error shadow-lg" 
                      : "btn-outline hover:btn-error"
                  }`}
                  onClick={() => setFilter("Urgente")}
                >
                 Urgente ({urgentCount})
                </button>

                <button
                  className={`btn btn-sm transition-all duration-300 ${
                    filter === "Moyenne" 
                      ? "btn-warning shadow-lg" 
                      : "btn-outline hover:btn-warning"
                  }`}
                  onClick={() => setFilter("Moyenne")}
                >
                  Moyenne ({moyenneCount})
                </button>

                <button
                  className={`btn btn-sm transition-all duration-300 ${
                    filter === "Basse" 
                      ? "btn-success shadow-lg" 
                      : "btn-outline hover:btn-success"
                  }`}
                  onClick={() => setFilter("Basse")}
                >
                  Basse ({basseCount})
                </button>
              </div>
              
              {selectedTodos.size > 0 && (
              <button
                  className="btn btn-success btn-sm hover:btn-error transition-all duration-300 transform hover:scale-105"
                onClick={finishSelected}
              >
                  <CheckCircle2 className="w-4 h-4" />
                  Terminer ({selectedTodos.size})
              </button>
              )}
            </div>

            {/* Liste des todos */}
            {filteredTodos.length > 0 ? (
              <div className="space-y-2">
                {filteredTodos.map((todo) => (
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
              <div className="flex justify-center items-center flex-col p-12 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
                <div className="text-6xl mb-2">📝</div>
                <h3 className="text-xl font-semibold text-base-content/70 mb-2">
                  Aucune tâche trouvée
                </h3>
                <p className="text-base-content/50 text-center">
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
        <footer className="mt-auto bg-base-100/80 backdrop-blur-sm border-t border-base-300 text-center py-4 text-base-content/60">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by 
            <a 
              href="https://bramablog.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-focus transition-colors duration-300 font-semibold"
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
