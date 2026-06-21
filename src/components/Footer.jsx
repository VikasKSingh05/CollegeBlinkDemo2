import { GraduationCap, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const productLinks = [
  "College Search",
  "Institutes",
  "Exams",
  "Study Abroad",
  "Smart Counselor",
  "Scholarships",
  "Compare Colleges",
];

const companyLinks = ["About Us", "Careers", "Contact", "Partners", "Press Kit"];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_24%)]" />

      <div className="container relative mx-auto px-4 py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg">
                <GraduationCap className="h-8 w-8" />
              </div>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
              Smart-powered college discovery for Indian students.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block text-sm text-gray-500 transition hover:translate-x-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block text-sm text-gray-500 transition hover:translate-x-1 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="group flex cursor-pointer items-start gap-3 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-700 transition-transform group-hover:scale-110 dark:text-cyan-300" />
                <span>info@collegeblink.com</span>
              </li>
              <li className="group flex cursor-pointer items-start gap-3 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 text-cyan-700 transition-transform group-hover:scale-110 dark:text-cyan-300" />
                <span>+91 9278115957</span>
              </li>
              <li className="group flex cursor-pointer items-start gap-3 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-700 transition-transform group-hover:scale-110 dark:text-cyan-300" />
                <span>Noida, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 lg:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Copyright 2026 CollegeBlink. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-gray-500 transition hover:underline hover:underline-offset-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-110 hover:shadow-cyan-500/30"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
