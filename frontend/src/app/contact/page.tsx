"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Mail, MapPin, Clock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
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
          className="absolute rounded-full bg-purple-500/20"
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
            linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
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
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}

const contactInfo = [
  {
    icon: "mail",
    title: "電子郵件",
    content: "contact@boundless.tech",
    link: "mailto:contact@boundless.tech",
  },
  {
    icon: "map",
    title: "辦公地址",
    content: "台北市信義區信義路五段7號",
    link: null,
  },
  {
    icon: "clock",
    title: "營業時間",
    content: "週一至週五 09:00 - 18:00",
    link: null,
  },
];

function ContactIcon({ name }: { name: string }) {
  const props = { className: "w-6 h-6 text-purple-400", strokeWidth: 1.5 };
  switch (name) {
    case "mail": return <Mail {...props} />;
    case "map": return <MapPin {...props} />;
    case "clock": return <Clock {...props} />;
    default: return <Mail {...props} />;
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 -z-10" />
      <GridBackground />
      <FloatingParticles />
      <GlowOrbs />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 to-transparent" />
        <BackgroundBeams className="z-0" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            聯絡我們
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            有任何問題或合作想法？我們很樂意與您交流
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">傳送訊息</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      姓名
                    </label>
                    <motion.input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="您的姓名"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      電子郵件
                    </label>
                    <motion.input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="your@email.com"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    公司名稱（選填）
                  </label>
                  <motion.input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="您的公司"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    訊息內容
                  </label>
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="請描述您的需求或問題..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div className="flex justify-center">
                  <MovingBorderButton type="submit">
                    送出訊息
                  </MovingBorderButton>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8">聯絡資訊</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 p-6 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl"
                    whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.5)" }}
                  >
                    <div className="p-3 rounded-xl bg-purple-500/10">
                      <ContactIcon name={item.icon} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-zinc-400">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-white font-medium mb-4">關注我們</h3>
                <div className="flex gap-4">
                  {["GitHub", "Twitter", "LinkedIn"].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="px-4 py-2 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg text-zinc-400 text-sm hover:text-white hover:border-purple-500/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
