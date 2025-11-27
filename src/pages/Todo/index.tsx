import TodoForm from "@/pages/Todo/TodoForm";
import { useTodoQuery } from "@/hooks/todo";
import { useDeleteTodo } from "@/hooks/todo/mutation";

export default function TodoPage() {
  const { data: todos, isLoading } = useTodoQuery();
  const { mutate: deleteTodo, deletingId } = useDeleteTodo();

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
              className="p-3 border rounded-md flex justify-between"
            >
              <span>{todo.title}</span>
              <span  className="flex">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={deletingId === todo.id}
                  className="bg-red-500 text-white px-3 py-1 rounded-md "
                >
                  {deletingId === todo.id ? "Deleting..." : "Delete"}
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
