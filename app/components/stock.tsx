import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function Stock () {

    const user = await getCurrentUser()
    const userId = user.id

    const totalProducts = await prisma.product.count({
        where: {userId}
    })


    const recent = await prisma.product.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    })

    const inStockCount = await prisma.product.count({
        where: {
            userId,
            quantity: {gt:5}
        }
    })

    const lowStockCount = await prisma.product.count({
        where: {
            userId,
            quantity: {gte:1, lte:5}
        }
    })

    const outOfStock = await prisma.product.count({
        where: {
            userId,
            quantity: 0
        },
    })
        
    const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStock / totalProducts) * 100) : 0;
    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Stock Levels */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Stock Levels
                    </h2>
                </div>
                <div className="space-y-3">
                    {recent.map((product, key) => {
                        const stockLevel = product.quantity === 0
                            ? 0
                            : product.quantity <= (product.lowStockAt || 5)
                            ? 1
                            : 2;

                        const bgColors = [
                            "bg-red-600",
                            "bg-yellow-600",
                            "bg-green-600",
                        ];
                        const textColors = [
                            "text-red-600",
                            "text-yellow-600",
                            "text-green-600",
                        ];
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                                    <span className="text-sm font-medium text-gray-900">
                                        {product.name}
                                    </span>
                                </div>
                                <div
                                    className={`text-sm font-medium ${textColors[stockLevel]}`}
                                >
                                    {product.quantity} units
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Efficiency */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Efficiency
                    </h2>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                        <div
                            className="absolute inset-0 rounded-full border-8 border-purple-600"
                            style={{
                                clipPath:
                                "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">
                                    {inStockPercentage}%
                                </div>
                                <div className="text-sm text-gray-600">In Stock</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-purple-200" />
                            <span>In Stock ({inStockPercentage}%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                            <span>Low Stock ({lowStockPercentage}%)</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-gray-200" />
                            <span>Out of Stock ({outOfStockPercentage}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock;