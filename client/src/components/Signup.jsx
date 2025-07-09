import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios.post('/auth/signup', form);        //Backend pe /auth/signup endpoint pe data bhej raha hai (axios se).
    navigate('/');         //Sign up hone ke baad Login page pe (/) le ja raha hai.
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('signup.jpg')" }} // Put your image in /public folder
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl border shadow-lg w-full max-w-sm ml-165">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

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
          onClick={handleSignup}
          className="btn w-full mt-4"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
