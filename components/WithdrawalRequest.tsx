import React, { useState } from 'react';

interface WithdrawalRequestProps {
  onBack: () => void;
  balance: number;
  points: number;
  onNavigateToSettings: (type: 'verification' | 'account') => void;
}

export const WithdrawalRequest: React.FC<WithdrawalRequestProps> = ({ onBack, balance, points, onNavigateToSettings }) => {
  const [amount, setAmount] = useState('');
  
  // Mock Status (In real app, fetch from user profile)
  // Mocked to false to demonstrate the action buttons as requested
  const isIdentityVerified = false; 
  const hasAccount = false; 

  // Mock History
  const history = [
    { id: '1', date: '2024-03-10 14:30', amount: 5000, status: 'processing', method: 'AliPay' },
    { id: '2', date: '2024-02-15 09:20', amount: 2800, status: 'completed', method: 'Bank Card' },
  ];

  // Mock Account Info
  const accountInfo = {
      bankName: "",
      accountNumber: "",
      beneficiaryName: ""
  };

  const handleSubmit = () => {
    if (!isIdentityVerified) {
        alert('请先完成实名认证');
        return;
    }
    if (!hasAccount) {
        alert('请先绑定提现账户');
        return;
    }

    const val = parseFloat(amount);
    if (!val || val <= 0) {
      alert('请输入有效的提现金额');
      return;
    }
    if (val < 100) {
      alert('最低提现金额为 ¥100');
      return;
    }
    if (val > balance) {
      alert('余额不足');
      return;
    }
    alert('提现申请已提交，将打款至您绑定的账户');
    setAmount('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen bg-[#F9F6F2]">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-xs text-[#764F35]/60 hover:text-[#764F35] transition-colors mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回钱包
        </button>
        <h1 className="text-3xl font-serif text-[#2D241E]">申请提现</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Withdrawal Form */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-[#764F35]/10 p-6 md:p-8">
           
           {/* Balance Card */}
           <div className="bg-[#2D241E] text-[#E9D6BE] rounded-lg p-6 mb-8 flex justify-between items-center relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-[#C19A55]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">可提现余额 (CNY)</p>
                <h2 className="text-3xl font-serif font-bold mb-1">¥{balance.toLocaleString()}</h2>
                <p className="text-xs text-[#E9D6BE]/60 flex items-center">
                  <svg className="w-3 h-3 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  当前积分：{points.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#E9D6BE]/10 rounded-full flex items-center justify-center text-[#E9D6BE]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
           </div>

           {/* Amount Input */}
           <div className="mb-8">
              <label className="block text-sm font-bold text-[#2D241E] mb-3">提现金额</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-serif text-[#764F35] font-bold">¥</span>
                 <input 
                   type="number" 
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-lg py-4 pl-10 pr-4 text-2xl font-bold text-[#2D241E] focus:outline-none focus:border-[#764F35] transition-colors"
                   placeholder="0.00"
                 />
              </div>
              <div className="flex justify-between mt-2 text-xs text-stone-400">
                 <span>最低提现额度 ¥100.00</span>
                 <button onClick={() => setAmount(balance.toString())} className="text-[#764F35] font-bold">全部提现</button>
              </div>
           </div>

           {/* Account Info Display (Updated) */}
           <div className="mb-10">
              <label className="block text-sm font-bold text-[#2D241E] mb-3">提现账户信息</label>
              
              <div className="bg-white border border-[#764F35]/10 rounded-lg overflow-hidden">
                  <div className="divide-y divide-[#764F35]/5">
                      {/* Identity Verification */}
                      <div className="p-4 flex items-center justify-between hover:bg-[#F9F6F2]/30 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isIdentityVerified ? 'bg-[#764F35]/10 text-[#764F35]' : 'bg-stone-100 text-stone-400'}`}>
                                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-[#2D241E]">实名认证</p>
                                  <p className="text-xs text-stone-400 mt-0.5">保障账户资金安全</p>
                              </div>
                          </div>
                          <div>
                              {isIdentityVerified ? (
                                  <span className="text-xs font-bold text-[#764F35] bg-[#764F35]/10 px-3 py-1.5 rounded-sm flex items-center">
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                      已完成
                                  </span>
                              ) : (
                                  <button onClick={() => onNavigateToSettings('verification')} className="text-xs font-bold text-[#764F35] border border-[#764F35] px-4 py-1.5 rounded-sm hover:bg-[#764F35] hover:text-white transition-all">
                                      去认证
                                  </button>
                              )}
                          </div>
                      </div>

                      {/* Account Settings */}
                      <div className="p-4 flex items-center justify-between hover:bg-[#F9F6F2]/30 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${hasAccount ? 'bg-[#764F35]/10 text-[#764F35]' : 'bg-stone-100 text-stone-400'}`}>
                                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-[#2D241E]">提现账户设置</p>
                                  <p className="text-xs text-stone-400 mt-0.5">
                                      {hasAccount ? `已绑定: ${accountInfo.bankName || '银行卡'}` : '用于接收提现款项'}
                                  </p>
                              </div>
                          </div>
                          <div>
                              {hasAccount ? (
                                  <span className="text-xs font-bold text-[#764F35] bg-[#764F35]/10 px-3 py-1.5 rounded-sm flex items-center">
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                      已完成
                                  </span>
                              ) : (
                                  <button onClick={() => onNavigateToSettings('account')} className="text-xs font-bold text-white bg-[#764F35] px-4 py-1.5 rounded-sm hover:bg-[#5e3e2a] transition-all">
                                      去设置
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
              
              <p className="mt-3 text-[10px] text-stone-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  为保障资金安全，请确保所有信息真实有效。
              </p>
           </div>

           <button 
             onClick={handleSubmit}
             disabled={!isIdentityVerified || !hasAccount}
             className="w-full bg-[#764F35] text-white py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
           >
             确认提现
           </button>
        </div>

        {/* Right: History & Info */}
        <div className="w-full lg:w-80">
           <div className="bg-[#F9F6F2] border border-[#764F35]/10 rounded-xl p-6 mb-6">
              <h3 className="text-sm font-bold text-[#2D241E] mb-4">提现记录</h3>
              <div className="space-y-4">
                 {history.map(item => (
                    <div key={item.id} className="flex justify-between items-center pb-4 border-b border-[#764F35]/5 last:border-0 last:pb-0">
                       <div>
                          <p className="text-sm font-bold text-[#2D241E]">{item.method}</p>
                          <p className="text-[10px] text-stone-400">{item.date}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-bold text-[#2D241E]">-¥{item.amount}</p>
                          <p className={`text-[10px] uppercase font-bold ${item.status === 'completed' ? 'text-green-600' : 'text-[#C19A55]'}`}>
                             {item.status === 'completed' ? '已到账' : '处理中'}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-6">
              <h4 className="text-xs font-bold text-[#764F35] uppercase tracking-widest mb-3">温馨提示</h4>
              <ul className="text-xs text-stone-500 space-y-2 list-disc pl-4 leading-relaxed">
                 <li>请确保绑定的银行卡账户处于正常状态。</li>
                 <li>单笔提现最高限额 ¥50,000。</li>
                 <li>若遇到提现失败，金额将原路退回至余额。</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};