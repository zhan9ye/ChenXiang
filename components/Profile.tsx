
import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { OrderDetail } from './OrderDetail';
import { AfterSalesProgress } from './AfterSalesProgress';

interface ProfileProps {
  onNavigate: (tab: string) => void;
  initialActiveTab?: string;
  initialSettingsTab?: 'info' | 'security' | 'address' | 'verification' | 'account';
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate, initialActiveTab = 'home', initialSettingsTab = 'info' }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [settingsTab, setSettingsTab] = useState(initialSettingsTab);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAfterSales, setShowAfterSales] = useState(false);

  // Mock User Data
  const user = {
    name: '张先生',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    level: '黄金会员',
    points: 12500,
    balance: 8888,
    coupons: 4,
    referralCode: 'CX8888'
  };

  // Mock Orders
  const orders: Order[] = [
    {
      id: '202403150001',
      date: '2024-03-15',
      status: 'pending_receive',
      statusText: '待收货',
      total: 18800,
      items: [
        { id: '1', name: '极品达拉干沉香原材', brand: '承香秘藏', price: 18800, image: 'https://m.media-amazon.com/images/I/51a0UK8LfBL._AC_SX679_.jpg', quantity: 1, rating: 5, origin: '印尼' }
      ]
    },
    {
      id: '202402100055',
      date: '2024-02-10',
      status: 'completed',
      statusText: '已完成',
      total: 3500,
      items: [
         { id: '4', name: '惠安老料沉香油', brand: '精油系列', price: 3500, image: 'https://m.media-amazon.com/images/I/51a0UK8LfBL._AC_SX679_.jpg', quantity: 1, rating: 4.8, origin: '越南' }
      ]
    },
    {
       id: '202401050088',
       date: '2024-01-05',
       status: 'after_sales',
       statusText: '售后中',
       total: 1280,
       items: [
          { id: '3', name: '古法醇化芽庄线香', brand: '雅室系列', price: 1280, image: 'https://m.media-amazon.com/images/I/51a0UK8LfBL._AC_SX679_.jpg', quantity: 1, rating: 4.9, origin: '越南' }
       ]
    }
  ];

  // Update internal state when props change
  useEffect(() => {
    if (initialActiveTab) setActiveTab(initialActiveTab);
    if (initialSettingsTab) setSettingsTab(initialSettingsTab);
  }, [initialActiveTab, initialSettingsTab]);

  const handleShareReferral = () => {
    const shareUrl = `${window.location.origin}/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('推广链接已复制！\n发送给好友注册，即可绑定关系。'))
      .catch(() => alert(`您的推广码：${user.referralCode}`));
  };

  const renderContent = () => {
    if (selectedOrder) {
        if (showAfterSales) {
            return <AfterSalesProgress order={selectedOrder} onBack={() => setShowAfterSales(false)} />;
        }
        return <OrderDetail 
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)} 
            onViewAfterSales={(order) => setShowAfterSales(true)}
        />;
    }

    if (activeTab === 'settings') {
        // Render Settings Sub-page content
        return (
            <div className="bg-white rounded-xl shadow-sm border border-[#764F35]/10 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
                 <div className="w-full md:w-64 bg-[#F9F6F2] border-r border-[#764F35]/10">
                     <div className="p-6">
                         <h3 className="font-bold text-[#2D241E] mb-1">系统设置</h3>
                         <p className="text-xs text-stone-500">Settings</p>
                     </div>
                     <nav>
                         {[
                             { id: 'info', label: '个人资料' },
                             { id: 'security', label: '账号安全' },
                             { id: 'address', label: '地址管理' },
                             { id: 'verification', label: '实名认证' },
                             { id: 'account', label: '提现账户' }
                         ].map(item => (
                             <button
                                key={item.id}
                                onClick={() => setSettingsTab(item.id as any)}
                                className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${settingsTab === item.id ? 'bg-white text-[#764F35] border-l-4 border-[#764F35]' : 'text-stone-500 hover:text-[#2D241E] hover:bg-white/50 border-l-4 border-transparent'}`}
                             >
                                 {item.label}
                             </button>
                         ))}
                     </nav>
                     <div className="p-6 mt-auto">
                        <button onClick={() => onNavigate('login')} className="w-full border border-stone-300 text-stone-500 py-2 text-xs rounded-sm hover:border-red-500 hover:text-red-500 transition-colors">
                            退出登录
                        </button>
                     </div>
                 </div>
                 <div className="flex-1 p-6 md:p-10">
                     <h2 className="text-xl font-serif text-[#2D241E] mb-6 border-b border-[#764F35]/10 pb-4">
                        {settingsTab === 'info' && '个人资料'}
                        {settingsTab === 'security' && '账号安全'}
                        {settingsTab === 'address' && '地址管理'}
                        {settingsTab === 'verification' && '实名认证'}
                        {settingsTab === 'account' && '提现账户'}
                     </h2>
                     <div className="text-center py-20 text-stone-400">
                         <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         </div>
                         <p>功能模块开发中...</p>
                         <button onClick={() => setActiveTab('home')} className="text-[#764F35] text-sm mt-4 hover:underline">返回个人中心</button>
                     </div>
                 </div>
            </div>
        );
    }

    return (
        <>
            {/* User Info Card */}
            <div className="bg-[#2D241E] text-[#E9D6BE] rounded-xl p-8 shadow-lg relative overflow-hidden mb-10">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#C19A55]/20 to-transparent"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C19A55]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#C19A55] p-1 shadow-lg">
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-white mb-0">{user.name}</h2>
                            <span className="bg-[#C19A55] text-[#2D241E] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                {user.level}
                            </span>
                            <button 
                                onClick={handleShareReferral}
                                title="分享推广链接"
                                className="flex items-center gap-1.5 bg-[#C19A55]/20 text-[#C19A55] hover:bg-[#C19A55] hover:text-[#2D241E] transition-all px-3 py-1.5 rounded-full group"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                <span className="text-[10px] md:text-xs font-bold whitespace-nowrap">分享赚取佣金</span>
                            </button>
                        </div>
                        <p className="text-xs text-[#E9D6BE]/60 mb-6 font-light tracking-wide">会员ID: 88888888 | 注册时间: 2023-11-11</p>
                        
                        <div className="flex justify-center md:justify-start gap-8 md:gap-16 border-t border-[#E9D6BE]/10 pt-6">
                            <div className="text-center md:text-left cursor-pointer group" onClick={() => onNavigate('withdrawal-request')}>
                                <p className="text-2xl font-bold font-serif group-hover:text-white transition-colors">{user.balance.toLocaleString()}</p>
                                <p className="text-xs text-[#E9D6BE]/60 mt-1 group-hover:text-[#E9D6BE] transition-colors">余额 (CNY) &gt;</p>
                            </div>
                            <div className="text-center md:text-left cursor-pointer group" onClick={() => alert('积分兑换即将开放')}>
                                <p className="text-2xl font-bold font-serif group-hover:text-white transition-colors">{user.points.toLocaleString()}</p>
                                <p className="text-xs text-[#E9D6BE]/60 mt-1 group-hover:text-[#E9D6BE] transition-colors">积分 &gt;</p>
                            </div>
                            <div className="text-center md:text-left cursor-pointer group" onClick={() => onNavigate('coupon-manager')}>
                                <p className="text-2xl font-bold font-serif group-hover:text-white transition-colors">{user.coupons}</p>
                                <p className="text-xs text-[#E9D6BE]/60 mt-1 group-hover:text-[#E9D6BE] transition-colors">优惠券 &gt;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar Menu */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    {/* Quick Access Grid for Mobile */}
                    <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0 bg-white p-2 lg:p-0 rounded-xl lg:rounded-none shadow-sm lg:shadow-none lg:bg-transparent">
                        {[
                            { id: 'orders', label: '我的订单', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', active: activeTab === 'home' },
                            { id: 'wishlist', label: '我的收藏', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', active: activeTab === 'wishlist', action: () => onNavigate('wishlist') },
                            { id: 'team', label: '我的团队', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', action: () => onNavigate('team-members') },
                            { id: 'settings', label: '系统设置', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', action: () => { setActiveTab('settings'); setSettingsTab('info'); } },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={item.action || (() => setActiveTab('home'))}
                                className={`flex flex-col lg:flex-row items-center lg:px-6 lg:py-4 rounded-lg transition-all ${
                                    item.active 
                                    ? 'lg:bg-white lg:shadow-sm lg:text-[#764F35] text-[#764F35]' 
                                    : 'text-stone-500 lg:hover:bg-white/50 lg:hover:text-[#2D241E] hover:text-[#2D241E]'
                                }`}
                            >
                                <svg className="w-6 h-6 mb-1 lg:mb-0 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} /></svg>
                                <span className="text-[10px] lg:text-sm font-bold">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Agent Banner */}
                    <div 
                        onClick={() => onNavigate('agent-application')}
                        className="bg-gradient-to-br from-[#2D241E] to-[#4A3B32] p-6 rounded-xl text-[#E9D6BE] cursor-pointer shadow-lg group relative overflow-hidden"
                    >
                        <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-[#C19A55]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="font-serif font-bold text-lg mb-1 relative z-10">申请合伙人</h3>
                        <p className="text-xs opacity-70 mb-4 relative z-10">推广赚佣金 · 尊享特权</p>
                        <div className="inline-flex items-center text-xs font-bold bg-[#C19A55] text-[#2D241E] px-3 py-1.5 rounded-sm relative z-10 group-hover:bg-white transition-colors">
                            立即申请
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                    {/* Orders Section */}
                    <div className="bg-white rounded-xl border border-[#764F35]/10 shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-serif font-bold text-[#2D241E] text-lg">我的订单</h3>
                            <button className="text-xs text-stone-400 hover:text-[#764F35] flex items-center">
                                全部订单 <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        {/* Order Status Tabs */}
                        <div className="grid grid-cols-5 gap-2 mb-6 border-b border-[#764F35]/5 pb-4">
                            {[
                                { label: '待付款', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                { label: '待发货', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                                { label: '待收货', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                                { label: '待评价', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
                                { label: '退款/售后', icon: 'M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z' }
                            ].map((tab, idx) => (
                                <button key={idx} className="flex flex-col items-center group">
                                    <div className="w-8 h-8 mb-2 text-stone-300 group-hover:text-[#764F35] transition-colors relative">
                                         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={tab.icon} /></svg>
                                         {idx === 2 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>}
                                    </div>
                                    <span className="text-[10px] text-stone-500 group-hover:text-[#2D241E]">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Order List */}
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order.id} className="border border-[#764F35]/10 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-[#F9F6F2]/30" onClick={() => setSelectedOrder(order)}>
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#764F35]/5">
                                        <span className="text-xs text-stone-400">订单号: {order.id}</span>
                                        <span className={`text-xs font-bold ${order.status === 'completed' ? 'text-green-600' : order.status === 'after_sales' ? 'text-red-500' : 'text-[#C19A55]'}`}>
                                            {order.statusText}
                                        </span>
                                    </div>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 mb-3 last:mb-0">
                                            <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-[#2D241E] truncate mb-1">{item.name}</h4>
                                                <p className="text-xs text-stone-400 mb-2">{item.brand} | 规格: 标准</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-stone-500">x{item.quantity}</span>
                                                    <span className="text-sm font-medium text-[#2D241E]">¥{item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-3 pt-3 border-t border-[#764F35]/5 text-right flex justify-between items-center">
                                        <span className="text-xs text-stone-400">{order.date}</span>
                                        <div>
                                            <span className="text-xs text-stone-500 mr-2">实付款:</span>
                                            <span className="text-base font-bold text-[#764F35] font-serif">¥{order.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-end gap-2">
                                        {order.status === 'pending_receive' && (
                                            <>
                                                <button onClick={(e) => { e.stopPropagation(); alert('查看物流'); }} className="px-3 py-1.5 border border-stone-200 text-stone-500 text-xs rounded-sm hover:border-[#764F35] hover:text-[#764F35]">查看物流</button>
                                                <button onClick={(e) => { e.stopPropagation(); alert('确认收货'); }} className="px-3 py-1.5 border border-[#764F35] text-[#764F35] text-xs rounded-sm hover:bg-[#764F35] hover:text-white">确认收货</button>
                                            </>
                                        )}
                                        {order.status === 'completed' && (
                                            <button onClick={(e) => { e.stopPropagation(); alert('再次购买'); }} className="px-3 py-1.5 border border-[#764F35] text-[#764F35] text-xs rounded-sm hover:bg-[#764F35] hover:text-white">再次购买</button>
                                        )}
                                        {order.status === 'after_sales' && (
                                            <button onClick={(e) => { e.stopPropagation(); setShowAfterSales(true); setSelectedOrder(order); }} className="px-3 py-1.5 border border-[#764F35] text-[#764F35] text-xs rounded-sm hover:bg-[#764F35] hover:text-white">查看进度</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in min-h-screen">
       {renderContent()}
    </div>
  );
};
