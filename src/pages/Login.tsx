import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { USERS } from '@/data/constants';

const Login = () => {
  const [email, setEmail] = useState(USERS[0].email);
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState(USERS[0].role);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password, role)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card rounded-lg shadow-card p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <img src="/J2W_Logo 1.png" alt="JoulestoWatts Logo" className="h-14 w-auto object-contain mx-auto mb-4 p-1 bg-white rounded-lg" />
          <h1 className="text-2xl font-bold text-foreground">JoulestoWatts</h1>
          <p className="text-sm text-muted-foreground mt-1">Demand Intelligence & Inventory Optimization</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Role</label>
            <select
              value={role}
              onChange={e => {
                setRole(e.target.value);
                const u = USERS.find(u => u.role === e.target.value);
                if (u) setEmail(u.email);
              }}
              className="w-full mt-1 px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {USERS.map(u => <option key={u.role} value={u.role}>{u.role}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Demo: Use any email above with password <span className="font-mono">demo123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
