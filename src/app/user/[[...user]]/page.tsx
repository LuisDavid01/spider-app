"use client"

import { DashboardHeader } from "@/components/DashboardHeader"
import { Sidebar } from "@/components/SiderbarDashboard"
import { UserProfile } from "@clerk/nextjs"

export default function UserProfilePage() {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 p-4 lg:p-8 lg:ml-0">
				<div className="max-w-4xl mx-auto">
					<DashboardHeader title="Profile" description="Manage your account settings and preferences" />

						<UserProfile
						/>
				</div>
			</main>
		</div>
	)
}

