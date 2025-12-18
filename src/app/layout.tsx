import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemesProvider";
import { ClerkProvider } from "@clerk/nextjs";
const notoSans = Noto_Sans({ variable: '--font-sans' });
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SpiderQ - AI agent",
	description: "Agentic AI platform for red teamers and cibersecurity professionals",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={notoSans.variable} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>

					<ClerkProvider>
						{children}
					</ClerkProvider>
				</ThemeProvider>

			</body>
		</html>
	);
}
