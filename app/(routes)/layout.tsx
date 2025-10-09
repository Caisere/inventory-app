import { getCurrentUser } from "@/lib/auth";
import Sidebar from "../components/sidebar";


export default async function RoutesLayout({children}:{children:React.ReactNode}) {
    const user = await getCurrentUser()

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    )
}