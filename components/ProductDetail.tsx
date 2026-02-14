
import React, { useState, useEffect } from 'react';
import { Product, Variant } from '../types';
import { CheckoutModal } from './CheckoutModal';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product & { selectedVariant?: Variant, quantity: number }) => void;
  onBuyNow: (product: Product & { selectedVariant?: Variant, quantity: number }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent, product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, onBuyNow, isWishlisted, onToggleWishlist }) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'reviews'>('detail');
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Update current price based on variant
  const currentPrice = selectedVariant?.price || product.price;

  useEffect(() => {
    // Reset selection when product changes
    setSelectedVariant(product.variants?.[0]);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart({ ...product, price: currentPrice, selectedVariant, quantity });
  };

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
  };

  const handleShareProduct = () => {
    // Mock referral code for the current user
    const referralCode = 'CX8888';
    const shareUrl = `${window.location.origin}${window.location.pathname}?tab=product&id=${product.id}&ref=${referralCode}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert(`产品链接已复制！\n\n${shareUrl}\n\n好友通过此链接购买，您将自动获得推广佣金。`);
      })
      .catch(() => {
        alert(`您的推广链接：${shareUrl}\n\n请手动复制分享。`);
      });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-[80vh]">
      {/* Breadcrumb / Back */}
      <div className="mb-8 flex items-center text-xs md:text-sm text-[#764F35]/60 font-medium tracking-wide">
        <button onClick={onBack} className="md:hover:text-[#764F35] flex items-center transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回首页
        </button>
        <span className="mx-3 text-[#E9D6BE]">/</span>
        <span className="text-[#2D241E] truncate max-w-[200px] md:max-w-none">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
        {/* Left: Image */}
        <div className="bg-[#F9F6F2] rounded-lg overflow-hidden aspect-[4/5] relative group shadow-sm md:sticky md:top-24 md:h-fit">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
            crossOrigin="anonymous"
          />
          <button 
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm md:hover:bg-white text-[#764F35] transition-all duration-300 shadow-sm"
            onClick={(e) => onToggleWishlist(e, product)}
          >
             <svg 
              className={`w-6 h-6 transition-all duration-300 ${isWishlisted ? 'fill-[#764F35] scale-110' : 'fill-none scale-100'}`} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          {/* Brand label removed as requested */}
          
          <h1 className="text-3xl md:text-5xl font-serif text-[#2D241E] mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex text-[#E9D6BE] text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-[#C19A55]" : "text-stone-200"}>★</span>
              ))}
            </div>
            <span className="text-stone-300 text-sm">|</span>
            <span className="text-stone-500 text-sm">产地：{product.origin}</span>
            {product.tag && (
                 <>
                    <span className="text-stone-300 text-sm">|</span>
                    <span className="text-[#764F35] text-sm font-bold">{product.tag}</span>
                 </>
            )}
          </div>

          <div className="text-3xl md:text-4xl font-medium text-[#764F35] mb-4 font-serif">
            ¥{currentPrice.toLocaleString()}
          </div>

          {/* Short Description below Price */}
          {product.shortDescription && (
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-8">
              {product.shortDescription}
            </p>
          )}

          <div className="h-px w-full bg-[#764F35]/10 mb-8"></div>

          {/* SKU / Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2D241E] mb-3">规格选择</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-xs md:text-sm border transition-all rounded-sm ${
                      selectedVariant?.id === variant.id
                        ? 'border-[#764F35] bg-[#764F35] text-white shadow-md'
                        : 'border-[#764F35]/20 text-stone-600 md:hover:border-[#764F35] md:hover:text-[#764F35]'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-10">
             <h3 className="text-xs font-bold uppercase tracking-widest text-[#2D241E] mb-3">数量选择</h3>
             <div className="flex items-center w-32 border border-[#764F35]/20 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#764F35] md:hover:bg-[#F9F6F2] transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="flex-1 text-center font-medium text-[#2D241E]">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#764F35] md:hover:bg-[#F9F6F2] transition-colors"
                >
                  +
                </button>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#764F35] text-white py-4 px-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:hover:bg-[#5e3e2a] transition-all shadow-lg shadow-[#764F35]/20 transform md:hover:-translate-y-0.5"
            >
              立即购买
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 border border-[#764F35] text-[#764F35] py-4 px-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:hover:bg-[#764F35] md:hover:text-white transition-all transform md:hover:-translate-y-0.5"
            >
              加入购物车
            </button>
          </div>

          {/* Share Button */}
          <button 
            onClick={handleShareProduct}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-[#764F35]/30 text-[#764F35] py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#F9F6F2] hover:border-[#764F35] transition-all mb-12 group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            分享产品 (赚佣金)
          </button>

          <div className="border-t border-[#764F35]/10 pt-8 grid grid-cols-2 gap-6">
            <div className="flex items-start">
               <svg className="w-5 h-5 text-[#764F35] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"/></svg>
               <div>
                  <h6 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2D241E] mb-1">官方正品</h6>
                  <p className="text-[10px] text-stone-500">权威鉴定 · 假一赔十</p>
               </div>
            </div>
             <div className="flex items-start">
               <svg className="w-5 h-5 text-[#764F35] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
               <div>
                  <h6 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2D241E] mb-1">顺丰包邮</h6>
                  <p className="text-[10px] text-stone-500">极速发货 · 破损包赔</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detail Tabs */}
      <div className="mt-20 md:mt-32">
        <div className="flex justify-center space-x-12 border-b border-[#764F35]/10 mb-12">
            <button 
              onClick={() => setActiveTab('detail')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'detail' ? 'text-[#764F35]' : 'text-stone-400 md:hover:text-[#764F35]'}`}
            >
              商品详情
              {activeTab === 'detail' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#764F35]"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'reviews' ? 'text-[#764F35]' : 'text-stone-400 md:hover:text-[#764F35]'}`}
            >
              用户评论 ({product.reviews?.length || 0})
              {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#764F35]"></div>}
            </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'detail' && (
            <div className="max-w-4xl mx-auto">
               {product.detailContent ? (
                 <div 
                   className="prose prose-stone prose-img:rounded-lg prose-headings:font-serif prose-headings:text-[#764F35] prose-p:text-stone-600 max-w-none"
                   dangerouslySetInnerHTML={{ __html: product.detailContent }} 
                 />
               ) : (
                 <div className="text-center py-12 bg-[#F9F6F2] rounded-lg">
                   <p className="text-stone-500 italic font-serif">更多产品细节与高清大图，敬请期待...</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'reviews' && (
             <div className="max-w-4xl mx-auto space-y-8">
               {product.reviews && product.reviews.length > 0 ? (
                 product.reviews.map((review) => (
                   <div key={review.id} className="border-b border-[#764F35]/10 pb-8 last:border-0">
                     <div className="flex items-center mb-4">
                       <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover mr-4" />
                       <div>
                         <p className="text-sm font-bold text-[#2D241E]">{review.userName}</p>
                         <div className="flex items-center mt-1">
                           <div className="flex text-[#C19A55] text-xs mr-3">
                             {[...Array(5)].map((_, i) => (
                               <span key={i} className={i < Math.floor(review.rating) ? "text-[#C19A55]" : "text-stone-200"}>★</span>
                             ))}
                           </div>
                           <span className="text-xs text-stone-400">{review.date}</span>
                         </div>
                       </div>
                     </div>
                     <p className="text-stone-600 text-sm mb-4 leading-relaxed">{review.content}</p>
                     {review.images && review.images.length > 0 && (
                       <div className="flex gap-3 overflow-x-auto pb-2">
                         {review.images.map((img, idx) => (
                           <div key={idx} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-stone-200">
                             <img src={img} alt="review" className="w-full h-full object-cover cursor-pointer md:hover:opacity-90 transition-opacity" />
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 ))
               ) : (
                 <div className="text-center py-12 bg-[#F9F6F2] rounded-lg">
                   <p className="text-stone-500">暂无评论</p>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal 
            product={product}
            variant={selectedVariant}
            quantity={quantity}
            onClose={() => setIsCheckoutOpen(false)}
            onConfirm={() => {
                alert('支付成功！感谢您的购买。');
                setIsCheckoutOpen(false);
                onBack(); // Or navigate to order success page
            }}
        />
      )}
    </div>
  );
};
