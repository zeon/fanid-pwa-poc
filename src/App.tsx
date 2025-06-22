
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import SitePasswordGuard from "@/components/auth/SitePasswordGuard";
import "@/i18n/config";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OTP from "./pages/OTP";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SitePasswordGuard>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/face-scanning" element={<FaceScanning />} />
              <Route path="/face-scan-complete" element={<FaceScanComplete />} />
              <Route path="/face-duplicate-detected" element={<FaceDuplicateDetected />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/active-tickets" element={<ActiveTickets />} />
              <Route path="/entry-verification-complete" element={<EntryVerificationComplete />} />
              <Route path="/entry-staff" element={<EntryStaff />} />
              <Route path="/tixcraft/:eventid" element={<TixcraftEventDetail />} />
              <Route path="/tixcraft/:eventid/payment" element={<TixcraftPayment />} />
              <Route path="/tixcraft/payment-confirmed" element={<TixcraftPaymentConfirmed />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SitePasswordGuard>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
