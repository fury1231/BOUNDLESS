"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SpotlightCard } from "@/components/ui/spotlight";
import {
  Code2,
  Monitor,
  Cpu,
  Sparkles,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
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
          className="absolute rounded-full bg-cyan-500/20"
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
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
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
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}

const iconStyle = "w-8 h-8 text-white";

const services = [
  {
    iconName: "code",
    title: "軟體與網站開發",
    description: "從網站到應用程式，提供完整的軟體開發解決方案，將您的想法化為現實。",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    iconName: "monitor",
    title: "展演視覺",
    description: "為演唱會、派對、藝術展演提供即時視覺效果，創造沉浸式的視聽體驗。",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    iconName: "cpu",
    title: "硬體系統整合",
    description: "從音訊設備到各類專業硬體，提供規劃、採購與架設服務，滿足多元應用場景。",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    iconName: "sparkles",
    title: "客製化解決方案",
    description: "遇到特殊需求？我們樂於接受各種挑戰，一起找出最適合的解決方案。",
    gradient: "from-emerald-500 to-teal-500",
  },
];

function ServiceIcon({ name }: { name: string }) {
  const props = { className: iconStyle, strokeWidth: 1.5 };
  switch (name) {
    case "code": return <Code2 {...props} />;
    case "monitor": return <Monitor {...props} />;
    case "cpu": return <Cpu {...props} />;
    case "sparkles": return <Sparkles {...props} />;
    default: return <Code2 {...props} />;
  }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 -z-10" />
      <GridBackground />
      <FloatingParticles />
      <GlowOrbs />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 to-transparent" />
        <BackgroundBeams className="z-0" />
        <motion.div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            我們的服務
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            從概念到部署，我們提供全方位的技術解決方案
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative"
                variants={fadeInUp}
              >
                <SpotlightCard
                  className="h-full p-8"
                  spotlightColor={
                    index === 0 ? "rgba(99, 102, 241, 0.15)" :
                    index === 1 ? "rgba(236, 72, 153, 0.15)" :
                    index === 2 ? "rgba(6, 182, 212, 0.15)" :
                    "rgba(16, 185, 129, 0.15)"
                  }
                >
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient}`}>
                        <ServiceIcon name={service.iconName} />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              準備好開始您的專案了嗎？
            </h2>
            <p className="text-zinc-400 mb-8">
              讓我們一起討論如何將您的想法轉化為現實
            </p>
            <MovingBorderButton>
              立即諮詢
            </MovingBorderButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
