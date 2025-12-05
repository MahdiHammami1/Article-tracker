import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Reviews from "./pages/Reviews";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Use the RouterProvider so we can opt into React Router future flags */}
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <Index /> },
          { path: "/articles", element: <Articles /> },
          { path: "/articles/:id", element: <ArticleDetail /> },
          { path: "/reviews", element: <Reviews /> },
          { path: "/analytics", element: <Analytics /> },
          { path: "/team", element: <Team /> },
          { path: "/settings", element: <Settings /> },
          { path: "*", element: <NotFound /> },
        ])}
        future={{ v7_startTransition: true }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
