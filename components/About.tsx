
import React from 'react';
import { SectionTitle } from './SectionTitle';
import { BANNER_URL } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-[#2D241E]">
        <img src={BANNER_URL} alt="About Us" className="w-full h-full object-cover opacity-60" crossOrigin="anonymous" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p className="text-[#C19A55] font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 animate-slide-up">Brand Story</p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#E9D6BE] mb-6 tracking-wide animate-slide-up animation-delay-100">关于承香</h1>
          <div className="w-16 h-1 bg-[#C19A55] rounded-full animate-slide-up animation-delay-200"></div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        
        {/* Brand Origin */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
           <div className="w-full md:w-1/2">
              <SectionTitle title="缘起" subtitle="The Origin" centered={false} />
              <div className="space-y-6 text-stone-600 leading-relaxed text-justify">
                <p>
                  <span className="text-4xl float-left mr-2 mt-[-10px] text-[#764F35] font-serif">承</span>
                  香名品，始于对东方传统香文化的一份执着与敬畏。在这个快节奏的时代，我们渴望寻找一种能让心灵栖息的媒介。沉香，集天地之灵气，汇日月之精华，历经百年结香，正是这份宁静的最佳载体。
                </p>
                <p>
                  我们的创始团队深入越南芽庄、印尼达拉干等核心产区，只为寻找那一抹最纯正的香韵。我们不只是销售沉香，更是在传递一种“静生慧，香养德”的生活哲学。
                </p>
                <p>
                  “承”意为传承，“香”代表美好。承香名品，立志做中国传统香文化的守护者与传播者，让古老的东方气韵，重新流淌在现代人的生活之中。
                </p>
              </div>
           </div>
           <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] bg-[#F9F6F2] rounded-lg overflow-hidden relative z-10">
                 <img src="https://images.unsplash.com/photo-1602606620594-e0a5c4852f86?q=80&w=1000&auto=format&fit=crop" alt="Tea and Incense" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-[#764F35]/20 z-0 rounded-lg"></div>
           </div>
        </div>

        {/* Philosophy Icons */}
        <div className="bg-[#F9F6F2] rounded-2xl p-12 mb-24 border border-[#764F35]/5">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-[#2D241E] mb-4">品牌理念</h2>
              <p className="text-[#764F35] text-xs font-bold uppercase tracking-[0.2em]">Our Philosophy</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: '至臻品质', desc: '坚持原产地直采，拒绝任何化学添加，确保每一克沉香都源自天然，品质可溯源。', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: '古法传承', desc: '遵循古法制香工艺，理香、炮制、窖藏，每一个环节都凝聚着匠人的心血与智慧。', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168 0.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332 0.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332 0.477-4.5 1.253' },
                { title: '美学生活', desc: '将香道融入现代生活美学，以香载道，以器承礼，打造属于当代人的精神栖息地。', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#764F35] shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500 border border-[#764F35]/10">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d={item.icon} /></svg>
                   </div>
                   <h3 className="text-xl font-serif text-[#2D241E] mb-3">{item.title}</h3>
                   <p className="text-sm text-stone-600 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Founder Quote */}
        <div className="relative py-16 px-6 md:px-20 bg-[#2D241E] text-[#E9D6BE] rounded-lg overflow-hidden text-center">
           <div className="absolute top-0 left-0 text-[120px] leading-none opacity-10 font-serif font-bold text-[#E9D6BE] ml-4">“</div>
           <div className="relative z-10">
              <p className="text-xl md:text-2xl font-serif italic mb-8 leading-relaxed">
                “ 香气，是时间的艺术，也是灵魂的对白。<br/>我们不生产香，我们只是大自然香韵的搬运工。 ”
              </p>
              <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#C19A55]">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#C19A55]">沉香雅士</p>
              <p className="text-[10px] text-[#E9D6BE]/60 uppercase tracking-widest mt-1">承香名品 创始人</p>
           </div>
           <div className="absolute bottom-[-40px] right-0 text-[120px] leading-none opacity-10 font-serif font-bold text-[#E9D6BE] mr-4 rotate-180">“</div>
        </div>

      </div>
    </div>
  );
};
