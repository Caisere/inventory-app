import Sidebar from "../components/sidebar";


export default function RoutesLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    )
}