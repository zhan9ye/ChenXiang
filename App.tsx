
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { Profile } from './components/Profile';
import { About } from './components/About';
import { ProductFilter, FilterState } from './components/ProductFilter';
import { SectionTitle } from './components/SectionTitle';
import { BlogDetail } from './components/BlogDetail';
import { AgentApplication } from './components/AgentApplication';
import { TeamMembers } from './components/TeamMembers';
import { CouponManager } from './components/CouponManager';
import { WithdrawalRequest } from './components/WithdrawalRequest';
import { BottomNav } from './components/BottomNav';
import { ProductCarousel } from './components/ProductCarousel';
import { Mall } from './components/Mall';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { 
  HOT_PRODUCTS, 
  BEST_SELLERS, 
  NEW_ARRIVALS, 
  CATEGORIES, 
  BLOGS, 
  KNOWLEDGE_ARTICLES,
  HERO_BANNERS,
  ITEMS_PER_PAGE
} from './constants';
import { Product, Category, BlogPost, CartItem, Variant } from './types';

// Pre-calculate unique products for deep linking lookup
const ALL_PRODUCTS = [...HOT_PRODUCTS, ...BEST_SELLERS, ...NEW_ARRIVALS];
const PRODUCT_MAP = new Map(ALL_PRODUCTS.map(item => [item.id, item]));

