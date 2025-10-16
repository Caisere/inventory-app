import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TrendingUp } from "lucide-react";
import ProductsChart from "./products-chart";

async function KeyMetrics () {
    
    const user = await getCurrentUser()
    const userId = user.id
    
    const [totalProducts, lowStock, allProducts  ] = await Promise.all([
        prisma.product.count({
            where: {userId: userId}
        }),
        prisma.product.count({
            where: {
                userId: userId,
                lowStockAt: {not: null},
                quantity: {lte: 5}
            }
        }),
        prisma.product.findMany({
            where: {
                userId
            },
            select: {
                price: true,
                quantity: true,
                createdAt: true
            }
        })
    ])
    
    const now = new Date();
    const weeklyProductsData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);
    
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekStart.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
            2,
            "0"
        )}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;
    
        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        });
        
        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length,
        });
    }

    // const totalValue = allProducts.map(product => product.price).reduce((sum, price) => sum + Number(price), 0)
    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)
    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Key Metrics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Key Metrics
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                            {totalProducts}
                        </div>
                        <div className="text-sm text-gray-600">Total Products</div>
                        <div className="flex items-center justify-center mt-1">
                            <span className="text-xs text-green-600">
                                +{totalProducts}
                            </span>
                            <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                            ${Number(totalValue).toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Value</div>
                        <div className="flex items-center justify-center mt-1">
                            <span className="text-xs text-green-600">
                                +${Number(totalValue).toFixed(0)}
                            </span>
                            <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                            {lowStock}
                        </div>
                        <div className="text-sm text-gray-600">Low Stock</div>
                        <div className="flex items-center justify-center mt-1">
                            <span className="text-xs text-green-600">+{lowStock}</span>
                            <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
                {/* Iventory over time */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2>New products per week</h2>
                </div>
                <div className="h-48">
                    <ProductsChart data={weeklyProductsData} />
                </div>
            </div>
        </div>
    )
}


export default KeyMetrics;