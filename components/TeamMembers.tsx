
import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: '合伙人' | '黄金会员' | '普通会员';
  phone: string;
  avatar: string;
  joinDate: string;
  totalContribution: number;
}

interface TeamMembersProps {
  onBack: () => void;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const allMembers: TeamMember[] = [
    { id: '1', name: '用户9527', role: '合伙人', phone: '138****1234', avatar: 'https://i.pravatar.cc/150?u=2', joinDate: '2023-11-12', totalContribution: 5800 },
    { id: '2', name: '用户8081', role: '黄金会员', phone: '139****5678', avatar: 'https://i.pravatar.cc/150?u=1', joinDate: '2023-12-05', totalContribution: 3200 },
    { id: '3', name: '用户3306', role: '普通会员', phone: '150****9999', avatar: 'https://i.pravatar.cc/150?u=3', joinDate: '2024-01-20', totalContribution: 1500 },
    { id: '4', name: '用户1024', role: '普通会员', phone: '186****0000', avatar: 'https://i.pravatar.cc/150?u=4', joinDate: '2024-02-14', totalContribution: 850 },
    { id: '5', name: '用户6699', role: '普通会员', phone: '135****8888', avatar: 'https://i.pravatar.cc/150?u=5', joinDate: '2024-03-01', totalContribution: 420 },
    { id: '6', name: '用户7788', role: '普通会员', phone: '133****7777', avatar: 'https://i.pravatar.cc/150?u=6', joinDate: '2024-03-05', totalContribution: 120 },
    { id: '7', name: '用户2048', role: '黄金会员', phone: '159****2048', avatar: 'https://i.pravatar.cc/150?u=7', joinDate: '2024-03-10', totalContribution: 2100 },
  ];

  // Filter logic
  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.phone.includes(searchTerm)
  );

  const totalMembers = allMembers.length;
  const totalEarnings = allMembers.reduce((sum, m) => sum + m.totalContribution, 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen bg-[#F9F6F2]">
      {/* Back Button */}
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center text-xs text-[#764F35]/60 hover:text-[#764F35] transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回个人中心
        </button>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif text-[#2D241E]">我的团队</h1>
        <div className="relative w-full md:w-64">
           <input 
             type="text" 
             placeholder="搜索昵称或手机号..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-white border border-[#764F35]/10 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#764F35] shadow-sm transition-all"
           />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#764F35]/40">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
         <div className="bg-[#2D241E] text-[#E9D6BE] rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-[#C19A55]/10 rounded-full blur-xl pointer-events-none"></div>
            <p className="text-xs text-[#E9D6BE]/60 uppercase tracking-widest mb-1">团队总人数</p>
            <div className="flex items-baseline">
               <span className="text-3xl md:text-4xl font-serif font-bold text-white mr-1">{totalMembers}</span>
               <span className="text-xs text-[#E9D6BE]/60">人</span>
            </div>
         </div>
         <div className="bg-white text-[#2D241E] border border-[#764F35]/10 rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-[#764F35]">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-xs text-[#764F35]/60 uppercase tracking-widest mb-1">累计贡献收益</p>
            <div className="flex items-baseline">
               <span className="text-sm font-bold text-[#764F35] mr-1">¥</span>
               <span className="text-3xl md:text-4xl font-serif font-bold text-[#764F35]">{totalEarnings.toLocaleString()}</span>
            </div>
         </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl border border-[#764F35]/10 shadow-sm overflow-hidden">
         {/* List Header (Desktop only) */}
         <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-[#F9F6F2] border-b border-[#764F35]/5 text-xs font-bold text-[#764F35] uppercase tracking-widest">
            <div className="col-span-5">成员信息</div>
            <div className="col-span-4">加入时间</div>
            <div className="col-span-3 text-right">累计贡献</div>
         </div>

         <div className="divide-y divide-[#764F35]/5">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#F9F6F2]/30 transition-colors">
                   
                   {/* Member Info */}
                   <div className="col-span-1 md:col-span-5 flex items-center">
                      <div className="w-12 h-12 rounded-full border border-[#764F35]/10 p-0.5 mr-4 flex-shrink-0">
                         <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-[#2D241E]">{member.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${
                               member.role === '合伙人' ? 'border-[#C19A55] text-[#C19A55] bg-[#C19A55]/5' : 
                               member.role === '黄金会员' ? 'border-[#764F35]/40 text-[#764F35] bg-[#764F35]/5' : 
                               'border-stone-300 text-stone-400 bg-stone-50'
                            }`}>
                              {member.role}
                            </span>
                         </div>
                         <p className="text-xs text-stone-400">{member.phone}</p>
                      </div>
                   </div>

                   {/* Join Date */}
                   <div className="col-span-1 md:col-span-4 flex md:block items-center justify-between">
                      <span className="md:hidden text-xs text-stone-400">加入时间</span>
                      <span className="text-sm text-[#2D241E]/80">{member.joinDate}</span>
                   </div>

                   {/* Contribution */}
                   <div className="col-span-1 md:col-span-3 flex md:block items-center justify-between md:text-right">
                      <span className="md:hidden text-xs text-stone-400">累计贡献</span>
                      <span className="text-sm font-bold text-[#764F35]">
                        <span className="text-xs font-normal mr-0.5">+</span>
                        {member.totalContribution.toLocaleString()} 积分
                      </span>
                   </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-stone-400 text-sm">
                 未找到匹配的成员
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
