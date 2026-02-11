import { DashboardHeader } from "@/components/DashboardHeader"
import { PlanCard } from "@/components/PlanCard"
import { Sidebar } from "@/components/SiderbarDashboard"
import { IconCreditCard, IconDownload } from "@tabler/icons-react"

const plans = [
	{
		name: "Starter",
		price: "$0",
		period: "month",
		features: ["1,000 API requests/month", "1 API key", "Basic scans", "Email support"],
	},
	{
		name: "Pro",
		price: "$49",
		period: "month",
		features: ["50,000 API requests/month", "5 API keys", "Advanced scans", "Priority support", "Custom alerts"],
		current: true,
	},
	{
		name: "Enterprise",
		price: "$199",
		period: "month",
		features: [
			"Unlimited requests",
			"Unlimited API keys",
			"Full scan suite",
			"24/7 dedicated support",
			"Custom integrations",
			"SLA guarantee",
		],
		popular: true,
	},
]

const invoices = [
	{ id: "INV-001", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
	{ id: "INV-002", date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
	{ id: "INV-003", date: "Nov 1, 2025", amount: "$49.00", status: "Paid" },
]

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
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				{plans.map((plan) => (
					<PlanCard key={plan.name} {...plan} />
				))}
			</div>

			{/* Payment Method */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-card neo-border-thick neo-shadow-md p-6">
					<h3 className="font-black text-lg uppercase mb-6">Payment Method</h3>
					<div className="flex items-center gap-4 p-4 bg-muted neo-border mb-4">
						<div className="w-12 h-8 bg-spider-blue neo-border flex items-center justify-center">
							<IconCreditCard size={20} className="text-black" />
						</div>
						<div>
							<p className="font-bold">•••• •••• •••• 4242</p>
							<p className="text-sm text-muted-foreground">Expires 12/27</p>
						</div>
					</div>
					<button className="w-full py-3 font-black uppercase neo-border neo-shadow-sm bg-foreground text-background hover:bg-foreground/90 transition-colors">
						Update Payment Method
					</button>
				</div>

				{/* Recent Invoices */}
				<div className="bg-card neo-border-thick neo-shadow-md p-6">
					<h3 className="font-black text-lg uppercase mb-6">Recent Invoices</h3>
					<div className="space-y-3">
						{invoices.map((invoice) => (
							<div key={invoice.id} className="flex items-center justify-between p-4 bg-muted neo-border">
								<div>
									<p className="font-mono font-bold">{invoice.id}</p>
									<p className="text-sm text-muted-foreground">{invoice.date}</p>
								</div>
								<div className="flex items-center gap-4">
									<span className="font-mono font-bold">{invoice.amount}</span>
									<span className="px-3 py-1 bg-spider-green neo-border text-xs font-black uppercase">
										{invoice.status}
									</span>
									<button className="p-2 hover:bg-background neo-border">
										<IconDownload size={16} />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

