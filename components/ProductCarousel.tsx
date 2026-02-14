import React, { useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  checkIsWishlisted: (product: Product) => boolean;
  onToggleWishlist: (e: React.MouseEvent, product: Product) => void;
  bgColor?: string;
  paddingClass?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  title, 
  subtitle, 
  products, 
  onProductClick, 
  checkIsWishlisted, 
  onToggleWishlist,
  bgColor = 'bg-white',
  paddingClass = 'py-20'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Scroll amount: roughly one screen width
      const scrollAmount = container.clientWidth;
      
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${bgColor} ${paddingClass} border-y border-[#764F35]/5`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-row justify-between items-end mb-12 gap-4">
           <div className="text-left">
              <h2 className="text-2xl md:text-5xl font-serif text-[#2D241E] mb-2 md:mb-4 tracking-tight">{title}</h2>
              <p className="text-[#764F35] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">{subtitle}</p>
              <div className="mt-4 h-0.5 w-16 bg-[#E9D6BE]"></div>
           </div>
           
           {/* Arrows */}
           <div className="flex gap-2 md:gap-3 pb-1 md:pb-2 flex-shrink-0">
              <button 
                onClick={() => scroll('left')} 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#764F35]/20 flex items-center justify-center text-[#764F35] hover:bg-[#764F35] hover:text-white transition-all active:scale-95"
              >
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#764F35]/20 flex items-center justify-center text-[#764F35] hover:bg-[#764F35] hover:text-white transition-all active:scale-95"
              >
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
           </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            // Mobile: 2 items per row (gap-4 = 16px). Calc: (100% - 16px)/2 = 50% - 8px
            // Desktop: 4 items per row (gap-6 = 24px * 3 gaps = 72px). Calc: (100% - 72px)/4 = 25% - 18px
            <div key={product.id} className="w-[calc(50%-8px)] md:w-[calc(25%-18px)] snap-start flex-shrink-0">
               <ProductCard 
                 product={product} 
                 onClick={onProductClick}
                 isWishlisted={checkIsWishlisted(product)}
                 onToggleWishlist={onToggleWishlist}
               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};