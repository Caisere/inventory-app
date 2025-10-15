import CreateProductForm from "@/app/components/create-product-form";

function AddProduct () {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Add Product
                        </h1>
                        <p className="text-sm text-gray-500">
                            Add a new product to your inventory
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl">
                <div className="bg-white rounded-lg border border-gray-200 p-6 mx-auto w-full">
                    <CreateProductForm />
                </div>
            </div>
        </div>
    )
}

export default AddProduct;