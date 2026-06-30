'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Eye, EyeOff, Zap, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@acos.vn');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('acos_token', res.data.token);
      localStorage.setItem('acos_user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    } catch {
      setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 pulse-glow" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-1">ACOS</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Auto Commerce OS</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold text-white mb-1">Đăng nhập</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>Nhập thông tin tài khoản để tiếp tục</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.25rem' }}
                  placeholder="admin@acos.vn"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Đang đăng nhập...</>
              ) : (
                <>Đăng nhập <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Demo: admin@acos.vn / password
          </p>
        </div>
      </div>
    </div>
  );
}
