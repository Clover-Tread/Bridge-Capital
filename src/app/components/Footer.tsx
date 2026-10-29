import Link from "next/link";
import Image from "next/image";

const contactInfo = {
  phone: "(55) 8852 2764",
  email: "contacto@bridgecapital.mx",
  address: [
    "Avenida Insurgentes Sur 1431, Piso 10",
    "Col. Insurgentes Mixcoac, Benito Juárez",
    "03920, Ciudad de México",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bridge+Capital+Insurgentes+Sur+1431+Piso+10+Insurgentes+Mixcoac+CDMX",
};

const siteLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/filosofia-inversion", label: "Filosofía de inversión" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/contacto", label: "Contacto" },
];

const legalLinks = [
  { href: "/legal/aviso-de-privacidad", label: "Aviso de privacidad" },
  { href: "/legal/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/legal/politica-de-cookies", label: "Política de cookies" },
  { href: "/legal/guia-de-servicios-de-inversion", label: "Guía de servicios de inversión" },
  { href: "/legal/marco-general-de-actuacion", label: "Marco general de actuación" },
];

const socialLinks = [
  { href: "https://mx.linkedin.com/company/bridgecapital-asesoresindependientes", label: "LinkedIn" },
  { href: "https://www.facebook.com/share/14HAhQWjSHW/?mibextid=wwXIfr", label: "Facebook" },
  { href: "https://www.instagram.com/bridgecapital_mx", label: "Instagram" },
];

const linkClass =
  "text-[0.9375rem] text-[#c9d2d6] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-night)] text-[#c9d2d6]">
      <div className="mx-auto max-w-screen-xl px-5 pt-16 pb-10 md:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Bridge Capital, inicio">
              <Image
                src="/images/logo-bridge-capital.svg"
                alt=""
                width={16}
                height={32}
                className="brightness-0 invert"
              />
              <span className="text-[0.9375rem] font-semibold tracking-[0.02em] text-white">
                Bridge Capital
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-[family-name:var(--font-display)] text-[1.5rem] leading-snug text-white">
              Asesor en inversiones independiente.
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Registrado ante la CNBV (30152-001 (15445) 03/07/2021). Asesores
              certificados por la AMIB.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-5">
            <h2 className="text-sm font-medium text-white">Contacto</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`tel:${contactInfo.phone.replace(/\D/g, "")}`} className={linkClass}>
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className={linkClass}>
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={contactInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} block leading-relaxed`}>
                  {contactInfo.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
              <li className="text-[0.9375rem]">Lunes a viernes, 9:00 a 18:00</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-medium text-white">Sitio</h2>
            <ul className="mt-5 space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-white">Legal</h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Bridge Capital. Todos los derechos reservados.</p>
          <ul className="flex gap-6">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
