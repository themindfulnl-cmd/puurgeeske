"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/lib/data/config.json";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Aanbod", href: "/#services" },
    { name: "Over", href: "/over" },
    { name: "Agenda", href: "/#workshops" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // passive + rAF-throttled: scroll used to re-render on every event.
        let frame = 0;
        const handleScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 20);
                frame = 0;
            });
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const close = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
                document.getElementById("menu-toggle")?.focus();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [isMobileMenuOpen]);

    // Don't let the page scroll behind the open menu.
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                    isScrolled
                        ? "bg-background shadow-sm border-b border-border/40 py-2"
                        : "bg-background py-4"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <Link href="/" aria-label="PuurGeeske home" className="brand-wordmark">puur<span>Geeske</span><span className="text-primary ml-2 text-sm">✳</span></Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className="text-sm font-medium text-foreground/80 hover:text-primary aria-[current=page]:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild variant="default" size="sm" className="rounded-full px-6">
                            <a href={config.bookingUrl} target="_blank" rel="noopener noreferrer">Plan een moment ↗</a>
                        </Button>
                    </nav>

                    <button
                        id="menu-toggle"
                        className="md:hidden text-foreground hover:text-primary transition-colors relative z-50"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMobileMenuOpen ? "Sluit menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* CSS transition instead of AnimatePresence — same feel, no runtime. */}
            <div
                id="mobile-menu"
                data-open={isMobileMenuOpen ? "true" : "false"}
                inert={!isMobileMenuOpen}
                aria-hidden={!isMobileMenuOpen}
                className="mobile-menu fixed inset-0 z-40 bg-background pt-32 px-6 md:hidden flex flex-col items-center"
            >
                <nav className="flex flex-col gap-8 items-center text-center w-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                                aria-current={pathname === link.href ? "page" : undefined}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-4xl font-light text-foreground hover:text-primary hover:italic transition-all duration-300 font-serif"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-16 h-[1px] bg-stone-200 my-4" />
                    <Button
                        asChild
                        className="w-full max-w-sm h-14 rounded-full text-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <a href={config.bookingUrl} target="_blank" rel="noopener noreferrer">Plan een moment ↗</a>
                    </Button>
                </nav>
            </div>
        </>
    );
}
