import Image from "next/image";

export default function FotoInline({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <span className="inline-block align-text-bottom mx-1 w-7 h-7 rounded-full overflow-hidden border-2 border-accent/50 relative">
      <Image src={src} alt={alt} fill className="object-cover" />
    </span>
  );
}