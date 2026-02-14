
import React, { useState } from 'react';

interface LoginProps {
  onNavigate: (tab: string) => void;
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [loginType, setLoginType] = useState<'password' | 'otp'>('password');
  
  // Password Login State
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  // OTP Login State
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'password') {
      if (!account || !password) {
        alert('请输入账号和密码');
        return;
      }
      alert('登录成功！');
    } else {
      if (!contact || !code) {
        alert('请输入手机号/邮箱和验证码');
        return;
      }
      alert('登录成功！');
    }
    onLogin();
  };

  const handleSendCode = () => {
      if (!contact) {
          alert('请输入手机号或邮箱');
          return;
      }
      alert(`验证码已发送至: ${contact}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F2] py-20 px-6 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#764F35]/10 overflow-hidden">
        <div className="bg-[#764F35] p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-[#E9D6BE] tracking-widest mb-2">欢迎回来</h2>
          <p className="text-[#E9D6BE]/60 text-xs uppercase tracking-widest">Welcome Back to Chengxiang</p>
        </div>
        
        <div className="p-8 md:p-10">
          {/* Login Type Tabs */}
          <div className="flex border-b border-[#764F35]/10 mb-8">
             <button 
                type="button"
                onClick={() => setLoginType('password')}
                className={`flex-1 pb-3 text-sm font-bold transition-all relative ${loginType === 'password' ? 'text-[#764F35]' : 'text-stone-400 hover:text-[#764F35]'}`}
             >
                密码登录
                {loginType === 'password' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#764F35]"></div>}
             </button>
             <button 
                type="button"
                onClick={() => setLoginType('otp')}
                className={`flex-1 pb-3 text-sm font-bold transition-all relative ${loginType === 'otp' ? 'text-[#764F35]' : 'text-stone-400 hover:text-[#764F35]'}`}
             >
                验证码登录
                {loginType === 'otp' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#764F35]"></div>}
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginType === 'password' ? (
                <>
                    <div className="animate-fade-in">
                        <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">账号 / 手机号 / 邮箱</label>
                        <input 
                            type="text" 
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                            placeholder="请输入您的账号"
                        />
                    </div>
                    
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest">密码</label>
                            <button 
                            type="button"
                            onClick={() => onNavigate('forgot-password')}
                            className="text-xs text-[#764F35] hover:underline"
                            >
                            忘记密码?
                            </button>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                            placeholder="请输入您的密码"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="animate-fade-in">
                        <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">手机号 / 电子邮箱</label>
                        <input 
                            type="text" 
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                            placeholder="请输入手机号或邮箱地址"
                        />
                    </div>
                    
                    <div className="animate-fade-in">
                        <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">验证码</label>
                        <div className="flex gap-3">
                            <input 
                            type="text" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                            placeholder="6位验证码"
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
                </>
            )}

            <button 
              type="submit"
              className="w-full bg-[#764F35] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-md mt-4"
            >
              {loginType === 'password' ? '立即登录' : '验证登录'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#764F35]/10 text-center">
            <p className="text-xs text-stone-500 mb-4">还没有账号?</p>
            <button 
              onClick={() => onNavigate('register')}
              className="text-sm font-bold text-[#764F35] border-b border-[#764F35] pb-0.5 hover:opacity-80 transition-opacity"
            >
              注册新账号
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
