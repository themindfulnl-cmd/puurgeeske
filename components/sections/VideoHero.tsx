"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** The hero: Geeske's introduction film.
 *  Poster-first — it has speech, so nothing plays until the visitor asks for it. */
export function VideoHero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const start = () => {
        videoRef.current?.play();
        setPlaying(true);
    };

    return (
        <section className="relative bg-[#FDFBF7] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
            {/* soft background wash, same language as the rest of the site */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-[#E6D5C3]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#C8B6A6]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                    {/* LEFT — the brand line */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-[38%] text-center lg:text-left"
                    >
                        <img
                            src="/images/logo-full.png"
                            alt="Puur Geeske"
                            className="w-56 md:w-64 h-auto object-contain mx-auto lg:mx-0 mb-6"
                        />
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed font-serif italic">
                            “Verbind met je ware zelf in alle rust en ruimte.”
                        </p>
                        <p className="mt-5 text-stone-500 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                            Maak kennis met Geeske — yoga, pilates en coaching in Hoofddorp.
                        </p>
                        <div className="mt-8 flex justify-center lg:justify-start">
                            <Button size="lg" className="rounded-full px-8">
                                Boek een les
                            </Button>
                        </div>
                    </motion.div>

                    {/* RIGHT — the film */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="w-full lg:w-[62%]"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-black aspect-video">
                            <video
                                ref={videoRef}
                                src="/videos/intro.mp4"
                                poster="/videos/intro-poster.jpg"
                                controls={playing}
                                playsInline
                                preload="none"
                                className="w-full h-full object-cover"
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                            />
                            {!playing && (
                                <button
                                    onClick={start}
                                    aria-label="Speel de introductievideo af"
                                    className="absolute inset-0 flex items-center justify-center bg-stone-900/15 hover:bg-stone-900/25 transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition-transform">
                                        <Play className="w-8 h-8 md:w-10 md:h-10 text-[#D4A373] ml-1" fill="currentColor" />
                                    </span>
                                </button>
                            )}
                        </div>
                        <p className="mt-4 text-sm text-stone-500 text-center lg:text-left">
                            Introductie · 1 min 30
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
