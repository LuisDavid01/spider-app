"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconKey, IconCreditCard, IconBook, IconSpider, IconMenu2, IconX, IconSettings } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { UserAside } from "../UserAside"
import Image from 'next/image'
const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: IconKey },
	{ name: "Billing", href: "/dashboard/billing", icon: IconCreditCard },
]

const secondaryNav = [
	{ name: "Documentation", href: "/docs", icon: IconBook },
	{ name: "Settings", href: "/user", icon: IconSettings }
]

export function Sidebar() {
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<>
			{/* Mobile menu button */}
			<button
				onClick={() => setMobileOpen(!mobileOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-foreground text-background neo-border neo-shadow-sm"
			>
				{mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
			</button>

			{/* Overlay */}
			{mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />}

			{/* Sidebar */}
			<aside
				className={cn(
					`fixed  lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground flex flex-col 
					neo-border-thick border-l-0 border-t-0 border-b-0 transition-transform lg:translate-x-0`,
					mobileOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				{/* Logo */}
				<div className="p-6 border-b-4 border-sidebar-border">
					<Link href="/" className="flex items-center gap-3">
						<div className="w-10 h-10 bg-spider-green flex items-center justify-center neo-border">
							<Image src="/spiderqlogo.webp" 
							width={40} height={40}
							className=" aspect-square object-contain"

							alt="spiderq logo" />
						</div>
						<span className="font-black text-xl tracking-tight">SPIDERQ</span>
					</Link>
				</div>

				{/* Main Navigation */}
				<nav className="flex-1 p-4 space-y-2">
					<p className="text-xs font-black uppercase tracking-wider text-sidebar-foreground/50 mb-4 px-3">Navigation</p>
					{navigation.map((item) => {
						const isActive = pathname === item.href
						return (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={cn(
									"flex items-center gap-3 px-3 py-3 font-bold text-sm uppercase tracking-wide transition-all",
									isActive
										? "bg-spider-green text-black neo-border neo-shadow-sm"
										: "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
								)}
							>
								<item.icon size={20} stroke={2} />
								{item.name}
							</Link>
						)
					})}
				</nav>

				{/* Secondary Navigation */}
				<div className="p-4 border-t-4 border-sidebar-border">
					<p className="text-xs font-black uppercase tracking-wider text-sidebar-foreground/50 mb-4 px-3">Support</p>
					{secondaryNav.map((item) => {
						const isActive = pathname === item.href
						return (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={cn(
									"flex items-center gap-3 px-3 py-3 font-bold text-sm uppercase tracking-wide transition-all",
									isActive
										? "bg-spider-green text-black neo-border neo-shadow-sm"
										: "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
								)}
							>
								<item.icon size={20} stroke={2} />
								{item.name}
							</Link>
						)
					})}
				</div>

				{/* User Section */}
				<UserAside />
			</aside>
		</>
	)
}

