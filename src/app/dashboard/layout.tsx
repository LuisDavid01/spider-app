import { DashboardHeader } from "@/components/DashboardHeader"
import { Sidebar } from "@/components/SiderbarDashboard"

export default function dashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 p-4 lg:ml-0 lg:p-8">
				<div className="mx-auto max-w-5xl">
					<DashboardHeader
						title="Dashboard"
						description="Manage your SpiderQ API keys and get started with the CLI"
					/>
					{children}
					{/* Footer */}
				</div>
				<footer className="border-t border-border py-6">
					<div className="container mx-auto px-4">

						<div className="pt-8  text-center text-sm text-muted-foreground">
							<p>&copy; 2025 SpiderQ AI assistant. All rights reserved.</p>
						</div>
					</div>
				</footer>
			</main>
		</div>


	)

}
