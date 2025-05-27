import { createContext, useContext, useState,useEffect } from "react";
import type { ReactNode } from 'react';
interface FilterContextType { 
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    minPrice: number | undefined;
    setminPrice: (price: number | undefined) => void;
    maxPrice: number | undefined;
    setmaxPrice: (price: number | undefined) => void;
    keywords: string;
    setKeywords: (keywords: any) => void;
    
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);
export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [minPrice, setminPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setmaxPrice] = useState<number | undefined>(undefined);
    const [keywords, setKeywords] = useState<string>("laptop, phone, tablet, watch, headphone");


    const value = {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setminPrice,
        maxPrice,
        setmaxPrice,
        keywords,
        setKeywords
    };
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
}