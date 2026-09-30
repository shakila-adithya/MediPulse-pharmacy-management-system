import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";
import AuthShell from "../../components/layout/AuthShell";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

const ROLE_OPTIONS = [
  { value: "customer", label: "Customer" },
  { value: "pharmacy", label: "Pharmacy Staff" },
  { value: "admin", label: "Administrator" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({});

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Full name is required.";

    if (!form.email) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";

    if (!form.phone.trim()) next.phone = "Phone number is required.";

    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters.";

    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";

    if (!form.role) next.role = "Please select a role.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
  };

  return (
    <AuthShell>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-500 mt-1.5 mb-7">Join MediPulse to find medicines near you</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="Full Name"
            icon={User}
            placeholder="shakila Adithya"
            value={form.name}
            onChange={update("name")}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            icon={Phone}
            placeholder="+94 77 123 4567"
            value={form.phone}
            onChange={update("phone")}
            error={errors.phone}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              icon={Lock}
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              error={errors.confirmPassword}
              required
            />
          </div>

          <Select
            label="Register as"
            value={form.role}
            onChange={update("role")}
            options={ROLE_OPTIONS}
            required
          />

          <Button type="submit" fullWidth size="lg" icon={UserPlus}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
            Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
