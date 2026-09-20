import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, LogOut, Phone, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { loginUser, logoutUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ role: string; name: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const profile = await loginUser(email, password);
      setSuccessInfo({ role: profile.role, name: profile.name });

      // Role-based navigation: Admin -> /admin, User -> /
      setTimeout(() => {
        if (profile.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      let msg = err.message || 'Invalid email or password.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password')) {
        msg = 'Invalid email address or password.';
      }
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-[80vh] py-12 px-4 sm:px-6 flex items-center justify-center">
      <SEO 
        title={userProfile ? "My Account - DJ Style Hub" : "Sign In - DJ Style Hub"}
        description="Sign in to your DJ Style Hub account to track orders, manage wishlist, or access account details."
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-8 sm:p-10 transition-all">
        
        {/* If ALREADY LOGGED IN: Show My Account Credentials */}
        {userProfile && !successInfo ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#580c22] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-xl font-bold font-serif">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h1 className="font-serif text-2xl font-bold text-neutral-900">
                {userProfile.name}
              </h1>
            </div>

            {/* Account Credentials Card */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 space-y-3 text-xs">
              <h3 className="font-semibold text-neutral-800 border-b border-neutral-200/80 pb-2 uppercase tracking-wider text-[11px]">
                Account Details
              </h3>
              <div className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  Email:
                </span>
                <span className="font-medium text-neutral-900">{userProfile.email}</span>
              </div>
              {userProfile.phone && (
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    Mobile:
                  </span>
                  <span className="font-medium text-neutral-900">{userProfile.phone}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {userProfile.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full bg-[#580c22] hover:bg-[#450719] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Open Admin Control Panel</span>
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="w-full bg-neutral-900 hover:bg-black text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
              <button
                onClick={async () => {
                  await logoutUser();
                }}
                className="w-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Account</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#580c22]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#580c22]">
                <User className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                Sign in to access your account &amp; orders.
              </p>
            </div>

            {successInfo ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-semibold text-base">Sign In Successful!</h3>
                <p className="text-xs text-emerald-700">
                  Welcome back, <strong>{successInfo.name}</strong>!
                </p>
                {successInfo.role === 'admin' ? (
                  <div className="inline-flex items-center gap-1.5 bg-[#580c22] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Role Detected — Redirecting to Dashboard...</span>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">Redirecting to home page...</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                    />
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#580c22] hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                    />
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-300 text-[#580c22] focus:ring-[#580c22]"
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#580c22] hover:bg-[#450719] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Footer info */}
            <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
              <p className="text-xs text-neutral-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#580c22] font-semibold hover:underline">
                  Create New Account
                </Link>
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                <span>Need Help?</span>
                <span>•</span>
                <Link to="/contact" className="hover:text-neutral-700 underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
