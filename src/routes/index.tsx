import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity, Radio, Cpu, Waves, Zap, AlertTriangle, ShieldCheck, MapPin,
  Radar, CircuitBoard, Layers, Network, Gauge, Battery, Cable, Lightbulb,
  Volume2, Monitor, Download, Mail, Github, Linkedin, ArrowRight, CheckCircle2,
  Drill, Eye, Cloud, Bot, Plane, Wifi
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Underground Tunnel Detection System" },
      { name: "description", content: "Arduino-based system detecting illegal tunnels via seismic vibration & soil resistivity sensor fusion." },
      { property: "og:title", content: "Smart Underground Tunnel Detection System" },
      { property: "og:description", content: "Seismic + soil resistivity sensor fusion for border security." },
    ],
  }),
  component: Index,
});

type Stage = 0 | 1 | 2;
const stageData = {
  0: { label: "SYSTEM SAFE", vib: "LOW", soil: "NORMAL", led: "green", lcd: "MONITORING...", buzzer: false },
  1: { label: "DIGGING DETECTED", vib: "HIGH", soil: "NORMAL", led: "yellow", lcd: "DIGGING DETECTED", buzzer: false },
  2: { label: "TUNNEL DETECTED", vib: "HIGH", soil: "ABNORMAL", led: "red", lcd: "TUNNEL :: NODE 3", buzzer: true },
} as const;

