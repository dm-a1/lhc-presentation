import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, ChevronDown, HardDrive, Share2 } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-default">
            <Atom className="w-8 h-8 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xl font-bold tracking-tight">LHC <span className="text-blue-400">Explorer</span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              DIE GRÖSSTE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                MASCHINE DER WELT
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Ein 27 Kilometer langer Ring unter der Erde, der die Geheimnisse des Universums entschlüsselt.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HardDrive, title: "27 Kilometer", desc: "Umfang des Tunnels tief unter der Erde bei Genf." },
              { icon: Share2, title: "13,6 TeV", desc: "Maximale Energie der Proton-Kollisionen." },
              { icon: Atom, title: "Higgs-Boson", desc: "2012 am LHC entdeckt – gibt Materie ihre Masse." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-colors group">
                <item.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 italic">"Dem Universum auf der Spur"</h2>
          <div className="p-12 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl shadow-blue-500/20">
            <p className="text-2xl leading-relaxed font-medium">
              Im Jahr 2012 wurde hier das Higgs-Boson entdeckt. Durch Kollisionen bei 13,6 TeV konnten wir das Teilchen isolieren, das allen anderen Masse verleiht.
            </p>
            <div className="mt-8 pt-8 border-t border-white/20 text-blue-100 uppercase tracking-widest text-sm font-bold">
              Mass: 125,25 GeV/c²
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© 2026 LHC Präsentation • Daniel</p>
      </footer>
    </div>
  );
}

export default App;
