import { asset } from "@/lib/asset";

type Props = {
  name: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/** A photo from public/media: full size + a small one for phones. */
export default function Photo({ name, alt, w, h, className = "", sizes = "100vw", priority = false, style }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/media/${name}.webp`)}
      srcSet={`${asset(`/media/${name}-sm.webp`)} 900w, ${asset(`/media/${name}.webp`)} 2200w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