function Index() {
  const [stage, setStage] = useState<Stage>(0);
  const [autoSim, setAutoSim] = useState(true);
  const [activeNode, setActiveNode] = useState(2);

  useEffect(() => {
    if (!autoSim) return;
    const id = setInterval(() => {
      setStage((s) => ((s + 1) % 3) as Stage);
    }, 3200);
    return () => clearInterval(id);
  }, [autoSim]);

  const s = stageData[stage];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <Hero stage={stage} />
      <About />
      <Problem />
      <Architecture />
      <Components />
      <WorkingPrinciple stage={stage} setStage={(n) => { setStage(n); setAutoSim(false); }} autoSim={autoSim} setAutoSim={setAutoSim} />
      <FusionLogic />
      <Simulation s={s} stage={stage} />
      <NodeMap activeNode={activeNode} setActiveNode={setActiveNode} />
      <LCDShowcase />
      <Circuit />
      <Results />
      <Advantages />
      <Applications />
      <Future />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function NavBar() {
  const links = [
    ["About", "about"], ["Components", "components"], ["Working", "working"],
    ["Simulation", "simulation"], ["Applications", "applications"], ["Contact", "contact"]
  ];
  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3">
        <a href="#top" className="flex items-center gap-2 min-w-0">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Radar className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm sm:text-base font-bold tracking-tight truncate">TUNNEL_SENTINEL<span className="text-primary">.v1</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={`#${h}`} className="hover:text-primary transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Download Report <Download className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ stage }: { stage: Stage }) {
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-12 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-blink" />
              DEFENSE • RESEARCH PROJECT
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Smart Underground <span className="text-primary text-glow">Tunnel Detection</span> System
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Using <span className="text-foreground font-semibold">Seismic Vibration</span> and <span className="text-foreground font-semibold">Soil Resistivity Analysis</span> — an Arduino-based intelligent monitoring platform for border security and infrastructure protection.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#working" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
                View Working <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#components" className="inline-flex items-center gap-2 rounded-md glass px-5 py-3 text-sm font-semibold hover:border-primary">
                Explore Components
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[["3", "Geophones"], ["5", "Sensor Types"], ["3", "Detection Stages"]].map(([n, l]) => (
                <div key={l} className="glass rounded-lg p-3">
                  <dt className="text-2xl font-mono font-bold text-primary">{n}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <TunnelVisualization stage={stage} />
        </div>
      </div>
    </section>
  );
}

function TunnelVisualization({ stage }: { stage: Stage }) {
  const showTunnel = stage >= 2;
  const digging = stage >= 1;
  return (
    <div className="relative glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-muted-foreground">LIVE_FEED // SECTOR_03</span>
        <span className="font-mono text-xs flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-destructive animate-blink" />REC</span>
      </div>
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.25 0.06 250)" />
            <stop offset="1" stopColor="oklch(0.18 0.04 250)" />
          </linearGradient>
          <linearGradient id="s1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--soil-1)" />
            <stop offset="1" stopColor="var(--soil-2)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="90" fill="url(#sky)" />
        {/* Stars */}
        {[[40,20],[120,35],[280,25],[350,45]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1" fill="white" opacity="0.6" />
        ))}
        {/* Soil layers */}
        <rect x="0" y="90" width="400" height="60" fill="url(#s1)" />
        <rect x="0" y="150" width="400" height="50" fill="var(--soil-2)" />
        <rect x="0" y="200" width="400" height="100" fill="var(--soil-3)" />
        {/* Layer lines */}
        <line x1="0" y1="150" x2="400" y2="150" stroke="oklch(0 0 0 / 0.3)" strokeDasharray="2 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="oklch(0 0 0 / 0.3)" strokeDasharray="2 4" />

        {/* Tunnel */}
        {showTunnel && (
          <>
            <ellipse cx="200" cy="220" rx="80" ry="22" fill="var(--tunnel-deep)" />
            <ellipse cx="200" cy="220" rx="80" ry="22" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="200" cy="220" rx="60" ry="14" fill="none" stroke="var(--primary)" strokeWidth="0.8" opacity="0.4" />
          </>
        )}

        {/* Sensor nodes on surface */}
        {[100, 200, 300].map((x, i) => (
          <g key={i}>
            <rect x={x-10} y="78" width="20" height="14" rx="2" fill="var(--card)" stroke="var(--primary)" strokeWidth="1" />
            <circle cx={x} cy="85" r="2" fill={digging && i === 1 ? "var(--destructive)" : "var(--primary)"}>
              {digging && i === 1 && <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite" />}
            </circle>
            <text x={x} y="72" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" fontFamily="monospace">N{i+1}</text>
            {/* Electrode rods */}
            <line x1={x-6} y1="92" x2={x-6} y2="180" stroke="oklch(0.7 0.02 240)" strokeWidth="1" />
            <line x1={x+6} y1="92" x2={x+6} y2="180" stroke="oklch(0.7 0.02 240)" strokeWidth="1" />
          </g>
        ))}

        {/* Seismic waves */}
        {digging && [30, 50, 70].map(r => (
          <circle key={r} cx="200" cy="220" r={r} fill="none" stroke="var(--primary)" strokeWidth="1" opacity={0.6 - r/120}>
            <animate attributeName="r" values={`${r};${r+40}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
          </circle>
        ))}

        {/* Digging icon */}
        {digging && (
          <g transform="translate(195 215)">
            <rect x="-2" y="-10" width="4" height="18" fill="oklch(0.6 0.1 60)" />
          </g>
        )}
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
        <div className="glass rounded p-2"><div className="text-muted-foreground">VIB</div><div className={stage >= 1 ? "text-destructive" : "text-primary"}>{stage >= 1 ? "HIGH" : "LOW"}</div></div>
        <div className="glass rounded p-2"><div className="text-muted-foreground">SOIL</div><div className={stage >= 2 ? "text-destructive" : "text-primary"}>{stage >= 2 ? "ABNORM" : "NORMAL"}</div></div>
        <div className="glass rounded p-2"><div className="text-muted-foreground">STATUS</div><div className={stage === 2 ? "text-destructive" : stage === 1 ? "text-yellow-400" : "text-primary"}>{stage === 2 ? "ALERT" : stage === 1 ? "WARN" : "SAFE"}</div></div>
      </div>
    </div>
  );
}

/* ---------------- SECTIONS ---------------- */
function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="font-mono text-xs text-primary tracking-widest">// {kicker}</span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="ABOUT" title="An intelligent monitoring system for underground threats" />
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {[
          { icon: Activity, t: "Sensor Fusion", d: "Combines seismic vibration & soil resistivity to confirm tunnel formation with high confidence." },
          { icon: ShieldCheck, t: "Reduced False Alarms", d: "Vehicles or footsteps alone do not trigger. Only vibration + cavity does." },
          { icon: MapPin, t: "Node Localization", d: "Sensor units act as fixed nodes — alerts identify the exact sector and node affected." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="glass rounded-xl p-6 hover:border-primary transition-colors">
            <Icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
        <div>
          <SectionHeader kicker="PROBLEM" title="Illegal tunnels threaten borders & infrastructure" sub="Traditional monitoring is expensive, slow, and impractical for wide coverage. A low-cost, intelligent early-warning system is essential." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["Smuggling", "Cross-border illegal goods movement"],
            ["Infiltration", "Unauthorized human crossings"],
            ["Sabotage", "Threat to critical infrastructure"],
            ["Mining", "Illegal excavation operations"],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-lg p-5">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h4 className="mt-3 font-semibold">{t}</h4>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const nodes = [
    ["Vibration", "SW-420"], ["Soil", "FC-28"], ["Geophone", "S1·S2·S3"],
    ["Arduino UNO", "Controller"], ["LCD 16x2", "Display"], ["LED + Buzzer", "Output"]
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="ARCHITECTURE" title="System architecture diagram" sub="Sensors feed analog/digital signals into the Arduino, which runs fusion logic and drives the alert layer." />
      <div className="mt-10 glass-strong rounded-2xl p-6 sm:p-10">
        <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">
          <div className="space-y-3">
            {nodes.slice(0, 3).map(([t, d]) => (
              <div key={t} className="glass rounded-lg p-4 flex items-center gap-3">
                <Radio className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0"><div className="font-semibold truncate">{t}</div><div className="font-mono text-xs text-muted-foreground">{d}</div></div>
              </div>
            ))}
          </div>
          <ArrowRight className="hidden lg:block h-6 w-6 text-primary mx-auto" />
          <div className="glass-strong rounded-xl p-6 text-center border border-primary/40 shadow-[var(--shadow-glow)]">
            <Cpu className="h-10 w-10 mx-auto text-primary" />
            <div className="mt-3 font-bold">Arduino UNO R3</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">SENSOR FUSION ENGINE</div>
          </div>
          <ArrowRight className="hidden lg:block h-6 w-6 text-primary mx-auto" />
          <div className="space-y-3">
            {nodes.slice(3).map(([t, d]) => (
              <div key={t} className="glass rounded-lg p-4 flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent shrink-0" />
                <div className="min-w-0"><div className="font-semibold truncate">{t}</div><div className="font-mono text-xs text-muted-foreground">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Components() {
  const items = [
    { icon: Cpu, n: "Arduino UNO R3", d: "Main controller running sensor fusion logic." },
    { icon: Waves, n: "SW-420 Vibration Sensor", d: "Detects digging, hammering, drilling — provides Signal 1." },
    { icon: Layers, n: "FC-28 Soil Sensor", d: "Measures soil conductivity / identifies air cavities — Signal 2." },
    { icon: Cable, n: "Soil Resistivity Electrodes", d: "Four metal rods inject and measure current through soil." },
    { icon: Activity, n: "Geophones (×3)", d: "Seismic sensors S1·S2·S3 improving tunnel localization." },
    { icon: Monitor, n: "16×2 LCD (I²C)", d: "Displays system status and tunnel alerts." },
    { icon: Lightbulb, n: "Green / Red LEDs", d: "Indicate safe condition and tunnel alert states." },
    { icon: Volume2, n: "Active Buzzer", d: "Audible warning during confirmed tunnel detection." },
    { icon: Battery, n: "9V Battery + USB", d: "Portable power supply for field demonstration." },
    { icon: CircuitBoard, n: "Breadboard + Wires", d: "Prototyping platform for circuit assembly." },
    { icon: Gauge, n: "Vibration Motor", d: "Generates artificial seismic waves during demo." },
    { icon: ShieldCheck, n: "Plastic Enclosure", d: "Protects electronics during field deployment." },
  ];
  return (
    <section id="components" className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="HARDWARE" title="Components used" sub="Off-the-shelf, low-cost parts assembled into a complete detection node." />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ icon: Icon, n, d }) => (
            <div key={n} className="group glass rounded-xl p-5 hover:border-primary transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold truncate">{n}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkingPrinciple({ stage, setStage, autoSim, setAutoSim }: { stage: Stage; setStage: (n: Stage) => void; autoSim: boolean; setAutoSim: (b: boolean) => void }) {
  const stages = [
    { t: "Normal Condition", c: "text-primary", d: "No vibration. Soil compact. System Safe.", vib: "LOW", soil: "NORMAL", out: "GREEN LED" },
    { t: "Digging Detection", c: "text-yellow-400", d: "Vibration detected, soil unchanged. Warning issued.", vib: "HIGH", soil: "NORMAL", out: "RED FLASH" },
    { t: "Tunnel Formation", c: "text-destructive", d: "Vibration + cavity confirmed. Alert triggered.", vib: "HIGH", soil: "ABNORMAL", out: "RED + BUZZER" },
  ];
  return (
    <section id="working" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
        <SectionHeader kicker="WORKING PRINCIPLE" title="Three-stage detection pipeline" sub="Click a stage to manually trigger it, or watch the system cycle automatically." />
        <button onClick={() => setAutoSim(!autoSim)} className="glass rounded-md px-4 py-2 text-sm font-mono hover:border-primary">
          {autoSim ? "⏸ Pause" : "▶ Auto-Cycle"}
        </button>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {stages.map((st, i) => {
          const active = stage === i;
          return (
            <button
              key={st.t}
              onClick={() => setStage(i as Stage)}
              className={`text-left glass rounded-xl p-6 transition-all ${active ? "border-primary shadow-[var(--shadow-glow)] scale-[1.02]" : "hover:border-primary/50"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">STAGE {i + 1}</span>
                {active && <span className="h-2 w-2 rounded-full bg-primary animate-blink" />}
              </div>
              <h3 className={`mt-3 text-xl font-bold ${st.c}`}>{st.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{st.d}</p>
              <dl className="mt-5 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-t border-border pt-2"><dt className="text-muted-foreground">VIBRATION</dt><dd>{st.vib}</dd></div>
                <div className="flex justify-between border-t border-border pt-2"><dt className="text-muted-foreground">SOIL</dt><dd>{st.soil}</dd></div>
                <div className="flex justify-between border-t border-border pt-2"><dt className="text-muted-foreground">OUTPUT</dt><dd className={st.c}>{st.out}</dd></div>
              </dl>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FusionLogic() {
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="LOGIC" title="Sensor fusion algorithm" sub="The core boolean rule that distinguishes a tunnel from ordinary surface activity." />
        <div className="mt-10 grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="space-y-3">
            <LogicChip label="Vibration" value="HIGH" color="primary" />
            <div className="text-center font-mono text-muted-foreground text-sm">AND</div>
            <LogicChip label="Soil Resistivity" value="ABNORMAL" color="primary" />
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl text-primary">⇒</div>
          </div>
          <div className="glass-strong rounded-xl p-6 border-primary/40 shadow-[var(--shadow-glow-red)]">
            <div className="font-mono text-xs text-muted-foreground">RESULT</div>
            <div className="mt-2 text-2xl font-bold text-destructive">TUNNEL DETECTED = TRUE</div>
            <p className="mt-3 text-sm text-muted-foreground">Otherwise the system remains in monitoring or warning state — no full alert.</p>
          </div>
        </div>
        <pre className="mt-10 glass rounded-xl p-6 font-mono text-sm overflow-x-auto"><code>{`if (vibration == HIGH && soilResistivity == ABNORMAL) {
  tunnelDetected = true;
  digitalWrite(RED_LED, HIGH);
  digitalWrite(BUZZER, HIGH);
  lcd.print("TUNNEL :: NODE " + nodeId);
} else if (vibration == HIGH) {
  // Warning only — surface activity, no cavity confirmed
  digitalWrite(RED_LED, FLASH);
} else {
  digitalWrite(GREEN_LED, HIGH);
  lcd.print("SYSTEM SAFE");
}`}</code></pre>
      </div>
    </section>
  );
}

function LogicChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-lg px-5 py-4 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono font-bold text-${color}`} style={{ color: color === "primary" ? "var(--primary)" : undefined }}>= {value}</span>
    </div>
  );
}

function Simulation({ s, stage }: { s: typeof stageData[Stage]; stage: Stage }) {
  return (
    <section id="simulation" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="LIVE SIM" title="Tunnel detection simulation" sub="Sensor readings update in real time as the system cycles through stages." />
      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">SENSOR_TELEMETRY</span>
            <span className="font-mono text-xs text-primary">REALTIME</span>
          </div>
          <SeismicBars active={stage >= 1} intense={stage === 2} />
          <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-sm">
            <Reading label="VIBRATION" value={s.vib} alert={stage >= 1} />
            <Reading label="SOIL RES." value={s.soil} alert={stage >= 2} />
            <Reading label="GEOPHONE S1" value={stage >= 1 ? "0.84g" : "0.02g"} alert={stage >= 2} />
            <Reading label="GEOPHONE S2" value={stage >= 1 ? "0.91g" : "0.03g"} alert={stage >= 2} />
            <Reading label="GEOPHONE S3" value={stage >= 1 ? "0.78g" : "0.02g"} alert={stage >= 2} />
            <Reading label="STATUS" value={s.label} alert={stage === 2} warn={stage === 1} />
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">ALERT_PANEL</span>
            <span className={`font-mono text-xs ${stage === 2 ? "text-destructive" : stage === 1 ? "text-yellow-400" : "text-primary"}`}>{stage === 2 ? "● CRITICAL" : stage === 1 ? "● WARNING" : "● NOMINAL"}</span>
          </div>
          <div className="flex-1 grid place-items-center py-6">
            <div className="relative">
              <div className={`grid h-32 w-32 place-items-center rounded-full border-4 ${stage === 2 ? "border-destructive" : stage === 1 ? "border-yellow-400" : "border-primary"} transition-colors`}>
                {stage === 2 ? <AlertTriangle className="h-14 w-14 text-destructive" />
                  : stage === 1 ? <Drill className="h-14 w-14 text-yellow-400 animate-dig" />
                  : <ShieldCheck className="h-14 w-14 text-primary" />}
              </div>
              {stage >= 1 && (
                <div className={`absolute inset-0 rounded-full border-2 ${stage === 2 ? "border-destructive" : "border-yellow-400"} animate-pulse-ring`} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Indicator label="GREEN" on={stage === 0} color="primary" />
            <Indicator label="RED" on={stage >= 1} color="destructive" blink={stage === 1} />
            <Indicator label="BUZZER" on={s.buzzer} color="destructive" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SeismicBars({ active, intense }: { active: boolean; intense: boolean }) {
  return (
    <div className="flex items-end gap-1 h-32 px-2 border-b border-border">
      {Array.from({ length: 40 }).map((_, i) => {
        const h = active ? (intense ? 30 + (Math.sin(i * 0.7) + 1) * 35 : 10 + (Math.sin(i * 0.5) + 1) * 15) : 4 + (i % 3);
        return (
          <div
            key={i}
            className={`flex-1 rounded-t ${active ? (intense ? "bg-destructive" : "bg-yellow-400") : "bg-primary/50"} ${active ? "animate-seismic" : ""}`}
            style={{ height: `${h}%`, animationDelay: `${i * 30}ms` }}
          />
        );
      })}
    </div>
  );
}

function Reading({ label, value, alert, warn }: { label: string; value: string; alert?: boolean; warn?: boolean }) {
  return (
    <div className="glass rounded-md p-3">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={`mt-1 font-bold ${alert ? "text-destructive" : warn ? "text-yellow-400" : "text-primary"}`}>{value}</div>
    </div>
  );
}

function Indicator({ label, on, color, blink }: { label: string; on: boolean; color: string; blink?: boolean }) {
  const bg = color === "primary" ? "var(--primary)" : "var(--destructive)";
  return (
    <div className="glass rounded-md p-3 text-center">
      <div className={`mx-auto h-4 w-4 rounded-full ${blink ? "animate-blink" : ""}`} style={{ background: on ? bg : "oklch(0.3 0 0)", boxShadow: on ? `0 0 12px ${bg}` : "none" }} />
      <div className="mt-2 font-mono text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function NodeMap({ activeNode, setActiveNode }: { activeNode: number; setActiveNode: (n: number) => void }) {
  const nodes = [
    { id: 1, x: 12, y: 60, sector: "A" },
    { id: 2, x: 30, y: 35, sector: "B" },
    { id: 3, x: 50, y: 55, sector: "B" },
    { id: 4, x: 68, y: 30, sector: "C" },
    { id: 5, x: 86, y: 50, sector: "C" },
  ];
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="DEPLOYMENT" title="Node mapping & border surveillance" sub="Each sensor unit is a fixed security node. Alerts identify the exact node and sector under threat." />
        <div className="mt-10 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="relative glass-strong rounded-2xl p-6 aspect-[2/1] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            {/* Border line */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M0 65 Q20 40 35 50 T65 45 T100 55" fill="none" stroke="var(--primary)" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.5" />
            </svg>
            <div className="absolute top-3 left-3 font-mono text-xs text-muted-foreground">BORDER_GRID :: TACTICAL_OVERLAY</div>
            {nodes.map(n => {
              const active = n.id === activeNode;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(n.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="relative">
                    <div className={`h-4 w-4 rounded-full ${active ? "bg-destructive" : "bg-primary"} relative z-10`} style={{ boxShadow: `0 0 12px ${active ? "var(--destructive)" : "var(--primary)"}` }} />
                    {active && <div className="absolute inset-0 rounded-full bg-destructive animate-pulse-ring" />}
                  </div>
                  <div className="mt-2 font-mono text-[10px] whitespace-nowrap">N{n.id}·{n.sector}</div>
                </button>
              );
            })}
          </div>
          <div className="glass-strong rounded-2xl p-6 flex flex-col">
            <div className="font-mono text-xs text-muted-foreground">COMMAND_CENTER</div>
            <div className={`mt-4 rounded-lg p-5 border-2 ${activeNode ? "border-destructive bg-destructive/10" : "border-primary"}`}>
              <div className="flex items-center gap-2 text-destructive font-mono">
                <AlertTriangle className="h-5 w-5 animate-blink" />
                <span className="font-bold">INTRUSION ALERT</span>
              </div>
              <div className="mt-4 space-y-2 font-mono text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">SECTOR</span><span>{nodes.find(n => n.id === activeNode)?.sector || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">NODE</span><span>N{activeNode}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">TYPE</span><span className="text-destructive">TUNNEL</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">TIME</span><span>04:21:08 UTC</span></div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Tap any node on the map to simulate an alert from that position.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LCDShowcase() {
  const messages = ["SYSTEM SAFE", "MONITORING...", "DIGGING DETECTED", "TUNNEL DETECTED", "LOCATION: NODE 3"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % messages.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="DISPLAY" title="LCD output showcase" sub="The 16×2 I²C display cycles through status messages as conditions change." />
      <div className="mt-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
        <div className="mx-auto rounded-xl p-5 bg-[oklch(0.16_0.08_140)] border-2 border-[oklch(0.4_0.05_140)] shadow-2xl">
          <div className="rounded-md p-4 bg-[oklch(0.55_0.18_140)] font-mono text-[oklch(0.12_0.05_140)] text-xl tracking-widest min-w-[280px] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="relative">{messages[i].padEnd(16, " ")}</div>
            <div className="relative mt-1 text-sm opacity-80">{i % 2 === 0 ? ">> ACTIVE" : ">> SCANNING"}</div>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {messages.map((_, j) => (
              <div key={j} className={`h-1.5 w-6 rounded-full ${j === i ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 font-mono text-sm">
          {messages.map((m, j) => (
            <div key={m} className={`glass rounded-lg p-4 ${j === i ? "border-primary" : ""}`}>
              <span className="text-muted-foreground text-xs">MSG_{j + 1}</span>
              <div className="mt-1">{m}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Circuit() {
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="CIRCUIT" title="Arduino wiring overview" sub="All sensors interface with the UNO over digital, analog, and I²C pins." />
        <div className="mt-10 glass-strong rounded-2xl p-6 overflow-x-auto">
          <svg viewBox="0 0 800 380" className="w-full min-w-[680px]">
            <rect x="300" y="140" width="200" height="120" rx="8" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
            <text x="400" y="195" textAnchor="middle" fill="var(--primary)" fontFamily="monospace" fontSize="16" fontWeight="bold">ARDUINO UNO R3</text>
            <text x="400" y="215" textAnchor="middle" fill="var(--muted-foreground)" fontFamily="monospace" fontSize="11">ATmega328P</text>

            {/* Sensors */}
            {[
              { x: 60, y: 50, w: 140, h: 50, label: "SW-420 VIBRATION", pin: "D2", color: "primary" },
              { x: 60, y: 130, w: 140, h: 50, label: "FC-28 SOIL", pin: "A0", color: "primary" },
              { x: 60, y: 210, w: 140, h: 50, label: "GEOPHONE S1", pin: "A1", color: "primary" },
              { x: 60, y: 280, w: 140, h: 50, label: "GEOPHONE S2/S3", pin: "A2/A3", color: "primary" },
            ].map((s, i) => (
              <g key={i}>
                <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="6" fill="var(--card)" stroke="var(--primary)" />
                <text x={s.x + s.w / 2} y={s.y + 22} textAnchor="middle" fill="var(--foreground)" fontFamily="monospace" fontSize="11">{s.label}</text>
                <text x={s.x + s.w / 2} y={s.y + 38} textAnchor="middle" fill="var(--primary)" fontFamily="monospace" fontSize="10">PIN {s.pin}</text>
                <line x1={s.x + s.w} y1={s.y + s.h / 2} x2="300" y2={150 + i * 22} stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            ))}

            {/* Outputs */}
            {[
              { x: 600, y: 50, w: 140, h: 50, label: "LCD 16x2 I²C", pin: "A4/A5", color: "accent" },
              { x: 600, y: 130, w: 140, h: 50, label: "GREEN LED", pin: "D8", color: "primary" },
              { x: 600, y: 210, w: 140, h: 50, label: "RED LED", pin: "D9", color: "destructive" },
              { x: 600, y: 280, w: 140, h: 50, label: "BUZZER", pin: "D10", color: "destructive" },
            ].map((s, i) => (
              <g key={i}>
                <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="6" fill="var(--card)" stroke={`var(--${s.color})`} />
                <text x={s.x + s.w / 2} y={s.y + 22} textAnchor="middle" fill="var(--foreground)" fontFamily="monospace" fontSize="11">{s.label}</text>
                <text x={s.x + s.w / 2} y={s.y + 38} textAnchor="middle" fill={`var(--${s.color})`} fontFamily="monospace" fontSize="10">PIN {s.pin}</text>
                <line x1={s.x} y1={s.y + s.h / 2} x2="500" y2={150 + i * 22} stroke={`var(--${s.color})`} strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

function Results() {
  const r = [
    { t: "Safe Condition", v: "System Safe", c: "text-primary", desc: "No anomaly detected. Green LED on. LCD shows MONITORING." },
    { t: "Digging Condition", v: "Warning Generated", c: "text-yellow-400", desc: "Vibration detected without cavity. Red LED flashes." },
    { t: "Tunnel Condition", v: "Tunnel Detected", c: "text-destructive", desc: "Cavity + vibration confirmed. Full alert + node location displayed." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="RESULTS" title="Expected outcomes" />
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {r.map(({ t, v, c, desc }) => (
          <div key={t} className="glass rounded-xl p-6">
            <div className="font-mono text-xs text-muted-foreground">{t.toUpperCase()}</div>
            <div className={`mt-2 text-2xl font-bold ${c}`}>{v}</div>
            <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Advantages() {
  const a = [
    ["Low Cost", "Built from off-the-shelf Arduino components."],
    ["Real-Time Monitoring", "Continuous sensor scanning with instant feedback."],
    ["Early Warning", "Detects digging before tunnel completes."],
    ["Easy Deployment", "Compact enclosure suitable for harsh field conditions."],
    ["Scalable Network", "Add nodes to expand coverage across sectors."],
    ["Low False Alarms", "Sensor fusion filters out surface activity."],
  ];
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="ADVANTAGES" title="Why this approach works" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {a.map(([t, d]) => (
            <div key={t} className="glass rounded-lg p-5 flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div><h4 className="font-semibold">{t}</h4><p className="text-sm text-muted-foreground mt-1">{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Applications() {
  const apps = [
    { icon: ShieldCheck, t: "Border Security", d: "Detect smuggling and infiltration tunnels." },
    { icon: Eye, t: "Military Surveillance", d: "Perimeter defense for sensitive zones." },
    { icon: CircuitBoard, t: "Critical Infrastructure", d: "Protect power & communication facilities." },
    { icon: Cable, t: "Pipeline Monitoring", d: "Detect illegal taps and excavation near pipelines." },
    { icon: Layers, t: "Mining Safety", d: "Monitor underground stability and unauthorized digging." },
    { icon: CircuitBoard, t: "Construction", d: "Track underground excavation in urban projects." },
  ];
  return (
    <section id="applications" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="APPLICATIONS" title="Where it can be deployed" />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map(({ icon: Icon, t, d }) => (
          <div key={t} className="glass rounded-xl p-6 hover:border-primary transition-colors group">
            <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 font-semibold text-lg">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Future() {
  const f = [
    [Bot, "AI Classification", "Differentiate animals, vehicles, humans, and digging."],
    [Network, "ML Prediction", "Forecast tunnel formation from early vibration patterns."],
    [Cloud, "IoT Cloud Dashboard", "Remote monitoring across command centers."],
    [MapPin, "GPS Integration", "Geo-tag each detection event for analytics."],
    [Wifi, "Wireless Sensor Network", "LoRa / ZigBee mesh for wide-area deployment."],
    [Plane, "Drone Assist", "UAV-mounted scanners for rapid sweep operations."],
  ];
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeader kicker="ROADMAP" title="Future enhancements" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {f.map(([Icon, t, d]) => (
            <div key={t as string} className="glass rounded-xl p-6">
              {/* @ts-ignore */}
              <Icon className="h-6 w-6 text-accent" />
              <h4 className="mt-3 font-semibold">{t as string}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const team = [
    { n: "Project Lead", r: "Embedded Systems" },
    { n: "Hardware Engineer", r: "Sensors & Circuitry" },
    { n: "Software Engineer", r: "Arduino Firmware" },
    { n: "Research Analyst", r: "Field Testing" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <SectionHeader kicker="TEAM" title="The engineers behind the project" />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((m, i) => (
          <div key={i} className="glass rounded-xl p-6 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
              {m.n.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </div>
            <h4 className="mt-4 font-semibold">{m.n}</h4>
            <p className="text-sm text-muted-foreground">{m.r}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="glass-strong rounded-2xl p-8 sm:p-12 text-center">
          <span className="font-mono text-xs text-primary">// GET IN TOUCH</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Want the full technical report?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Schematics, source code, BOM, and field-test results are available on request.</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a href="#" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
              <Download className="h-4 w-4" /> Download Report (PDF)
            </a>
            <a href="mailto:team@tunnelsentinel.dev" className="inline-flex items-center gap-2 rounded-md glass px-6 py-3 text-sm font-semibold hover:border-primary">
              <Mail className="h-4 w-4" /> Contact Team
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-5 text-muted-foreground">
            <a href="#" className="hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid sm:grid-cols-[1fr_auto] gap-4 items-center text-sm text-muted-foreground">
      <div>© {new Date().getFullYear()} Tunnel Sentinel — Smart Underground Detection Project</div>
      <div className="font-mono text-xs">v1.0 · Arduino · Sensor Fusion</div>
    </footer>
  );
}
