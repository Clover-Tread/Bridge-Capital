import Image from "next/image";

type PageHeaderProps = {
  title: string;
  lead?: React.ReactNode;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
};

/**
 * Encabezado de páginas interiores: título en Caslon a la izquierda y,
 * opcionalmente, una fotografía de la serie arquitectónica a la derecha.
 */
export default function PageHeader({ title, lead, image, children }: PageHeaderProps) {
  return (
    <section className="editorial">
      <div className="mx-auto grid max-w-screen-xl gap-12 px-5 pt-10 pb-16 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className={`flex flex-col justify-center ${image ? "lg:col-span-7 lg:pr-8" : "lg:col-span-9"}`}>
          <h1 className="t-display hero-rise">{title}</h1>
          {lead && (
            <div className="t-lead mt-8 hero-rise" style={{ animationDelay: "80ms" }}>
              {lead}
            </div>
          )}
          {children && (
            <div className="mt-10 hero-rise" style={{ animationDelay: "160ms" }}>
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-[var(--color-paper-deep)] lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                quality={75}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={`object-cover grayscale-[35%] ${image.position ?? "object-center"}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
