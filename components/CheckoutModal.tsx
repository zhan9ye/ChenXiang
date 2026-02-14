
import React, { useState } from 'react';
import { Product, Variant } from '../types';

interface CheckoutModalProps {
  product: Product;
  variant?: Variant;
  quantity: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, variant, quantity, onClose, onConfirm }) => {
  // Mock Data
  const addresses = [
    { id: '1', name: '张先生', phone: '138****8888', region: '北京市 朝阳区', detail: '建国路88号华贸中心', isDefault: true },
    { id: '2', name: '张先生', phone: '139****9999', region: '上海市 静安区', detail: '南京西路1266号恒隆广场', isDefault: false },
  ];

  const coupons = [
    { id: 'c1', name: '新客专享礼金', value: 50, type: 'money', minSpend: 500 },
    { id: 'c2', name: '全场通用95折', value: 0.95, type: 'discount', minSpend: 0 },
  ];

  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0].id);
  const [selectedCouponId, setSelectedCouponId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [orderNote, setOrderNote] = useState('');

  const unitPrice = variant?.price || product.price;
  const subtotal = unitPrice * quantity;
  
  const selectedCoupon = coupons.find(c => c.id === selectedCouponId);
  
  let discount = 0;
  if (selectedCoupon) {
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

  const handleConfirm = () => {
      alert(`支付成功！\n实付金额: ¥${total.toLocaleString()}\n备注: ${orderNote || '无'}`);
      onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full md:w-[600px] md:rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up-mobile md:animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#764F35]/10 flex items-center justify-between bg-[#F9F6F2]">
            <h2 className="text-lg font-serif font-bold text-[#2D241E]">确认订单</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-[#2D241E]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
            
            {/* Address Selection (Dropdown) */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#764F35]">收货地址</h3>
                    <button className="text-xs text-[#764F35] underline" onClick={() => alert('添加地址功能开发中')}>+ 新增地址</button>
                </div>
                <div className="relative">
                    <select 
                        value={selectedAddressId} 
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        className="w-full p-3 bg-white border border-[#764F35]/20 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] appearance-none"
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

            {/* Product Info */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">商品信息</h3>
                <div className="flex gap-4 p-4 bg-[#F9F6F2] rounded-lg">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-[#764F35]/10">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#2D241E] line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-stone-500 mt-1">规格: {variant?.name || '标准'}</p>
                        <div className="flex justify-between items-end mt-2">
                            <span className="text-sm font-medium text-[#764F35]">¥{unitPrice.toLocaleString()}</span>
                            <span className="text-xs text-stone-500">x{quantity}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coupon */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">优惠券</h3>
                <div className="relative">
                    <select 
                        value={selectedCouponId} 
                        onChange={(e) => setSelectedCouponId(e.target.value)}
                        className="w-full p-3 bg-white border border-[#764F35]/20 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] appearance-none"
                    >
                        <option value="">不使用优惠券</option>
                        {coupons.map(c => (
                            <option key={c.id} value={c.id} disabled={subtotal < c.minSpend}>
                                {c.name} {subtotal < c.minSpend ? `(满¥${c.minSpend}可用)` : ''}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#764F35]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">支付方式</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { id: 'alipay', name: '支付宝', icon: '支', color: '#1677FF' },
                        { id: 'wechat', name: '微信支付', icon: '微', color: '#09B83E' }
                    ].map(method => (
                        <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center justify-center p-3 border rounded-md transition-all ${paymentMethod === method.id ? 'border-[#764F35] bg-[#764F35]/5 text-[#2D241E]' : 'border-[#764F35]/10 text-stone-600 hover:border-[#764F35]/30'}`}
                        >
                            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] text-white mr-2 font-bold" style={{ backgroundColor: method.color }}>
                                {method.icon}
                            </span>
                            <span className="text-xs font-bold">{method.name}</span>
                            {paymentMethod === method.id && (
                                <svg className="w-4 h-4 text-[#764F35] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Order Note */}
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-[#764F35] mb-3">订单备注</h3>
               <textarea
                   value={orderNote}
                   onChange={(e) => setOrderNote(e.target.value)}
                   placeholder="选填：请填写您的备注信息"
                   className="w-full p-3 bg-[#F9F6F2] border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] resize-none h-20"
               />
            </div>

            {/* Price Summary */}
            <div className="border-t border-[#764F35]/10 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-stone-500">
                    <span>商品总额</span>
                    <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                    <span>运费</span>
                    <span>免运费</span>
                </div>
                <div className="flex justify-between text-xs text-[#764F35]">
                    <span>优惠减免</span>
                    <span>-¥{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#764F35]/10 bg-white flex items-center justify-between pb-8 md:pb-4">
            <div>
                <p className="text-xs text-stone-500 mb-1">实付款</p>
                <div className="flex items-baseline text-[#764F35] font-bold">
                    <span className="text-sm">¥</span>
                    <span className="text-2xl font-serif ml-1">{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <button 
                onClick={handleConfirm}
                className="bg-[#764F35] text-white px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-lg min-w-[140px]"
            >
                立即支付
            </button>
        </div>
      </div>
    </div>
  );
};
