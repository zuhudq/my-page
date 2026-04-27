import React, { useState, useRef, useEffect } from "react";
import { Globe, ShoppingBag } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import Typewriter from "typewriter-effect";

// =========================================
// KOMPONEN: KURSOR NEON KUSTOM
// =========================================
const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Fungsi untuk mendeteksi posisi mouse
    const handleMouseMove = (e) => {
      if (dotRef.current && glowRef.current) {
        // Posisi titik presisi (langsung mengikuti mouse)
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;

        // Posisi bias cahaya (mengikuti mouse dari tengah)
        // Kita menggunakan setTimeout untuk efek "tertinggal" (lagging/smooth) yang sangat singkat
        setTimeout(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${e.clientX - 24}px, ${e.clientY - 24}px, 0)`;
          }
        }, 50);
      }
    };

    // Fungsi untuk mendeteksi apakah mouse sedang berada di atas tombol/link
    const handleMouseOver = (e) => {
      if (e.target.closest("a") || e.target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Bias Cahaya (Glow) di belakang */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[100] transition-all duration-300 ease-out hidden md:block mix-blend-screen
          ${isHovering ? "bg-teal-400/40 scale-150 blur-lg" : "bg-teal-500/20 scale-100 blur-md"}
        `}
      ></div>

      {/* Titik Inti Kursor */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[101] hidden md:block transition-transform duration-200
          ${isHovering ? "scale-0" : "scale-100 shadow-[0_0_10px_#2dd4bf]"}
        `}
      ></div>
    </>
  );
};

// =========================================
// KOMPONEN UTAMA (APP)
// =========================================
function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // State Boot-up
  const [bootPhase, setBootPhase] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase(1), 400);
    const t2 = setTimeout(() => setBootPhase(2), 1200);
    const t3 = setTimeout(() => setBootPhase(3), 1800);
    const t4 = setTimeout(() => setIsBooting(false), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/zuhud-qolbu-adi-230767316/",
      icon: <FaLinkedin size={44} />,
      activeGlow:
        "ring-4 ring-blue-500/50 shadow-[0_0_70px_rgba(59,130,246,0.8)] text-blue-300 border-blue-400",
    },
    {
      title: "Website",
      url: "https://zuhudq.github.io/",
      icon: <Globe size={44} />,
      activeGlow:
        "ring-4 ring-teal-500/50 shadow-[0_0_70px_rgba(45,212,191,0.8)] text-teal-200 border-teal-400",
    },
    {
      title: "Digital Product",
      url: "https://lynk.id/zuhudpage",
      icon: <ShoppingBag size={44} />,
      activeGlow:
        "ring-4 ring-purple-500/50 shadow-[0_0_70px_rgba(168,85,247,0.8)] text-purple-300 border-purple-400",
    },
    {
      title: "GitHub",
      url: "https://github.com/zuhudq",
      icon: <FaGithub size={44} />,
      activeGlow:
        "ring-4 ring-slate-400/50 shadow-[0_0_70px_rgba(255,255,255,0.4)] text-slate-100 border-white",
    },
    {
      title: "Instagram",
      url: "https://instagram.com/zuhud.q",
      icon: <FaInstagram size={44} />,
      activeGlow:
        "ring-4 ring-pink-500/50 shadow-[0_0_70px_rgba(236,72,153,0.8)] text-pink-300 border-pink-400",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const containerCenter = scrollPosition + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    const cards = container.querySelectorAll(".carousel-card");
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <>
      {/* Memanggil Kursor Kustom */}
      <CustomCursor />

      {/* Layar Boot-up (Tetap memakai kursor default/none) */}
      <div
        className={`fixed inset-0 z-[110] bg-[#0a0a0a] font-mono flex flex-col justify-center items-start px-8 md:px-24 transition-opacity duration-1000 ease-in-out cursor-none
        ${isBooting ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="text-teal-400/90 text-sm md:text-base drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] tracking-wider">
          {bootPhase >= 0 && <p className="mb-2">&gt; system.init()</p>}
          {bootPhase >= 1 && (
            <p className="mb-2">
              &gt; loading modules...{" "}
              <span className="text-green-400">[OK]</span>
            </p>
          )}
          {bootPhase >= 2 && (
            <p className="mb-2">
              &gt; establishing secure connection...{" "}
              <span className="text-green-400">[OK]</span>
            </p>
          )}
          {bootPhase >= 3 && (
            <p className="mb-2 text-white">&gt; access granted. welcome...!!</p>
          )}
          <p className="mt-2 animate-pulse">
            &gt;{" "}
            <span className="inline-block w-2 h-4 bg-teal-400 ml-1 translate-y-1"></span>
          </p>
        </div>
      </div>

      {/* Main Application 
          Perhatikan penambahan "md:cursor-none" untuk menyembunyikan kursor asli di mode desktop
      */}
      <div className="min-h-screen bg-slate-950 text-slate-200 font-mono flex flex-col items-center py-12 selection:bg-teal-500 selection:text-white overflow-hidden relative md:cursor-none">
        {/* Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse"></div>
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* --- =========================================
              BAGIAN PROFIL & NAMA MEWAH (REVISI)
              ========================================= --- */}
        <header className="flex flex-col items-center w-full max-w-lg text-center mb-6 px-4 z-10 relative">
          {/* Container Profil 3 Lapis (Mewah) */}
          <div className="relative mb-10 group mt-4">
            {/* Lapis 1: Aura Paling Luar (Bernapas Perlahan) */}
            <div className="absolute inset-0 rounded-full bg-teal-600/10 blur-3xl animate-breathing opacity-50"></div>

            {/* Lapis 2: Ring Pendaran Tengah (Bernapas Sedikit Lebih Cepat) */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.3)] animate-breathing-fast"></div>

            {/* Lapis 3: Container Foto Utama dengan Ring Tegas */}
            <div className="w-28 h-28 rounded-full p-1 border-2 border-teal-500/50 bg-slate-900 shadow-[0_0_30px_rgba(20,184,166,0.5)] z-10 relative">
              <img
                src="/profil.jpg"
                alt="Foto Profil Zuhud Qolbu"
                className="w-full h-full object-cover rounded-full opacity-95 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Judul dengan Gradiasi & Double Shadow (Bayangan Timbul 3D) */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-3 
                         bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400
                         drop-shadow-[2px_2px_0px_rgba(45,212,191,0.5)] 
                         drop-shadow-[4px_4px_10px_rgba(0,0,0,0.8)] z-10 relative whitespace-nowrap"
          >
            <Typewriter
              options={{
                strings: ["Hi, I'm Zuhud Qolbu"],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 50,
              }}
            />
          </h1>

          <div className="flex flex-col items-center gap-2 mb-8 z-10 relative">
            <h2 className="font-sans font-light text-sm text-teal-300 tracking-wider lowercase drop-shadow-sm opacity-90">
              mahasiswa sistem informasi biasa yang suka ngulik web & produk.
            </h2>
            <p className="font-serif italic text-slate-400 text-[13px] tracking-widest mt-1 opacity-80">
              — let's connect & collaborate —
            </p>
            {/* --- INSTRUKSI SLIDE BARU (DENGAN PANAH) --- */}
            <div className="flex items-center gap-3 mt-2 animate-pulse">
              <span className="text-teal-400 text-sm font-bold">&larr;</span>
              <p className="text-[10px] text-slate-400 tracking-[0.4em] uppercase font-bold">
                Slide to Explore
              </p>
              <span className="text-teal-400 text-sm font-bold">&rarr;</span>
            </div>
          </div>
        </header>

        {/* Sisanya (kontainer main, carousel, footer) biarkan tetap seperti sebelumnya */}

        <main className="w-full relative z-10 flex-1 flex flex-col justify-center">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-12 hide-scrollbar items-center pt-40 pb-32"
            style={{
              paddingLeft: "calc(50vw - 6rem)",
              paddingRight: "calc(50vw - 6rem)",
            }}
          >
            {links.map((link, index) => {
              const isActive = index === activeIndex;

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Perhatikan penambahan "md:cursor-none" untuk elemen tautan (link)
                  className={`carousel-card relative snap-center flex-shrink-0 w-48 h-60 flex flex-col items-center justify-center gap-6 rounded-2xl border-2 transition-all duration-700 ease-out transform md:cursor-none
                    ${
                      isActive
                        ? `scale-[1.25] -translate-y-12 z-20 bg-slate-900/90 backdrop-blur-2xl ${link.activeGlow}`
                        : "scale-90 opacity-20 border-slate-800 bg-transparent grayscale hover:grayscale-0 hover:opacity-50"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none animate-pulse"></div>
                  )}

                  <div
                    className={`transition-all duration-500 z-10 ${isActive ? "scale-110 text-inherit" : "text-slate-600"}`}
                  >
                    {link.icon}
                  </div>
                  <span
                    className={`font-black text-xs tracking-widest uppercase text-center px-4 z-10 transition-colors duration-500 ${isActive ? "text-white" : "text-slate-600"}`}
                  >
                    {link.title}
                  </span>

                  <div
                    className={`absolute bottom-6 w-12 h-1 rounded-full bg-current transition-all duration-500 ${isActive ? "opacity-100 blur-[1px]" : "opacity-0"}`}
                  ></div>
                </a>
              );
            })}
          </div>
        </main>

        <footer className="pb-6 text-[10px] text-slate-700 tracking-widest uppercase z-10 relative">
          <p>
            &copy; {new Date().getFullYear()} Zuhud Qolbu / IS Student / Jakarta
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
