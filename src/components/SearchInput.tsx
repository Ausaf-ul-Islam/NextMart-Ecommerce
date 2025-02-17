"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { ProductData } from "@/types";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  items: ProductData[];
}

const SearchInput: React.FC<SearchInputProps> = ({ items }) => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const router = useRouter();

  const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: string[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const filterProducts = useCallback(
    (searchTerm: string) => {
      const filtered = items.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsSearching(searchTerm.length > 0);
    },
    [items]
  );

  const debouncedFilterProducts = useCallback(
    debounce(filterProducts, 300),
    [filterProducts] //Fixed unnecessary dependency
  );

  useEffect(() => {
    debouncedFilterProducts(search);
  }, [search, debouncedFilterProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredProducts.length === 0) {
      return;
    }
    router.push(`/search?q=${search}`);
    setSearch("");
    setIsSearching(false);
  };

  const handleProductClick = (product: ProductData) => {
    setIsLoading(true);
    setSelectedProduct(product);
    setTimeout(() => {
      router.push(`/product/${product.slug}`);
      setSearch("");
      setIsSearching(false);
      setIsLoading(false);
      setSelectedProduct(null);
    }, 1000); // 1 second delay
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="w-full relative">
          <div className="flex items-center border border-gray-300 shadow-sm bg-white h-12 px-3">
            <CiSearch className="text-xl text-gray-500" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 h-full pl-3 text-sm text-gray-700 outline-none bg-transparent"
              aria-label="Search input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <IoMdClose
                className="text-gray-500 cursor-pointer"
                aria-hidden="true"
                onClick={() => setSearch("")}
              />
            )}
            <button
              type="submit"
              className="ml-3 bg-orange-500 text-white px-4 py-2 text-sm hover:bg-orange-600 transition"
              aria-label="Search button"
            >
              Search
            </button>
          </div>
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-md max-h-60 overflow-y-auto z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      isLoading && selectedProduct?._id === product._id
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleProductClick(product)}
                  >
                    <p className="text-gray-800 font-medium">{product.title}</p>
                    {isLoading && selectedProduct?._id === product._id && (
                      <p className="text-orange-500 text-sm">Loading...</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
