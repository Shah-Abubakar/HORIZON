'use client'

import React from 'react'
import { useStore } from '@/store/store'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  Brush,
  Code,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Target,
} from 'lucide-react'

const phaseIcons = {
  ideation: Lightbulb,
  design: Brush,
  development: Code,
  launch: Rocket,
  growth: TrendingUp,
}

const phaseColors = {
  completed: 'text-green-400',
  'in-progress': 'text-accent-highlight',
  locked: 'text-accent-primary-dark',
}

const phaseNames: Record<string, string> = {
  ideation: 'Ideation',
  design: 'Design',
  development: 'Development',
  launch: 'Launch',
  growth: 'Growth',
}

function getNextActionForPhase(phase: string, startupName: string) {
  const actions: Record<string, { title: string; description: string }> = {
    ideation: {
      title: 'Validate your idea by talking to 10 strangers',
      description: `Head to The Idea Lab to analyze "${startupName}" with AI feedback.`,
    },
    design: {
      title: 'Create your design system',
      description: 'Check the Design Blueprint for prompts to build your UI.',
    },
    development: {
      title: 'Start building your MVP',
      description: 'Visit the Code Factory for battle-tested code templates.',
    },
    launch: {
      title: 'Deploy your app',
      description: 'Head to the Deployment Hub for a step-by-step launch guide.',
    },
    growth: {
      title: 'Get your first 100 users',
      description: 'Check Marketing Hustle for launch strategies and channels.',
    },
  }
  return actions[phase] || actions.ideation
}

export default function DashboardPage() {
  const { user, phases, startupName, focusArea } = useStore()

  // Use real phases from onboarding, or fallback to default
  const displayPhases = phases.length > 0 ? phases : [
    { id: 'ideation', name: 'Ideation', status: 'in-progress', progress: 20 },
    { id: 'design', name: 'Design', status: 'locked', progress: 0 },
    { id: 'development', name: 'Development', status: 'locked', progress: 0 },
    { id: 'launch', name: 'Launch', status: 'locked', progress: 0 },
    { id: 'growth', name: 'Growth', status: 'locked', progress: 0 },
  ]

  const completedCount = displayPhases.filter(p => p.status === 'completed').length
  const overall = Math.round((completedCount / displayPhases.length) * 100)
  const currentPhase = displayPhases.find(p => p.status === 'in-progress')
  const nextAction = getNextActionForPhase(currentPhase?.id || 'ideation', startupName || 'My Startup')

  const recentActivity = [
    { id: 1, action: 'Joined HORIZON', time: 'Just now', phase: 'onboarding' },
    { id: 2, action: `Added "${startupName || 'My Startup'}"`, time: 'Just now', phase: 'setup' },
  ]

  // Calculate SVG circle parameters
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (overall / 100) * circumference

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          {startupName ? startupName : `Welcome back, ${user?.name?.split(' ')[0] || 'Founder'}`}
        </h1>
        <p className="text-accent-primary-dark">
          {currentPhase ? `You're in the ${phaseNames[currentPhase.id] || currentPhase.name} phase` : 'Your startup journey'}
          {focusArea && ` · Focus: ${focusArea.charAt(0).toUpperCase() + focusArea.slice(1)}`}
        </p>
      </motion.div>

      {/* Progress Circle + Timeline */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center"
        >
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgba(160, 160, 160, 0.08)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A0A0A0" />
                  <stop offset="100%" stopColor="#E0E0E0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{overall}%</span>
            </div>
          </div>
          <p className="text-sm text-accent-primary-dark text-center">
            Your progress is {overall}% complete
          </p>
        </motion.div>

        {/* Phase Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Phase Timeline</h3>
          <div className="flex items-center justify-between mb-4">
            {phases.map((phase, index) => {
              const Icon = phaseIcons[phase.id as keyof typeof phaseIcons]
              const isLast = index === phases.length - 1
              return (
                <React.Fragment key={phase.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        phase.status === 'completed'
                          ? 'bg-green-500/20 border border-green-500/40'
                          : phase.status === 'in-progress'
                          ? 'bg-accent-primary/20 border border-accent-primary/40'
                          : 'bg-dark-600 border border-dark-400'
                      }`}
                    >
                      {phase.status === 'completed' ? (
                        <CheckCircle2 size={18} className="text-green-400" />
                      ) : phase.status === 'in-progress' ? (
                        <Icon size={18} className="text-accent-highlight" />
                      ) : (
                        <Lock size={16} className="text-accent-primary-dark" />
                      )}
                    </div>
                    <span className="text-xs text-accent-primary-dark text-center max-w-[60px]">
                      {phase.name}
                    </span>
                    <span
                      className={`text-[10px] mt-1 ${
                        phaseColors[phase.status as keyof typeof phaseColors]
                      }`}
                    >
                      {phase.status === 'completed'
                        ? 'Done'
                        : phase.status === 'in-progress'
                        ? 'Active'
                        : 'Locked'}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        phase.status === 'completed'
                          ? 'bg-green-500/40'
                          : 'bg-dark-500'
                      }`}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
          <div className="mt-4 bg-dark-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-accent-primary-dark">Current Phase</span>
              <span className="text-accent-highlight font-medium capitalize">
                {phases.find(p => p.status === 'in-progress')?.name}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Next Action + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Next Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 border-l-4 border-l-accent-primary"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
              <Target size={20} className="text-accent-highlight" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-accent-highlight mb-1">Next Action</h3>
              <p className="text-white font-medium mb-2">{nextAction.title}</p>
              <p className="text-sm text-accent-primary-dark mb-4">{nextAction.description}</p>
              <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                Start Now
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="text-accent-highlight" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-accent-primary-light truncate">{activity.action}</p>
                  <p className="text-xs text-accent-primary-dark">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
