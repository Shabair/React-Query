import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios/request";
import { useState } from "react";

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setDeletingId(id);
      const res = await api.delete(`/todos/${id}`);
      return res.data;
    },

    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });

  return {
    ...mutation,
    deletingId, // ← expose it
  };
}
