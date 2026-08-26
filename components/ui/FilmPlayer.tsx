"use client";

import { useCallback, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Picture } from "@/components/ui/Picture";

type FilmPlayerProps = {
  /** Basename in /public/videos — expects "<base>.mp4" and "<base>-720.mp4". */
  base: string;
  /** Basename in /public/opt for the poster frames. */
  posterName: string;
  posterWidths: number[];
  posterSizes: string;
  alt: string;
  buttonLabel: string;
  /** Above the fold? Then the poster loads eagerly. */
  priority?: boolean;
};

/** Picks the 720p cut for phones, small screens, or anyone on a metered or
 *  slow connection. Runs at tap time, so it sees the real conditions. */
function chooseSource(base: string): string {
  const hd = `/videos/${base}.mp4`;
  const sd = `/videos/${base}-720.mp4`;
  if (typeof window === "undefined") return hd;

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (conn?.saveData) return sd;
  if (conn?.effectiveType && /(^|-)([23]g|slow-2g)$/.test(conn.effectiveType)) return sd;

  // A 720p source still fills any viewport up to ~1280 CSS px of video box.
  const boxWidth = window.innerWidth * window.devicePixelRatio;
  return boxWidth <= 1400 ? sd : hd;
}

export function FilmPlayer({
  base,
  posterName,
  posterWidths,
  posterSizes,
  alt,
  buttonLabel,
  priority = false,
}: FilmPlayerProps) {
  const [src, setSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Warm the connection on intent, so the tap itself feels instant.
  const prefetch = useCallback(() => {
    if (src) return;
    const href = chooseSource(base);
    if (document.querySelector(`link[rel="preconnect"][data-film="${base}"]`)) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = href;
    link.dataset.film = base;
    document.head.appendChild(link);
  }, [base, src]);

  const start = useCallback(() => {
    setSrc(chooseSource(base));
  }, [base]);

  return (
    <div className="relative rounded-[2rem] overflow-hidden shadow-sm border-4 border-white bg-black aspect-video">
      {src ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          controls
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <Picture
            name={posterName}
            widths={posterWidths}
            sizes={posterSizes}
            alt={alt}
            width={1920}
            height={1080}
            priority={priority}
            imgClassName="w-full h-full object-cover"
            className="absolute inset-0"
          />
          <button
            onClick={start}
            onPointerEnter={prefetch}
            onFocus={prefetch}
            aria-label={buttonLabel}
            className="absolute inset-0 flex items-center justify-center bg-stone-900/15 hover:bg-stone-900/25 transition-colors group"
          >
            <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-sm hover-pop">
              <Play
                className="w-8 h-8 md:w-10 md:h-10 text-[#D4A373] ml-1"
                fill="currentColor"
              />
            </span>
          </button>
        </>
      )}
    </div>
  );
}
