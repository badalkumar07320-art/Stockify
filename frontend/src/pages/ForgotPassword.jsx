import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance.js";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isTokenReset = Boolean(token);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPasswords, setShowPasswords] = useState({ new: false, confirm: false });
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
          autoComplete="new-password"
        />
        <button
          type="button"
          aria-label={`Toggle ${label.toLowerCase()}`}
          onClick={() => togglePassword(field)}
        >
          {showPasswords[field] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (isTokenReset && form.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (isTokenReset && form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setSubmitting(true);
    try {
      if (isTokenReset) {
        const response = await api.post("/auth/reset-password/confirm", {
          token,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword
        });
        setSuccess(response.data?.message || "Password reset successfully. You can now log in.");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        const response = await api.post("/auth/reset-password/request", { email });
        setSuccess(response.data?.message || "If an account exists for that email, a reset link will be sent.");
      }
    } catch (apiError) {
      setError(apiError.response?.data?.message || (isTokenReset
        ? "This reset link may be invalid or expired. Please request a new one."
        : "Could not request a reset link. Please try again later."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page compact-auth">
      <section className="auth-card">
        <div className="auth-icon mx-auto"><KeyRound size={28} /></div>
        <p className="eyebrow mb-2 mt-3 text-center">Password Recovery</p>
        <h1 className="text-center">{isTokenReset ? "Choose a new password" : "Reset your password"}</h1>
        <p className="text-secondary text-center">
          {isTokenReset
            ? "Create a new password for your Stockify account."
            : "Enter your registered email and we’ll send you a secure password reset link."}
        </p>

        {error ? <div className="alert alert-danger py-2" role="alert">{error}</div> : null}
        {success ? <div className="alert alert-success py-2" role="status">{success}</div> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isTokenReset ? (
            <>
              {passwordInput("newPassword", "New password", "new", "Enter new password")}
              {passwordInput("confirmPassword", "Confirm new password", "confirm", "Re-enter new password")}
            </>
          ) : (
            <label>
              Email
              <div className="input-shell">
                <Mail size={18} />
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setError(""); setSuccess(""); }}
                  placeholder="Enter your registered email"
                  required
                  autoComplete="email"
                />
              </div>
            </label>
          )}

          <button className="btn btn-dark w-100" type="submit" disabled={submitting}>
            {submitting
              ? (isTokenReset ? "Resetting password..." : "Sending reset link...")
              : (isTokenReset ? "Set new password" : "Send reset link")}
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
