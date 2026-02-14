import { DashboardHeader } from "@/components/DashboardHeader"
import { PlanCard } from "@/components/PlanCard"
import { Sidebar } from "@/components/SiderbarDashboard"
import { PricingTable } from "@clerk/nextjs"
import { IconCreditCard, IconDownload } from "@tabler/icons-react"





export default function BillingPage() {
	return (
		<>

			{/* Current Usage */}
			<div className="bg-card neo-border-thick neo-shadow-md p-6 mb-8">
				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
					<div>
						<h3 className="font-black text-lg uppercase mb-2">Current Usage</h3>
						<p className="text-muted-foreground">Pro Plan - Billing cycle ends Jan 31, 2026</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-right">
							<p className="text-2xl font-black font-mono">28,600 / 50,000</p>
							<p className="text-sm text-muted-foreground">API requests used</p>
						</div>
						<div className="w-32 h-8 bg-muted neo-border relative overflow-hidden">
							<div className="absolute inset-y-0 left-0 bg-spider-green" style={{ width: "57.2%" }} />
						</div>
					</div>
				</div>
			</div>

			{/* Plans */}
			<h3 className="font-black text-xl uppercase mb-6">Available Plans</h3>
			<div className="max-w-screen-lg mx-auto ">
			<PricingTable />


		

			</div>
		</>
	)
}

