import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Share2,
  ChevronRight,
  X,
  CheckCircle2,
  Utensils,
  Zap,
  Award,
  Eye,
  Menu as MenuIcon,
  Volume2,
  Info
} from 'lucide-react';

// --- CUSTOM SVG ILLUSTRATIONS & ASSETS ---

const ChiliIllustration = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M88.5 28.5C94 22 98 12 95 8C92 4 84 12 79.5 19.5"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M72 22C78 19 86 24 88 31C91 41 83 61 68 78C51 97 25 108 14 102C9 99 12 91 19 86C31 78 46 66 56 49C62 39 65 25 72 22Z"
      fill={color}
    />
    <path
      d="M69 32C65 44 56 59 42 72"
      stroke="#171310"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeDasharray="6 6"
    />
  </svg>
);

const MortarPestleSVG = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Pestle (Alu) */}
    <path
      d="M88 18L112 34L78 78L58 66L88 18Z"
      fill="#F2BC4D"
      stroke="#171310"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Sparks */}
    <path d="M44 45L32 36M52 34L48 20M98 62L114 58" stroke="#F5E9D5" strokeWidth="4" strokeLinecap="round" />
    {/* Mortar (Lesung Batu) */}
    <path
      d="M20 72H120L108 112C105 120 96 124 86 124H54C44 124 35 120 32 112L20 72Z"
      fill="#171310"
      stroke="#F5E9D5"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path d="M16 72H124" stroke="#F2BC4D" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const StarburstBadgeSVG = ({ className = "w-full h-full", fill = "#E6392B" }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fill={fill}
      d="M100 0L117.6 25.1L146.9 14.6L151.9 44.7L183.9 47.5L175.8 77.3L200 95.5L179.9 119.5L193.9 146.9L165.4 159.9L166.9 190.9L135.8 190.1L123.9 200L100 183.9L76.1 200L64.2 190.1L33.1 190.9L34.6 159.9L6.1 146.9L20.1 119.5L0 95.5L24.2 77.3L16.1 47.5L48.1 44.7L53.1 14.6L82.4 25.1L100 0Z"
    />
  </svg>
);

// --- DATA DEFINITIONS ---

const SIGNATURE_MENU = [
  {
    id: 'pokmi-ori',
    code: 'SET 01',
    name: 'SET POKMI ORI',
    tagline: 'THE OG AYAM GEPUK',
    badge: 'PALING LARIS',
    badgeColor: '#E6392B',
    badgeTextColor: '#F5E9D5',
    spiceCount: 3,
    shortDesc:
      'Ayam perap rempah 12 jam yang digoreng rangup keemasan, digepuk panas-panas dan disiram sambal gajus tumbuk asli.',
    details: [
      'Peha / Dada Ayam Gepuk Rangup',
      'Sambal Cili Padi Gajus Tumbuk Segar',
      'Kremesan Rangup Berempah',
      'Tauhu & Tempe Goreng Kunyit',
      'Kobis Segar & Kicap Manis Lemak'
    ],
    textureNote: 'Kulit ekstra garing, isi berjus, pedas berlemak.',
    image:
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=85',
    accent: '#F2BC4D'
  },
  {
    id: 'pokmi-krispi',
    code: 'SET 02',
    name: 'POKMI KRISPI DOUBLE SAMBAL',
    tagline: 'EXTRA CRUNCH • EXTRA FIRE',
    badge: 'PEDAS BERAPI',
    badgeColor: '#F2BC4D',
    badgeTextColor: '#171310',
    spiceCount: 5,
    shortDesc:
      'Dua kali ganda kerangupan salutan tepung berempah rahsia, ditimbun dengan dua senduk sambal gesek cili api merah menyala.',
    details: [
      'Ayam Gepuk Salutan Krispi Berganda',
      'Double Portion Sambal Gesek Berapi',
      'Taburan Bawang Goreng & Kremesan',
      'Tempe & Tauhu Goreng Panas',
      'Renjisan Kicap Pedas Karamel'
    ],
    textureNote: 'Bunyi "krup-krap" setiap gigitan dengan sengatan cili padu.',
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=85',
    accent: '#E6392B'
  },
  {
    id: 'pokmi-sultan',
    code: 'SET 03',
    name: 'SET POKMI SULTAN KOMBO',
    tagline: 'HIDANGAN LENGKAP TERPADU',
    badge: 'WAJIB CUBA',
    badgeColor: '#171310',
    badgeTextColor: '#F2BC4D',
    spiceCount: 4,
    shortDesc:
      'Dulang penuh kepuasan untuk peminat tegar gepuk. Gabungan ayam gepuk besar, cendawan enoki rangup, dan lauk sampingan penuh meja.',
    details: [
      'Ayam Gepuk Saiz Padu + Enoki Krispi',
      'Sambal Gajus + Sambal Hijau Pilihan',
      'Telur Masin Separuh & Tempe Goreng',
      'Gunung Kremesan & Ulam Kobis',
      'Kicap Manis Pekat Istimewa'
    ],
    textureNote: 'Kombinasi tekstur lengkap — rangup, masin, manis, dan pedas menyengat.',
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=85',
    accent: '#F5E9D5'
  }
];

