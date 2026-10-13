import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/common/Button";
import Logo from "../components/layout/Logo";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-5">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="font-display text-7xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">404</h1>
        <p className="text-slate-500 mt-2 mb-6">The page you're looking for doesn't exist or may have been moved.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
