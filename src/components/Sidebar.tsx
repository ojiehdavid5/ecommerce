import React from 'react';
import { useFilter } from './FilterSearch';

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const {
        setSearchQuery,
        selectedCategory,
        searchQuery,
        minPrice,
        maxPrice,
        setSelectedCategory,
        setminPrice,
        setmaxPrice,
    }=useFilter();
    const [categories, setCategories] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [keywords, setKeywords] = React.useState<string[]>(['Apple', 'watch', 'fashion', 'trend', 'shoe']);
    console.log(loading)
    const handleResetFilters = () => { 
        setSearchQuery('');
        setSelectedCategory('');
        setminPrice(undefined);
        setmaxPrice(undefined);
        setKeywords([]);
    }
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row relative">
    <div className='w-full sm:w-64 h-screen p-5 border-r-2 border-gray-300 bg-white'>
        <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
        <section>
            <input 
                type="text" 
                className="border-2 rounded px-2 mb-3 w-full" 
                placeholder="Search product" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row justify-center items-center mb-3">
                <input 
                    type="text" 
                    className='border-2 mr-0 sm:mr-2 mb-2 sm:mb-0 px-5 py-3 w-full' 
                    placeholder='min' 
                    value={minPrice}
                    onChange={e => setminPrice(Number(e.target.value))}
                />
                <input 
                    type="text" 
                    className='border-2 mr-0 sm:mr-2 mb-2 sm:mb-0 px-5 py-3 w-full' 
                    placeholder='max' 
                    value={maxPrice}
                    onChange={e => setmaxPrice(Number(e.target.value))}
                />
            </div>

            {/* Categories */}
            <div className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">Categories</h2>
            </div>

            {categories.map((category, index) => (
                <label key={index} className="block mb-2">
                    <input 
                        type="radio" 
                        name='category' 
                        value={category}
                        onChange={e => setSelectedCategory(e.target.value)}
                        checked={selectedCategory === category}
                        className="mr-2" 
                    />
                    {category.toUpperCase()}
                </label>
            ))}
        </section>
        
        {/* Keywords */}
        <div className="mb-5 mt-4">
            <h2 className="text-xl font-semibold mb-3">Keyword</h2>
            <div>
                {keywords.map((keyword, index) => (
                    <button
                        key={index}
                        onClick={() => setKeywords(keywords)}
                        className="block mb-2 px-4 py-2 w-full text-left border-2 rounded hover:bg-gray-200">
                        {keyword.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
        
        <button onClick={handleResetFilters} className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5'>
            Reset Filter
        </button>
    </div>
    </div>
)};

export default Sidebar;