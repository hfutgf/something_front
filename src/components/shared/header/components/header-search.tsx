import { ClockFading, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const HeaderSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHasContent(e.target.value.length > 0);
  };

  return (
    <div ref={searchRef} className="relative max-w-[480px] w-full">
      <form
        className={`w-full border transition-all duration-200 ${
          isFocused
            ? 'border-gray-400 bg-gray-700'
            : 'border-gray-600 bg-gray-800'
        } p-2 rounded-full flex items-center`}
      >
        <input
          className="w-full bg-transparent text-base outline-none px-3 placeholder-gray-400 text-white"
          placeholder="Search..."
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button
          type="submit"
          disabled={hasContent}
          className={`p-1 rounded-full transition-colors ${
            hasContent ? 'text-white cursor-pointer ' : 'text-white/50'
          }`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </form>

      {isFocused && (
        <div className="absolute top-full mt-2 left-0 w-full max-h-[400px] overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          {query ? (
            <div className="p-4">
              <div className="mt-2 space-y-2">
                <div className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
                  <Search size={20} />
                  <span>Результат 1</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 text-gray-400">
              <div className="space-y-1">
                <div className="p-2 hover:bg-gray-700 rounded cursor-pointer text-sm flex items-center gap-2">
                  <ClockFading />
                  <span>Трендовый запрос 1</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
