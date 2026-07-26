'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react'

export default function LandingPage() {
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [introPhase, setIntroPhase] = useState<'logo' | 'tagline' | 'done'>('logo')

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setVideoOpacity(1), 100)
    return () => clearTimeout(timer)
  }, [])

  // Intro animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase('tagline'), 1400)
    const t2 = setTimeout(() => setIntroPhase('done'), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Handle loop fade-out/fade-in
  useEffect(() => {
    const video = bgVideoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const duration = video.duration
      const currentTime = video.currentTime
      const fadeDuration = 1.2

      if (duration && currentTime > duration - fadeDuration) {
        const progress = (duration - currentTime) / fadeDuration
        setVideoOpacity(Math.max(0, progress))
      } else if (duration && currentTime < fadeDuration) {
        const progress = currentTime / fadeDuration
        setVideoOpacity(Math.min(1, progress))
      } else {
        setVideoOpacity(1)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  const approachSteps = [
    {
      icon: Sparkles,
      title: 'Describe Your Vision',
      description: 'Tell our AI about your idea, target audience, and the problem you are solving. We analyze everything from market size to competitor landscape.',
    },
    {
      icon: Target,
      title: 'Follow the Playbook',
      description: 'Get a personalized step-by-step roadmap with the exact prompts and tools you need. No guessing — just proven paths that work.',
    },
    {
      icon: Zap,
      title: 'Build and Launch',
      description: 'Use AI to write code, design interfaces, and deploy your product in record time. From idea to live in days, not months.',
    },
  ]

  return (
    <div className="bg-dark-900">

      {/* ===== FIXED BH1 VIDEO BACKGROUND ===== */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: videoOpacity }}
      >
        <video
          ref={bgVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/BH1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark-900/70" />
      </div>

      {/* ===== INTRO OVERLAY ===== */}
      <AnimatePresence>
        {introPhase !== 'done' && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900"
          >
            <motion.div
              initial={{ scale: 2.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
                HORIZON
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={introPhase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                HORIZON
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introPhase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4"
            >
              <p className="text-lg md:text-xl text-accent-primary-dark leading-relaxed italic">
                Plan and build your own startup
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introPhase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Link href="/login" className="group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-white text-dark-900 font-semibold px-8 py-4 rounded-xl text-base hover:bg-gray-100 transition-colors"
                >
                  Let's Start its Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={introPhase === 'done' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-accent-primary/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-accent-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      <section className="relative z-10">

        {/* Approach Section */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                A systematic approach to building with HORIZON
              </h2>
              <p className="text-accent-primary-dark leading-relaxed mb-6">
                HORIZON is your AI-powered co-founder for students. We provide a step-by-step playbook that takes you from raw idea to launched product, using the best free AI tools available today.
              </p>
              <p className="text-accent-primary-dark leading-relaxed">
                No more guessing. No more tutorial hell. Just a clear path forward, validated by data and built for students who want to ship fast.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {approachSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative p-5 rounded-xl bg-dark-800/80 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-primary/25 transition-colors">
                        <Icon className="w-5 h-5 text-accent-highlight" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                        <p className="text-sm text-accent-primary-dark leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-dark-800/80 backdrop-blur-sm border border-white/5 p-12 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to build something?
            </h2>
            <p className="text-accent-primary-dark max-w-lg mx-auto mb-8">
              Start your journey today. No credit card required. Free forever plan.
            </p>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white text-dark-900 font-semibold px-8 py-4 rounded-xl text-base hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-dark-900/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                  <span className="text-dark-900 font-black text-xs">H</span>
                </div>
                <span className="font-bold text-accent-primary">HORIZON</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-accent-primary-dark">
                <Link href="#" className="hover:text-white transition-colors">About</Link>
                <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              </div>
              <p className="text-sm text-accent-primary-dark/50">
                2025 HORIZON. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}
