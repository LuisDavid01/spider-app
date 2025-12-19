"use client";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface ModalContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	return (
		<ModalContext.Provider value={{ open, setOpen }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export function Modal({ children }: { children: ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const { setOpen } = useModal();
	return (
		<button
			className={cn(
				"px-4 py-2 text-primary-foreground text-center relative overflow-hidden",
				className
			)}
			onClick={() => setOpen(true)}
		>
			{children}
		</button>
	);
};

export const ModalBody = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const { open } = useModal();
	
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [open]);

	const modalRef = useRef<HTMLDivElement>(null);
	const { setOpen } = useModal();
	useOutsideClick(modalRef, () => setOpen(false));

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
						backdropFilter: "blur(10px)",
					}}
					exit={{
						opacity: 0,
						backdropFilter: "blur(0px)",
					}}
					className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
				>
					<Overlay />
					<motion.div
						ref={modalRef}
						className={cn(
							// Tamaño flexible basado en contenido
							"relative z-50 w-full",
							"max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl",
							// Altura flexible - se adapta al contenido
							"mb-0 sm:my-auto", // Bottom en móvil, centrado en tablet/desktop
							"max-h-[95vh]",
							// Estilos visuales
							"bg-white dark:bg-neutral-950 border-3 border-black neo-shadow",
							// Flexbox para estructura interna
							"flex flex-col",
							className
						)}
						initial={{
							opacity: 0,
							scale: 0.5,
							y: 100,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							y: 0,
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							y: 100,
						}}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 15,
						}}
					>
						<CloseIcon />
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const ModalContent = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn(
			"flex-1 overflow-y-auto p-3 sm:p-5 md:p-7",
			// Scroll suave y padding para que no se pegue al borde
			"scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700",
			className
		)}>
			{children}
		</div>
	);
};

export const ModalFooter = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"flex-shrink-0 flex justify-end gap-3 p-3 sm:p-5 bg-gray-100 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800",
				className
			)}
		>
			{children}
		</div>
	);
};

const Overlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				backdropFilter: "blur(10px)",
			}}
			exit={{
				opacity: 0,
				backdropFilter: "blur(0px)",
			}}
			className={`fixed inset-0 h-full w-full bg-black/50 z-40 ${className}`}
		></motion.div>
	);
};

const CloseIcon = () => {
	const { setOpen } = useModal();
	return (
		<button
			onClick={() => setOpen(false)}
			className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 
			"
			aria-label="Close modal"
		>
		<IconX
				className="text-black dark:text-white hover:scale-110  transition-all duration-200"
			/>


		</button>
	);
};

export const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement | null>,
	callback: Function
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			callback(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, callback]);
};
