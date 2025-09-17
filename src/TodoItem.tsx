type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  return (
    <li key={todo.id} className="p-3 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-md font-bold">
            <span>{todo.text}</span>
          </span>
          <span
            className={`badge badge-sm badge-soft ${
              todo.priority === "Urgente"
                ? "badge-error"
                : todo.priority === "Moyenne"
                ? "badge-warning"
                : "badge-error"
            }`}
          >
            {todo.priority}
          </span>
        </div>
        <button className="btn btn-small btn-error btn-soft">Supp</button>
      </div>
    </li>
  );
};

export default TodoItem;
