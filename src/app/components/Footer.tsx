import Link from "next/link";
import Image from "next/legacy/image";

// Importaciones de iconos
import { Mail, MapPin, Phone } from "lucide-react";
import LinkedInIcon from "@/app/components/icons/linkedin.svg";
import FacebookIcon from "@/app/components/icons/facebook.svg";
import InstagramIcon from "@/app/components/icons/instagram.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- DATOS DEL FOOTER ---
  const contactInfo = {
    phone: "(55) 8852 2764",
    email: "contacto@bridgecapital.mx",
    addressLine1: "Avenida Insurgentes Sur 1431, Piso 10",
    addressLine2: "Col. Insurgentes Mixcoac, Benito Juárez",
    addressLine3: "03920, Ciudad de México, México",
  };

  const footerLinks = [
    {
      href: "/legal/aviso-de-privacidad",
      label: "Aviso de Privacidad",
    },
    {
      href: "/legal/politica-de-privacidad",
      label: "Política de Privacidad",
    },
    {
      href: "/legal/politica-de-cookies",
      label: "Política de Uso de Cookies",
    },
    {
      href: "/legal/guia-de-servicios-de-inversion",
      label: "Guía de Servicios de Inversión",
    },
    {
      href: "/legal/marco-general-de-actuacion",
      label: "Marco General de Actuación",
    },
    // { href: "/contacto", label: "Preguntas Frecuentes" },
  ];

  const socialLinks = [
    {
      href: "https://mx.linkedin.com/company/bridgecapital-asesoresindependientes",
      label: "LinkedIn",
      IconComponent: LinkedInIcon,
    },
    {
      href: "https://www.facebook.com/share/14HAhQWjSHW/?mibextid=wwXIfr",
      label: "Facebook",
      IconComponent: FacebookIcon,
    },
    {
      href: "https://www.instagram.com/bridgecapital_mx?igsh=MTdvbm82NDJjb3dwNg==",
      label: "Instagram",
      IconComponent: InstagramIcon,
    },
  ];

  // --- Clase para el efecto de hover con subrayado animado ---
  const animatedUnderlineClasses = `
    relative inline-block hover:text-white pb-1
    transition-colors duration-300 ease-in-out
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] 
    after:bg-sky-300
    after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out
    hover:after:scale-x-100
  `;

  return (
    <footer className="bg-[#002A3A] text-gray-400">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* --- Columna 1: Logo y Redes Sociales (Centrado y Modificado) --- */}
          <div className="flex flex-col justify-center items-center space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-bridge-capital-footer.svg"
                alt="Bridge Capital Footer Logo"
                width={450} // Logo un poco más grande
                height={75} // Altura ajustada para mantener la proporción
              />
            </Link>
            <div className="flex space-x-6 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image
                    src={social.IconComponent}
                    alt={social.label}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* --- Columna 2: Contacto --- */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} className="text-sky-300" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                  className={animatedUnderlineClasses}>
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} className="text-sky-300" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className={animatedUnderlineClasses}>
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={16} className="text-sky-300 mt-1 flex-shrink-0" />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300">
                  {contactInfo.addressLine1}
                  <br />
                  {contactInfo.addressLine2}
                  <br />
                  {contactInfo.addressLine3}
                </a>
              </li>
            </ul>
          </div>

          {/* --- Columna 3: Enlaces de Interés --- */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white text-lg mb-4">
              Enlaces de Interés
            </h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={animatedUnderlineClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Barra de Copyright Inferior --- */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>© {currentYear} Bridge Capital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
