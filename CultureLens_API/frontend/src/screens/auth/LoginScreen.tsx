import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CompassIcon, UserIcon, MailIcon, PhoneIcon, LockIcon, UsersIcon } from 'lucide-react';

interface RegisterScreenProps {
  onRegister?: () => void; // optional callback
}

export const RegisterScreen = ({ onRegister }: RegisterScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [language, setLanguage] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const data = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        contact_number: contactNumber,
        preferred_language: language,
        user_type: userType || 'Traveler',
      };

      const res = await fetch('https://culturelens-api.onrender.com/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert(result.message);

        // Automatically log in after registration
        const loginRes = await fetch('https://culturelens-api.onrender.com/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const loginResult = await loginRes.json();

        if (loginResult.success) {
          localStorage.setItem('token', loginResult.token);
          localStorage.setItem('user', JSON.stringify(loginResult.user));
          if (onRegister) onRegister();
          navigate('/dashboard'); // redirect after login
        } else {
          alert('Registered but failed to log in: ' + loginResult.message);
        }
      } else {
        alert(result.message);
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
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#fcf8dd] rounded-full flex items-center justify-center shadow-sm border border-[#d4c4a8]">
            <CompassIcon size={30} className="text-[#754b34]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#754b34] mb-2 font-serif">
          Join CultureLens
        </h1>
        <p className="text-center text-[#6d5a42] mb-8 font-serif text-sm">
          Begin your vintage travel adventure
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-4">
            {[{ label: 'First Name', value: firstName, setValue: setFirstName, placeholder: 'First name' },
              { label: 'Last Name', value: lastName, setValue: setLastName, placeholder: 'Last name' }]
              .map((field, idx) => (
              <div className="flex-1" key={idx}>
                <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">{field.label}</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                    value={field.value}
                    onChange={e => field.setValue(e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Email Address</label>
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

          <div>
            <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">Contact Number</label>
            <div className="relative">
              <PhoneIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">User Type</label>
              <div className="relative">
                <UsersIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                <select
                  className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="Traveler">Traveler</option>
                </select>
              </div>
            </div>
          </div>

          {[{ label: 'Password', placeholder: 'Create a password', value: password, setValue: setPassword },
            { label: 'Confirm Password', placeholder: 'Confirm your password', value: confirmPassword, setValue: setConfirmPassword }]
            .map((field, idx) => (
            <div key={idx}>
              <label className="block text-[#6d5a42] mb-1 font-semibold font-serif text-sm">{field.label}</label>
              <div className="relative">
                <LockIcon size={16} className="absolute left-3 top-3 text-[#8b7355]" />
                <input
                  type="password"
                  placeholder={field.placeholder}
                  className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg py-2 pl-9 text-[#6d5a42] font-serif text-sm focus:ring-2 focus:ring-[#d4c4a8] outline-none"
                  value={field.value}
                  onChange={e => field.setValue(e.target.value)}
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#754b34] text-[#fefcf0] py-3 rounded-lg font-serif font-semibold shadow-md hover:bg-[#5d3a28] transition-all duration-300"
          >
            {loading ? 'Registering...' : 'Begin Your Journey'}
          </button>

          <Link
            to="/login"
            className="block text-center text-[#754b34] border border-[#d4c4a8] py-3 rounded-lg font-serif text-sm hover:bg-[#fcf8dd] transition-all duration-300"
          >
            Already have an account? Return
          </Link>
        </form>
      </div>
    </div>
  );
};
