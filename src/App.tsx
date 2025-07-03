
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ArtistMembershipProvider } from "@/contexts/ArtistMembershipContext";
import SitePasswordGuard from "@/components/auth/SitePasswordGuard";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OTP from "./pages/OTP";
import FaceScanning from "./pages/FaceScanning";
import FaceScanComplete from "./pages/FaceScanComplete";
import FaceDuplicateDetected from "./pages/FaceDuplicateDetected";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import EventDetail from "./pages/EventDetail";
import TixcraftEventDetail from "./pages/TixcraftEventDetail";
import TixcraftPayment from "./pages/TixcraftPayment";
import TixcraftPaymentConfirmed from "./pages/TixcraftPaymentConfirmed";
import ActiveTickets from "./pages/ActiveTickets";
import EntryStaff from "./pages/EntryStaff";
import EntryVerificationComplete from "./pages/EntryVerificationComplete";
import ArtistMembership from "./pages/ArtistMembership";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ArtistMembershipProvider>
          <TooltipProvider>
            <SitePasswordGuard>
              <Toaster />
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/otp" element={<OTP />} />
                    <Route path="/face-scanning" element={<FaceScanning />} />
                    <Route path="/face-scan-complete" element={<FaceScanComplete />} />
                    <Route path="/face-duplicate-detected" element={<FaceDuplicateDetected />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/tixcraft/event/:id" element={<TixcraftEventDetail />} />
                    <Route path="/tixcraft/payment" element={<TixcraftPayment />} />
                    <Route path="/tixcraft/payment-confirmed" element={<TixcraftPaymentConfirmed />} />
                    <Route path="/tickets" element={<ActiveTickets />} />
                    <Route path="/entry-staff" element={<EntryStaff />} />
                    <Route path="/entry-verification-complete" element={<EntryVerificationComplete />} />
                    <Route path="/artist-membership/:artistId" element={<ArtistMembership />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </SitePasswordGuard>
          </TooltipProvider>
        </ArtistMembershipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
