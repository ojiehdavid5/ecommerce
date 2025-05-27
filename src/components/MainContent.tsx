import  { useState, useEffect } from 'react';
import { useFilter } from './FilterSearch';
import BookCard from './BookCard';

const MainContent = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const itemPerPage = 12;
    const { keywords, selectedCategory, minPrice, maxPrice, searchQuery } = useFilter();
    console.log(setDropDownOpen)
       const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    }

    const debouncedSearchQuery = useDebounce(searchQuery, 50000);
    debouncedSearchQuery && console.log('Debounced Search Query:', debouncedSearchQuery);

    useEffect(() => {
    let url: string;

    // Default URL for fetching products
    url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage - 1) * itemPerPage}`;

    // if (keywords && keywords.trim()) {
    //     url = `https://dummyjson.com/products/search?q=${keywords}`;
    // }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.products) {
                setProducts(data.products);
                console.log(data.products);
            } else {
                console.error('No products found in the response');
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

}, [currentPage, keywords]);
    const getFilteredProducts = () => {
        let filteredProducts = products;

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }

        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price > minPrice);
        }
        
        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price < maxPrice);
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return filteredProducts;
    };

    const filteredProducts = getFilteredProducts();
    console.log(filteredProducts);

    // Sorting based on the selected filter
    const sortedProducts = (() => {
        switch (filter) {
            case "expensive":
                return filteredProducts.sort((a, b) => b.price - a.price);
            case "cheap":
                return filteredProducts.sort((a, b) => a.price - b.price);
            case "popular":
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts;
        }
    })();
    console.log(sortedProducts)

    const totalProducts = 100;
    const totalPages=Math.ceil(totalProducts/itemPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page < totalPages) {
            setCurrentPage(page)
        }
        
    }


   const getPaginationButtons = (totalPages:number) => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}>
                {i}
            </button>
        );
    }

    return buttons;
};
    return (
    <section className='flex-1 p-5'>
        <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
                <div className="relative">
                    <button onClick={() => setDropDownOpen(!dropDownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                        {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                    {dropDownOpen && (
                        <div className="absolute top-full left-0 bg-white border rounded shadow-lg mt-2">
                            <button onClick={() => setFilter('cheap')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> Cheap</button>
                            <button onClick={() => setFilter('expensive')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> Expensive</button>
                            <button onClick={() => setFilter('popular')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> Popular</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {/* Render your products here using sortedProducts */}
                {filteredProducts.map(product => (
                    <BookCard key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.thumbnail}
                        price={product.price}
                    />
                ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                {/* Previous */}
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='border px-4 py-2 mx-2 rounded-full'>
                    Previous
                </button>
                {/* Pagination buttons */}
                <div className="flex flex-wrap justify-center">
                    {getPaginationButtons(currentPage)}
                </div>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='border px-4 py-2 mx-2 rounded-full'>
                    Next
                </button>
            </div>
        </div>
    </section>
);
}

export default MainContent;