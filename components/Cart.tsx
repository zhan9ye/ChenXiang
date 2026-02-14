
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout, onContinueShopping }) => {
  // State for selections
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [selectedCouponId, setSelectedCouponId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [orderNote, setOrderNote] = useState('');

  // Mock Data
  const addresses = [
    { id: '1', name: '张先生', phone: '138****8888', region: '北京市 朝阳区', detail: '建国路88号华贸中心', isDefault: true },
    { id: '2', name: '张先生', phone: '139****9999', region: '上海市 静安区', detail: '南京西路1266号恒隆广场', isDefault: false },
  ];

  const coupons = [
    { id: 'c1', name: '新客专享礼金', value: 50, type: 'money', minSpend: 500 },
    { id: 'c2', name: '全场通用95折', value: 0.95, type: 'discount', minSpend: 0 },
  ];

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const selectedCoupon = coupons.find(c => c.id === selectedCouponId);
  let discount = 0;
  
  if (selectedCoupon && subtotal >= selectedCoupon.minSpend) {
      if (selectedCoupon.type === 'money') {
          discount = selectedCoupon.value;
      } else {
          discount = subtotal * (1 - selectedCoupon.value);
      }
  }
  // Ensure discount doesn't exceed subtotal
  discount = Math.min(discount, subtotal);

  const shipping = 0; // Free shipping
  const total = subtotal - discount + shipping;

  const handlePayment = () => {
    if (!selectedAddressId) {
      alert('请选择收货地址');
      return;
    }
    alert(`支付成功！\n实付金额: ¥${total.toLocaleString()}\n支付方式: ${paymentMethod === 'alipay' ? '支付宝' : '微信支付'}\n备注: ${orderNote || '无'}`);
    onCheckout(); // In a real app, this would verify payment then clear cart
  };

  if (items.length === 0) {
    return (
      <div className="py-24 px-6 text-center min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-[#F9F6F2] rounded-full flex items-center justify-center text-[#764F35]/30 mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-2xl font-serif text-[#2D241E] mb-2">您的购物车是空的</h2>
        <p className="text-stone-500 mb-8 text-sm">去挑选一些心仪的雅物吧</p>
        <button 
          onClick={onContinueShopping}
          className="border border-[#764F35] text-[#764F35] py-3 px-8 text-xs font-bold uppercase tracking-[0.2em] md:hover:bg-[#764F35] md:hover:text-white transition-all rounded-sm"
        >
          返回购物
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-[80vh]">
      <h1 className="text-3xl font-serif text-[#2D241E] mb-12 text-center md:text-left">购物清单</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#764F35]/10 text-xs font-bold uppercase tracking-widest text-[#764F35]/60">
            <div className="col-span-6">商品</div>
            <div className="col-span-2 text-center">单价</div>
            <div className="col-span-2 text-center">数量</div>
            <div className="col-span-2 text-right">小计</div>
          </div>
          
          <div className="space-y-6 md:space-y-0">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-[#764F35]/10 items-center">
                
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#F9F6F2] rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" crossOrigin="anonymous"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#764F35]/80 uppercase tracking-widest font-bold mb-1">{item.brand}</p>
                    <h3 className="text-lg font-serif text-[#2D241E] cursor-pointer md:hover:text-[#764F35] transition-colors">{item.name}</h3>
                    {item.selectedVariant && (
                       <p className="text-xs text-stone-500 mt-1">规格: {item.selectedVariant.name}</p>
                    )}
                    <p className="text-xs text-stone-500 mt-1 md:hidden">¥{item.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Price (Desktop) */}
                <div className="hidden md:block col-span-2 text-center text-sm font-medium text-[#2D241E]">
                  ¥{item.price.toLocaleString()}
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
                  <div className="flex items-center border border-[#764F35]/20 rounded-sm">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center md:hover:bg-[#F9F6F2] text-[#764F35] transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center md:hover:bg-[#F9F6F2] text-[#764F35] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="md:hidden text-xs text-stone-400 md:hover:text-red-500 underline">
                    移除
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between md:block col-span-1 md:col-span-2 text-right">
                  <span className="md:hidden text-sm font-bold text-[#2D241E]">小计</span>
                  <div className="flex flex-col items-end">
                    <span className="text-base font-bold text-[#764F35]">¥{(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => onRemove(item.id)} className="hidden md:block text-[10px] text-stone-400 md:hover:text-red-500 mt-2 underline cursor-pointer">
                      移除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Checkout - Right Column */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-[#F9F6F2] p-6 rounded-lg sticky top-24 shadow-sm border border-[#764F35]/5 space-y-6">
            <h3 className="text-lg font-serif text-[#2D241E] border-b border-[#764F35]/10 pb-4">订单结算</h3>
            
            {/* 1. Address Selection (Dropdown) */}
            <div>
               <div className="flex justify-between items-center mb-3">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35]">收货地址</h4>
                 <button className="text-[10px] text-[#764F35] underline" onClick={() => alert('地址管理功能开发中')}>管理地址</button>
               </div>
               <div className="relative">
                  <select 
                      value={selectedAddressId}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="w-full p-3 bg-white border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] appearance-none"
                  >
                      {addresses.map(addr => (
                        <option key={addr.id} value={addr.id}>
                            {addr.name} - {addr.region} {addr.detail}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#764F35]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
               </div>
            </div>

            {/* 2. Coupon Selection */}
            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">优惠券</h4>
               <div className="relative">
                  <select 
                      value={selectedCouponId}
                      onChange={(e) => setSelectedCouponId(e.target.value)}
                      className="w-full p-3 bg-white border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] appearance-none"
                  >
                      <option value="">不使用优惠券</option>
                      {coupons.map(c => (
                        <option key={c.id} value={c.id} disabled={subtotal < c.minSpend}>
                            {c.name} {subtotal < c.minSpend ? `(满¥${c.minSpend})` : ''}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#764F35]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
               </div>
            </div>

            {/* 3. Payment Method */}
            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">支付方式</h4>
               <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setPaymentMethod('alipay')}
                        className={`flex items-center justify-center p-3 border rounded-md transition-all ${paymentMethod === 'alipay' ? 'border-[#1677FF] bg-[#1677FF]/5 text-[#2D241E]' : 'bg-white border-[#764F35]/10 text-stone-400 hover:border-[#1677FF]/50'}`}
                    >
                        <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] text-white mr-2 font-bold bg-[#1677FF]">支</span>
                        <span className="text-xs font-bold">支付宝</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('wechat')}
                        className={`flex items-center justify-center p-3 border rounded-md transition-all ${paymentMethod === 'wechat' ? 'border-[#09B83E] bg-[#09B83E]/5 text-[#2D241E]' : 'bg-white border-[#764F35]/10 text-stone-400 hover:border-[#09B83E]/50'}`}
                    >
                        <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] text-white mr-2 font-bold bg-[#09B83E]">微</span>
                        <span className="text-xs font-bold">微信</span>
                    </button>
               </div>
            </div>

            {/* 4. Order Note */}
            <div>
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">订单备注</h4>
               <textarea
                   value={orderNote}
                   onChange={(e) => setOrderNote(e.target.value)}
                   placeholder="选填：请填写您的备注信息"
                   className="w-full p-3 bg-white border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] resize-none h-20"
               />
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#764F35]/10 pt-4 space-y-2.5">
               <div className="flex justify-between text-sm text-stone-600">
                  <span>商品总额</span>
                  <span>¥{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm text-stone-600">
                  <span>运费</span>
                  <span>免运费</span>
               </div>
               {discount > 0 && (
                 <div className="flex justify-between text-sm text-[#764F35] font-medium animate-fade-in">
                    <span>优惠减免</span>
                    <span>-¥{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                 </div>
               )}
            </div>

            {/* Total and Button */}
            <div className="border-t border-[#764F35]/10 pt-4">
               <div className="flex justify-between items-baseline mb-6">
                  <span className="text-base font-bold text-[#2D241E]">实付款</span>
                  <span className="text-2xl font-serif font-bold text-[#764F35]">¥{total.toLocaleString()}</span>
               </div>
               
               <button 
                  onClick={handlePayment}
                  className="w-full bg-[#764F35] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] md:hover:bg-[#5e3e2a] transition-all shadow-lg rounded-sm"
               >
                  立即支付
               </button>
               
               <div className="mt-4 text-center">
                  <button onClick={onContinueShopping} className="text-xs text-stone-500 md:hover:text-[#764F35] underline">
                    继续购物
                  </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
