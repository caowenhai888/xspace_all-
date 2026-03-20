'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError('邮箱或密码错误，请重试');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('登录过程中发生错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#3871FF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg shadow-[#3871FF]/20">
              X
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Xspark 管理后台</h1>
            <p className="text-gray-500 mt-2">请输入您的凭据以继续</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm font-medium border border-red-100"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">邮箱地址</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#3871FF] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#3871FF] focus:ring-4 focus:ring-[#3871FF]/5 transition-all"
                  placeholder="admin@xspark.ai"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">登录密码</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#3871FF] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#3871FF] focus:ring-4 focus:ring-[#3871FF]/5 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#3871FF] text-white rounded-xl font-bold hover:bg-[#2a5bd7] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#3871FF]/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  正在登录...
                </>
              ) : (
                '立即登录'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              &copy; 2026 Xspark AI. 版权所有.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
