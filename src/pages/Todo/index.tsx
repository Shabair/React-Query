import TodoForm from "@/pages/Todo/TodoForm";
import { useTodoQuery } from "@/hooks/todo";
import { useDeleteTodo } from "@/hooks/todo/mutation";
import { useEditTodo } from "@/hooks/todo/mutation";
import { useState } from "react";
import { Trash2, Pencil, Check } from "lucide-react";

export default function TodoPage() {
  const { data: todos, isLoading } = useTodoQuery();
  const { mutate: deleteTodo, deletingId } = useDeleteTodo();
  const { mutate: editTodo, editingId } = useEditTodo();

  // Track which todo we're editing
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (todo: any) => {
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = (id: number) => {
    editTodo({ id, title: editTitle });
    setEditingTodoId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <TodoForm />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {todos?.map((todo: any) => (
            <li
              key={todo.id}
              className="p-3 border rounded-md flex justify-between items-center"
            >
              {/* ------------------ TITLE / EDIT INPUT ------------------ */}
              <span>
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 rounded-md"
                  />
                ) : (
                  todo.title
                )}
              </span>

              {/* ------------------ EDIT BUTTONS ------------------ */}
              <span className="flex gap-2">
                {editingTodoId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    disabled={editingId === todo.id}
                    className="bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    {editingId === todo.id ? "Saving..." : <Check />}
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(todo)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    <Pencil />
                  </button>
                )}
              </span>

              {/* ------------------ DELETE BUTTON ------------------ */}
              <span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={deletingId === todo.id}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  {deletingId === todo.id ? "Deleting..." : <Trash2 />}
                </button>
              </span>

              <span>{todo.completed ? "✔️" : "❌"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
