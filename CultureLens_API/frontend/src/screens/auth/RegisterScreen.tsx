import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon, UserIcon, MailIcon, PhoneIcon, UsersIcon, LockIcon } from 'lucide-react';
import { registerUser } from "../../api/api"; // <- make sure this points to your api.ts file

interface RegisterScreenProps {
  onRegister: () => void;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      preferred_language: language,
      user_type: userType || 'Traveler',
    };

    try {
      const result = await registerUser(data); // <- Use the API helper
      if (result.success) {
        alert(result.message);
        onRegister(); // optional redirect
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
