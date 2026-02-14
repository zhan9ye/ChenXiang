
import React, { useState, useEffect } from 'react';

interface RegisterProps {
  onNavigate: (tab: string) => void;
  onRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister }) => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    account: '',
    phone: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });

  // Auto-fill referral code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, referralCode: ref }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.account || !formData.password || !formData.code) {
      alert('请填写完整信息');
      return;
    }
    
    if (method === 'phone' && !formData.phone) {
       alert('请输入手机号');
       return;
    }
    
    if (method === 'email' && !formData.email) {
       alert('请输入电子邮箱');
       return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    
    // Mock register logic
    const contactInfo = method === 'phone' ? formData.phone : formData.email;
    const referralMsg = formData.referralCode ? `\n绑定推荐人: ${formData.referralCode}` : '';
    
    alert(`注册成功！\n账号: ${formData.account}\n绑定${method === 'phone' ? '手机' : '邮箱'}: ${contactInfo}${referralMsg}\n请使用账号、手机号或邮箱登录。`);
    onNavigate('login');
  };

  const handleSendCode = () => {
      const contact = method === 'phone' ? formData.phone : formData.email;
      if (!contact) {
          alert(`请输入${method === 'phone' ? '手机号' : '电子邮箱'}`);
          return;
      }
      alert(`验证码已发送至: ${contact}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F6F2] py-20 px-6 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#764F35]/10 overflow-hidden">
        <div className="bg-[#2D241E] p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-[#E9D6BE] tracking-widest mb-2">创建账号</h2>
          <p className="text-[#E9D6BE]/60 text-xs uppercase tracking-widest">Join Chengxiang</p>
        </div>
        
        <div className="p-8 md:p-10">
          
          {/* Method Switcher */}
          <div className="flex bg-[#F9F6F2] p-1 rounded-md mb-8">
            <button 
                type="button"
                onClick={() => setMethod('phone')}
                className={`flex-1 py-2 text-xs font-bold rounded-sm transition-all ${method === 'phone' ? 'bg-white text-[#764F35] shadow-sm' : 'text-stone-400 hover:text-[#764F35]'}`}
            >
                手机号注册
            </button>
            <button 
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 text-xs font-bold rounded-sm transition-all ${method === 'email' ? 'bg-white text-[#764F35] shadow-sm' : 'text-stone-400 hover:text-[#764F35]'}`}
            >
                邮箱注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">设置账号 <span className="text-stone-400 font-normal normal-case">(用于登录)</span></label>
              <input 
                type="text" 
                value={formData.account}
                onChange={(e) => setFormData({...formData, account: e.target.value})}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder="设置您的专属账号"
              />
            </div>

            {method === 'phone' ? (
                <div className="animate-fade-in">
                    <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">手机号码</label>
                    <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                        placeholder="请输入手机号"
                    />
                </div>
            ) : (
                <div className="animate-fade-in">
                    <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">电子邮箱</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                        placeholder="请输入电子邮箱"
                    />
                </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">验证码</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="flex-1 bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                  placeholder={method === 'phone' ? "短信验证码" : "邮箱验证码"}
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
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">设置密码</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder="6-20位字符"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">确认密码</label>
              <input 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder="请再次输入密码"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D241E] uppercase tracking-widest mb-2">推荐码 <span className="text-stone-400 font-normal normal-case">(选填)</span></label>
              <input 
                type="text" 
                value={formData.referralCode}
                onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#764F35] transition-colors"
                placeholder="如有推荐码，请填写"
              />
            </div>

            <div className="flex items-start mt-2">
                <input type="checkbox" id="agree" className="mt-1 mr-2 accent-[#764F35]" />
                <label htmlFor="agree" className="text-xs text-stone-500 leading-tight">
                    我已阅读并同意 <a href="#" className="text-[#764F35] hover:underline">《用户服务协议》</a> 和 <a href="#" className="text-[#764F35] hover:underline">《隐私政策》</a>
                </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#764F35] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-md mt-6"
            >
              立即注册
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => onNavigate('login')}
              className="text-xs text-stone-400 hover:text-[#764F35] transition-colors"
            >
              已有账号？直接登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
