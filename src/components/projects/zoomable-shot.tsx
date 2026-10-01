"use client";

import Image from "next/image";
import { Maximize2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * A cropped screenshot thumbnail that opens the full image in a lightbox.
 *
 * The lightbox is a Radix dialog nested inside the project dialog: Escape and
 * outside clicks close only the topmost layer, so the project stays open.
 * `className` sizes the thumbnail box (it needs a height); `imageClassName`
 * sets the crop, e.g. `object-top`.
 */
export function ZoomableShot({
  src,
  alt,
  width,
  height,
  zoomLabel,
  sizes,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Accessible name prefix for the trigger, e.g. "View larger". */
  zoomLabel: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`${zoomLabel}: ${alt}`}
          className={cn(
            "group relative block w-full cursor-zoom-in overflow-hidden bg-black outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-[1.02]",
              imageClassName
            )}
          />
          <span
            aria-hidden
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md border bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2Icon className="size-4" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-none gap-3 p-3"
        // Sized up front: a shrink-to-fit box collapses before the image
        // loads. Never wider than the viewport, the image's own pixels, or
        // what 80vh of height allows at its aspect ratio (+24px padding).
        style={{
          width: `min(95vw, ${width + 24}px, calc(80vh * ${width / height} + 24px))`,
        }}
      >
        <DialogTitle className="pr-8 font-mono text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
          {alt}
        </DialogTitle>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="95vw"
          className="h-auto w-full min-w-0"
        />
      </DialogContent>
    </Dialog>
  );
}
