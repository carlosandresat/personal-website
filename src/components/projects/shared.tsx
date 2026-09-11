import Image from "next/image";

/** Paragraph rhythm shared by every project body. */
export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-7">{children}</p>;
}

/** An emoji-led subheading, as authored in the original project write-ups. */
export function H({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function Bullets({ children }: { children: React.ReactNode }) {
  return <ul className="ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

export function Bullet({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <span className="font-semibold">{term} </span>
      {children}
    </li>
  );
}

export function Shots({
  images,
}: {
  images: { src: string; alt: string; size?: number }[];
}) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
      {images.map((image) => (
        <Image
          key={image.src}
          alt={image.alt}
          src={image.src}
          width={image.size ?? 800}
          height={image.size ?? 800}
          className="border-4"
        />
      ))}
    </div>
  );
}
