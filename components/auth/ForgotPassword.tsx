
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onNavigate: (tab: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact || !code || !newPassword) {
      alert('请填写完整信息');
      return;
    }
    // Mock reset logic
    alert('密码重置成功，请重新登录');
    onNavigate('login');
  };

  const handleSendCode = () => {
      if (!contact) {
          alert(`请输入${method === 'phone' ? '手机号' : '电子邮箱'}`);
          return;
      }
      alert(`验证码已发送至: ${contact}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F2] py-20 px-6 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#764F35]/10 overflow-hidden">
        <div className="bg-[#2D241E] p-8 text-center relative">
          <button 
            onClick={() => onNavigate('login')}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E9D6BE]/60 hover:text-[#E9D6BE]"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-2xl font-serif font-bold text-[#E9D6BE] tracking-widest mb-2">找回密码</h2>
          <p className="text-[#E9D6BE]/60 text-xs uppercase tracking-widest">Reset Password</p>
        </div>
        
        <div className="p-8 md:p-10">
          
          {/* Method Switcher */}
          <div className="flex bg-[#F9F6F2] p-1 rounded-md mb-8">
            <button 
                type="button"
                onClick={() => { setMethod('phone'); setContact(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-sm transition-all ${method === 'phone' ? 'bg-white text-[#764F35] shadow-sm' : 'text-stone-400 hover:text-[#764F35]'}`}
            >
                通过手机找回
            </button>
            <button 
                type="button"
                onClick={() => { setMethod('email'); setContact(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-sm transition-all ${method === 'email' ? 'bg-white text-[#764F35] shadow-sm' : 'text-stone-400 hover:text-[#764F35]'}`}
            >
                通过邮箱找回
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in">
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">
                  {method === 'phone' ? '手机号码' : '电子邮箱'}
              </label>
              <input 
                type={method === 'phone' ? 'tel' : 'email'} 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder={method === 'phone' ? '请输入注册手机号' : '请输入注册邮箱'}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">验证码</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                  placeholder="验证码"
                />
                <button 
                    type="button"
                    onClick={handleSendCode}
                    className="px-4 text-xs font-bold text-[#764F35] border border-[#764F35]/20 bg-white hover:bg-[#F9F6F2] rounded-sm transition-colors whitespace-nowrap"
                >
                  获取验证码
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">新密码</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder="设置新密码"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#764F35] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-md mt-6"
            >
              重置密码
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
