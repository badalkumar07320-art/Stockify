import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setSuccess("");
  };

  const togglePassword = (field) => {
    setShowPasswords((current) => ({ ...current, [field]: !current[field] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post("/auth/reset-password", form);
      setSuccess(response.data?.message || "Password reset successfully.");
      setForm({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to reset password. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  const passwordInput = (name, label, field, placeholder) => (
    <label>
      {label}
      <div className="input-shell">
        <KeyRound size={18} />
        <input
          className="form-control"
          type={showPasswords[field] ? "text" : "password"}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          minLength={6}
          required
        />
        <button type="button" aria-label={"Toggle " + label.toLowerCase()} onClick={() => togglePassword(field)}>
          {showPasswords[field] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );

  return (
    <main className="auth-page compact-auth">
      <section className="auth-card">
        <div className="auth-icon mx-auto"><KeyRound size={28} /></div>
        <p className="eyebrow mb-2 mt-3 text-center">Password Recovery</p>
        <h1 className="text-center">Reset your password</h1>
        <p className="text-secondary text-center">
          No email OTP is required. Enter your registered email and current password to create a new password.
        </p>

        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        {success ? <div className="alert alert-success py-2">{success}</div> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <div className="input-shell">
              <Mail size={18} />
              <input className="form-control" type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="admin@stockify.com" required />
            </div>
          </label>

          {passwordInput("currentPassword", "Current password", "current", "Enter current password")}
          {passwordInput("newPassword", "New password", "new", "Enter new password")}
          {passwordInput("confirmPassword", "Confirm new password", "confirm", "Re-enter new password")}

          <button className="btn btn-dark w-100" type="submit" disabled={submitting}>
            {submitting ? "Resetting password..." : "Reset password"}
          </button>
        </form>

        <p className="auth-switch text-center">
          Remembered your password? <Link to="/login">Back to login</Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
