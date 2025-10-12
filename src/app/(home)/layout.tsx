import Navbar from "@/modules/layout/components/navbar"
import { Toaster } from "sonner"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full">
            <Navbar />
            <main className="transition-all duration-300 flex">
                {children}
                <Toaster richColors position="bottom-right" />
            </main>
        </div>
    )
}

export default HomeLayout