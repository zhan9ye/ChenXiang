
import React from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';

interface MallProps {
  products: Product[];
  selectedCategoryId: string | null;
  onCategorySelect: (id: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Mall: React.FC<MallProps> = ({ 
  products, 
  selectedCategoryId, 
  onCategorySelect, 
  onProductClick,
  onAddToCart 
}) => {
  const activeId = selectedCategoryId || CATEGORIES[0].id;

  return (
    <div className="flex h-[calc(100vh-64px-64px)] md:h-auto overflow-hidden bg-white">
      {/* Left Sidebar: Categories */}
      <div className="w-24 md:w-32 bg-[#F9F6F2] flex-shrink-0 overflow-y-auto no-scrollbar border-r border-[#764F35]/5">
        {CATEGORIES.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`w-full py-5 px-2 text-center transition-all relative ${
                isActive 
                  ? 'bg-white text-[#764F35] font-bold' 
                  : 'text-stone-500 text-sm'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#764F35] rounded-r-full"></div>
              )}
              <span className="block break-all leading-tight">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right Content: Products */}
      <div className="flex-1 overflow-y-auto bg-white p-3 md:p-6 custom-scrollbar">
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => onProductClick(product)}
                className="flex gap-3 md:gap-6 bg-white rounded-lg border border-[#764F35]/5 p-2 md:p-4 hover:shadow-sm active:bg-stone-50 transition-all cursor-pointer"
              >
                {/* Product Image */}
                <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-[#F2EBE1]/50 rounded-md overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  {product.tag && (
                    <div className="absolute top-0 left-0 bg-[#764F35] text-white text-[8px] px-1.5 py-0.5 rounded-br-md font-bold">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-[#2D241E] line-clamp-2 leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-stone-400 truncate">{product.brand}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                       <div className="flex items-baseline text-[#764F35]">
                          <span className="text-[10px] md:text-sm font-bold mr-0.5">¥</span>
                          <span className="text-lg md:text-2xl font-serif font-bold">{product.price.toLocaleString()}</span>
                       </div>
                       <div className="text-[9px] md:text-xs text-stone-400 line-through">
                          ¥{(product.price * 1.2).toFixed(0)}
                       </div>
                    </div>
                    
                    {/* Cart Button Removed as requested */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-stone-400 text-sm italic">
               该分类下暂无商品
            </div>
          )}
          
          {/* Bottom padding for mobile avoid bottom nav */}
          <div className="h-20 md:hidden"></div>
        </div>
      </div>
    </div>
  );
};
