import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (e: React.MouseEvent, product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isWishlisted = false, onToggleWishlist }) => {
  return (
    <div 
      className="group relative bg-white border border-[#764F35]/5 transition-all duration-500 md:hover:shadow-[0_15px_40px_rgba(118,79,53,0.08)] overflow-hidden rounded-lg cursor-pointer h-full"
      onClick={() => onClick && onClick(product)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EBE1]/50 m-2 rounded-md md:rounded-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 opacity-90 rounded-md md:rounded-lg"
          crossOrigin="anonymous"
        />
        {product.tag && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#764F35] text-white px-2 py-0.5 md:px-3 md:py-1 text-[10px] uppercase font-bold tracking-widest shadow-sm rounded-sm z-10">
            {product.tag}
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          className="absolute top-2 right-2 md:top-3 md:right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm md:hover:bg-white text-[#764F35] transition-all duration-300 shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(e, product);
          }}
        >
          <svg 
            className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${isWishlisted ? 'fill-[#764F35] scale-110' : 'fill-none scale-100'}`} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <button className="absolute bottom-0 left-0 right-0 bg-[#764F35] text-white py-4 opacity-0 translate-y-full transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0 text-sm font-bold uppercase tracking-wider md:hover:bg-[#E9D6BE] md:hover:text-[#764F35] z-10 hidden md:block">
          查看详情
        </button>
      </div>
      <div className="p-4 md:p-6 text-center">
        <p className="text-[10px] text-[#764F35]/80 uppercase tracking-widest mb-1 font-bold truncate">{product.brand}</p>
        <h3 className="text-sm md:text-lg font-serif text-[#2D241E] mb-2 md:group-hover:text-[#764F35] transition-colors line-clamp-1">{product.name}</h3>
        <div className="flex justify-center mb-2 md:mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-[#E9D6BE]' : 'text-stone-300'}`}>★</span>
          ))}
        </div>
        <p className="text-base md:text-xl font-medium text-[#764F35]">¥{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};