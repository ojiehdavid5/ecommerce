import React from 'react'
import { useFilter } from './FilterSearch'
import { useState, useEffect } from 'react'
import axios from 'axios'


const MainContent = () => {
    // const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilter();
    const [products, setProducts] = React.useState<any[]>([]);
    const [filter, setFilter] = React.useState("all");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [dropDownOpen, setDropDownOpen] = React.useState(false);
    const itemPerPage = 12
    const{keywords}=useFilter()
    
   useEffect(() => {
       let url: string;
       
       url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage-1)*itemPerPage}`

    if (keywords) {
        url = `https://dummyjson.com/products/search?q=${keywords}`;
        
    }
       fetch(url)
.then(res => res.json())
.then(console.log);

   }, [currentPage, keywords]);
    
    const filteredProducts() => {
        let filteredProducts=products
    }
    return (
        <section className='xl:w-[64rem]  lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button className="border px-4 py-2 rounded-full flex items-center">
                            
                            {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                        {dropDownOpen && (
                            <div className="absolute top-full left-0 bg-white border rounded shadow-lg mt-2">
                                <button onClick={()=>setFilter('cheap')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> Cheap</button>
                                <button onClick={()=>setFilter('expensive')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> expensive</button>
                                <button onClick={()=>setFilter('popular')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'> Popular</button>
                            </div>
                        )}
                    </div>

                </div>
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {/* Book card */}
                </div>
            </div>
    </section>
  )
}

export default MainContent
