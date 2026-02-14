
import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface HeaderProps {
  onCapture?: () => void;
  onNavigate: (tab: 'home' | 'academy' | 'categories' | 'cart' | 'profile' | 'wishlist' | 'about' | 'login') => void;
  cartCount?: number;
  wishlistCount?: number;
  onCategorySelect?: (category: Category) => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCapture, onNavigate, cartCount = 0, wishlistCount = 0, onCategorySelect, onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [desktopSearchValue, setDesktopSearchValue] = useState('');
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  
  // Settings Dropdown State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('中文 (简)');
  const [currency, setCurrency] = useState('CNY');
  
  // Profile Dropdown State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Navigation Dropdown State
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  
  // Refs for click outside detection
  const desktopSettingsRef = useRef<HTMLDivElement>(null);
  const mobileSettingsRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Settings Dropdown Check
      const outsideDesktop = desktopSettingsRef.current && !desktopSettingsRef.current.contains(target);
      const outsideMobile = mobileSettingsRef.current && !mobileSettingsRef.current.contains(target);
      if (outsideDesktop && outsideMobile) {
        setIsSettingsOpen(false);
      }

      // Profile Dropdown Check
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDesktopSearch = () => {
    if (desktopSearchValue.trim()) {
      onSearch(desktopSearchValue);
    }
  };

  const handleMobileSearch = () => {
    if (mobileSearchValue.trim()) {
      onSearch(mobileSearchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'desktop' | 'mobile') => {
    if (e.key === 'Enter') {
      if (type === 'desktop') handleDesktopSearch();
      else handleMobileSearch();
    }
  };

  const renderDropdownContent = () => (
    <>
      {/* Language Selection */}
      <div className="mb-5">
        <h6 className="text-[10px] text-[#764F35]/60 uppercase tracking-widest font-bold mb-3 border-b border-[#764F35]/10 pb-1">Language / 语言</h6>
        <div className="space-y-2.5">
          {['中文 (简)', 'English', '日本語'].map((lang) => (
            <div 
              key={lang} 
              className={`text-xs cursor-pointer md:hover:text-[#764F35] flex items-center transition-colors ${language === lang ? 'text-[#764F35] font-bold' : 'text-stone-500'}`}
              onClick={(e) => { e.stopPropagation(); setLanguage(lang); setIsSettingsOpen(false); }}
            >
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${language === lang ? 'bg-[#764F35]' : 'bg-transparent'}`}></div>
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <h6 className="text-[10px] text-[#764F35]/60 uppercase tracking-widest font-bold mb-3 border-b border-[#764F35]/10 pb-1">Currency / 货币</h6>
        <div className="space-y-2.5">
          {['CNY (¥)', 'USD ($)', 'HKD ($)'].map((curr) => {
            const currCode = curr.split(' ')[0];
            return (
              <div 
                key={curr} 
                className={`text-xs cursor-pointer md:hover:text-[#764F35] flex items-center transition-colors ${currency === currCode ? 'text-[#764F35] font-bold' : 'text-stone-500'}`}
                onClick={(e) => { e.stopPropagation(); setCurrency(currCode); setIsSettingsOpen(false); }}
              >
                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${currency === currCode ? 'bg-[#764F35]' : 'bg-transparent'}`}></div>
                <span>{curr}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-[#764F35] text-[#E9D6BE] py-1 px-4 flex justify-between items-center text-[8px] md:text-[10px] uppercase tracking-[0.15em] font-bold border-b border-white/5 relative z-50">
        <div className="hidden md:flex space-x-6 items-center" ref={desktopSettingsRef}>
          <div 
            className="flex items-center cursor-pointer md:hover:text-white transition-colors relative select-none"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <span>{language} / {currency}</span>
            <svg className={`w-2.5 h-2.5 ml-1 transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            
            {/* Desktop Dropdown Menu */}
            {isSettingsOpen && (
              <div className="absolute top-full left-0 mt-3 w-48 bg-white text-[#2D241E] shadow-xl rounded-md border border-[#764F35]/10 p-5 animate-fade-in normal-case tracking-normal z-50">
                <div className="absolute top-[-6px] left-8 w-3 h-3 bg-white border-t border-l border-[#764F35]/10 transform rotate-45"></div>
                {renderDropdownContent()}
              </div>
            )}
          </div>
        </div>
        <span className="truncate max-w-full text-center md:text-left flex-1 md:flex-none">承香名品：古法沉香 · 全球速递</span>
        <div className="hidden md:flex space-x-4 w-24"></div> 
      </div>

      {/* Main Nav */}
      <nav className="bg-[#ecdcc7]/95 backdrop-blur-md border-b border-[#764F35]/10 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <h1 className="font-serif font-bold tracking-tight text-[#764F35]">
              <span className="hidden md:block text-2xl lg:text-3xl">
                CHENGXIANG<span className="text-[#764F35]">.</span>承香
              </span>
              <span className="block md:hidden text-xl tracking-widest">
                沉香
              </span>
            </h1>
          </div>

          {/* Desktop Menu - Hidden on Mobile */}
          <div className="hidden lg:flex items-center space-x-10">
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setHoveredNav('collection')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button 
                onClick={() => onNavigate('home')}
                className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#764F35] md:hover:text-[#2D241E] relative py-2"
              >
                雅集珍藏
                <span className={`absolute bottom-0 left-0 w-0 h-[1px] bg-[#764F35] transition-all duration-300 ${hoveredNav === 'collection' ? 'w-full' : ''}`}></span>
              </button>
              
              {hoveredNav === 'collection' && (
                <div className="absolute top-[30px] left-1/2 transform -translate-x-1/2 pt-4 w-56 animate-fade-in z-[100]">
                  <div className="bg-white/95 backdrop-blur-md border border-[#764F35]/10 rounded-lg shadow-xl overflow-hidden">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => onCategorySelect && onCategorySelect(category)}
                        className="w-full text-left px-5 py-3 text-xs font-medium text-stone-600 hover:bg-[#F9F6F2] hover:text-[#764F35] transition-colors border-b border-[#764F35]/5 last:border-0 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-[#764F35]/30 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              { label: '沉香美学', action: () => onNavigate('categories') },
              { label: '沉香学堂', action: () => onNavigate('academy') },
              { label: '香道直播', action: () => alert('直播频道正在筹备中，敬请期待！') },
              { label: '关于我们', action: () => onNavigate('about') }
            ].map((item) => (
              <button 
                key={item.label} 
                onClick={item.action}
                className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#764F35] md:hover:text-[#2D241E] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#764F35] md:hover:after:w-full after:transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Search Bar (Centered) */}
          <div className="flex md:hidden flex-1 justify-center px-4">
            <div className="relative w-full max-w-[200px]">
               <input 
                type="text" 
                placeholder="搜索沉香..." 
                value={mobileSearchValue}
                onChange={(e) => setMobileSearchValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'mobile')}
                className="w-full bg-white/60 border border-[#764F35]/10 rounded-full py-1.5 pl-3 pr-8 text-[10px] focus:outline-none focus:border-[#764F35] transition-all"
              />
              <button 
                onClick={handleMobileSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#764F35]/60"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center text-[#764F35]">
            {/* Desktop Search Toggle */}
            <div className="hidden md:flex items-center">
              <div className={`relative flex items-center transition-all duration-500 ${isSearchOpen ? 'w-48 lg:w-64' : 'w-8'}`}>
                 <input 
                  type="text" 
                  placeholder="搜索珍藏..." 
                  value={desktopSearchValue}
                  onChange={(e) => setDesktopSearchValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'desktop')}
                  className={`w-full bg-white/40 border border-[#764F35]/10 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:border-[#764F35] transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                />
                <button 
                  onClick={() => {
                    if (isSearchOpen && desktopSearchValue.trim()) {
                      handleDesktopSearch();
                    } else {
                      setIsSearchOpen(!isSearchOpen);
                    }
                  }}
                  className="absolute right-0 w-8 h-8 flex items-center justify-center md:hover:text-[#2D241E] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Desktop Utility Icons */}
            <div className="hidden md:flex items-center ml-4 space-x-5 mr-4">
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  title="个人中心" 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className={`md:hover:text-[#2D241E] transition-all ${isProfileOpen ? 'text-[#2D241E]' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-[-10px] mt-4 w-40 bg-white text-[#2D241E] shadow-xl rounded-md border border-[#764F35]/10 overflow-hidden animate-fade-in z-50">
                    <div className="absolute top-[-6px] right-3.5 w-3 h-3 bg-white border-t border-l border-[#764F35]/10 transform rotate-45"></div>
                    <div className="py-2 relative bg-white z-10">
                      <button 
                        onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }}
                        className="w-full text-left px-5 py-3 text-xs font-bold text-stone-600 hover:bg-[#F9F6F2] hover:text-[#764F35] transition-colors border-b border-[#764F35]/5"
                      >
                        进入个人中心
                      </button>
                      <button 
                        onClick={() => { setIsProfileOpen(false); onNavigate('login'); }}
                        className="w-full text-left px-5 py-3 text-xs font-bold text-stone-600 hover:bg-[#F9F6F2] hover:text-[#764F35] transition-colors"
                      >
                        登录 / 注册
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button title="购物车" onClick={() => onNavigate('cart')} className="md:hover:text-[#2D241E] transition-all relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#764F35] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions (Cart moved here, positioned left of settings) */}
            <div className="md:hidden flex items-center">
              {/* Mobile Cart Button */}
              <button 
                title="购物车" 
                onClick={() => onNavigate('cart')} 
                className="flex items-center justify-center w-8 h-8 text-[#764F35] relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#764F35] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Language/Currency Switch */}
              <div className="relative ml-1" ref={mobileSettingsRef}>
                <button 
                   onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                   className="flex items-center justify-center w-8 h-8 text-[#764F35]"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>

                {isSettingsOpen && (
                  <div className="absolute top-full right-[-10px] mt-2 w-48 bg-white text-[#2D241E] shadow-xl rounded-md border border-[#764F35]/10 p-5 animate-fade-in normal-case tracking-normal z-50 text-left">
                    <div className="absolute top-[-6px] right-5 w-3 h-3 bg-white border-t border-l border-[#764F35]/10 transform rotate-45"></div>
                    {renderDropdownContent()}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </nav>
    </header>
  );
};
