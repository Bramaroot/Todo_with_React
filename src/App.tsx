import { useEffect, useState } from "react";
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

  const savedTodos = localStorage.getItem("todos");

  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [filter, setFilter] = useState<Priority | "Tous">("tous");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, []);

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

  let filteredTodos: Todo[] = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const moyenneCount = todos.filter((t) => t.priority === "Moyenne").length;
  const basseCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;
  return (
    <>
      <div className=" flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-xl ">
          <div className="flex gap-4">
            <input
              className="input w-full"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hey Comrade, Need to add a task ?"
            />
            <select
              className="select w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgent">Urgent</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <button onClick={addTodo} className="btn btn-primary">
              Valider
            </button>
          </div>
          <div className="space-y-2" flex-1 h-fit>
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${
                  filter === "Tous" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Tous")}
              >
                Tous ({totalCount})
              </button>

              <button
                className={`btn btn-soft ${
                  filter === "Moyenne" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Moyenne")}
              >
                Moyenne ({moyenneCount})
              </button>

              <button
                className={`btn btn-soft ${
                  filter === "Urgente" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Urgente")}
              >
                Urgent ({urgentCount})
              </button>

              <button
                className={`btn btn-soft ${
                  filter === "Basse" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Basse")}
              >
                Basse ({basseCount})
              </button>
            </div>
            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20 ">
                {filteredTodos.map((todo) => (
                  <TodoItem todo={todo} />
                ))}
              </ul>
            ) : (
              <div>Hello, i'm wide</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
