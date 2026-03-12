import { GraduationCap, Heart, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Notices", href: "#notices" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "sandharka-green-school",
  );

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-forest-900 text-white">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-forest-900" />
              </div>
              <div>
                <div className="font-serif font-bold text-base leading-tight">
                  Sandharka Green
                </div>
                <div className="text-gold-300 text-xs font-sans tracking-wider">
                  English Boarding School
                </div>
              </div>
            </div>
            <p className="font-sans text-white/60 text-sm leading-relaxed max-w-xs mb-4">
              Nurturing excellence and building character since 2063 B.S.
              Providing quality English-medium education in the heart of
              Arghakhanchi, Nepal.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>Sandharka-2, Arghakhanchi, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>077-420586</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>info@sandharkagreen.edu.np</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-base mb-4 text-gold-300">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="font-sans text-sm text-white/60 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* School Info */}
          <div>
            <h4 className="font-serif font-bold text-base mb-4 text-gold-300">
              School Info
            </h4>
            <ul className="space-y-2 font-sans text-sm text-white/60">
              <li>Established: 2063 B.S.</li>
              <li>Students: 1500+</li>
              <li>Teachers: 55+</li>
              <li>Medium: English</li>
              <li>Type: Boarding School</li>
              <li>Province: Lumbini</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/40 text-xs text-center sm:text-left">
            © {year} Sandharka Green English Boarding School. All rights
            reserved.
          </p>
          <p className="font-sans text-white/40 text-xs flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400 inline" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