const SAMBAL_LEVELS = [
  {
    level: 'TAHAP 01',
    name: 'MANJA BERLEMAK',
    scoville: 'SANTAI & HARUM',
    chiliRatio: '30% Cili Padi • 70% Kacang Gajus Panggang',
    desc: 'Sesuai untuk yang baru nak kenal penangan Pokmi. Rasa lemak kacang gajus lebih dominan dengan aroma bawang putih goreng yang memikat.',
    quote: '"Pedas manja-manja, budak sekolah pun senyum makan."'
  },
  {
    level: 'TAHAP 02',
    name: 'PADU POKMI (SIGNATURE)',
    scoville: 'STANDARD JALANAN',
    chiliRatio: '60% Cili Padi Merah • 40% Kacang Gajus',
    desc: 'Keseimbangan sempurna antara kepedasan cili padi segar dan tekstur kasar kacang gajus tumbuk. Disiram minyak panas beraroma.',
    quote: '"Sekali suap terus melekat. Ini level wajib order!"'
  },
  {
    level: 'TAHAP 03',
    name: 'BERAPI MENYENGAT',
    scoville: 'PELUH JANTAN',
    chiliRatio: '85% Cili Padi Kampung • 15% Gajus',
    desc: 'Ditumbuk kasar menggunakan cili padi kampung pilihan. Pedasnya naik terus ke telinga, tapi tangan tak boleh berhenti menyuap nasi.',
    quote: '"Sediakan tisu siap-siap. Pedas tapi ketagih!"'
  },
  {
    level: 'TAHAP 04',
    name: 'PEDAS TAUBAT',
    scoville: 'AMARAN KERAS',
    chiliRatio: '100% Cili Padi Burung + Minyak Cili Gesek',
    desc: 'Hanya untuk pahlawan pedas sejati. Tiada kompromi, penuh dengan biji cili tumbuk segar yang membakar deria rasa.',
    quote: '"Jangan cabar kalau hati tisu. Memang lain macam!"'
  }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'GEPUK PANAS DARI KUALI',
    category: 'AYAM RANGUP',
    span: 'md:col-span-7 md:row-span-2',
    height: 'h-[360px] md:h-[580px]',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1400&q=85',
    caption: 'Kulit rangup berempah yang diketuk tepat sebelum dihidang.'
  },
  {
    id: 2,
    title: 'SAMBAL LESUNG BATU',
    category: 'SAMBAL PADU',
    span: 'md:col-span-5 md:row-span-1',
    height: 'h-[280px] md:h-[278px]',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80',
    caption: 'Cili padi merah segar ditumbuk kasar bersama bawang putih & gajus.'
  },
  {
    id: 3,
    title: 'KERANGUPAN TIADA TANDINGAN',
    category: 'TEKSTUR',
    span: 'md:col-span-5 md:row-span-1',
    height: 'h-[280px] md:h-[278px]',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80',
    caption: 'Perapan kunyit, ketumbar dan rempah asli Nusantara.'
  },
  {
    id: 4,
    title: 'SUASANA LEPAK MALAM',
    category: 'BUDAYA KITA',
    span: 'md:col-span-4 md:row-span-1',
    height: 'h-[280px] md:h-[340px]',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    caption: 'Bukan sekadar makan, tapi port lepak bersama geng.'
  },
  {
    id: 5,
    title: 'SET LENGKAP ATAS DULANG',
    category: 'HIDANGAN',
    span: 'md:col-span-8 md:row-span-1',
    height: 'h-[300px] md:h-[340px]',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=85',
    caption: 'Nasi putih beras wangi, ayam gepuk, tempe, tauhu dan kicap manis.'
  }
];

const DEMO_LOCATIONS = [
  {
    id: 'kl-flagship',
    tag: 'CONCEPT FLAGSHIP [DEMO]',
    name: 'POKMI KUALA LUMPUR CENTRAL',
    address: 'Lot Demo 88, Jalan Bukit Bintang (Placeholder Lokasi Konsep)',
    hours: 'Setiap Hari: 11:00 PG – 11:30 MLM (Contoh)',
    phone: '+60 12-000 0000 (Nombor Demo)',
    vibe: 'Dine-In Berhawa Dingin & Meja Jalanan Malam'
  },
  {
    id: 'selangor-hub',
    tag: 'STREET POP HUB [DEMO]',
    name: 'POKMI SHAH ALAM SEKSYEN 7',
    address: 'No. 12A, Medan Selera Konsep, Shah Alam (Placeholder Demo)',
    hours: 'Setiap Hari: 11:30 PG – 11:00 MLM (Contoh)',
    phone: '+60 12-000 0001 (Nombor Demo)',
    vibe: 'Port Lepak Pelajar & Komuniti'
  },
  {
    id: 'jb-south',
    tag: 'SOUTHERN OUTPOST [DEMO]',
    name: 'POKMI JOHOR BAHRU BAZAAR',
    address: 'Unit Demo 04, Zon Warisan Jalanan (Placeholder Demo)',
    hours: 'Selasa – Ahad: 12:00 TGH – 12:00 MLM (Contoh)',
    phone: '+60 12-000 0002 (Nombor Demo)',
    vibe: 'Konsep Terbuka & Dapur Tumbuk Live'
  }
];

