import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const { login, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) setIsLoggedIn(true);
    else setError('የተሳሳተ ኢሜይል ወይም ሚስትሌንት');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-white text-xl font-bold">ግባ</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded" placeholder="email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded" placeholder="password" />
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button className="w-full bg-emerald-600 text-white py-3 rounded">ግባእ</button>
      </form>
    </div>
  );
};

export default LoginPage;
