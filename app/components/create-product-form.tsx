import Link from "next/link";
import { createProduct } from "@/lib/actions";
import { FormActionBtn } from "./form-action-btn";

function CreateProductForm() {
    return (
        <form className="space-y-6" action={createProduct}>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Product Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-black"
                    placeholder="Enter Product Name"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Quantity *
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-black"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Price *
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-black"
                        placeholder="0.0"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    SKU (optional)
                </label>
                <input
                    type="text"
                    id="sku"
                    name="sku"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-black"
                    placeholder="Enter SKU"
                />
            </div>

            <div>
                <label
                    htmlFor="lowStockAt"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Low Stock At (optional)
                </label>
                <input
                    type="number"
                    id="lowStockAt"
                    name="lowStockAt"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent text-black"
                    placeholder="Enter low stock threshold"
                />
            </div>

            <div className="flex gap-5">
                <FormActionBtn action='addProduct'>
                    Add Product
                </FormActionBtn>
                <Link
                    href="/inventory"
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}


export default CreateProductForm;