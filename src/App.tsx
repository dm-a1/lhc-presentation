import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, ChevronDown, HardDrive, Share2 } from 'lucide-react';

// --- DATEN-KONSTANTEN ---
const STATS = [
  { value: "27 km", label: "Umfang", sublabel: "100m unter der Erde", delay: 0 },
  { value: "13,6 TeV", label: "Kollisionsenergie", sublabel: "Weltrekord (Run 3)", delay: 0.1 },
  { value: "99,9999991%", label: "Lichtgeschwindigkeit", sublabel: "Teilchentempo", delay: 0.2 },
  { value: "-271,3°C", label: "Temperatur", sublabel: "Kälter als das All", delay: 0.3 },
];

const DETECTORS = [
  {
    name: "ATLAS",
    fullName: "A Toroidal LHC ApparatuS",
    size: "46m × 25m",
    weight: "7.000 t",
    magneticField: "3,9 T",
    description: "Der größte Universaldetektor. Bekannt für die Entdeckung des Higgs-Bosons."
  },
  {
    name: "CMS",
    fullName: "Compact Muon Solenoid",
    size: "21m × 15m",
    weight: "14.000 t",
    magneticField: "3,8 T",
    description: "Schwerer als der Eiffelturm. Nutzt ein gewaltiges supraleitendes Solenoid."
  },
  {
    name: "ALICE",
    fullName: "A Large Ion Collider Experiment",
    size: "26m × 16m",
    weight: "10.000 t",
    magneticField: "0,5 T",
    description: "Untersucht den Materiezustand unmittelbar nach dem Urknall (Quark-Gluon-Plasma)."
  }
];

// --- SUB-KOMPONENTE: PARTIKEL-SIMULATION ---
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let particles: any[] = [];
    const createParticle = () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 100,
      curvature: (Math.random() - 0.5) * 0.08,
      color: Math.random() > 0.5 ? '#22d3ee' : '#f59e0b'
    });
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (particles.length < 60 && Math.random() > 0.7) {
        for(let i=0; i<3; i++) particles.push(createParticle());
      }
      particles.forEach((p, i) => {
        const angle = Math.atan2(p.vy, p.vx) + p.curvature;
        const speed = Math.sqrt(p.vx**2 + p.vy**2);
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.x += p.vx; p.y += p.vy; p.life--;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * (p.life/100), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    animate();
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- SUB-KOMPONENTE: DATEN-COUNTER ---
const DataCounter = () => {
  const [data, setData] = useState({ raw: 0, saved: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => ({ raw: prev.raw + 0.85, saved: prev.saved + 0.00012 }));
    }, 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-8 bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold mb-2"><Share2 size={14}/> Raw Event Stream</div>
        <div className="text-4xl font-mono font-black text-slate-200">{data.raw.toFixed(2)} PB</div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase font-bold mb-2"><HardDrive size={14}/> Recorded Data</div>
        <div className="text-4xl font-mono font-black text-cyan-400">{data.saved.toFixed(5)} PB</div>
      </div>
    </div>
  );
};

// --- HAUPT-KOMPONENTE ---
export default function LHCDiscoveryPage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.5 }
    );
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#0a0a0a] text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {["hero", "stats", "science", "data"].map((id) => (
          <button 
            key={id} 
            onClick={() => scrollTo(id)}
            className={`w-2 h-2 rounded-full transition-all ${activeSection === id ? "bg-cyan-400 scale-150 shadow-[0_0_10px_#22d3ee]" : "bg-slate-700"}`}
          />
        ))}
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <ParticleField />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-2 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-500/5 text-cyan-400 text-[10px] uppercase tracking-widest mb-6">
            <Atom size={14} className="animate-spin-slow" /> CERN · High Energy Physics
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic">
            LHC <span className="text-cyan-400">GENEVA</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            Wo Materie zu Energie wird: $E = mc^2$ in seiner extremsten Form.
          </p>
        </motion.div>
        <ChevronDown className="absolute bottom-10 animate-bounce text-slate-500" />
      </section>

      {/* STATS SECTION */}
      <section id="stats" className="py-24 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 border-l border-cyan-500/20 bg-slate-900/20">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-cyan-400 text-xs font-mono uppercase mt-1">{s.label}</div>
                <div className="text-slate-500 text-[10px] mt-2 italic">{s.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENCE & DETECTORS */}
      <section id="science" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 italic">Das Higgs-Boson</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Im Jahr 2012 wurde hier das fehlende Puzzleteil des Standardmodells entdeckt. Durch Kollisionen bei $13,6 \text{ TeV}$ konnten wir das Teilchen isolieren, das allen anderen Masse verleiht.
            </p>
            <div className="inline-block p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono text-cyan-400">
              Mass: $125,25 \text{ GeV/c}^2 \pm 5\sigma$
            </div>
          </div>
          <div className="flex-1 grid gap-4">
            {DETECTORS.map((d, i) => (
              <motion.div key={i} whileHover={{ x: 10 }} className="p-4 bg-slate-900/50 border border-white/5 rounded-xl group cursor-help transition-all hover:border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{d.name}</span>
                  <span className="text-[10px] text-cyan-500 font-mono">B-Field: {d.magneticField}</span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase mt-1">{d.fullName}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA FLOW SECTION */}
      <section id="data" className="py-24 bg-gradient-to-t from-[#050505] to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Worldwide LHC Computing Grid</h2>
          <DataCounter />
          <p className="mt-8 text-xs text-slate-600 max-w-lg mx-auto leading-relaxed uppercase tracking-tighter">
            Jede Sekunde finden im LHC etwa 1 Milliarde Protonen-Kollisionen statt. Das Trigger-System reduziert diese Flut in Echtzeit auf etwa 1.000 relevante Ereignisse pro Sekunde.
          </p>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-slate-700 text-[10px] uppercase tracking-[0.3em]">
        CERN Research Framework • 2026 Simulation Active
      </footer>
    </div>
  );
}
