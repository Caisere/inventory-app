'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function InventoryFilter () {
    const [inventoryFilter, setInventoryFilter] = useState('all')

    const searchParams = useSearchParams()

    const router = useRouter()

    const pathname = usePathname()



    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', inventoryFilter);
        router.replace(`${pathname}?${params.toString()}`);
    }, [inventoryFilter, pathname, router, searchParams]);


    return (
        <select value={inventoryFilter} onChange={(e) => setInventoryFilter(e.target.value)}  className="border border-gray-300 rounded-lg px-4 py-2 focus:border-transparent text-black">
            <option value="all">All Products</option>
            <option value='quantity-asc'>Quantity Asc</option>
            <option value='quantity-des'>Quantity Des</option>
            <option value='price-asc'>Price Asc</option>
            <option value='price-des'>Price Des</option>
            <option value='stock'>Stock</option>
        </select>
    )                                      
}

export default InventoryFilter;