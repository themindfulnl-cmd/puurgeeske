import type { CSSProperties } from "react";

type Fallback = "jpg" | "png";

type PictureProps = {
  /** Basename under /public/opt, e.g. "intro-poster". */
  name: string;
  /** Widths that actually exist on disk, ascending. */
  widths: number[];
  /** The CSS width this image occupies, so the browser can pick before layout. */
  sizes: string;
  alt: string;
  /** Intrinsic size of the largest variant — reserves the box, kills CLS. */
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /** True for anything above the fold; it becomes eager + high priority. */
  priority?: boolean;
  fallback?: Fallback;
  /** Which width the <img> src points at — the smallest by default. */
  fallbackWidth?: number;
  /** Skip the AVIF source for images where no AVIF variant exists. */
  avif?: boolean;
};

/** A plain <picture> with pre-generated AVIF/WebP. No client JS, no optimizer
 *  round trip — the files are on the CDN already and cached immutable. */
export function Picture({
  name,
  widths,
  sizes,
  alt,
  width,
  height,
  className,
  imgClassName,
  style,
  priority = false,
  fallback = "jpg",
  fallbackWidth,
  avif = true,
}: PictureProps) {
  const srcset = (ext: string) =>
    widths.map((w) => `/opt/${name}-${w}.${ext} ${w}w`).join(", ");

  const fw = fallbackWidth ?? widths[0];

  return (
    <picture className={className}>
      {avif && <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />}
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/opt/${name}-${fw}.${fallback}`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
        style={style}
      />
    </picture>
  );
}
