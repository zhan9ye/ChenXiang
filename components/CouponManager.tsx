
import React, { useState } from 'react';

interface Coupon {
  id: string;
  name: string;
  value: number;
  minSpend: number;
  validUntil: string;
  status: 'available' | 'used' | 'expired';
  type: 'discount' | 'money';
}

interface CouponManagerProps {
  onBack: () => void;
  onGoHome: () => void;
}

export const CouponManager: React.FC<CouponManagerProps> = ({ onBack, onGoHome }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'used' | 'expired'>('available');

  // Mock Data
  const coupons: Coupon[] = [
    { id: '1', name: '新客专享礼金', value: 50, minSpend: 500, validUntil: '2024-12-31', status: 'available', type: 'money' },
    { id: '2', name: '沉香手串品类券', value: 200, minSpend: 2000, validUntil: '2024-06-30', status: 'available', type: 'money' },
    { id: '3', name: '全场通用95折', value: 0.95, minSpend: 0, validUntil: '2024-05-20', status: 'used', type: 'discount' },
    { id: '4', name: '限时活动抵扣券', value: 100, minSpend: 1000, validUntil: '2023-12-31', status: 'expired', type: 'money' },
  ];

  const filteredCoupons = coupons.filter(c => c.status === activeTab);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen bg-[#F9F6F2]">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-xs text-[#764F35]/60 hover:text-[#764F35] transition-colors mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回个人中心
        </button>
        <h1 className="text-3xl font-serif text-[#2D241E]">优惠券管理</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6 border-b border-[#764F35]/10">
        {[
          { id: 'available', label: '未使用' },
          { id: 'used', label: '已使用' },
          { id: 'expired', label: '已过期' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-bold transition-all relative ${activeTab === tab.id ? 'text-[#764F35]' : 'text-stone-400 hover:text-[#764F35]'}`}
          >
            {tab.label} ({coupons.filter(c => c.status === tab.id).length})
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#764F35]"></div>}
          </button>
        ))}
      </div>

      {/* Coupon List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div key={coupon.id} className={`relative bg-white rounded-lg border flex overflow-hidden ${activeTab === 'available' ? 'border-[#764F35]/20 shadow-sm' : 'border-stone-200 opacity-60'}`}>
              
              {/* Left Side: Value */}
              <div className={`w-32 flex flex-col items-center justify-center p-4 border-r border-dashed ${activeTab === 'available' ? 'bg-[#764F35] text-[#E9D6BE] border-[#E9D6BE]/30' : 'bg-stone-200 text-stone-500 border-white'}`}>
                <div className="flex items-baseline">
                  {coupon.type === 'money' && <span className="text-sm font-bold">¥</span>}
                  <span className="text-3xl font-serif font-bold">{coupon.type === 'money' ? coupon.value : (coupon.value * 10)}</span>
                  {coupon.type === 'discount' && <span className="text-sm font-bold ml-1">折</span>}
                </div>
                <div className="text-[10px] mt-1 uppercase tracking-wider">Coupon</div>
              </div>

              {/* Right Side: Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#2D241E] text-sm mb-1">{coupon.name}</h4>
                  <p className="text-xs text-stone-500 mb-2">满 ¥{coupon.minSpend} 可用</p>
                  <p className="text-[10px] text-stone-400">有效期至: {coupon.validUntil}</p>
                </div>
                
                {activeTab === 'available' && (
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={onGoHome}
                      className="text-[10px] font-bold text-[#764F35] border border-[#764F35]/20 px-3 py-1 rounded-full hover:bg-[#764F35] hover:text-white transition-colors"
                    >
                      立即使用
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative Circles for Ticket Look */}
              <div className="absolute top-0 bottom-0 left-[7.8rem] w-px border-r border-dashed border-stone-200"></div>
              <div className="absolute -top-2 left-[7.65rem] w-4 h-4 bg-[#F9F6F2] rounded-full"></div>
              <div className="absolute -bottom-2 left-[7.65rem] w-4 h-4 bg-[#F9F6F2] rounded-full"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-stone-300 mx-auto mb-4 border border-stone-100">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <p className="text-stone-400 text-sm">暂无此类优惠券</p>
          </div>
        )}
      </div>
    </div>
  );
};
