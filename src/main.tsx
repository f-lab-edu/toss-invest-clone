import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes.tsx";
import "./index.css";
import { AuthProvider } from "@/components/common/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
