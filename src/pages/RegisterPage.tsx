import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Lock, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { registerUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please check and try again.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await registerUser(fullName, email, phone, password);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      // Clean up common Firebase Auth error messages
      let message = err.message || 'Failed to create account. Please try again.';
      if (message.includes('auth/email-already-in-use')) {
        message = 'This email address is already registered. Please sign in instead.';
      } else if (message.includes('auth/weak-password')) {
        message = 'Password should be at least 6 characters long.';
      } else if (message.includes('auth/invalid-email')) {
        message = 'Please enter a valid email address.';
      }
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-[80vh] py-12 px-4 sm:px-6 flex items-center justify-center">
      <SEO 
        title="Create Account - DJ Style Hub"
        description="Create your DJ Style Hub account to get personalized recommendations, easy checkout, and track your orders."
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-8 sm:p-10 transition-all">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#580c22]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#580c22]">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Join DJ Style Hub for exclusive collections, fast ordering, &amp; order tracking.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-semibold text-base">Account Created Successfully!</h3>
            <p className="text-xs text-emerald-700">
              Welcome <strong>{fullName}</strong>! Your account has been created. Please sign in with your email &amp; password to continue.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={async () => {
                  await logoutUser();
                  navigate('/login');
                }}
                className="bg-[#580c22] text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-[#450719] transition flex items-center gap-2"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 text-center">
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                />
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                />
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">
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

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#580c22] focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-neutral-600">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-300 text-[#580c22] focus:ring-[#580c22]"
                />
                <span>I agree to DJ Style Hub Terms &amp; Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#580c22] hover:bg-[#450719] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm mt-2 disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#580c22] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
