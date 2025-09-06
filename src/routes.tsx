import type { RouteObject } from "react-router";
import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";
import Home from "@/pages/Home.tsx";
import App from "@/App.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
];

export default routes;
