import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    "About",
    "Car",
    "Events",
    "Sponsors",
    "Gallery",
    "News",
    "Contact",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", bg: "bg-blue-500" },
    { icon: Twitter, label: "Twitter", bg: "bg-cyan-500" },
    { icon: Instagram, label: "Instagram", bg: "bg-pink-500" },
    { icon: Youtube, label: "YouTube", bg: "bg-red-600" },
    { icon: Linkedin, label: "LinkedIn", bg: "bg-purple-600" },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-gray-900 text-white overflow-hidden"
    >
      {/* Comic rays */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-white"
              style={{ left: `${i * 5}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3
                className="text-4xl text-red-600 tracking-wider"
                style={{
                  WebkitTextStroke: "4px white/30",
                  paintOrder: "stroke fill",
                }}
              >
                MIST BLITZ
              </h3>
              <div className="mt-2 inline-block bg-yellow-300 border-3 border-white px-3 py-1 -rotate-2 shadow-[3px_3px_0px_white]">
                <span className="text-sm uppercase text-black tracking-wider">
                  Formula Student
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Engineering excellence on the racetrack. Join us in pushing the
              boundaries of innovation!
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 border-2 border-white flex items-center justify-center transition-all hover:scale-110"    style={{ boxShadow: "3px 3px 0px white" }}>
                  <Mail size={16} />
                </div>
                info@mistblitz.com
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 border-2 transition-all hover:scale-110 border-white flex items-center justify-center"    style={{ boxShadow: "3px 3px 0px white" }}>
                  <Phone size={16} />
                </div>
                +880 XXXXXXXX
              </div>
              <div className="flex items-center gap-3" >
                <div    style={{ boxShadow: "3px 3px 0px white" }}  className="w-8 transition-all hover:scale-110 h-8 bg-blue-500 border-2 border-white flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                MIST Campus, Dhaka
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl mb-6 text-red-500">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="inline-block text-gray-300 hover:text-yellow-400 uppercase text-sm tracking-wider transition-all hover:translate-x-2"
                  >
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div>
            <h4 className="text-2xl mb-6 text-yellow-400">Upcoming</h4>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-400">Jan 15, 2025</p>
                Team Recruitment
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-400">Mar 20, 2025</p>
                Car Launch Event
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="text-gray-400">Jun 10, 2025</p>
                Formula Student UK
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-2xl mb-6 text-blue-500">Follow Us</h4>
            <p className="text-gray-300 mb-6 text-sm">
              Stay connected for the latest updates, photos, and race results!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, label, bg }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`group w-12 h-12 border-4 border-white flex items-center justify-center transition-all hover:scale-110 ${bg}`}
                  style={{ boxShadow: "3px 3px 0px white" }}
                >
                  <Icon
                    size={24}
                    strokeWidth={2.5}
                    className="group-hover:scale-125 transition-transform"
                  />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <div className="inline-block bg-white text-black border-3 border-yellow-400 px-4 py-2 transform rotate-4 shadow-[4px_4px_0px_yellow]">
                <span className="uppercase text-sm tracking-wider">
                  Join the Blitz!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-4 border-white my-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <span>© 2024 MIST Blitz Formula Student Team</span>

          <div className="flex gap-3 mt-2 md:mt-0">
            <span className="px-3 py-1 bg-blue-500 border-2 border-white -rotate-2 text-xs uppercase tracking-wider">
              Fast
            </span>
            <span className="px-3 py-1 bg-yellow-400 border-2 border-black text-black text-xs uppercase tracking-wider">
              Fierce
            </span>
            <span className="px-3 py-1 bg-red-500 border-2 border-white rotate-2 text-xs uppercase tracking-wider">
              Fearless
            </span>
          </div>
        </div>
      </div>

      {/* Comic decorative element */}
      <div
        className="absolute bottom-4 right-4 w-20 h-20 bg-yellow-400 border-4 border-white opacity-20 transform rotate-45"
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      ></div>
    </footer>
  );
}
