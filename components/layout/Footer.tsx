import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Picture } from "@/components/ui/Picture";
import { getSiteConfig } from "@/lib/content";

export function Footer() {
    const config = getSiteConfig();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-secondary/30 border-t border-border mt-auto">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Picture
                            name="logo"
                            widths={[224, 320, 448]}
                            sizes="192px"
                            alt="Puur Geeske"
                            width={448}
                            height={448}
                            avif={false}
                            fallback="png"
                            fallbackWidth={224}
                            className="w-48 mb-4"
                            imgClassName="w-full h-auto object-contain"
                        />
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Balans en harmonie in lichaam en geest. Ontdek je pure zelf met
                            Geeske.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a
                                href={config.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="PuurGeeske op Instagram"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href={config.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="PuurGeeske op Facebook"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <nav aria-label="Footer navigatie">
                        <h3 className="font-semibold mb-4">Navigatie</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/over" className="hover:text-primary transition-colors">Over mij</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href={`mailto:${config.email}`}
                                    className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {config.email}
                                </a>
                            </li>
                            <li>{config.address}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {year} PuurGeeske. Alle rechten voorbehouden.</p>
                    <p>KvK &middot; Hoofddorp</p>
                </div>
            </div>
        </footer>
    );
}
