import { deleteProduct } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FormActionBtn } from "./form-action-btn";
import { Trash2 } from "lucide-react";

async function InventoryLists ({filter} : {filter: string}) {

    // console.log(filter)

    const user = await getCurrentUser()
    const userId = user.id

    // Fetch all products for the current user
    const allProducts = await prisma.product.findMany({
        where: {
            userId
        }
    })

    let filteredProducts;

    if (filter === 'all') filteredProducts = allProducts
    if (filter === 'price-des') filteredProducts = allProducts?.sort((a, b) => Number(b.price) - Number(a.price))
    if (filter === 'price-asc') filteredProducts = allProducts?.sort((a, b) => Number(a.price) - Number(b.price))
    if (filter === 'quantity-des') filteredProducts = allProducts?.sort((a, b) => Number(b.quantity) - Number(a.quantity))
    if (filter === 'quantity-asc') filteredProducts = allProducts?.sort((a, b) => Number(a.quantity) - Number(b.quantity))

    return (
        <>
            {
                filteredProducts?.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">
                            {product.name}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                            {product.sku || "-"}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-900">
                            ${Number(product.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-900">
                            {product.quantity}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                            {product.lowStockAt || "-"}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                            <form action={deleteProduct}>
                                <input type="hidden" name="id" value={product.id} />
                                <FormActionBtn action='delete'>
                                    <Trash2 className="h-4 w-4" />
                                </FormActionBtn>
                            </form>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default InventoryLists;