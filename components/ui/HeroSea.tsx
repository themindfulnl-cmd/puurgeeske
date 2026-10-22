"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";

function playVideo(video: HTMLVideoElement) {
  // Attach the source only once playback is allowed or explicitly requested.
  if (!video.getAttribute("src")) video.src = "/videos/sea-waves.mp4";
  video.muted = true;
  return video.play();
}

export function HeroSea() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    let inView = true;
    wantsPlayback.current = !motion.matches && !connection?.saveData;

    const syncPlayback = () => {
      if (wantsPlayback.current && inView && !document.hidden) {
        void playVideo(video).catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    const onMotionChange = () => {
      if (motion.matches) {
        wantsPlayback.current = false;
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      wantsPlayback.current = true;
      void playVideo(video).catch(() => setPlaying(false));
    } else {
      wantsPlayback.current = false;
      video.pause();
    }
  };

  return <>
    <div className="hero-landscape" aria-hidden="true">
      <Image src="/images/sea-waves-poster.webp" alt="" fill priority sizes="100vw" />
      <video
        ref={videoRef}
        className={`hero-sea-video${ready && !failed ? " is-ready" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
        onPlaying={() => { setReady(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { wantsPlayback.current = false; setFailed(true); setPlaying(false); }}
      />
    </div>
    <div className="site-shell hero-bottom">
      <p>Yoga & Pilates <span>·</span> Ademwerk <span>·</span> Lichaamswerk</p>
      <div className="hero-controls">
        {!failed && <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Achtergrondvideo pauzeren" : "Achtergrondvideo afspelen"}
          title={playing ? "Video pauzeren" : "Video afspelen"}
        >
          {playing ? <Pause size={15} aria-hidden="true"/> : <Play size={15} aria-hidden="true"/>}
        </button>}
        <Link href="#geeske" aria-label="Lees verder over Geeske"><ArrowDown size={18} strokeWidth={1.3}/></Link>
      </div>
    </div>
  </>;
}
