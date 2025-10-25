import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CompassIcon, MailIcon, LockIcon } from 'lucide-react';

interface LoginScreenProps {
  onLogin?: () => void; // optional callback after login
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://culturelens-api.onrender.com/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (result.success && result.token && result.user) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        if (onLogin) onLogin();
        navigate('/dashboard');
      } else {
        alert(result.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fef7e0] px-6 py-10">
      <div className="w-full max-w-md bg-[#fefcf0] rounded-2xl p-8 shadow-lg border border-[#e8dcc6]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#fcf8dd] rounded-full flex items-center justify-center shadow-sm border border-[#d4c4a8]">
            <CompassIcon size={30} className="text-[#754b34]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#754b34] mb-2 font-serif">
          Welcome Back
        </h1>
        <p className="text-center text-[#6d5a42] mb-8 font-serif text-sm">
          Continue your vintage travel adventure
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">
              Email Address
            </label>
            <div className="relative">
              <MailIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">
              Password
            </label>
            <div className="relative">
              <LockIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#754b34] text-[#fefcf0] py-3 rounded-lg font-serif font-semibold shadow-md hover:bg-[#5d3a28] transition-all duration-300"
          >
            {loading ? 'Signing in...' : 'Continue Journey'}
          </button>

          {/* Register Link */}
          <Link
            to="/register"
            className="block text-center text-[#754b34] border border-[#d4c4a8] py-3 rounded-lg font-serif text-sm hover:bg-[#fcf8dd] transition-all duration-300"
          >
            New traveler? Begin your adventure
          </Link>
        </form>
      </div>
    </div>
  );
};
