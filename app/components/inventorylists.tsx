import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";

async function InventoryLists () {

    const user = await getCurrentUser()
    const userId = user.id

    // Fetch all products for the current user
    const allProducts = await prisma.product.findMany({
        where: {
            userId
        }
    })

    return (
        <>
            {
                allProducts?.map(product => (
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
                            <form
                                action={async (formData: FormData) => {
                                    "use server";
                                    // await deleteProduct(formData);
                                }}
                                >
                                    <input type="hidden" name="id" value={product.id} />
                                    <button className="text-red-600 hover:text-red-900">
                                        <Trash2 className="w-4 h-4"  />
                                    </button>
                            </form>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default InventoryLists;