import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


export default async function AdminLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
  
    if (!session?.user || session.user.role !== 'admin') {
      redirect('/un-auth')
    }
  
    return (
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col min-h-0">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="gap-4 p-4 pt-0">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    )
}