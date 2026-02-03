import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Sobre from "./pages/Sobre.tsx";
import Produtos from "./pages/Produtos.tsx";
import Produto from "./pages/Produto.tsx";
import Videos from "./pages/Videos.tsx";
import Contato from "./pages/Contato.tsx";
import Orcamento from "./pages/Orcamento.tsx";
import Garantia from "./pages/Garantia.tsx";
import DicasDeUso from "./pages/DicasDeUso.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<Produto />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/orcamento" element={<Orcamento />} />
        <Route path="/garantia" element={<Garantia />} />
        <Route path="/dicas-de-uso" element={<DicasDeUso />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
