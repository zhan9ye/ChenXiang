
import React, { useState } from 'react';
import { Order } from '../types';

interface AfterSalesProgressProps {
  order: Order;
  onBack: () => void;
}

export const AfterSalesProgress: React.FC<AfterSalesProgressProps> = ({ order, onBack }) => {
  const [logisticsFilled, setLogisticsFilled] = useState(false);
  const [courier, setCourier] = useState('');
  const [trackingNum, setTrackingNum] = useState('');

  // Mock Timeline Data
  const steps = [
    { title: '提交申请', date: '2024-01-05 10:20', desc: '您的售后申请已提交，等待商家审核', status: 'completed' },
    { title: '商家审核', date: '2024-01-05 14:30', desc: '商家已同意您的售后申请', status: 'completed' },
    { title: '买家退货', date: '', desc: logisticsFilled ? '您已填写退货物流，等待商家收货' : '请将商品寄回商家指定地址，并填写物流单号', status: logisticsFilled ? 'completed' : 'current' },
    { title: '商家收货', date: '', desc: '商家确认收货并验货', status: 'pending' },
    { title: '退款/换货', date: '', desc: '退款将原路返回您的支付账户', status: 'pending' },
    { title: '完成', date: '', desc: '服务已完成', status: 'pending' },
  ];

  const handleSubmitLogistics = () => {
    if (!courier || !trackingNum) {
      alert('请填写完整的物流信息');
      return;
    }
    setLogisticsFilled(true);
    alert('物流信息提交成功！');
  };

  return (
    <div className="w-full animate-fade-in pb-10">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="flex items-center text-xs md:text-sm text-[#764F35]/60 hover:text-[#764F35] transition-colors group mr-4">
          <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回订单列表
        </button>
        <h2 className="text-xl font-serif text-[#2D241E]">售后进度详情</h2>
      </div>

      {/* Status Banner */}
      <div className="bg-[#764F35] text-[#E9D6BE] p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden mb-6">
        <div className="relative z-10">
           <h3 className="text-2xl font-serif font-bold mb-2">
             {logisticsFilled ? '等待商家收货' : '商家已同意，请退货'}
           </h3>
           <p className="text-sm opacity-80 max-w-xl">
             {logisticsFilled 
                ? '您已寄出商品，商家将在收到商品后处理退款。' 
                : '请在 6天23小时 内寄回商品并填写物流信息，逾期系统将自动关闭申请。'}
           </p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Progress & Actions */}
        <div className="flex-1 space-y-6">
           
           {/* Return Address Card (Only show if waiting for return) */}
           {!logisticsFilled && (
             <div className="bg-white border border-[#764F35]/10 rounded-xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-[#2D241E] mb-4 flex items-center">
                   <svg className="w-4 h-4 mr-2 text-[#764F35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                   商家退货地址
                </h4>
                <div className="bg-[#F9F6F2] p-4 rounded-lg text-sm text-stone-600 space-y-2">
                   <p><span className="text-stone-400 w-16 inline-block">收货人：</span>承香名品售后部</p>
                   <p><span className="text-stone-400 w-16 inline-block">联系电话：</span>400-888-6666</p>
                   <p><span className="text-stone-400 w-16 inline-block">收货地址：</span>江苏省苏州市工业园区沉香文化创意园A座101室</p>
                   <p className="text-xs text-[#764F35] mt-2 pt-2 border-t border-[#764F35]/10">* 请务必在包裹内附上写有订单号和售后原因的纸条，以便快速处理。</p>
                </div>
             </div>
           )}

           {/* Logistics Input Form (Only show if waiting for return) */}
           {!logisticsFilled && (
             <div className="bg-white border border-[#764F35]/10 rounded-xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-[#2D241E] mb-4 flex items-center">
                   <svg className="w-4 h-4 mr-2 text-[#764F35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                   填写退货物流
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div>
                      <label className="block text-xs font-bold text-stone-500 mb-1.5">物流公司</label>
                      <select 
                        value={courier} 
                        onChange={(e) => setCourier(e.target.value)}
                        className="w-full bg-[#F9F6F2] border-none rounded-sm px-4 py-2.5 text-sm text-[#2D241E] focus:ring-1 focus:ring-[#764F35]"
                      >
                         <option value="">请选择快递公司</option>
                         <option value="sf">顺丰速运</option>
                         <option value="ems">EMS / 邮政</option>
                         <option value="zto">中通快递</option>
                         <option value="other">其他快递</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-stone-500 mb-1.5">物流单号</label>
                      <input 
                        type="text" 
                        value={trackingNum}
                        onChange={(e) => setTrackingNum(e.target.value)}
                        placeholder="请输入快递单号"
                        className="w-full bg-[#F9F6F2] border-none rounded-sm px-4 py-2.5 text-sm text-[#2D241E] focus:ring-1 focus:ring-[#764F35]" 
                      />
                   </div>
                </div>
                <button 
                  onClick={handleSubmitLogistics}
                  className="w-full bg-[#764F35] text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#5e3e2a] transition-all shadow-md"
                >
                  提交物流信息
                </button>
             </div>
           )}

           {/* Progress Timeline */}
           <div className="bg-white border border-[#764F35]/10 rounded-xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-[#2D241E] mb-6">服务进度</h4>
              <div className="space-y-0 relative">
                 {/* Vertical Line */}
                 <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-[#F9F6F2]"></div>
                 
                 {steps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    
                    return (
                       <div key={idx} className="relative pl-10 pb-8 last:pb-0">
                          {/* Dot */}
                          <div className={`absolute left-0 top-0 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 bg-white ${isCompleted ? 'border-[#764F35] text-[#764F35]' : isCurrent ? 'border-[#764F35] bg-[#764F35] text-white' : 'border-stone-200 text-stone-300'}`}>
                             {isCompleted ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                             ) : (
                                <span className="text-xs font-bold">{idx + 1}</span>
                             )}
                          </div>
                          
                          {/* Content */}
                          <div>
                             <div className="flex justify-between items-start mb-1">
                                <h5 className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-[#2D241E]' : 'text-stone-400'}`}>{step.title}</h5>
                                <span className="text-xs text-stone-400 font-mono">{step.date}</span>
                             </div>
                             <p className={`text-xs ${isCompleted || isCurrent ? 'text-stone-600' : 'text-stone-300'}`}>{step.desc}</p>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
        </div>

        {/* Right: Info Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
           {/* Product Info */}
           <div className="bg-white border border-[#764F35]/10 rounded-xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#764F35] uppercase tracking-widest mb-4">售后商品</h4>
              {order.items.map((item, idx) => (
                 <div key={idx} className="flex gap-3 mb-4 last:mb-0">
                    <div className="w-14 h-14 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-sm font-bold text-[#2D241E] truncate">{item.name}</p>
                       <p className="text-xs text-stone-500 mt-1">数量: x1</p>
                    </div>
                 </div>
              ))}
           </div>

           {/* Service Info */}
           <div className="bg-white border border-[#764F35]/10 rounded-xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#764F35] uppercase tracking-widest mb-4">服务单信息</h4>
              <div className="space-y-3 text-xs">
                 <div className="flex justify-between">
                    <span className="text-stone-500">服务单号</span>
                    <span className="text-[#2D241E] font-mono">AS{order.id}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-stone-500">申请时间</span>
                    <span className="text-[#2D241E]">2024-01-05 10:20</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-stone-500">服务类型</span>
                    <span className="text-[#2D241E]">退货退款</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-stone-500">退款金额</span>
                    <span className="text-[#764F35] font-bold">¥{order.total.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-stone-500">退款路径</span>
                    <span className="text-[#2D241E]">原路退回</span>
                 </div>
                 <div className="pt-3 mt-3 border-t border-[#764F35]/10">
                    <p className="text-stone-500 mb-1">申请原因：</p>
                    <p className="text-[#2D241E] leading-relaxed">商品与描述不符，颜色有差异。</p>
                 </div>
              </div>
           </div>
           
           <div className="text-center">
              <button className="text-xs text-stone-400 hover:text-[#764F35] underline">联系售后客服</button>
           </div>
        </div>
      </div>
    </div>
  );
};
