import { useAuth, useUser } from "@clerk/nextjs"
import { PlanBadge } from "./PlanBadge"

export function UserAside() {
	const {  user, isLoaded, } = useUser()

	if (!isLoaded) {
		return (
			<div className="p-4 border-t-4 border-sidebar-border">
			<div className="flex items-center gap-3 px-3 py-3">
				<div className="w-10 h-10 bg-spider-yellow neo-border flex items-center justify-center font-black text-black">
				loading...
				</div>
				<div className="flex-1 min-w-0">
				</div>
			</div>
		</div>
		)

	}


	return (
		<div className="p-4 border-t-4 border-sidebar-border">
			<div className="flex items-center gap-3 px-3 py-3">
				<div className="w-10 h-10 bg-spider-yellow neo-border flex items-center justify-center font-black text-black">
					<img src={user?.imageUrl} className="w-8 h-8 rounded-full" loading="lazy" alt="avatar" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-bold text-sm truncate">{user?.fullName}</p>
					<PlanBadge/>
				</div>
			</div>
		</div>
	)
}
