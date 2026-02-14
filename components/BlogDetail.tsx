
import React from 'react';
import { BlogPost } from '../types';

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
  onRegister?: (productId: string) => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack, onRegister }) => {
  const isCourse = !!post.lecturer;

  const handleRegisterClick = () => {
    if (post.relatedProductId && onRegister) {
      onRegister(post.relatedProductId);
    } else {
      alert('报名通道暂未开启，请联系客服。');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-[80vh]">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center text-xs md:text-sm text-[#764F35]/60 hover:text-[#764F35] transition-colors group"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回列表
        </button>
        <span className="text-xs font-bold text-[#764F35] bg-[#764F35]/10 px-3 py-1 rounded-full uppercase tracking-widest">
            {post.category}
        </span>
      </div>

      {isCourse ? (
        // --- COURSE DETAIL LAYOUT ---
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar: Course Info */}
          <div className="lg:w-[350px] flex-shrink-0 order-2 lg:order-1">
             <div className="bg-white rounded-xl border border-[#764F35]/10 shadow-lg overflow-hidden sticky top-24">
                <div className="bg-[#764F35] p-6 text-[#E9D6BE]">
                   <h3 className="text-lg font-serif font-bold mb-1">课程信息</h3>
                   <p className="text-xs opacity-70 uppercase tracking-widest">Course Details</p>
                </div>
                
                <div className="p-6 space-y-6">
                   {/* Lecturer */}
                   <div className="flex items-center pb-6 border-b border-[#764F35]/5">
                      <div className="w-12 h-12 bg-[#F9F6F2] rounded-full flex items-center justify-center text-[#764F35] border border-[#764F35]/20 mr-4">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div>
                         <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">讲课老师</p>
                         <p className="font-bold text-[#2D241E]">{post.lecturer}</p>
                      </div>
                   </div>

                   {/* Time */}
                   <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#764F35] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <div>
                         <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">开课时间</p>
                         <p className="text-sm font-medium text-[#2D241E]">{post.courseTime}</p>
                      </div>
                   </div>

                   {/* Location */}
                   <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#764F35] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <div>
                         <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">开课地点</p>
                         <p className="text-sm font-medium text-[#2D241E]">{post.location}</p>
                      </div>
                   </div>

                   {/* Contact */}
                   <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#764F35] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <div>
                         <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">联系方式</p>
                         <p className="text-sm font-medium text-[#2D241E] mb-1">{post.contactPhone}</p>
                         <p className="text-sm text-stone-500 break-all">{post.contactEmail}</p>
                      </div>
                   </div>

                   {/* Register Button */}
                   <button 
                     onClick={handleRegisterClick}
                     className="w-full bg-[#764F35] text-white py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5e3e2a] transition-all shadow-md mt-4"
                   >
                     立即报名
                   </button>

                   {/* Warm Tips */}
                   {post.tips && post.tips.length > 0 && (
                     <div className="bg-[#F9F6F2] rounded-lg p-4 mt-6">
                        <h4 className="text-xs font-bold text-[#764F35] mb-2 flex items-center">
                           <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           温馨提示
                        </h4>
                        <ul className="text-[10px] text-stone-600 space-y-1.5 list-disc pl-3 leading-relaxed">
                           {post.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                           ))}
                        </ul>
                     </div>
                   )}
                </div>
             </div>
          </div>

          {/* Right Content: Blog Body */}
          <div className="flex-1 order-1 lg:order-2">
             <h1 className="text-3xl md:text-4xl font-serif text-[#2D241E] mb-4 leading-tight">{post.title}</h1>
             <div className="flex items-center text-xs text-stone-500 space-x-4 uppercase tracking-widest mb-8">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>承香学堂</span>
             </div>

             <div className="w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden rounded-xl mb-10 shadow-lg">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
             </div>

             <div className="max-w-none">
                {post.content ? (
                    <article 
                      className="prose prose-stone prose-lg prose-headings:font-serif prose-headings:text-[#764F35] prose-p:text-stone-600 prose-blockquote:font-serif prose-blockquote:not-italic prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                ) : (
                    <div className="py-20 text-center text-stone-500 italic">
                        课程详情正在更新中...
                    </div>
                )}
             </div>
          </div>
        </div>
      ) : (
        // --- ORIGINAL BLOG LAYOUT ---
        <>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-5xl font-serif text-[#2D241E] mb-6 leading-tight">{post.title}</h1>
              <div className="flex items-center justify-center text-xs text-stone-500 space-x-4 uppercase tracking-widest">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                  <span>承香学堂</span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                  <span>阅读时间 5分钟</span>
              </div>
          </div>

          {/* Cover Image */}
          <div className="w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden rounded-xl mb-16 shadow-lg">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="max-w-[720px] mx-auto">
              {post.content ? (
                  <article 
                    className="prose prose-stone prose-lg prose-headings:font-serif prose-headings:text-[#764F35] prose-p:text-stone-600 prose-blockquote:font-serif prose-blockquote:not-italic prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
              ) : (
                  <div className="py-20 text-center text-stone-500 italic">
                      文章内容正在撰写中...
                  </div>
              )}

              {/* Footer Share/Tags (Mock) */}
              <div className="mt-16 pt-8 border-t border-[#764F35]/10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-2">
                      {['沉香', '香道', '传统文化'].map(tag => (
                          <span key={tag} className="text-xs text-stone-500 bg-[#F9F6F2] px-3 py-1 rounded-sm">#{tag}</span>
                      ))}
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#764F35] uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity">
                      <span className="mr-3">分享文章</span>
                      <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full border border-[#764F35]/20 flex items-center justify-center"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></div>
                          <div className="w-8 h-8 rounded-full border border-[#764F35]/20 flex items-center justify-center"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></div>
                  </div>
              </div>
          )}
    </div>
  );
};
