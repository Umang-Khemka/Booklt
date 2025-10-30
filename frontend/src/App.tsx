import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/AuthPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import ViewExperience from "./pages/ViewExperience.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import ConfirmPage from "./pages/ConfirmPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/experience/:id" element={<ViewExperience/>}/>
        <Route path="/checkout/:id" element={<CheckoutPage/>}/>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/booking-confirmed" element={<ConfirmPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
