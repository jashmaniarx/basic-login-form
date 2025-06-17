
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Math from "./pages/Math";
import Science from "./pages/Science";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/dashboard/Dashboard";
import AIGenerator from "./components/ai/AIGenerator";
import FlashcardsList from "./components/flashcards/FlashcardsList";
import StudyMode from "./components/flashcards/StudyMode";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tellect-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tellect-primary"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/ai-generator" element={
        <ProtectedRoute>
          <AIGenerator />
        </ProtectedRoute>
      } />
      
      <Route path="/flashcards" element={
        <ProtectedRoute>
          <FlashcardsList />
        </ProtectedRoute>
      } />
      
      <Route path="/flashcards/study" element={
        <ProtectedRoute>
          <StudyMode />
        </ProtectedRoute>
      } />
      
      <Route path="/math" element={
        <ProtectedRoute>
          <Math />
        </ProtectedRoute>
      } />
      
      <Route path="/science" element={
        <ProtectedRoute>
          <Science />
        </ProtectedRoute>
      } />
      
      <Route path="/progress" element={
        <ProtectedRoute>
          <Progress />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
