import { useState } from "react";
import { useCreateTodo } from "@/hooks/todo/mutation";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const { mutate: createTodo, isPending } = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTodo({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {isPending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
