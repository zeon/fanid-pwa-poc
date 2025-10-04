import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import "@/i18n/config";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FaceScanning from "./pages/FaceScanning";
import FaceScanComplete from "./pages/FaceScanComplete";
import FaceDuplicateDetected from "./pages/FaceDuplicateDetected";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import EventDetail from "./pages/EventDetail";
import ActiveTickets from "./pages/ActiveTickets";
import EntryVerificationComplete from "./pages/EntryVerificationComplete";
import NotFound from "./pages/NotFound";
import TixcraftEventDetail from "./pages/TixcraftEventDetail";
import TixcraftPayment from "./pages/TixcraftPayment";
import TixcraftPaymentConfirmed from "./pages/TixcraftPaymentConfirmed";
import EntryStaff from "./pages/EntryStaff";
import ArtistMembership from "./pages/ArtistMembership";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route path="/face-scanning" element={<ProtectedRoute><FaceScanning /></ProtectedRoute>} />
              <Route path="/face-scan-complete" element={<ProtectedRoute><FaceScanComplete /></ProtectedRoute>} />
              <Route path="/face-duplicate-detected" element={<ProtectedRoute><FaceDuplicateDetected /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/event/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
              <Route path="/active-tickets" element={<ProtectedRoute><ActiveTickets /></ProtectedRoute>} />
              <Route path="/entry-verification-complete" element={<ProtectedRoute><EntryVerificationComplete /></ProtectedRoute>} />
              <Route path="/entry-staff" element={<ProtectedRoute><EntryStaff /></ProtectedRoute>} />
              <Route path="/artist-membership/:artistId" element={<ProtectedRoute><ArtistMembership /></ProtectedRoute>} />
              <Route path="/tixcraft/:eventid" element={<ProtectedRoute><TixcraftEventDetail /></ProtectedRoute>} />
              <Route path="/tixcraft/:eventid/payment" element={<ProtectedRoute><TixcraftPayment /></ProtectedRoute>} />
              <Route path="/tixcraft/payment-confirmed" element={<ProtectedRoute><TixcraftPaymentConfirmed /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
