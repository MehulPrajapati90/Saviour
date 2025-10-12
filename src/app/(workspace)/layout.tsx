import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

import { SidebarWrapper } from "@/modules/workspace/components/sidebar-wrapper"

import { AppSidebar } from "@/modules/workspace/components/app-sidebar"

import AppHeader from "@/modules/workspace/components/app-header"

import { Toaster } from "sonner"

interface Props {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {

    return (
        <SidebarWrapper>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <div className="p-4">
                    {children}
                    <Toaster richColors position="bottom-right" />
                </div>
            </SidebarInset>
        </SidebarWrapper>
    )
}


export default layout;