import { useProductsQuery } from "./hooks/products/query";

function App() {
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
