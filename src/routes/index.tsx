import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/products", element: <Products /> },

  { path: "*", element: <h1>Page Not Found</h1> },
]);
