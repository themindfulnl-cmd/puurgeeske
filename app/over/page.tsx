import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import Link from "next/link";
export default function OverPage(){return <div className="min-h-screen bg-background"><Navbar/><main className="pt-28"><div className="container mx-auto px-6 py-10"><p className="eyebrow">Het gezicht achter PuurGeeske</p><h1 className="text-5xl md:text-7xl mt-5">Aangenaam, <em className="text-primary">Geeske.</em></h1></div><About/><section className="py-20 text-center px-6"><h2 className="text-4xl mb-6">Zullen we kennismaken?</h2><Link href="/contact" className="action-link">Plan een persoonlijk moment ↗</Link></section></main><Footer/></div>}
