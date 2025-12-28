"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  Rocket,
  Lightbulb,
  Target,
  Handshake,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.15 } },
};

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-indigo-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Animated glow orbs
function GlowOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}

const founder = {
  name: "陳俊諺",
  role: "創辦人 & 全端工程師",
  gradient: "from-indigo-500 via-purple-500 to-cyan-500",
};

const values = [
  { icon: "lightbulb", title: "不設限", desc: "跨領域解決各種挑戰", gradient: "from-yellow-500 to-amber-500" },
  { icon: "target", title: "精準", desc: "追求每個細節的品質", gradient: "from-red-500 to-rose-500" },
  { icon: "handshake", title: "共創", desc: "與客戶一起實現想法", gradient: "from-emerald-500 to-green-500" },
];

function FounderIcon() {
  return <Rocket className="w-12 h-12 text-white" strokeWidth={1.5} />;
}

function ValueIcon({ name }: { name: string }) {
  const props = { className: "w-10 h-10 text-white", strokeWidth: 1.5 };
  switch (name) {
    case "lightbulb": return <Lightbulb {...props} />;
    case "target": return <Target {...props} />;
    case "handshake": return <Handshake {...props} />;
    default: return <Lightbulb {...props} />;
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 -z-10" />
      <GridBackground />
      <FloatingParticles />
      <GlowOrbs />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent" />
        <BackgroundBeams className="z-0" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            關於我們
          </motion.h1>
          <TextGenerateEffect
            words="軟體、硬體、視覺——無論你的需求是什麼，我們都能找到解決方案。"
            className="text-xl max-w-2xl mx-auto text-zinc-400"
            charByChar={true}
            duration={0.3}
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-white mb-6">我們的使命</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                無垠科技是一個不設限的團隊。從網站開發到硬體系統整合，從音訊設備架設到展演視覺製作，我們跨越軟硬體的界線，為每個獨特的需求提供解決方案。
              </p>
              <p className="text-zinc-400 leading-relaxed">
                不管你的想法有多特別，我們都樂於接受挑戰，一起把它實現。
              </p>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-zinc-800/50 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  className="p-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-2xl shadow-indigo-500/30"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Rocket className="w-16 h-16 text-white" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`p-8 rounded-full bg-gradient-to-br ${founder.gradient} shadow-2xl shadow-indigo-500/25`}>
                <FounderIcon />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2">{founder.name}</h2>
            <p className="text-indigo-400 text-lg mb-6">{founder.role}</p>

            <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
              軟體工程師出身，但不只會寫程式。熱愛音樂、視覺與各種有趣的挑戰，
              擅長整合不同領域的技術，把複雜的事情變簡單。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.gradient}`}>
                    <ValueIcon name={value.icon} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-zinc-400">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
