import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[\w\s@][\w.]+@[\w\s@]+\.[\w\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    const validationErrors = {};
    if (!email.trim()) validationErrors.email = 'Email is required.';
    else if (!emailPattern.test(email)) validationErrors.email = 'Enter a valid email address.';
    if (!password) validationErrors.password = 'Password is required.';
    else if (password.length < 8) validationErrors.password = 'Password must be at least 8 characters.';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      // Demo login — accepts any valid email/password
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');
      const userData = { name: 'Eden Mulugeta', email, role: 'admin' };
      login(userData, 'demo-token-123');
      navigate('/');
    } catch (err) {
      setServerMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm bg-white/10 backdrop-blur text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition ${
      errors[field] ? 'border-red-400' : 'border-white/20'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
            <span className="text-3xl">💼</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Payroll MS</h1>
          <p className="text-blue-200 mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8">
          {serverMessage && (
            <div className="mb-4 rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-200">
              {serverMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Email Address</label><input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 bg-white/10"
                />
                <span className="text-sm text-white/70">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-200 hover:text-white transition">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3 text-sm font-bold text-blue-700 hover:bg-blue-50 transition shadow-lg disabled:opacity-60"
            >
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
            <p className="text-xs text-white/60">Demo: use any email & password (8+ chars)</p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">© 2026 Payroll MS. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;