
import React from 'react';

export interface FilterState {
  brands: string[];
  origins: string[];
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
}

interface ProductFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  availableOrigins: string[];
  onClose?: () => void; // For mobile drawer close
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  setFilters,
  availableBrands,
  availableOrigins,
  onClose
}) => {
  
  const handleCheckboxChange = (category: 'brands' | 'origins', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const isSelected = current.includes(value);
      if (isSelected) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      origins: [],
      minPrice: '',
      maxPrice: '',
      inStockOnly: false
    });
  };

  return (
    <div className="bg-white h-full flex flex-col rounded-lg border border-[#764F35]/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 flex-shrink-0 flex items-center justify-between border-b border-[#764F35]/5 bg-white">
        <h3 className="text-lg font-serif font-bold text-[#2D241E]">筛选</h3>
        <div className="flex items-center gap-4">
            <button onClick={clearFilters} className="text-[10px] text-stone-400 hover:text-[#764F35] underline uppercase tracking-wider">
              清除全部
            </button>
            {onClose && (
              <button onClick={onClose} className="md:hidden text-stone-400 hover:text-[#2D241E]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 pt-4 flex-1 overflow-y-auto custom-scrollbar">
        {/* Stock Status */}
        <div className="mb-8 pb-8 border-b border-[#764F35]/10">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
              />
              <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${filters.inStockOnly ? 'bg-[#764F35]' : 'bg-stone-200'}`}></div>
              <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition-transform ${filters.inStockOnly ? 'transform translate-x-5' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-[#2D241E] group-hover:text-[#764F35] transition-colors">仅看有货</span>
          </label>
        </div>

        {/* Price Range */}
        <div className="mb-8 pb-8 border-b border-[#764F35]/10">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35]/60 mb-4">价格区间 (¥)</h4>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="最低价" 
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#764F35]"
            />
            <span className="text-stone-400">-</span>
            <input 
              type="number" 
              placeholder="最高价" 
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="w-full bg-[#F9F6F2] border border-[#764F35]/10 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#764F35]"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="mb-8 pb-8 border-b border-[#764F35]/10">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35]/60 mb-4">品牌系列</h4>
          <div className="space-y-2">
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-stone-300 text-[#764F35] focus:ring-[#764F35] cursor-pointer accent-[#764F35]"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleCheckboxChange('brands', brand)}
                />
                <span className="ml-2 text-sm text-stone-600 group-hover:text-[#764F35] transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Origin */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#764F35]/60 mb-4">产地</h4>
          <div className="space-y-2">
            {availableOrigins.map(origin => (
              <label key={origin} className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-stone-300 text-[#764F35] focus:ring-[#764F35] cursor-pointer accent-[#764F35]"
                  checked={filters.origins.includes(origin)}
                  onChange={() => handleCheckboxChange('origins', origin)}
                />
                <span className="ml-2 text-sm text-stone-600 group-hover:text-[#764F35] transition-colors">{origin}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Button (Mobile Only) */}
      {onClose && (
        <div className="p-4 pb-8 border-t border-[#764F35]/10 flex-shrink-0 bg-white">
          <button 
            onClick={onClose}
            className="w-full bg-[#764F35] text-white py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#5e3e2a] transition-all"
          >
            确认筛选
          </button>
        </div>
      )}
    </div>
  );
};
