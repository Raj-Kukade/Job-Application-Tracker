import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://job-application-tracker-pi5c.onrender.com'; 
axios.defaults.withCredentials = true;

function Login({ setLoggedIn }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('/auth/login', form);
      setLoggedIn(true);
      toast.success('Login successful! 🎉');
    } catch (err) {
      toast.error('Invalid username or password ❌');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="input"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="btn w-full mt-4"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
