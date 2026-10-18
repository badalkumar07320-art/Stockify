import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance.js";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [mode, setMode] = useState("current");
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

  const validateNewPassword = () => {
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return false;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return false;
    }
    return true;
  };

  const handleCurrentPasswordReset = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!validateNewPassword()) return;
    setSubmitting(true);
    try {
      const response = await api.post("/auth/reset-password", form);
      setSuccess(response.data?.message || "Password reset successfully.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to reset password. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailRequest = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const response = await api.post("/auth/reset-password/request", { email: form.email });
      setSuccess(response.data?.message || "If an account exists for that email, a reset link will be sent.");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to send the reset email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTokenReset = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!validateNewPassword()) return;
    setSubmitting(true);
    try {
      const response = await api.post("/auth/reset-password/confirm", {
        token,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      });
      setSuccess(response.data?.message || "Password reset successfully.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "This reset link is invalid or has expired.");
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
          autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
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
        <h1 className="text-center">{token ? "Choose a new password" : "Reset your password"}</h1>
        <p className="text-secondary text-center">
          {token
            ? "Create a new password using the secure link sent to your email."
            : "Choose either your current password or an email reset link."}
        </p>

        {!token && (
          <div className="d-flex gap-2 mb-3" role="tablist" aria-label="Password recovery method">
            <button type="button" className={`btn w-50 ${mode === "current" ? "btn-dark" : "btn-outline-secondary"}`}
              onClick={() => { setMode("current"); setError(""); setSuccess(""); }}>
              Current password
            </button>
            <button type="button" className={`btn w-50 ${mode === "email" ? "btn-dark" : "btn-outline-secondary"}`}
              onClick={() => { setMode("email"); setError(""); setSuccess(""); }}>
              Email link
            </button>
          </div>
        )}

        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        {success ? <div className="alert alert-success py-2">{success}</div> : null}

        {token ? (
          <form className="auth-form" onSubmit={handleTokenReset}>
            {passwordInput("newPassword", "New password", "new", "Enter new password")}
            {passwordInput("confirmPassword", "Confirm new password", "confirm", "Re-enter new password")}
            <button className="btn btn-dark w-100" type="submit" disabled={submitting}>
              {submitting ? "Resetting password..." : "Set new password"}
            </button>
          </form>
        ) : mode === "email" ? (
          <form className="auth-form" onSubmit={handleEmailRequest}>
            <label>
              Email
              <div className="input-shell">
                <Mail size={18} />
                <input className="form-control" type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="Enter your registered email" required autoComplete="email" />
              </div>
            </label>
            <button className="btn btn-dark w-100" type="submit" disabled={submitting}>
              {submitting ? "Sending link..." : "Send reset link"}
            </button>
            <p className="small text-secondary mb-0">The link expires after 15 minutes. Check your inbox and spam folder.</p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleCurrentPasswordReset}>
            <label>
              Email
              <div className="input-shell">
                <Mail size={18} />
                <input className="form-control" type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="Enter your registered email" required autoComplete="email" />
              </div>
            </label>
            {passwordInput("currentPassword", "Current password", "current", "Enter current password")}
            {passwordInput("newPassword", "New password", "new", "Enter new password")}
            {passwordInput("confirmPassword", "Confirm new password", "confirm", "Re-enter new password")}
            <button className="btn btn-dark w-100" type="submit" disabled={submitting}>
              {submitting ? "Resetting password..." : "Reset password"}
            </button>
          </form>
        )}

        <p className="auth-switch text-center">
          Remembered your password? <Link to="/login">Back to login</Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