// --- CUSTOM HOOK FOR SCROLL REVEAL ---
function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSambalIdx, setActiveSambalIdx] = useState(1);
  const [selectedMenuCard, setSelectedMenuCard] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [crunchCounter, setCrunchCounter] = useState(1284);
  const [crushPulse, setCrushPulse] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTriggerGepuk = () => {
    setCrushPulse(true);
    setCrunchCounter((prev) => prev + 1);
    setTimeout(() => setCrushPulse(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#171310] text-[#F5E9D5] font-sans selection:bg-[#E6392B] selection:text-[#F5E9D5] overflow-x-hidden">
      {/* GOOGLE FONTS & CUSTOM STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --charcoal: #171310;
          --chili: #E6392B;
          --golden: #F2BC4D;
          --cream: #F5E9D5;
        }

        .font-display {
          font-family: 'Anton', Impact, sans-serif;
          letter-spacing: 0.015em;
          line-height: 0.93;
        }

        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-mono-tech {
          font-family: 'Space Mono', monospace;
        }

        /* Subtle tactile film noise overlay */
        .bg-noise {
          background-image: radial-gradient(rgba(245, 233, 213, 0.06) 1px, transparent 0);
          background-size: 24px 24px;
        }

        /* Scroll Reveal Animations */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        /* Continuous Marquee Animation */
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 26s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Rotating Sticker Animation */
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spinSlow 18s linear infinite;
        }

        @keyframes floatPulse {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }

        .animate-sticker {
          animation: floatPulse 3.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-spin-slow,
          .animate-sticker {
            animation: none !important;
          }
          .reveal-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* Custom Neo-Street Borders & Shadows */
        .shadow-brutal-red {
          box-shadow: 6px 6px 0px #E6392B;
        }
        .shadow-brutal-yellow {
          box-shadow: 6px 6px 0px #F2BC4D;
        }
        .shadow-brutal-dark {
          box-shadow: 8px 8px 0px #171310;
        }
      `}</style>

      {/* ==================== STICKY NAVIGATION ==================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#171310]/95 backdrop-blur-md border-b border-[#F5E9D5]/15 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#171310]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-[#E6392B] border-2 border-[#F2BC4D] flex items-center justify-center shadow-brutal-yellow group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Flame className="w-6 h-6 text-[#F2BC4D] fill-[#F2BC4D]" />
            </div>
            <div>
              <span className="block font-display text-2xl sm:text-3xl tracking-wider text-[#F5E9D5] leading-none">
                AYAM GEPUK <span className="text-[#F2BC4D]">POKMI</span>
              </span>
              <span className="block font-mono-tech text-[10px] tracking-[0.22em] text-[#E6392B] uppercase font-bold mt-0.5">
                SAMBAL NOIR × GEPUK POP
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#171310]/90 border border-[#F5E9D5]/15 rounded-full px-3 py-1.5">
            {[
              { label: 'KISAH POKMI', id: 'experience' },
              { label: 'MENU SIGNATURE', id: 'menu' },
              { label: 'SAMBAL PADU', id: 'sambal' },
              { label: 'GALERI', id: 'gallery' },
              { label: 'LOKASI', id: 'find-pokmi' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase text-[#F5E9D5]/80 hover:text-[#171310] hover:bg-[#F2BC4D] transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Interactive Gepuk Counter + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleTriggerGepuk}
              title="Ketuk Lesung Sekarang!"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#F2BC4D]/40 bg-[#171310] text-xs font-mono-tech text-[#F2BC4D] hover:border-[#F2BC4D] transition-all ${
                crushPulse ? 'scale-110 bg-[#E6392B] text-[#F5E9D5]' : ''
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#E6392B] fill-[#E6392B]" />
              <span>GEPUK #{crunchCounter}</span>
            </button>

            <button
              onClick={() => scrollToSection('menu')}
              className="bg-[#E6392B] hover:bg-[#F2BC4D] text-[#F5E9D5] hover:text-[#171310] font-extrabold text-xs tracking-widest uppercase px-5 py-3 rounded-full border-2 border-[#F5E9D5] transition-all duration-200 flex items-center gap-1.5 shadow-lg"
            >
              <span>LIHAT MENU</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2.5 rounded-xl bg-[#E6392B] text-[#F5E9D5] border-2 border-[#F2BC4D]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#171310] border-b-4 border-[#E6392B] px-6 pt-4 pb-8 space-y-3 animate-fadeIn">
            {[
              { label: '01 / KISAH POKMI', id: 'experience' },
              { label: '02 / MENU SIGNATURE', id: 'menu' },
              { label: '03 / BUKAN SAMBAL BIASA', id: 'sambal' },
              { label: '04 / GALERI VISUAL', id: 'gallery' },
              { label: '05 / CARI POKMI', id: 'find-pokmi' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left py-3 border-b border-[#F5E9D5]/10 font-display text-3xl text-[#F5E9D5] hover:text-[#F2BC4D] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-6 h-6 text-[#E6392B]" />
              </button>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#F2BC4D]">PEDAS DIA LAIN MACAM!</span>
              <button
                onClick={() => scrollToSection('menu')}
                className="bg-[#E6392B] text-[#F5E9D5] font-bold text-xs uppercase px-5 py-2.5 rounded-full"
              >
                TEROKA SEKARANG
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================== 1. CINEMATIC HERO ==================== */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen pt-28 pb-16 md:py-32 flex items-center bg-[#171310] bg-noise overflow-hidden border-b-4 border-[#E6392B]"
      >
        {/* Ambient Spotlight Glows (Subtle, atmospheric) */}
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[550px] h-[550px] rounded-full opacity-25 blur-[130px]"
          style={{ backgroundColor: '#E6392B' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{ backgroundColor: '#F2BC4D' }}
        />

        {/* Giant Background Outlined Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] leading-none whitespace-nowrap opacity-[0.035] text-[#F5E9D5]"
        >
          GEPUK POKMI
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Asymmetric Typography & CTA (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Pill Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5E9D5]/10 border border-[#F2BC4D]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6392B] animate-ping" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#F2BC4D] font-bold">
                  WARISAN JALANAN • CITARASA PREMIUM
                </span>
              </div>

              {/* Oversized Headline */}
              <div className="relative">
                <h1 className="font-display text-[4.2rem] sm:text-[6.2rem] xl:text-[7.6rem] uppercase text-[#F5E9D5] tracking-tight leading-[0.88]">
                  <span className="block">SEKALI GEPUK.</span>
                  <span className="block text-[#F2BC4D] drop-shadow-[4px_4px_0px_#E6392B]">
                    TERUS MELEKAT.
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F5E9D5] max-w-xl leading-snug border-l-4 border-[#E6392B] pl-5 py-1">
                Ayam rangup. Sambal padu.{' '}
                <span className="underline decoration-[#F2BC4D] decoration-4 underline-offset-4">
                  Memang puas.
                </span>
              </p>

              <p className="text-sm sm:text-base text-[#F5E9D5]/75 max-w-lg leading-relaxed">
                Diketuk panas-panas atas lesung batu bersama sambal cili padi gajus yang ditumbuk segar.
                Gabungan kerangupan rempah emas dan sengatan pedas yang buat anda tak pandang kiri kanan.
              </p>

              {/* CTA & Interactive Spice Badge Row */}
              <div className="pt-3 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => scrollToSection('experience')}
                  className="group relative inline-flex items-center gap-4 bg-[#E6392B] text-[#F5E9D5] font-display text-2xl sm:text-3xl tracking-wider uppercase px-8 py-4 rounded-2xl border-2 border-[#F5E9D5] shadow-brutal-yellow hover:bg-[#F2BC4D] hover:text-[#171310] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  <span>JOM TEROKA</span>
                  <span className="w-10 h-10 rounded-xl bg-[#171310] text-[#F2BC4D] flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowDownRight className="w-6 h-6" />
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('sambal')}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-[#F5E9D5]/25 hover:border-[#F2BC4D] text-[#F5E9D5] hover:text-[#F2BC4D] font-bold text-sm uppercase tracking-wider transition-all"
                >
                  <Flame className="w-5 h-5 text-[#E6392B]" />
                  <span>UJI TAHAP PEDAS</span>
                </button>
              </div>

              {/* Street Credibility Micro-Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg border-t border-[#F5E9D5]/15">
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-[#F2BC4D]">100%</div>
                  <div className="text-xs font-mono-tech uppercase text-[#F5E9D5]/70">
                    SAMBAL TUMBUK SEGAR
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-[#E6392B]">12 JAM</div>
                  <div className="text-xs font-mono-tech uppercase text-[#F5E9D5]/70">
                    PERAPAN REMPAH ASLI
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-[#F5E9D5]">4 TAHAP</div>
                  <div className="text-xs font-mono-tech uppercase text-[#F5E9D5]/70">
                    KEPEDASAN LESUNG
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dramatic Hero Food Composition + Animated Red Sticker (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Animated Red Sticker: "PEDAS DIA LAIN MACAM!" */}
              <div
                onClick={handleTriggerGepuk}
                className="cursor-pointer select-none absolute -top-8 -left-4 sm:-left-8 z-30 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center animate-sticker group"
              >
                <StarburstBadgeSVG
                  className="w-full h-full drop-shadow-[0_10px_25px_rgba(230,57,43,0.6)] group-hover:scale-105 transition-transform"
                  fill="#E6392B"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 -rotate-6">
                  <Flame className="w-6 h-6 text-[#F2BC4D] fill-[#F2BC4D] mb-0.5" />
                  <span className="font-display text-lg sm:text-xl leading-none text-[#F5E9D5] tracking-wide uppercase">
                    PEDAS DIA
                  </span>
                  <span className="font-display text-xl sm:text-2xl leading-none text-[#F2BC4D] tracking-wide uppercase mt-0.5">
                    LAIN MACAM!
                  </span>
                  <span className="font-mono-tech text-[9px] text-[#F5E9D5]/90 mt-1 uppercase">
                    [KLIK GEPUK]
                  </span>
                </div>
              </div>

              {/* Main Hero Food Frame */}
              <div
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${
                    mousePos.y * -4
                  }deg)`
                }}
                className="relative rounded-[2rem] bg-[#171310] border-4 border-[#F5E9D5] p-3 shadow-brutal-red transition-transform duration-200 ease-out"
              >
                <div className="relative rounded-[1.4rem] overflow-hidden aspect-[4/5] bg-[#241d18]">
                  <img
                    src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1400&q=85"
                    alt="Ayam Gepuk Pokmi — Ayam Goreng Rangup dengan Sambal Cili Padi Gajus"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                  />
                  {/* Dramatic Noir Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/20 to-transparent" />

                  {/* Floating Food Callout Tags inside Hero Image */}
                  <div className="absolute top-5 right-5 bg-[#171310]/90 backdrop-blur-md border border-[#F2BC4D] px-3.5 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2BC4D]" />
                    <span className="font-mono-tech text-[11px] text-[#F5E9D5] font-bold">
                      KULIT RANGUP EMAS
                    </span>
                  </div>

                  {/* Bottom Plate Caption */}
                  <div className="absolute bottom-5 left-5 right-5 bg-[#171310]/90 backdrop-blur-md border-2 border-[#E6392B] rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#F2BC4D] block">
                        HIDANGAN IKONIK
                      </span>
                      <span className="font-display text-2xl text-[#F5E9D5] tracking-wide">
                        SET POKMI ORI + SAMBAL GAJUS
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#E6392B] flex items-center justify-center text-[#F5E9D5] shrink-0">
                      <Flame className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Chili & Golden Badge Bottom Right */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 z-20 bg-[#F2BC4D] text-[#171310] border-4 border-[#171310] rounded-2xl px-5 py-3 items-center gap-3 shadow-xl rotate-3">
                <ChiliIllustration className="w-9 h-9" color="#E6392B" />
                <div>
                  <div className="font-display text-xl leading-none">TUMBUK SEGAR</div>
                  <div className="font-mono-tech text-[10px] font-bold uppercase">
                    TIADA PES SEGERA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HIGH-ENERGY KINETIC MARQUEE ==================== */}
      <div className="bg-[#F2BC4D] text-[#171310] py-4 border-b-4 border-[#171310] overflow-hidden select-none">
        <div className="animate-marquee flex items-center">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center shrink-0">
              {[
                'SEKALI GEPUK TERUS MELEKAT',
                'AYAM RANGUP BEREMPAH',
                'SAMBAL GAJUS LESUNG BATU',
                'PEDAS DIA LAIN MACAM!',
                'KICAP MANIS LEMAK PEKAT',
                'KREMESAN GARING KRUP-KRAP'
              ].map((phrase, idx) => (
                <div key={idx} className="flex items-center mx-6">
                  <span className="font-display text-2xl sm:text-3xl tracking-wider uppercase">
                    {phrase}
                  </span>
                  <Flame className="w-6 h-6 mx-6 text-[#E6392B] fill-[#E6392B]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================== 2. THE POKMI EXPERIENCE (EDITORIAL STORYTELLING) ==================== */}
      <section
        id="experience"
        className="py-24 md:py-32 bg-[#F5E9D5] text-[#171310] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 reveal-on-scroll">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171310] text-[#F2BC4D] font-mono-tech text-xs uppercase tracking-widest mb-4">
                <span>BAB 01</span>
                <span>•</span>
                <span>SENI AYAM GEPUK JALANAN</span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] text-[#171310]">
                KENAPA POKMI <br />
                <span className="text-[#E6392B]">BUAT ORANG KETAGIH?</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base sm:text-lg font-semibold text-[#171310]/85 leading-relaxed border-l-4 border-[#171310] pl-5">
                Kami tidak percaya pada jalan pintas. Setiap ketul ayam melalui ritual perapan,
                gorengan suhu tinggi, dan hentakan lesung batu yang membuka ruang untuk sambal
                meresap ke setiap serat isi.
              </p>
            </div>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Large Left Visual Story Card (7 Columns) */}
            <div className="lg:col-span-7 reveal-on-scroll">
              <div className="h-full rounded-3xl bg-[#171310] text-[#F5E9D5] p-5 sm:p-8 border-4 border-[#171310] shadow-brutal-red flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/11] mb-6 bg-[#241d18]">
                  <img
                    src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1400&q=85"
                    alt="Close up Ayam Gepuk Rangup Pokmi"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#E6392B] text-[#F5E9D5] font-mono-tech text-xs font-bold px-4 py-1.5 rounded-full uppercase">
                    BUNYI &quot;KRUP-KRAP&quot; ASLI
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F5E9D5]/15 pb-3">
                    <span className="font-mono-tech text-xs text-[#F2BC4D] uppercase tracking-widest">
                      RAHSIA 01 // TEKSTUR LUAR & DALAM
                    </span>
                    <span className="font-mono-tech text-xs text-[#F5E9D5]/60">SUHU 185°C</span>
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl text-[#F5E9D5] uppercase">
                    RANGUP DI LUAR, BERJUS DI DALAM.
                  </h3>
                  <p className="text-[#F5E9D5]/80 text-base leading-relaxed">
                    Apabila ayam panas baru diangkat dari kuali terus digepuk dengan lesung batu,
                    kulit rangupnya pecah sedikit — membenarkan minyak cili bawang putih dan lemak
                    kacang gajus menyelinap terus ke dalam isi ayam yang lembut.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dual Stacked Story Blocks (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-8 reveal-on-scroll delay-100">
              {/* Top Card: Sambal Gajus */}
              <div className="flex-1 rounded-3xl bg-[#E6392B] text-[#F5E9D5] p-7 border-4 border-[#171310] shadow-brutal-dark flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono-tech text-xs uppercase tracking-widest bg-[#171310] text-[#F2BC4D] px-3 py-1 rounded-full">
                    RAHSIA 02 // SAMBAL GESEK
                  </span>
                  <MortarPestleSVG className="w-16 h-16 shrink-0" />
                </div>

                <div className="my-4">
                  <h3 className="font-display text-4xl sm:text-5xl uppercase leading-none mb-3">
                    TUMBUK ATAS LESUNG BATU.
                  </h3>
                  <p className="text-[#F5E9D5]/95 text-sm sm:text-base leading-relaxed font-medium">
                    Bukan dikisar guna mesin! Cili padi merah, bawang putih goreng dan kacang gajus
                    panggang ditumbuk tangan supaya teksturnya kasar, berlemak dan wangi.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5E9D5]/25 flex items-center justify-between text-xs font-mono-tech">
                  <span>CILI PADI + GAJUS PANGGANG</span>
                  <span className="font-bold text-[#F2BC4D]">100% FRESH</span>
                </div>
              </div>

              {/* Bottom Card: Street Food Culture */}
              <div className="flex-1 rounded-3xl bg-[#F2BC4D] text-[#171310] p-7 border-4 border-[#171310] shadow-brutal-dark flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs uppercase tracking-widest bg-[#171310] text-[#F5E9D5] px-3 py-1 rounded-full">
                    RAHSIA 03 // BUDAYA JALANAN
                  </span>
                  <Utensils className="w-7 h-7 text-[#171310]" />
                </div>

                <div className="my-4">
                  <h3 className="font-display text-4xl sm:text-5xl uppercase leading-none mb-3">
                    NASI PANAS, KICAP MANIS & KREMESAN.
                  </h3>
                  <p className="text-[#171310]/90 text-sm sm:text-base leading-relaxed font-semibold">
                    Hidangan Malaysia tak sah kalau tak banjir. Gabungan kicap manis pekat,
                    kremesan garing berempah, tempe goreng dan kobis rangup mencipta harmoni rasa
                    yang buat anda tambah nasi!
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['#MakanTangan', '#TambahNasi', '#SambalGajus', '#LepakPokmi'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono-tech font-bold px-3 py-1 rounded-full bg-[#171310]/10 border border-[#171310]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Gepuk Ritual Strip */}
          <div className="mt-16 rounded-3xl bg-[#171310] text-[#F5E9D5] p-8 sm:p-10 border-4 border-[#171310] reveal-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#F5E9D5]/15">
              {[
                {
                  step: '01',
                  title: 'GORENG KEEMASAN',
                  desc: 'Ayam segar diperap rempah asli dan digoreng sehingga kulitnya garing sempurna.'
                },
                {
                  step: '02',
                  title: 'HENTAKAN GEPUK',
                  desc: 'Diketuk atas lesung batu supaya tulang lembut dan isi ayam terbuka menerima sambal.'
                },
                {
                  step: '03',
                  title: 'SIRAMAN SAMBAL PANAS',
                  desc: 'Sambal cili gajus disiram minyak gorengan ayam yang mendesis terus ke atas dulang.'
                }
              ].map((item, idx) => (
                <div key={idx} className={`${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''} space-y-2`}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl text-[#E6392B]">{item.step}</span>
                    <span className="h-[2px] flex-1 bg-[#F5E9D5]/15" />
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#F2BC4D] tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#F5E9D5]/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. SIGNATURE MENU ==================== */}
      <section
        id="menu"
        className="py-24 md:py-32 bg-[#171310] bg-noise text-[#F5E9D5] border-t-4 border-[#171310] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6392B]/20 border border-[#E6392B] text-[#F2BC4D] font-mono-tech text-xs uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BARISAN UTAMA POKMI</span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.9]">
                MENU <span className="text-[#F2BC4D]">SIGNATURE.</span>
              </h2>
            </div>
            <p className="text-[#F5E9D5]/75 max-w-md text-sm sm:text-base">
              Tiga kombo ikonik yang direka khas untuk memuaskan deria rasa anda. Klik pada
              mana-mana hidangan untuk melihat anatomi dulang Pokmi.
            </p>
          </div>

          {/* 3 Interactive Food Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SIGNATURE_MENU.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedMenuCard(item)}
                className={`group cursor-pointer rounded-[2rem] bg-[#211B17] border-2 border-[#F5E9D5]/20 hover:border-[#F2BC4D] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2 shadow-2xl reveal-on-scroll delay-${
                  idx * 100
                }`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#171310]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211B17] via-transparent to-black/30" />

                    {/* Playful Badge Top Left */}
                    <div
                      style={{
                        backgroundColor: item.badgeColor,
                        color: item.badgeTextColor
                      }}
                      className="absolute top-4 left-4 font-display text-lg tracking-wider uppercase px-4 py-1.5 rounded-xl border-2 border-[#171310] shadow-md -rotate-2 group-hover:rotate-0 transition-transform"
                    >
                      {item.badge}
                    </div>

                    {/* Spice Chili Indicator Top Right */}
                    <div className="absolute top-4 right-4 bg-[#171310]/90 backdrop-blur-md border border-[#F5E9D5]/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < item.spiceCount
                              ? 'text-[#E6392B] fill-[#E6392B]'
                              : 'text-[#F5E9D5]/20'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Code Tag */}
                    <div className="absolute bottom-3 left-6 font-mono-tech text-xs text-[#F2BC4D] tracking-widest uppercase">
                      {item.code} // {item.tagline}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-display text-3xl sm:text-4xl text-[#F5E9D5] group-hover:text-[#F2BC4D] transition-colors uppercase leading-none">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#F5E9D5]/75 leading-relaxed">{item.shortDesc}</p>

                    {/* Tray Ingredients Preview */}
                    <div className="pt-2 space-y-1.5">
                      {item.details.slice(0, 3).map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs text-[#F5E9D5]/90 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#E6392B] shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5E9D5]/10 flex items-center justify-between">
                  <span className="font-mono-tech text-xs uppercase tracking-wider text-[#F2BC4D] group-hover:underline">
                    LIHAT ANATOMI SET
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#F5E9D5]/10 group-hover:bg-[#E6392B] text-[#F5E9D5] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Dish Detail Modal */}
        {selectedMenuCard && (
          <div
            onClick={() => setSelectedMenuCard(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#171310] border-4 border-[#F2BC4D] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fadeIn"
            >
              <div className="relative h-64 sm:h-72">
                <img
                  src={selectedMenuCard.image}
                  alt={selectedMenuCard.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/30 to-transparent" />
                <button
                  onClick={() => setSelectedMenuCard(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#171310] text-[#F5E9D5] border border-[#F5E9D5]/30 flex items-center justify-center hover:bg-[#E6392B]"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="font-mono-tech text-xs text-[#F2BC4D] uppercase">
                    {selectedMenuCard.code} • {selectedMenuCard.tagline}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl text-[#F5E9D5] uppercase">
                    {selectedMenuCard.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-[#F5E9D5]/90 text-base leading-relaxed">
                  {selectedMenuCard.shortDesc}
                </p>

                <div className="bg-[#211B17] rounded-2xl p-5 border border-[#F5E9D5]/15">
                  <div className="font-mono-tech text-xs uppercase text-[#F2BC4D] mb-3">
                    APA YANG ADA ATAS DULANG:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedMenuCard.details.map((d, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-[#F5E9D5]">
                        <Flame className="w-4 h-4 text-[#E6392B] fill-[#E6392B] shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="text-xs font-mono-tech text-[#F5E9D5]/70">
                    NOTA RASA: <span className="text-[#F2BC4D]">{selectedMenuCard.textureNote}</span>
                  </div>
                  <button
                    onClick={() => setSelectedMenuCard(null)}
                    className="bg-[#E6392B] hover:bg-[#F2BC4D] text-[#F5E9D5] hover:text-[#171310] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
                  >
                    TUTUP PAPARAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 4. SAMBAL EXPERIENCE (BOLD RED SECTION) ==================== */}
      <section
        id="sambal"
        className="py-24 md:py-32 bg-[#E6392B] text-[#F5E9D5] relative overflow-hidden border-y-4 border-[#171310]"
      >
        {/* Background Giant Chili Motif */}
        <div className="pointer-events-none select-none absolute -right-20 -bottom-24 opacity-15">
          <ChiliIllustration className="w-[460px] h-[460px]" color="#171310" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Bold Headline & Chili Philosophy (6 cols) */}
            <div className="lg:col-span-6 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171310] text-[#F2BC4D] font-mono-tech text-xs uppercase tracking-widest">
                <Flame className="w-4 h-4 fill-[#F2BC4D]" />
                <span> NADI SEBENAR AYAM GEPUK POKMI</span>
              </div>

              <h2 className="font-display text-6xl sm:text-8xl lg:text-[6.8rem] uppercase leading-[0.88] text-[#F5E9D5] drop-shadow-[6px_6px_0px_#171310]">
                BUKAN <br />
                SAMBAL <br />
                <span className="text-[#F2BC4D]">BIASA.</span>
              </h2>

              <p className="text-lg sm:text-xl font-bold text-[#F5E9D5] leading-relaxed max-w-xl">
                Rahsia kami terletak pada gabungan cili padi merah segar, bawang putih yang digoreng
                keemasan, dan kacang gajus panggang yang ditumbuk lumat di dalam lesung batu.
              </p>

              {/* 3 Ingredient Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { label: 'CILI PADI KAMPUNG', sub: 'Pedas Menyengat' },
                  { label: 'GAJUS PANGGANG', sub: 'Lemak Berkrim' },
                  { label: 'MINYAK BAWANG', sub: 'Aroma Memikat' }
                ].map((ing, i) => (
                  <div
                    key={i}
                    className="bg-[#171310] text-[#F5E9D5] p-4 rounded-2xl border-2 border-[#F2BC4D]"
                  >
                    <div className="font-display text-lg sm:text-xl text-[#F2BC4D] leading-tight">
                      {ing.label}
                    </div>
                    <div className="text-xs text-[#F5E9D5]/75 mt-1">{ing.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Interactive Sambal Heat Meter (6 cols) */}
            <div className="lg:col-span-6 reveal-on-scroll delay-100">
              <div className="rounded-[2rem] bg-[#171310] text-[#F5E9D5] p-6 sm:p-10 border-4 border-[#F2BC4D] shadow-brutal-dark">
                <div className="flex items-center justify-between border-b border-[#F5E9D5]/15 pb-4 mb-6">
                  <div>
                    <span className="font-mono-tech text-xs text-[#F2BC4D] uppercase block">
                      SIMULATOR KEPEDASAN POKMI
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl uppercase">
                      PILIH TAHAP PEDAS ANDA
                    </h3>
                  </div>
                  <ChiliIllustration className="w-12 h-12" color="#E6392B" />
                </div>

                {/* Level Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                  {SAMBAL_LEVELS.map((lvl, index) => {
                    const isActive = activeSambalIdx === index;
                    return (
                      <button
                        key={lvl.level}
                        onClick={() => setActiveSambalIdx(index)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          isActive
                            ? 'bg-[#E6392B] border-[#F2BC4D] text-[#F5E9D5] -translate-y-1 shadow-lg'
                            : 'bg-[#211B17] border-[#F5E9D5]/15 text-[#F5E9D5]/70 hover:border-[#F5E9D5]/40'
                        }`}
                      >
                        <div className="font-mono-tech text-[10px] uppercase text-[#F2BC4D]">
                          {lvl.level}
                        </div>
                        <div className="font-display text-lg leading-tight mt-0.5 truncate">
                          {lvl.name.split(' ')[0]}
                        </div>
                        <div className="flex gap-0.5 mt-2">
                          {[...Array(index + 1)].map((_, fIdx) => (
                            <Flame
                              key={fIdx}
                              className="w-3.5 h-3.5 text-[#F2BC4D] fill-[#F2BC4D]"
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Sambal Level Display */}
                <div className="bg-[#211B17] rounded-2xl p-6 border border-[#F5E9D5]/15 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-3xl sm:text-4xl text-[#F2BC4D]">
                      {SAMBAL_LEVELS[activeSambalIdx].name}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#E6392B] text-[#F5E9D5] font-mono-tech text-xs font-bold">
                      {SAMBAL_LEVELS[activeSambalIdx].scoville}
                    </span>
                  </div>

                  {/* Visual Heat Progress Bar */}
                  <div className="w-full h-3 bg-[#171310] rounded-full overflow-hidden p-0.5 border border-[#F5E9D5]/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F2BC4D] to-[#E6392B] transition-all duration-500"
                      style={{ width: `${(activeSambalIdx + 1) * 25}%` }}
                    />
                  </div>

                  <div className="font-mono-tech text-xs text-[#F2BC4D]">
                    NISBAH LESUNG: {SAMBAL_LEVELS[activeSambalIdx].chiliRatio}
                  </div>

                  <p className="text-sm sm:text-base text-[#F5E9D5]/85 leading-relaxed">
                    {SAMBAL_LEVELS[activeSambalIdx].desc}
                  </p>

                  <div className="pt-2 border-t border-[#F5E9D5]/10 text-xs italic text-[#F5E9D5]/70">
                    {SAMBAL_LEVELS[activeSambalIdx].quote}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. ASYMMETRIC FOOD GALLERY ==================== */}
      <section id="gallery" className="py-24 md:py-32 bg-[#171310] bg-noise text-[#F5E9D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-on-scroll">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5E9D5]/10 text-[#F2BC4D] font-mono-tech text-xs uppercase tracking-widest mb-4">
                <Eye className="w-3.5 h-3.5" />
                <span>GALERI DERIA POKMI</span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
                VISUAL <span className="text-[#E6392B]">BIKIN LAPAR.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#F5E9D5]/70 max-w-md">
              Setiap dulang dihidang panas dengan tekstur rangup yang jelas kelihatan. Klik gambar
              untuk paparan penuh.
            </p>
          </div>

          {/* Asymmetric Bento Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className={`${item.span} ${item.height} group relative rounded-3xl overflow-hidden border-2 border-[#F5E9D5]/15 hover:border-[#F2BC4D] cursor-pointer bg-[#211B17] reveal-on-scroll`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 bg-[#171310]/85 backdrop-blur-md border border-[#F5E9D5]/20 px-3 py-1 rounded-full font-mono-tech text-[10px] text-[#F2BC4D] uppercase tracking-widest">
                  {item.category}
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#E6392B] text-[#F5E9D5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                <div className="absolute bottom-5 left-6 right-6">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F5E9D5] group-hover:text-[#F2BC4D] transition-colors uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5E9D5]/80 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#171310] border-4 border-[#F2BC4D] rounded-3xl overflow-hidden"
            >
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#E6392B] text-[#F5E9D5] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono-tech text-xs text-[#F2BC4D] uppercase">
                    {lightboxImage.category}
                  </span>
                  <h4 className="font-display text-3xl text-[#F5E9D5]">{lightboxImage.title}</h4>
                  <p className="text-sm text-[#F5E9D5]/75 mt-1">{lightboxImage.caption}</p>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-5 py-2.5 rounded-full bg-[#F5E9D5]/10 hover:bg-[#E6392B] text-xs font-mono-tech uppercase shrink-0"
                >
                  TUTUP
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================== 6. FIND POKMI + FOOTER ==================== */}
      <section
        id="find-pokmi"
        className="pt-24 pb-16 bg-[#F5E9D5] text-[#171310] border-t-4 border-[#171310]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Notice Banner */}
          <div className="mb-10 rounded-2xl bg-[#171310] text-[#F5E9D5] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-2 border-[#E6392B]">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#F2BC4D] shrink-0" />
              <span className="text-xs sm:text-sm font-medium">
                <strong className="text-[#F2BC4D] font-mono-tech uppercase mr-2">
                  [NOTA PROTOTIP DEMO]:
                </strong>
                Maklumat cawangan, waktu operasi dan talian di bawah adalah ruang letak konsep
                (demo placeholders) untuk tujuan pameran reka bentuk laman web.
              </span>
            </div>
            <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full bg-[#E6392B] text-[#F5E9D5] font-bold">
              FRONTEND CONCEPT DEMO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Heading & Interactive Outlet Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono-tech text-xs uppercase tracking-widest bg-[#E6392B] text-[#F5E9D5] px-3.5 py-1 rounded-full inline-block font-bold">
                TERJAH PORT KAMI
              </span>
              <h2 className="font-display text-5xl sm:text-7xl uppercase leading-[0.9]">
                CARI <span className="text-[#E6392B]">POKMI</span> <br />
                BERDEKATAN.
              </h2>
              <p className="text-sm sm:text-base text-[#171310]/80 font-medium">
                Pilih lokasi konsep di bawah untuk melihat paparan maklumat cawangan dan waktu
                operasi.
              </p>

              <div className="space-y-3">
                {DEMO_LOCATIONS.map((loc, idx) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocationIdx(idx)}
                    className={`w-full text-left p-5 rounded-2xl border-3 transition-all flex items-center justify-between ${
                      activeLocationIdx === idx
                        ? 'bg-[#171310] text-[#F5E9D5] border-2 border-[#171310] shadow-brutal-red'
                        : 'bg-white/70 text-[#171310] border-2 border-[#171310]/20 hover:border-[#171310]'
                    }`}
                  >
                    <div>
                      <span
                        className={`font-mono-tech text-[10px] uppercase block ${
                          activeLocationIdx === idx ? 'text-[#F2BC4D]' : 'text-[#E6392B]'
                        }`}
                      >
                        {loc.tag}
                      </span>
                      <span className="font-display text-2xl tracking-wide uppercase">
                        {loc.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-6 h-6 ${
                        activeLocationIdx === idx ? 'text-[#F2BC4D]' : 'text-[#171310]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Selected Location Card Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#171310] text-[#F5E9D5] p-8 sm:p-10 border-4 border-[#171310] shadow-brutal-yellow relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F5E9D5]/15 pb-6 mb-6">
                  <div>
                    <span className="font-mono-tech text-xs text-[#F2BC4D] uppercase">
                      {DEMO_LOCATIONS[activeLocationIdx].tag}
                    </span>
                    <h3 className="font-display text-4xl sm:text-5xl text-[#F5E9D5] uppercase mt-1">
                      {DEMO_LOCATIONS[activeLocationIdx].name}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E6392B] flex items-center justify-center text-[#F5E9D5] border-2 border-[#F2BC4D]">
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#211B17] p-5 rounded-2xl border border-[#F5E9D5]/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#F2BC4D] font-mono-tech text-xs uppercase">
                      <MapPin className="w-4 h-4" />
                      <span>ALAMAT (CONTOH DEMO)</span>
                    </div>
                    <p className="text-sm text-[#F5E9D5]/90 leading-relaxed">
                      {DEMO_LOCATIONS[activeLocationIdx].address}
                    </p>
                  </div>

                  <div className="bg-[#211B17] p-5 rounded-2xl border border-[#F5E9D5]/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#F2BC4D] font-mono-tech text-xs uppercase">
                      <Clock className="w-4 h-4" />
                      <span>WAKTU OPERASI (DEMO)</span>
                    </div>
                    <p className="text-sm text-[#F5E9D5]/90 leading-relaxed">
                      {DEMO_LOCATIONS[activeLocationIdx].hours}
                    </p>
                  </div>

                  <div className="bg-[#211B17] p-5 rounded-2xl border border-[#F5E9D5]/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#F2BC4D] font-mono-tech text-xs uppercase">
                      <Phone className="w-4 h-4" />
                      <span>TALIAN KONSEP (DEMO)</span>
                    </div>
                    <p className="text-sm text-[#F5E9D5]/90 font-mono-tech">
                      {DEMO_LOCATIONS[activeLocationIdx].phone}
                    </p>
                  </div>

                  <div className="bg-[#211B17] p-5 rounded-2xl border border-[#F5E9D5]/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#F2BC4D] font-mono-tech text-xs uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>SUASANA PORT</span>
                    </div>
                    <p className="text-sm text-[#F5E9D5]/90">
                      {DEMO_LOCATIONS[activeLocationIdx].vibe}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#F5E9D5]/15">
                  <span className="font-mono-tech text-xs text-[#F5E9D5]/60">
                    *Semua butiran lokasi di atas adalah placeholder reka bentuk.
                  </span>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 bg-[#F2BC4D] text-[#171310] font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#E6392B] hover:text-[#F5E9D5] transition-colors"
                  >
                    <span>KEMBALI KE ATAS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERSIZED WORDMARK FOOTER ==================== */}
      <footer className="bg-[#171310] text-[#F5E9D5] pt-16 pb-12 border-t-4 border-[#E6392B] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#F5E9D5]/15">
            <div>
              <div className="font-mono-tech text-xs text-[#F2BC4D] uppercase tracking-widest mb-2">
                AYAM GEPUK POKMI • MALAYSIAN STREET FOOD
              </div>
              <p className="text-lg sm:text-xl font-bold text-[#F5E9D5]/90 max-w-md">
                Sekali Gepuk. Terus Melekat. Ayam rangup, sambal padu, memang puas.
              </p>
            </div>

            {/* Social Media Placeholders */}
            <div className="flex items-center gap-3">
              {[
                { label: 'INSTAGRAM (DEMO)', icon: Instagram },
                { label: 'FACEBOOK (DEMO)', icon: Facebook },
                { label: 'KONGSI', icon: Share2 }
              ].map((soc, i) => {
                const IconComp = soc.icon;
                return (
                  <button
                    key={i}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-3 rounded-2xl bg-[#211B17] hover:bg-[#E6392B] text-[#F5E9D5] border border-[#F5E9D5]/20 flex items-center gap-2 text-xs font-mono-tech transition-colors"
                  >
                    <IconComp className="w-4 h-4 text-[#F2BC4D]" />
                    <span className="hidden sm:inline">{soc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Giant Brutalist POKMI Wordmark */}
          <div className="py-8 select-none text-center">
            <div className="font-display text-[17vw] leading-[0.82] tracking-tight uppercase text-[#F5E9D5] hover:text-[#F2BC4D] transition-colors duration-500">
              AYAM GEPUK <span className="text-[#E6392B]">POKMI</span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#F5E9D5]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#F5E9D5]/60">
            <div>
              © {new Date().getFullYear()} AYAM GEPUK POKMI — VISUAL PROTOTYPE DEMO.
            </div>
            <div className="flex items-center gap-6">
              <span>SAMBAL NOIR × GEPUK POP</span>
              <span className="text-[#F2BC4D]">DIBINA UNTUK CITARASA JALANAN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}