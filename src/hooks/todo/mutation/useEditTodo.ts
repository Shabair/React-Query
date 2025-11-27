import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios/request";
import { useState } from "react";

export type UpdateTodoInput = {
  id: number;
  title?: string;
  completed?: boolean;
};

export function useEditTodo() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateTodoInput) => {
      setEditingId(id);
      const res = await api.put(`/todos/${id}`, updates);
      return res.data;
    },

    onSettled: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error) => {
      console.error("Failed to update todo:", error);
    },
  });

  return {
    ...mutation,
    editingId, // expose editing ID
  };
}
