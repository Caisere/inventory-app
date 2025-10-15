import InventoryFilter from "@/app/components/inventoryfilter";
import InventoryLists from "@/app/components/inventorylists";
import { Suspense } from "react";

async function Inventory ({searchParams} : {searchParams: {filter: string}}) {
    const query = await searchParams;
    const filter = query?.filter || 'all'
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Inventory
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage your products and track inventory levels.
                    </p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                {/* Search */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <form className="flex gap-2" action="/inventory" method="GET">
                        <input
                            name="q"
                            placeholder="Search products..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                        />
                        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Inventory Filter */}
            <div className="mb-6 justify-items-end">
                <InventoryFilter />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                SKU
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Low Stock At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <Suspense fallback={
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    Loading inventory...
                                </td>
                            </tr>
                        }>
                            <InventoryLists filter={filter} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Inventory;