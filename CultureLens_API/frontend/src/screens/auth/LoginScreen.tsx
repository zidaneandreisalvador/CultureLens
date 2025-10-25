import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon, MailIcon, LockIcon } from 'lucide-react';
import { loginUser } from "../../api/api"; // <- points to api.ts

interface LoginScreenProps {
  onLoginSuccess: (token: string) => void; // optional callback to store token
}

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const result = await loginUser(data); // <- Use API helper

      if (result.success) {
        alert(result.message);
        if (onLoginSuccess) onLoginSuccess(result.token); // save token for auth
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* your existing form inputs */}
    </form>
  );
};
