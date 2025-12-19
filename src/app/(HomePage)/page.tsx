import { FeedbackForm } from "@/components/Feedback";
import MainHeader from "@/components/MainHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import {
	IconShield,
	IconSearch,
	IconRobot,
	IconFileText,
	IconLock,
	IconDatabase,
	IconBolt,
	IconCircleCheck,
} from "@tabler/icons-react";

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<MainHeader />
			{/* Hero Section */}
			<section id="Hero" className="relative overflow-hidden min-h-screen flex items-center">
				<div
					className={cn(
						"absolute inset-0",
						"[background-size:20px_20px]",
						"[background-image:radial-gradient(black,transparent_1px)]",
						"dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
					)}
				/>
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
				<div className="container mx-auto px-4">
					<div className="relative max-w-5xl mx-auto text-center">
						{/* Top Left - Crawling Card */}
						<div className="absolute  left-[-5%] top-[-30%] lg:left-[-10%] lg:top-[8%] animate-float  lg:flex">
							<Card className="p-4 rotate-[-8deg] bg-secondary border-3 border-black neo-shadow ">
								<div className="flex items-center gap-2">
									<div className="h-10 w-10 rounded-sm bg-white border-2 border-black flex items-center justify-center">
										<IconSearch className="h-5 w-5 text-primary" stroke={2} />
									</div>
									<div className="text-left">
										<p className="text-xs font-bold text-secondary-foreground">Crawling</p>
										<p className="text-sm font-black">250 endpoints</p>
									</div>
								</div>
							</Card>
						</div>

						{/* Top Right - Vulnerabilities Card */}
						<div className="absolute right-[-5%] top-[-30%]  md:right-[-2%] md:top-[-7%] animate-float-delayed  lg:flex">
							<Card className="p-4 neo-shadow rotate-[6deg] bg-accent border-3 border-black">
								<div className="flex items-center gap-2">
									<div className="h-10 w-10 rounded-sm bg-white border-2 border-black flex items-center justify-center">
										<IconShield className="h-5 w-5 text-accent" stroke={2} />
									</div>
									<div className="text-left">
										<p className="text-xs font-bold text-accent-foreground">Vulnerabilities</p>
										<p className="text-sm font-black text-accent-foreground">15 found</p>
									</div>
								</div>
							</Card>
						</div>
						{/* Main Content */}
						<div className="relative z-10">
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
								Scan, analyze, and secure <span className="text-primary">all in one place</span>
							</h1>
							<p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
								AI-powered web crawler for penetration testing. Automate reconnaissance and boost security analysis.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-8">
								<FeedbackForm btnText="Contribute with feedback!" btnClassName="
							 dark:text-muted-foreground 	group  h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 
				backdrop-blur-sm  border-3 border-black neo-shadow  font-semibold bg-primary 
					flex items-center justify-center gap-2 mx-auto hover:translate-x-1 hover:translate-y-1
									hover:shadow-none transition-all
								"/>
								<a href="https://github.com/LuisDavid01/spiderQ" target="_blank" rel="noreferrer">
									<Button size="lg"
										className="text-base   px-8 bg-accent border-3 border-black  neo-shadow 
										hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
									>
										See on Github!
									</Button>
								</a>


							</div>
						</div>

					</div>
				</div>
			</section>

			{/* Solutions Section */}
			<section id="solutions" className="py-20 md:py-32 bg-secondary/70">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<div className="inline-block px-4 py-1.5 bg-card border mb-4">
							<span className="text-sm text-muted-foreground">Solutions</span>
						</div>
						<h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
							Solve your security team's
							<br />
							biggest challenges
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
						<Card
							className="p-6 text-center border-3 border-black neo-shadow"

						>
							<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<IconSearch className="h-6 w-6 text-primary" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Automated Discovery</h3>
							<p className="text-sm text-muted-foreground">
								Crawl entire web applications automatically to discover all endpoints and attack surfaces.
							</p>
						</Card>

						<Card className="p-6 text-center border-3 border-black neo-shadow">
							<div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
								<IconRobot className="h-6 w-6 text-accent" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
							<p className="text-sm text-muted-foreground">
								Leverage AI to identify vulnerabilities and get expert guidance during security assessments.
							</p>
						</Card>

						<Card className="p-6 text-center border-3 border-black neo-shadow">
							<div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
								<IconFileText className="h-6 w-6 text-chart-3" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Professional Reports</h3>
							<p className="text-sm text-muted-foreground">
								Generate comprehensive reports with all findings, endpoints, and security recommendations.
							</p>
						</Card>
					</div>
					<div className="max-w-5xl mx-auto">
						<div className="relative w-full aspect-video  overflow-hidden">
							<video
								autoPlay
								loop
								muted
								playsInline
								className="absolute inset-0 w-full h-full object-cover"
							>
								<source src="/spiderqdemo.webm" type="video/webm" />
								Your browser does not support the video tag.
							</video>
						</div>
					</div>

				</div>

			</section>

			{/* Features Section */}
			<section id="features" className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<div className="inline-block px-4 py-1.5  bg-card border mb-4">
							<span className="text-sm text-muted-foreground">Features</span>
						</div>
						<h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Everything you need for web pentesting</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Forget complex tools and manual processes. SpiderQ automates reconnaissance with AI intelligence.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
								<IconSearch className="h-6 w-6 text-primary" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Smart Web Crawling</h3>
							<p className="text-sm text-muted-foreground">
								Navigate websites automatically to discover all routes, forms, parameters, and exposed resources.
							</p>
						</Card>

						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
								<IconRobot className="h-6 w-6 text-accent" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Conversational AI Expert</h3>
							<p className="text-sm text-muted-foreground">
								Chat with an AI security expert that guides you through pentesting techniques and best practices.
							</p>
						</Card>

						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-4">
								<IconFileText className="h-6 w-6 text-chart-3" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Detailed Reporting</h3>
							<p className="text-sm text-muted-foreground">
								Auto-generate comprehensive reports documenting all findings, methods, and security insights.
							</p>
						</Card>

						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-chart-4/10 flex items-center justify-center mb-4">
								<IconLock className="h-6 w-6 text-chart-4" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Vulnerability Detection</h3>
							<p className="text-sm text-muted-foreground">
								Identify potential attack vectors and security weaknesses during the reconnaissance phase.
							</p>
						</Card>

						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-chart-5/10 flex items-center justify-center mb-4">
								<IconDatabase className="h-6 w-6 text-chart-5" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Endpoint Mapping</h3>
							<p className="text-sm text-muted-foreground">
								Create a complete map of all API endpoints, HTTP methods, and hierarchical site structure.
							</p>
						</Card>

						<Card className="p-6">
							<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
								<IconBolt className="h-6 w-6 text-primary" stroke={1.5} />
							</div>
							<h3 className="font-semibold mb-2">Fast & Efficient</h3>
							<p className="text-sm text-muted-foreground">
								Accelerate your security audits with automated reconnaissance that saves hours of manual work.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 md:py-32 bg-secondary/30 dark:bg-neutral-950">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<div className="inline-block px-4 py-1.5  bg-card border mb-4">
							<span className="text-sm text-muted-foreground">Pricing</span>
						</div>
						<h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Simple, transparent pricing</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Get started with SpiderQ and unlock the power of AI-driven pentesting
						</p>
					</div>

					<div className="max-w-md mx-auto">

						{/* Pro Plan */}
						<Card className="p-8 relative border-2 border-primary shadow-xl overflow-visible">

							<div className="absolute -top-2 left-1/2 -translate-x-1/2">

								<Badge className="bg-primary dark:text-muted-foreground ">Only option btw</Badge>
							</div>
							<div className="mb-6">
								<h3 className="text-2xl font-bold mb-2">SpiderQ</h3>
								<p className="text-muted-foreground text-sm">For red teamers and IT teams</p>
							</div>
							<div className="mb-6">
								<div className="flex items-baseline gap-2">
									<span className="text-5xl font-bold">Not avalible</span>
									<span className="text-muted-foreground">/yet</span>
								</div>
							</div>
							<ul className="space-y-3 mb-8 ">
								<li className="flex items-start gap-2">
									<IconCircleCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" stroke={1.5} />
									<span className="text-sm">Access to premium models</span>
								</li>
								<li className="flex items-start gap-2">
									<IconCircleCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" stroke={1.5} />
									<span className="text-sm">Generous limits</span>
								</li>
								<li className="flex items-start gap-2">
									<IconCircleCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" stroke={1.5} />
									<span className="text-sm">Priority support</span>
								</li>
								<li className="flex items-start gap-2">
									<IconCircleCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" stroke={1.5} />
									<span className="text-sm">Comprehensive reports with detailed insights</span>
								</li>
								<li className="flex items-start gap-2">
									<IconCircleCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" stroke={1.5} />
									<span className="text-sm">API access for automation</span>
								</li>

							</ul>
							<div className="w-full border-t border-border pt-4  ">
								<a href="#Hero">
									<Button className=" dark:text-muted-foreground w-full  border-3 border-black  neo-shadow 
										hover:translate-y-0.5 hover:shadow-none transition-all">
										Help us improve
									</Button>
								</a>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border py-6">
				<div className="container mx-auto px-4">

					<div className="pt-8  text-center text-sm text-muted-foreground">
						<p>&copy; 2025 SpiderQ AI assistant. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

