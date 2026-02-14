
import React, { useState } from 'react';

interface AgentApplicationProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const AgentApplication: React.FC<AgentApplicationProps> = ({ onBack, onSubmit }) => {
  // Mock Verification State: Set to true to see "Verified" state, false to see "Go Verify"
  const [isVerified, setIsVerified] = useState(false); 

  const handleSubmit = () => {
    if (!isVerified) {
      alert('请先完成实名认证后再提交申请');
      return;
    }
    onSubmit();
  };

  const handleGoVerify = () => {
      // In a real app, this would navigate to the profile settings tab
      alert('请前往 [个人中心 -> 系统设置 -> 实名认证] 完成身份核验');
  };

  const benefits = [
    { title: '高额佣金', desc: '推广成交即可获得最高 15% 现金返利', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: '专属折扣', desc: '自购享受合伙人专属折扣，自用更省', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { title: '品牌支持', desc: '提供全套精美素材与专业培训支持', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.664 0l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-2.14 2.14a2 2 0 01-3.32-1.06l-.9-4.5a2 2 0 011.24-2.26l4.5-1.8a2 2 0 012.26 1.24l.9 4.5a2 2 0 01-1.06 3.32l-2.14 2.14z' },
    { title: '优先特权', desc: '优先体验新品，受邀参加线下雅集', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen">
       {/* Header with Back Button */}
       <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-xs text-[#764F35]/60 hover:text-[#764F35] transition-colors mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            返回个人中心
          </button>
       </div>

       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Benefits Info */}
          <div className="w-full lg:w-1/3 bg-[#764F35] text-[#E9D6BE] rounded-xl p-8 lg:p-10 shadow-lg lg:sticky lg:top-24">
              <div className="mb-8">
                  <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-3 text-white">申请成为合伙人</h1>
                  <p className="text-white/60 text-sm">Join the Chengxiang Partner Program</p>
                  <div className="w-12 h-1 bg-[#E9D6BE]/30 mt-6 rounded-full"></div>
              </div>

              <div className="space-y-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#E9D6BE]/10 flex items-center justify-center flex-shrink-0 mt-1 border border-[#E9D6BE]/20 text-[#E9D6BE]">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={b.icon} /></svg>
                        </div>
                        <div className="ml-4">
                             <h3 className="text-base font-bold text-white mb-1">{b.title}</h3>
                             <p className="text-xs text-[#E9D6BE]/70 leading-relaxed">{b.desc}</p>
                        </div>
                    </div>
                  ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-[#E9D6BE]/10">
                  <p className="text-xs text-[#E9D6BE]/50 leading-relaxed">
                      * 提交申请即代表您已阅读并同意我们的《合伙人协议》。审核通过后，您将获得专属推广码及后台管理权限。
                  </p>
              </div>
          </div>

          {/* RIGHT COLUMN: Application Form */}
          <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-[#764F35]/10 overflow-hidden">
              <div className="bg-[#F9F6F2] px-8 py-6 border-b border-[#764F35]/10">
                 <h2 className="text-lg font-serif text-[#2D241E]">填写申请资料</h2>
                 <p className="text-xs text-stone-500 mt-1">请确认您的实名信息以继续申请</p>
              </div>

              <div className="p-8 space-y-10">
                  {/* 1. Identity Verification Status */}
                  <section>
                      <h3 className="text-sm font-bold text-[#764F35] uppercase tracking-widest mb-6 flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#764F35] rounded-full mr-2"></span>
                          基本信息 / Basic Information
                      </h3>
                      
                      <div className={`rounded-lg p-6 border transition-all ${isVerified ? 'bg-[#F0FDF4] border-green-200' : 'bg-[#FFF7ED] border-orange-200'}`}>
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isVerified ? 'bg-green-100 text-green-600 border-green-200' : 'bg-orange-100 text-orange-500 border-orange-200'}`}>
                                      {isVerified ? (
                                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                      ) : (
                                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                      )}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-[#2D241E] text-sm mb-1">实名认证 (Real-name Authentication)</h4>
                                      <p className="text-xs text-stone-500">
                                          {isVerified 
                                              ? '您的身份信息已核验通过。' 
                                              : '根据合规要求，申请合伙人需先完成实名认证。'}
                                      </p>
                                  </div>
                              </div>
                              
                              <div>
                                  {isVerified ? (
                                      <span className="inline-flex items-center px-4 py-2 rounded-sm text-xs font-bold text-green-700 bg-green-100 border border-green-200">
                                          已完成
                                      </span>
                                  ) : (
                                      <button 
                                          onClick={handleGoVerify}
                                          className="inline-flex items-center px-6 py-2 rounded-sm text-xs font-bold text-[#C2410C] bg-white border border-[#F97316] hover:bg-[#FFF7ED] transition-colors shadow-sm"
                                      >
                                          去认证
                                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  </section>

                  {/* Actions */}
                  <div className="pt-6 border-t border-[#764F35]/10 flex justify-end gap-4">
                      <button 
                        onClick={onBack}
                        className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-[#764F35] transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={handleSubmit}
                        disabled={!isVerified}
                        className={`px-12 py-3 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg ${isVerified ? 'bg-[#764F35] hover:bg-[#5e3e2a]' : 'bg-stone-300 cursor-not-allowed'}`}
                      >
                        提交申请
                      </button>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};
