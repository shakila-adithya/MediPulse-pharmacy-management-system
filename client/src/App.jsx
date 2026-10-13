import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import MedicineSearchPage from "./pages/public/MedicineSearchPage";
import MedicineDetailsPage from "./pages/public/MedicineDetailsPage";
import PharmacyListingPage from "./pages/public/PharmacyListingPage";
import PharmacyDetailsPage from "./pages/public/PharmacyDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/medicines" element={<ProtectedRoute><MedicineSearchPage /></ProtectedRoute>} />
              <Route path="/medicines/:id" element={<ProtectedRoute><MedicineDetailsPage /></ProtectedRoute>} />
              <Route path="/pharmacies" element={<ProtectedRoute><PharmacyListingPage /></ProtectedRoute>} />
              <Route path="/pharmacies/:id" element={<ProtectedRoute><PharmacyDetailsPage /></ProtectedRoute>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
