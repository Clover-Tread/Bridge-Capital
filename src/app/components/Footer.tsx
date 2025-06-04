import Link from 'next/link';
import Image from "next/legacy/image";

import LinkedInIcon from '@/app/components/icons/linkedin.svg';
import FacebookIcon from '@/app/components/icons/facebook.svg';
import InstagramIcon from '@/app/components/icons/instagram.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: 'https://www.bridgecapital.mx/pdf/aviso.pdf', label: 'Aviso de Privacidad' },
    { href: 'https://www.bridgecapital.mx/pdf/politicaprivacidad.pdf', label: 'Política de Privacidad' },
    { href: 'https://www.bridgecapital.mx/pdf/politicacookies.pdf', label: 'Política de Uso de Cookies' },
    { href: 'https://www.bridgecapital.mx/pdf/guia.pdf', label: 'Guía de Servicios de Inversión' },
    { href: 'https://www.bridgecapital.mx/pdf/guia.pdf', label: 'Marco General de Actuación' },
    { href: '/contacto', label: 'Preguntas Frecuentes' },
  ];

  const socialLinks = [
    { href: '#', label: 'LinkedIn', IconComponent: LinkedInIcon },
    { href: '#', label: 'Facebook', IconComponent: FacebookIcon },
    { href: '#', label: 'Instagram', IconComponent: InstagramIcon },
  ];

  const footerHoverTextColor = 'hover:text-white';
  const afterBgFooterHoverColor = 'after:bg-sky-300';

  return (
    <footer className="bg-[#002A3A] text-gray-400">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Sección superior: Logo, email y enlaces */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 mb-8 md:mb-10">
          {/* Columna Izquierda: Logo y Email */}
          <div className="md:col-span-1 flex flex-col items-center space-y-4 text-center md:text-left"> 
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-bridge-capital-footer.svg"
                alt="Bridge Capital Footer Logo"
                width={300}
                height={50}
              />
            </Link>
            <div>
              <a
                href="mailto:contacto@bridgecapital.mx"
                className={`
                  relative text-sm inline-block 
                  ${footerHoverTextColor} 
                  pb-1 
                  transition-all duration-300 ease-in-out
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] 
                  ${afterBgFooterHoverColor}
                  after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out
                  hover:after:scale-x-100
                `}
              >
                contacto@bridgecapital.mx
              </a>
            </div>
          </div>

          {/* Columna Derecha: Enlaces */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-center sm:text-left">
              {footerLinks.map((link) => (
                <div key={link.label} className="w-full flex justify-center sm:justify-start">
                  <Link
                    href={link.href}
                    target='_blank'
                    rel="noopener noreferrer"
                    className={`
                      relative text-sm inline-flex items-center
                      ${footerHoverTextColor}
                      pb-1
                      transition-all duration-300 ease-in-out
                      group 
                      after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px]
                      ${afterBgFooterHoverColor}
                      after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out
                      hover:after:scale-x-100
                    `}
                  >
                    {/* En móvil, el '>' podría no verse tan bien si el texto está centrado. Se mantiene por consistencia. */}
                    <span className="mr-1.5 mt-0.5 text-xs text-gray-500 group-hover:text-sky-300 transition-colors duration-200 transform scale-x-75 scale-y-100">&gt;</span>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Línea Separadora */}
        <hr className="border-t border-white my-8 md:my-10" />

        {/* Sección Inferior: Copyright y Redes Sociales */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Bridge Capital. Todos los derechos reservados.
          </p>
          {/* Para centrar los iconos sociales en móvil si están solos en una línea */}
          <div className="flex space-x-4 justify-center md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Image
                    src={social.IconComponent}     // this is that metadata object
                    alt={social.label}
                    width={24}                     // or whatever size you want
                    height={24}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;