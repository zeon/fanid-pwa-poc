import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ArtistMembership from "./pages/ArtistMembership";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { i18n } from "./i18n";
import { useTranslation } from "react-i18next";
import Loading from "./components/Loading";
import { ArtistMembershipProvider } from "@/contexts/ArtistMembershipContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ArtistMembershipProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/artist-membership/:artistId"
              element={
                <RequireAuth>
                  <ArtistMembership />
                </RequireAuth>
              }
            />
            <Route
              path="/events"
              element={
                <RequireAuth>
                  <Events />
                </RequireAuth>
              }
            />
            <Route
              path="/events/:eventId"
              element={
                <RequireAuth>
                  <EventDetail />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ArtistMembershipProvider>
  </QueryClientProvider>
);

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && i18n.language !== storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default App;
