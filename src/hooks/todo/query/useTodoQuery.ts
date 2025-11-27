import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios/request";


export function useTodoQuery() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await api.get("/todos");
      return res.data; // Axios returns data directly
    },
  });
}