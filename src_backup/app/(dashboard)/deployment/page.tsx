'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cloud } from 'lucide-react'

export default function DeploymentHub() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent-primary/15 flex items-center justify-center mx-auto mb-6">
          <Cloud size={28} className="text-accent-highlight" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Deployment Hub</h1>
        <p className="text-accent-primary-dark max-w-md mx-auto mb-6">
          Go live without a DevOps degree. Hosting recommendations, deployment checklists, and guides.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20">
          <span className="w-2 h-2 rounded-full bg-accent-highlight animate-pulse" />
          <span className="text-sm text-accent-highlight">Coming Soon</span>
        </div>
      </motion.div>
    </div>
  )
}
