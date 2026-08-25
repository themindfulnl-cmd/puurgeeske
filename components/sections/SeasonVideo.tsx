"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

/** Below the fold: the seasonal lesson (De Nazomer). */
export function SeasonVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const start = () => {
        videoRef.current?.play();
        setPlaying(true);
    };

    return (
        <section className="py-20 md:py-28 bg-[#FFF8F0]">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto text-center mb-10 md:mb-14"
                >
                    <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A373]">
                        Seizoensles 01
                    </span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-stone-800">
                        De Nazomer
                    </h2>
                    <p className="mt-5 text-stone-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Over het oogseizoen, de maag- en miltmeridiaan, en welke houdingen
                        en vragen daar nu bij passen.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-black aspect-video">
                        <video
                            ref={videoRef}
                            src="/videos/nazomer.mp4"
                            poster="/videos/nazomer-poster.jpg"
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
                                aria-label="Speel de seizoensles af"
                                className="absolute inset-0 flex items-center justify-center bg-stone-900/15 hover:bg-stone-900/25 transition-colors group"
                            >
                                <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition-transform">
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#D4A373] ml-1" fill="currentColor" />
                                </span>
                            </button>
                        )}
                    </div>
                    <p className="mt-4 text-sm text-stone-500 text-center">
                        Seizoensles · 3 min 50
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
