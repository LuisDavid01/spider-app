import MainHeader from "@/components/MainHeader"


export default function mainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="min-h-screen bg-background">
			<MainHeader />
			{children}
			{/* Footer */}
			<footer className="border-t border-border py-6">
				<div className="container mx-auto px-4">

					<div className="pt-8  text-center text-sm text-muted-foreground">
						<p>&copy; 2025 SpiderQ AI assistant. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</main>

	)

}
