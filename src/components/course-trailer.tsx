"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import type { CourseTrailerSources, TrailerSource } from "@/data/course-trailers";
import { cn } from "@/lib/utils";

type Labels = { video: string; play: string; pause: string };

function TrailerVideo({
  source,
  labels,
  className,
}: {
  source: TrailerSource;
  labels: Labels;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  // Once the viewer plays or pauses by hand, scrolling no longer autoplays.
  const takenOver = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let inView = false;
    const autoplay = () => {
      if (inView && !reducedMotion && !takenOver.current) {
        video.play().catch(() => {});
      }
    };

    // `preload="none"` plus play-on-view: nothing downloads until the video
    // is actually on screen. The copy hidden by CSS never intersects.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) autoplay();
        else video.pause();
      },
      { threshold: 0.5 }
    );

    // Browsers pause muted video in background tabs; pick it back up when
    // the viewer returns, since the observer won't fire again on its own.
    const onVisibility = () => {
      if (document.visibilityState === "visible") autoplay();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    takenOver.current = true;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-brand/40 bg-muted",
        className
      )}
    >
      {/* A failed video keeps showing its poster, so it degrades to a still. */}
      <video
        ref={ref}
        src={source.video}
        poster={source.poster}
        aria-label={labels.video}
        className="block size-full object-cover"
        muted
        playsInline
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {failed ? null : (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-brand hover:text-brand"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      )}
    </div>
  );
}

/**
 * The course trailer: portrait on phones (the landscape cut's text would be
 * unreadable that small), landscape from `md` up.
 */
export function CourseTrailer({
  sources,
  labels,
}: {
  sources: CourseTrailerSources;
  labels: Labels;
}) {
  return (
    <>
      <TrailerVideo
        source={sources.portrait}
        labels={labels}
        className="mx-auto aspect-[9/16] w-full max-w-sm md:hidden"
      />
      <TrailerVideo
        source={sources.landscape}
        labels={labels}
        className="hidden aspect-video w-full md:block"
      />
    </>
  );
}
