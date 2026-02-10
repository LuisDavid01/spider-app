import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TermsSectionProps {
	title: string;
	children: React.ReactNode;
	number: number;
}

export function TermsSection({ title, children, number }: TermsSectionProps) {
	return (
		<Card className="neo-border neo-shadow-lg mb-6 overflow-hidden bg-card ">
			<CardHeader className="bg-accent border-b-4 border-black p-4 sm:p-6">
				<div className="flex items-center gap-3 sm:gap-4">
					<div className="bg-primary text-primary-foreground neo-border flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center text-lg sm:text-2xl font-black rotate-3">
						{number}
					</div>
					<CardTitle className="text-foreground text-xl sm:text-2xl lg:text-3xl font-black leading-tight">
						{title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="p-4 sm:p-6 lg:p-8">
				<div className="prose prose-sm sm:prose-base max-w-none text-foreground">{children}</div>
			</CardContent>
		</Card>
	);
}
