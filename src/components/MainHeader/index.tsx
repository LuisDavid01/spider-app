import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import HamburgerMenu from "../HamburgerMenu";
import "./header.css";
import Image from "next/image";
export default function MainHeader() {
	return (
		<header className="relative z-50 bg-white dark:bg-background/95 md:relative md:top-auto sticky top-0">
			<div className="container  mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
					<div className="flex items-center gap-2">
						<Link href={"/"} className="inline-flex items-center ">
						<Image src="/spiderqlogo.webp" className="object-cover" alt="SpiderQ" width={80} height={80} />
							<span className="font-black text-lg md:text-2xl ">SpiderQ</span>
						</Link>

					</div>
					<nav className="hidden md:flex items-center gap-8">
						<a href="#features" className="nav-link">
							Features
						</a>
						<a href="#pricing" className="nav-link">
							Pricing
						</a>
						<SignedOut>


						</SignedOut>

						<SignedIn>
							<Link href={"/dashboard"}>
								<Button variant={"link"}>
									dashboard
								</Button>
							</Link>

							<UserButton />
						</SignedIn>
						<ThemeToggle />
					</nav>
					<nav className="md:hidden">
						<HamburgerMenu>
							<li>
								<a href="#features" >
									Features
								</a>
							</li>
							<li>
								<a href="#pricing" >
									Pricing
								</a>
							</li>
							<SignedOut>

							</SignedOut>

							<SignedIn>
								<li>
									<Link href={"/dashboard"}>
										<Button variant={"link"}>
											dashboard
										</Button>
									</Link>
								</li>
								<li>
									<UserButton />
								</li>
							</SignedIn>
							<li>
								<ThemeToggle />
							</li>

						</HamburgerMenu>
					</nav>
				</div>
			</div>
		</header>
	)
}