export const App = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'home';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId && PRODUCT_MAP.has(productId)) {
        return PRODUCT_MAP.get(productId) || null;
    }
    return null;
  });

  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Profile Navigation Params
  const [profileParams, setProfileParams] = useState<{
    tab: string;
    settingsTab: 'info' | 'security' | 'address' | 'verification' | 'account';
  }>({ tab: 'home', settingsTab: 'info' });
  
  // Initialize Wishlist with 30 mock items for testing pagination
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const mocks: Product[] = [];
    const baseProducts = [...HOT_PRODUCTS, ...BEST_SELLERS];
    for (let i = 0; i < 30; i++) {
        const base = baseProducts[i % baseProducts.length];
        mocks.push({
            ...base,
            id: `wish-test-${i}`,
            name: `${base.name} (收藏测试-${i + 1})`
        });
    }
    return mocks;
  });
  
  // New State for Category Selection (Mobile Navigation)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Footer Mobile State
  const [mobileFooterExpanded, setMobileFooterExpanded] = useState<string | null>(null);
  
  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination State
  const [desktopPage, setDesktopPage] = useState(1);
  const [mobilePage, setMobilePage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    origins: [],
    minPrice: '',
    maxPrice: '',
    inStockOnly: false
  });

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Blog Carousel Refs
  const blogScrollRef = useRef<HTMLDivElement>(null);

  // Detect Mobile View
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset pagination when filters or category changes
  useEffect(() => {
    setDesktopPage(1);
    setMobilePage(1);
  }, [filters, selectedCategory, activeTab]);

  // Infinite Scroll Listener for Mobile
  useEffect(() => {
    if (!isMobile || activeTab !== 'categories' || selectedProduct) return;
    // Mall layout handles scrolling differently, but we keep this for consistency if needed
    if (!selectedCategory && isMobile) return; 

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setMobilePage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, activeTab, selectedProduct, selectedCategory]);

  const scrollBlog = (direction: 'left' | 'right') => {
    if (blogScrollRef.current) {
      const container = blogScrollRef.current;
      const scrollAmount = container.clientWidth;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const toggleFooterSection = (section: string) => {
    setMobileFooterExpanded(prev => prev === section ? null : section);
  };

  // Derived state for footer visibility
  const showMobileFooter = ['home', 'about', 'academy'].includes(activeTab) && !selectedProduct && !selectedBlogPost;

  const navigateTo = (tab: string, keepCategory: boolean = false) => {
    // Treat 'deals' as an alias for 'coupon-manager'
    const targetTab = tab === 'deals' ? 'coupon-manager' : tab;
    
    setActiveTab(targetTab);
    setSelectedProduct(null);
    setSelectedBlogPost(null);
    // Reset category selection when navigating to categories tab from bottom nav, unless explicitly kept
    if (targetTab === 'categories' && !keepCategory) {
        setSelectedCategory(CATEGORIES[0].id);
    }
    // Reset profile params when navigating to profile generally
    if (targetTab === 'profile') {
        setProfileParams({ tab: 'home', settingsTab: 'info' });
    }
    
    // Update URL without reloading to allow back navigation or refresh to stay on tab
    const url = new URL(window.location.href);
    url.searchParams.set('tab', targetTab);
    // Remove id from url if navigating away from product
    url.searchParams.delete('id');
    window.history.pushState({}, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSettings = (type: 'verification' | 'account') => {
    setProfileParams({ tab: 'settings', settingsTab: type });
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'product'); 
    url.searchParams.set('id', product.id);
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product & { selectedVariant?: Variant, quantity?: number }) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedVariant?.id === product.selectedVariant?.id);
      if (existingItem) {
        return prev.map(item => 
          (item.id === product.id && item.selectedVariant?.id === product.selectedVariant?.id)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    alert('已加入购物车');
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setWishlistItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (product: Product) => wishlistItems.some(p => p.id === product.id);

  const uniqueProducts = Array.from(PRODUCT_MAP.values());
  const availableBrands = Array.from(new Set(uniqueProducts.map(p => p.brand)));
  const availableOrigins = Array.from(new Set(uniqueProducts.map(p => p.origin)));

  const renderHome = () => (
    <div className="animate-fade-in bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src={HERO_BANNERS[0].image} 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
          crossOrigin="anonymous" 
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide shadow-sm">{HERO_BANNERS[0].title}</h1>
          <p className="text-lg md:text-xl tracking-widest font-light">{HERO_BANNERS[0].subtitle}</p>
          <button 
            onClick={() => navigateTo('categories')}
            className="mt-8 border border-white px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#764F35] transition-all"
          >
            探索雅集
          </button>
        </div>
      </div>

      <ProductCarousel 
        title="送礼推荐" 
        subtitle="Gift Recommendations" 
        products={BEST_SELLERS} 
        onProductClick={handleProductClick}
        checkIsWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
        bgColor="bg-white"
        paddingClass="pt-20 pb-10"
      />

      <ProductCarousel 
        title="热销产品" 
        subtitle="Hot Products" 
        products={HOT_PRODUCTS} 
        onProductClick={handleProductClick}
        checkIsWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
        bgColor="bg-white"
        paddingClass="pt-10 pb-20"
      />

      <div className="w-full h-[300px] md:h-[400px] overflow-hidden relative">
        <img 
          src={HERO_BANNERS[0].image}
          alt="Banner" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl text-white font-serif tracking-[0.2em] border-y-2 border-white/50 py-4">
                古法制香 · 匠心传承
            </h2>
        </div>
      </div>

      <ProductCarousel 
        title="新品上市" 
        subtitle="New Arrivals" 
        products={NEW_ARRIVALS} 
        onProductClick={handleProductClick}
        checkIsWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
        bgColor="bg-white"
      />

      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionTitle title="香道分类" subtitle="Categories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map(cat => (
               <div key={cat.id} className="group cursor-pointer overflow-hidden rounded-lg shadow-sm" onClick={() => { setSelectedCategory(cat.id); navigateTo('categories', true); }}>
                  <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
                     <img 
                       src={cat.image} 
                       alt={cat.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                       crossOrigin="anonymous" 
                     />
                  </div>
               </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Intro Section (Omitted content for brevity but kept in place) */}
      <div className="bg-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full md:w-1/2 space-y-8">
                  <h2 className="text-4xl font-serif text-[#2D241E] leading-tight">沉香的艺术<br/><span className="text-[#764F35]">时间的馈赠</span></h2>
                  <div className="w-16 h-1 bg-[#764F35]"></div>
                  <p className="text-stone-600 leading-loose text-justify text-base md:text-lg">
                      沉香，被誉为“众香之首”，是植物界的瑰宝。它不仅是一种香料，更是一种文化，一种精神的寄托。在繁忙的都市生活中，点一炉沉香，看烟云舒卷，品味那份难得的宁静与淡然。
                  </p>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-stone-100 rounded-lg overflow-hidden relative group cursor-pointer shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1599818461765-a83a0429d3c5?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" 
                    alt="Brand Video Cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-[#764F35]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAcademy = () => (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in">
        <SectionTitle title="承香学堂" subtitle="Agarwood Academy" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.map(blog => (
                <div key={blog.id} className="group cursor-pointer flex flex-col h-full" onClick={() => setSelectedBlogPost(blog)}>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <span className="absolute top-2 left-2 bg-[#764F35] text-white text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">{blog.category}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2D241E] mb-2 group-hover:text-[#764F35] transition-colors">{blog.title}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2 mb-4 flex-1">{blog.excerpt}</p>
                    <div className="text-xs font-bold text-[#764F35] uppercase tracking-widest flex items-center">
                        Read More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderProductCollection = () => {
     let filtered = uniqueProducts;
     const activeCategoryId = selectedCategory || CATEGORIES[0].id;

     // Filter by category
     const catName = CATEGORIES.find(c => c.id === activeCategoryId)?.name;
     if (catName) {
         filtered = filtered.filter(p => p.tag?.includes(catName) || p.name.includes(catName) || p.tag === activeCategoryId);
     }

     if (isMobile) {
        return (
            <Mall 
                products={filtered}
                selectedCategoryId={activeCategoryId}
                onCategorySelect={setSelectedCategory}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
            />
        );
     }

     // Desktop Filter Logic
     if (filters.inStockOnly) filtered = filtered.filter(p => p.inStock !== false); 
     if (filters.minPrice) filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
     if (filters.maxPrice) filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
     if (filters.brands.length > 0) filtered = filtered.filter(p => filters.brands.includes(p.brand));
     if (filters.origins.length > 0) filtered = filtered.filter(p => filters.origins.includes(p.origin));

     const page = desktopPage;
     const itemsToShow = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
     const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

     return (
        <div className="max-w-[1400px] mx-auto px-6 py-8 md:py-12 animate-fade-in flex flex-col md:flex-row gap-8">
            <div className="hidden md:block w-64 flex-shrink-0">
                <ProductFilter 
                    filters={filters} 
                    setFilters={setFilters} 
                    availableBrands={availableBrands} 
                    availableOrigins={availableOrigins} 
                />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-serif text-[#2D241E]">
                        {CATEGORIES.find(c => c.id === activeCategoryId)?.name}
                        <span className="text-sm font-sans text-stone-500 ml-3 font-normal">({filtered.length} items)</span>
                     </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {itemsToShow.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onClick={handleProductClick}
                            isWishlisted={isWishlisted(product)}
                            onToggleWishlist={handleToggleWishlist}
                        />
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 space-x-2">
                         {Array.from({ length: totalPages }).map((_, i) => (
                             <button
                                key={i}
                                onClick={() => setDesktopPage(i + 1)}
                                className={`w-10 h-10 flex items-center justify-center border rounded-sm transition-all ${desktopPage === i + 1 ? 'bg-[#764F35] text-white border-[#764F35]' : 'border-[#764F35]/20 text-[#764F35] hover:bg-[#764F35]/10'}`}
                             >
                                {i + 1}
                             </button>
                         ))}
                    </div>
                )}
            </div>
        </div>
     );
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen flex flex-col font-sans text-[#2D241E]">
      <Header 
        onNavigate={navigateTo} 
        cartCount={cartTotalCount}
        wishlistCount={wishlistItems.length}
        onCategorySelect={(cat) => { setSelectedCategory(cat.id); navigateTo('categories'); }}
        onSearch={(q) => { 
            alert(`搜索功能: ${q}`); 
            navigateTo('categories'); 
        }}
      />
      
      <main className="flex-1 pb-16 md:pb-0">
         {selectedProduct ? (
             <ProductDetail 
                product={selectedProduct} 
                onBack={() => { setSelectedProduct(null); navigateTo('home'); }}
                onAddToCart={handleAddToCart}
                onBuyNow={(p) => alert(`立即购买: ${p.name}`)}
                isWishlisted={isWishlisted(selectedProduct)}
                onToggleWishlist={handleToggleWishlist}
             />
         ) : selectedBlogPost ? (
             <BlogDetail 
                post={selectedBlogPost} 
                onBack={() => setSelectedBlogPost(null)}
                onRegister={(id) => {
                    const product = uniqueProducts.find(p => p.id === id);
                    if (product) handleProductClick(product);
                    else alert('Product not found');
                }}
             />
         ) : (
             <>
                 {activeTab === 'home' && renderHome()}
                 {activeTab === 'categories' && renderProductCollection()}
                 {activeTab === 'academy' && renderAcademy()}
                 {activeTab === 'cart' && (
                     <Cart 
                        items={cartItems}
                        onUpdateQuantity={handleUpdateCartQuantity}
                        onRemove={handleRemoveFromCart}
                        onCheckout={() => { setCartItems([]); alert('Checkout success!'); navigateTo('home'); }}
                        onContinueShopping={() => navigateTo('categories')}
                     />
                 )}
                 {activeTab === 'profile' && <Profile onNavigate={navigateTo} initialActiveTab={profileParams.tab} initialSettingsTab={profileParams.settingsTab} />}
                 {activeTab === 'wishlist' && (
                     <Wishlist 
                        products={wishlistItems}
                        onRemove={(id) => setWishlistItems(prev => prev.filter(p => p.id !== id))}
                        onAddToCart={(p) => handleAddToCart(p)}
                        onProductClick={handleProductClick}
                        onBack={() => navigateTo('profile')}
                     />
                 )}
                 {activeTab === 'about' && <About />}
                 {activeTab === 'agent-application' && <AgentApplication onBack={() => navigateTo('profile')} onSubmit={() => { alert('Submitted!'); navigateTo('profile'); }} />}
                 {activeTab === 'team-members' && <TeamMembers onBack={() => navigateTo('profile')} />}
                 {activeTab === 'coupon-manager' && <CouponManager onBack={() => navigateTo('profile')} onGoHome={() => navigateTo('categories')} />}
                 {activeTab === 'withdrawal-request' && <WithdrawalRequest onBack={() => navigateTo('profile')} balance={8888} points={12500} onNavigateToSettings={handleNavigateToSettings} />}
                 {activeTab === 'login' && <Login onNavigate={navigateTo} onLogin={() => navigateTo('home')} />}
                 {activeTab === 'register' && <Register onNavigate={navigateTo} onRegister={() => navigateTo('login')} />}
                 {activeTab === 'forgot-password' && <ForgotPassword onNavigate={navigateTo} />}
             </>
         )}
      </main>

      {!selectedProduct && !selectedBlogPost && showMobileFooter && (
         <footer className="bg-[#2D241E] text-[#E9D6BE] py-12 md:py-16 border-t border-white/5 pb-24 md:pb-20">
            <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                  <div className="col-span-1 md:col-span-1 text-center md:text-left mb-8 md:mb-0">
                     <h2 className="text-2xl font-serif font-bold mb-6 tracking-wider text-white">CHENGXIANG.</h2>
                     <p className="text-sm text-stone-400 leading-relaxed">
                        承香名品致力于传承东方香道文化，甄选全球顶级沉香。
                     </p>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                     <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">关于我们</h3>
                     <div className="space-y-3 text-sm text-stone-400">
                        <p>品牌故事</p>
                        <p>香道文化</p>
                     </div>
                  </div>
               </div>
               <div className="border-t border-white/5 mt-8 pt-8 text-center text-xs text-stone-600">
                  <p>&copy; 2024 CHENGXIANG. All rights reserved.</p>
               </div>
            </div>
         </footer>
      )}

      <BottomNav activeTab={activeTab} onNavigate={navigateTo} cartCount={cartTotalCount} />

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
            <div className="relative w-[80%] max-w-[320px] bg-white h-full shadow-2xl animate-slide-left">
                <ProductFilter 
                    filters={filters}
                    setFilters={setFilters}
                    availableBrands={availableBrands}
                    availableOrigins={availableOrigins}
                    onClose={() => setIsMobileFilterOpen(false)}
                />
            </div>
        </div>
      )}
    </div>
  );
};
