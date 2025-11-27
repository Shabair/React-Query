import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios/request";

export type CreateTodoInput = {
  title: string;
};

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTodoInput) => {
      const res = await api.post("/todos", data);
      return res.data;
    },

    // OPTIONAL: refresh the /todos list automatically
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });
}
