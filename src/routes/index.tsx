import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Todo from '@/pages/Todo';

// export const router = createBrowserRouter([
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
//   { path: "/products", element: <Products /> },

//   { path: "*", element: <h1>Page Not Found</h1> },
// ]);



import MainLayout from "@/layout/MainLayout";
// import AdminLayout from "@/layouts/AdminLayout";

// import Home from "@/pages/Home";
// import About from "@/pages/About";
// import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/todo", element: <Todo /> }
    ],
  },

  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children: [
  //     { path: "dashboard", element: <Dashboard /> },
  //   ],
  // },

  // 404
  { path: "*", element: <h1>Page Not Found</h1> },
]);
