
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
