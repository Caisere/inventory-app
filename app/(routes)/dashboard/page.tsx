import KeyMetrics from "@/app/components/keymetrics";
import Stock from "@/app/components/stock";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";


async function Dashboard () {
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/signin')
    }

    return (
        <main>
            {/* header */}
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Welcome back! Here is an overview of your inventory.
                        </p>
                    </div>
                </div>
            </header>

            <Suspense fallback={<div>Loading metrics...</div>}>
                <KeyMetrics />
            </Suspense>

            {/* Other dashboard components can go here */}
            <Suspense fallback={<div>Loading Stocks...</div>}>
                <Stock />
            </Suspense>
                
        </main>
    )
}

export default Dashboard;