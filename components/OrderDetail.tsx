
import React, { useState } from 'react';
import { Order, Product } from '../types';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
  onViewAfterSales?: (order: Order) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack, onViewAfterSales }) => {
  const [modalMode, setModalMode] = useState<'none' | 'review' | 'after_sales'>('none');
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  
  // Review Form State
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  // After Sales Form State
  const [serviceType, setServiceType] = useState('refund_only');
  const [reason, setReason] = useState('');
  
  // Mock Data
  const address = order.address || {
    name: '张先生',
    phone: '138****8888',
    details: '北京市 朝阳区 建国路88号华贸中心 1座',
  };

  const paymentMethod = order.paymentMethod || '支付宝';
  const shipping = order.shipping || 0;
  const discount = order.discount || 0;
  const pointsUsed = order.pointsUsed || 0;
  const pointsDeduction = pointsUsed / 10;
  const productTotal = order.total + discount + pointsDeduction - shipping;

  const getStatusDescription = () => {
      switch(order.status) {
          case 'pending_pay': return '请在 14分59秒 内完成支付';
          case 'pending_ship': return '商家正在打包，请耐心等待发货';
          case 'pending_receive': return '包裹正在飞速奔向您的怀抱';
          case 'pending_review': return '交易已完成，期待您的评价';
          case 'completed': return '交易圆满完成，期待再次光临';
          case 'after_sales': return '售后申请处理中，请关注进度';
          default: return '订单状态更新中';
      }
  };

  const handleCloseModal = () => {
      setModalMode('none');
      setSelectedItem(null);
      setRating(5);
      setReviewText('');
      setServiceType('refund_only');
      setReason('');
  };

  const handleSubmitReview = () => {
      if (!reviewText.trim()) {
          alert('请输入评价内容');
          return;
      }
      alert(`评价提交成功！\n商品：${selectedItem?.name}\n评分：${rating}星\n内容：${reviewText}`);
      setSelectedItem(null); // Return to list
      setRating(5);
      setReviewText('');
  };

  const handleSubmitAfterSales = () => {
      if (!reason) {
          alert('请选择申请原因');
          return;
      }
      alert(`售后申请提交成功！\n商品：${selectedItem?.name}\n类型：${serviceType === 'refund_only' ? '仅退款' : serviceType === 'return_refund' ? '退货退款' : '换货'}\n原因：${reason}`);
      setSelectedItem(null); // Return to list
      setServiceType('refund_only');
      setReason('');
  };

  return (
    <div className="animate-fade-in w-full pb-10 relative">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
            onClick={onBack} 
            className="flex items-center text-xs md:text-sm text-[#764F35]/60 hover:text-[#764F35] transition-colors group mr-4"
        >
            <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            返回列表
        </button>
        <h2 className="text-xl font-serif text-[#2D241E]">订单详情</h2>
      </div>

      {/* Status Banner */}
      <div className="bg-[#764F35] text-[#E9D6BE] p-6 rounded-t-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
             <div>
                 <h3 className="text-2xl font-bold mb-1">{order.statusText}</h3>
                 <p className="text-xs opacity-80">{getStatusDescription()}</p>
             </div>
             <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {order.status === 'pending_pay' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {order.status === 'pending_ship' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
                    {order.status === 'pending_receive' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />}
                    {(order.status === 'completed' || order.status === 'pending_review') && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {order.status === 'after_sales' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                 </svg>
             </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 border-x border-b border-[#764F35]/10 mb-4 shadow-sm">
          <div className="flex items-start">
             <div className="w-8 h-8 rounded-full bg-[#F9F6F2] flex items-center justify-center text-[#764F35] mr-4 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
             </div>
             <div>
                <p className="text-sm font-bold text-[#2D241E] mb-1">
                    {address.name} <span className="text-stone-500 font-normal ml-2">{address.phone}</span>
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">{address.details}</p>
             </div>
          </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl border border-[#764F35]/10 shadow-sm overflow-hidden mb-6">
         <div className="px-6 py-3 bg-[#F9F6F2] border-b border-[#764F35]/5 flex justify-between items-center">
             <span className="text-xs font-bold text-[#764F35] uppercase tracking-widest">商品清单</span>
             <button className="text-[10px] text-stone-400 hover:text-[#764F35] flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                联系客服
             </button>
         </div>
         <div className="p-6">
             {order.items.map((item, idx) => (
                 <div key={idx} className="flex gap-4 mb-6 last:mb-0">
                     <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 border border-stone-100">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-[#2D241E] line-clamp-2 pr-4">{item.name}</h4>
                            <span className="text-sm font-bold text-[#2D241E]">¥{item.price.toLocaleString()}</span>
                         </div>
                         <p className="text-xs text-stone-400 mb-2">{item.brand} | 规格: 标准</p>
                         <div className="text-right text-xs text-stone-500">x1</div>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      {/* Order Info & Price */}
      <div className="bg-white rounded-xl border border-[#764F35]/10 shadow-sm overflow-hidden mb-8 p-6">
          <div className="space-y-3 mb-6 pb-6 border-b border-[#764F35]/5 text-xs">
              <div className="flex justify-between">
                  <span className="text-stone-500">订单编号</span>
                  <span className="text-[#2D241E] select-all">{order.id}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-stone-500">下单时间</span>
                  <span className="text-[#2D241E]">{order.date} 10:00:25</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-stone-500">支付方式</span>
                  <span className="text-[#2D241E]">{paymentMethod}</span>
              </div>
          </div>
          
          <div className="space-y-2 mb-6 text-sm">
             <div className="flex justify-between">
                 <span className="text-stone-500">商品总额</span>
                 <span className="text-[#2D241E]">¥{productTotal.toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
                 <span className="text-stone-500">运费</span>
                 <span className="text-[#2D241E]">+ ¥{shipping.toLocaleString()}</span>
             </div>
             {discount > 0 && (
                <div className="flex justify-between">
                    <span className="text-stone-500">优惠减免</span>
                    <span className="text-[#764F35]">- ¥{discount.toLocaleString()}</span>
                </div>
             )}
             {pointsUsed > 0 && (
                <div className="flex justify-between">
                    <span className="text-stone-500">积分抵扣 ({pointsUsed}积分)</span>
                    <span className="text-[#764F35]">- ¥{pointsDeduction.toLocaleString()}</span>
                </div>
             )}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-[#764F35]/10">
             <span className="text-sm font-bold text-[#2D241E]">实付款</span>
             <span className="text-xl font-serif font-bold text-[#764F35]">¥{order.total.toLocaleString()}</span>
          </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end gap-3 sticky bottom-4">
           {order.status === 'pending_pay' && (
             <>
                <button className="px-6 py-2.5 bg-white border border-stone-300 text-stone-600 text-xs font-bold rounded-sm hover:bg-stone-50 shadow-sm">取消订单</button>
                <button className="px-8 py-2.5 bg-[#764F35] text-white text-xs font-bold rounded-sm hover:bg-[#5e3e2a] shadow-md">立即付款</button>
             </>
           )}
           {order.status === 'pending_ship' && (
              <button onClick={() => alert('已提醒商家尽快发货')} className="px-6 py-2.5 bg-white border border-[#764F35] text-[#764F35] text-xs font-bold rounded-sm hover:bg-[#F9F6F2] shadow-sm">催发货</button>
           )}
           {order.status === 'pending_receive' && (
              <>
                 <button className="px-6 py-2.5 bg-white border border-[#764F35] text-[#764F35] text-xs font-bold rounded-sm hover:bg-[#F9F6F2] shadow-sm">查看物流</button>
                 <button className="px-8 py-2.5 bg-[#764F35] text-white text-xs font-bold rounded-sm hover:bg-[#5e3e2a] shadow-md">确认收货</button>
              </>
           )}
           {order.status === 'pending_review' && (
              <>
                <button onClick={() => setModalMode('after_sales')} className="px-6 py-2.5 bg-white border border-stone-300 text-stone-600 text-xs font-bold rounded-sm hover:bg-stone-50 shadow-sm">申请售后</button>
                <button onClick={() => setModalMode('review')} className="px-8 py-2.5 bg-[#764F35] text-white text-xs font-bold rounded-sm hover:bg-[#5e3e2a] shadow-md">立即评价</button>
              </>
           )}
           {order.status === 'completed' && (
              <>
                <button onClick={() => setModalMode('after_sales')} className="px-6 py-2.5 bg-white border border-stone-300 text-stone-600 text-xs font-bold rounded-sm hover:bg-stone-50 shadow-sm">申请售后</button>
                <button className="px-6 py-2.5 bg-white border border-[#764F35] text-[#764F35] text-xs font-bold rounded-sm hover:bg-[#F9F6F2] shadow-sm">再次购买</button>
              </>
           )}
           {order.status === 'after_sales' && (
              <>
                <button className="px-6 py-2.5 bg-white border border-stone-300 text-stone-600 text-xs font-bold rounded-sm hover:bg-stone-50 shadow-sm">取消申请</button>
                <button 
                  onClick={() => onViewAfterSales ? onViewAfterSales(order) : alert('查看进度功能开发中')}
                  className="px-6 py-2.5 bg-white border border-[#764F35] text-[#764F35] text-xs font-bold rounded-sm hover:bg-[#F9F6F2] shadow-sm"
                >
                  查看进度
                </button>
              </>
           )}
      </div>

      {/* Modal Overlay */}
      {modalMode !== 'none' && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleCloseModal}></div>
            <div className="relative bg-white w-full md:w-[600px] md:rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up-mobile md:animate-fade-in">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-[#764F35]/10 flex items-center justify-between bg-[#F9F6F2]">
                    <h3 className="text-lg font-serif font-bold text-[#2D241E]">
                        {modalMode === 'review' ? (selectedItem ? '发表评价' : '选择商品评价') : (selectedItem ? '申请售后' : '选择商品售后')}
                    </h3>
                    <button onClick={handleCloseModal} className="text-stone-400 hover:text-[#2D241E]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    {!selectedItem ? (
                        /* Product Selection List */
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 border border-[#764F35]/10 rounded-lg hover:border-[#764F35]/30 transition-colors">
                                    <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[#2D241E] line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-stone-400">{item.brand}</p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedItem(item)}
                                        className="px-4 py-2 border border-[#764F35] text-[#764F35] text-xs font-bold rounded-sm hover:bg-[#764F35] hover:text-white transition-all"
                                    >
                                        {modalMode === 'review' ? '去评价' : '申请'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : modalMode === 'review' ? (
                        /* Review Form */
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-[#764F35]/5">
                                <div className="w-12 h-12 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#2D241E] line-clamp-1">{selectedItem.name}</h4>
                                    <p className="text-xs text-stone-400">规格: 标准</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-[#2D241E] mb-3">商品评分</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                                            <svg className={`w-8 h-8 ${star <= rating ? 'text-[#C19A55] fill-current' : 'text-stone-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.349 1.132l-4.252 3.638a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.252-3.638c-.421-.362-.196-1.088.349-1.132l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#2D241E] mb-3">评价内容</label>
                                <textarea 
                                    className="w-full h-32 p-3 bg-[#F9F6F2] border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] resize-none"
                                    placeholder="宝贝满足您的期待吗？说说您的使用心得，分享给想买的他们吧"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>

                            <button onClick={handleSubmitReview} className="w-full bg-[#764F35] text-white py-3 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#5e3e2a]">
                                提交评价
                            </button>
                        </div>
                    ) : (
                        /* After Sales Form */
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-[#764F35]/5">
                                <div className="w-12 h-12 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#2D241E] line-clamp-1">{selectedItem.name}</h4>
                                    <p className="text-xs text-stone-400">数量: 1</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#2D241E] mb-3">服务类型</label>
                                <div className="flex gap-3">
                                    {[
                                        { id: 'refund_only', label: '仅退款' },
                                        { id: 'return_refund', label: '退货退款' },
                                        { id: 'exchange', label: '换货' }
                                    ].map(type => (
                                        <button 
                                            key={type.id}
                                            onClick={() => setServiceType(type.id)}
                                            className={`flex-1 py-2 text-xs font-bold border rounded-sm transition-all ${serviceType === type.id ? 'border-[#764F35] bg-[#764F35] text-white' : 'border-[#764F35]/20 text-stone-600'}`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#2D241E] mb-3">申请原因</label>
                                <select 
                                    className="w-full p-3 bg-white border border-[#764F35]/20 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35]"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <option value="">请选择原因</option>
                                    <option value="quality">质量问题</option>
                                    <option value="not_match">商品与描述不符</option>
                                    <option value="broken">商品破损/少件</option>
                                    <option value="dislike">不喜欢/不想要</option>
                                    <option value="other">其他</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#2D241E] mb-3">问题描述</label>
                                <textarea 
                                    className="w-full h-24 p-3 bg-[#F9F6F2] border border-[#764F35]/10 rounded-md text-sm text-[#2D241E] focus:outline-none focus:border-[#764F35] resize-none"
                                    placeholder="请详细描述您遇到的问题"
                                ></textarea>
                            </div>

                            <button onClick={handleSubmitAfterSales} className="w-full bg-[#764F35] text-white py-3 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#5e3e2a]">
                                提交申请
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};
