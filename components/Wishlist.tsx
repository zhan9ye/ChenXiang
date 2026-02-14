
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ITEMS_PER_PAGE } from '../constants';

interface WishlistProps {
  products: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ products, onRemove, onAddToCart, onProductClick, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page if current page becomes empty due to removals (and not on page 1)
  useEffect(() => {
    if (displayedProducts.length === 0 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [products.length, currentPage, displayedProducts.length]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-[80vh]">
      {/* Back Button */}
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-xs text-[#764F35]/60 hover:text-[#764F35] transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          返回个人中心
        </button>
      </div>

      <h1 className="text-3xl font-serif text-[#2D241E] mb-12 text-center md:text-left">我的收藏</h1>
      
      {products.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-[#F9F6F2] rounded-full flex items-center justify-center text-[#764F35]/30 mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="text-2xl font-serif text-[#2D241E] mb-2">您的收藏夹是空的</h2>
          <p className="text-stone-500 mb-8 text-sm">收藏您心仪的沉香臻品</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div key={product.id} className="relative">
                 <ProductCard 
                    product={product} 
                    onClick={onProductClick} 
                    isWishlisted={true}
                    onToggleWishlist={(e) => {
                        e.stopPropagation();
                        onRemove(product.id);
                    }}
                 />
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     onAddToCart(product);
                   }}
                   className="mt-3 w-full border border-[#764F35]/20 text-[#764F35] py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest md:hover:bg-[#764F35] md:hover:text-white transition-all rounded-sm"
                 >
                   加入购物车
                 </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-[#764F35]/20 rounded-sm text-[#764F35] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#764F35] hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-sm font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#764F35] text-white border-[#764F35]' 
                        : 'border-[#764F35]/20 text-[#764F35] hover:bg-[#764F35]/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-[#764F35]/20 rounded-sm text-[#764F35] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#764F35] hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
