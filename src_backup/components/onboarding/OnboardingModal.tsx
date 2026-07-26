'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  Sparkles,
  Lightbulb,
  Brush,
  Code,
  Cloud,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  Zap,
} from 'lucide-react'
import { useStore } from '@/store/store'

const FADE_VARIANTS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const STAGES = [
  {
    id: 'ideation',
    label: 'Ideation',
    description: 'Validating problem & finding product-market fit',
    icon: Lightbulb,
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Wireframes, branding & UI/UX',
    icon: Brush,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'development',
    label: 'Development',
    description: 'Building your MVP & writing code',
    icon: Code,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'launch',
    label: 'Launch',
    description: 'Deploying live & getting first users',
    icon: Cloud,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'Acquiring users & scaling up',
    icon: TrendingUp,
    color: 'from-rose-500/20 to-red-500/20',
    borderColor: 'border-rose-500/30',
  },
]

const FOCUS_OPTIONS = [
  { id: 'validate', label: 'Validate my idea', desc: 'Talk to users, find pain points', icon: Target },
  { id: 'build', label: 'Build the product', desc: 'Code, ship MVP fast', icon: Code },
  { id: 'launch', label: 'Launch & get users', desc: 'Go live, spread the word', icon: Cloud },
  { id: 'funding', label: 'Raise funding', desc: 'Pitch, grants, investors', icon: Zap },
]

interface Props {
  onComplete: () => void
}

export default function OnboardingModal({ onComplete }: Props) {
  const [step, setStep] = useState(1)
  const [startupStatus, setStartupStatus] = useState<'new' | 'existing' | null>(null)
  const [startupName, setStartupName] = useState('')
  const [startupDescription, setStartupDescription] = useState('')
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null)

  const { setCurrentPhase, completeOnboarding, setUser } = useStore()

  const totalSteps = startupStatus === 'existing' ? 4 : 3

  const handleFinish = () => {
    // Build the progress based on answers
    const stageOrder = ['ideation', 'design', 'development', 'launch', 'growth']
    const currentStageIndex = selectedStage ? stageOrder.indexOf(selectedStage) : 0

    const phases = stageOrder.map((stageId, index) => ({
      id: stageId,
      name: STAGES.find(s => s.id === stageId)?.label || stageId,
      status: index < currentStageIndex ? 'completed' : index === currentStageIndex ? 'in-progress' : 'locked',
      progress: index < currentStageIndex ? 100 : index === currentStageIndex ? 20 : 0,
    }))

    const completedSteps = stageOrder.slice(0, currentStageIndex).map((_, i) => `step-${i + 1}`)

    setCurrentPhase(selectedStage || 'ideation')
    completeOnboarding(
      phases,
      completedSteps,
      startupName || 'My Startup',
      selectedFocus || 'validate'
    )

    if (startupName) {
      const currentUser = useStore.getState().user
      if (currentUser) {
        setUser({ ...currentUser, name: currentUser.name, email: currentUser.email })
      }
    }

    onComplete()
  }

  const canProceed = () => {
    if (step === 1) return startupStatus !== null
    if (step === 2 && startupStatus === 'new') return startupName.trim().length > 0
    if (step === 2 && startupStatus === 'existing') return startupName.trim().length > 0
    if (step === 3 && startupStatus === 'existing') return selectedStage !== null
    if (step === 3 && startupStatus === 'new') return selectedFocus !== null
    if (step === 4) return selectedFocus !== null
    return false
  }

  const getNextAction = () => {
    if (startupStatus === 'new') {
      if (selectedFocus === 'validate') return { title: 'Start validating your idea', description: 'Head to The Idea Lab to describe your vision and get AI feedback.' }
      if (selectedFocus === 'build') return { title: 'Start building your MVP', description: 'Check the Code Factory for ready-to-use prompts and templates.' }
      if (selectedFocus === 'launch') return { title: 'Prepare for launch', description: 'Visit the Deployment Hub to get your app live.' }
      if (selectedFocus === 'funding') return { title: 'Explore funding options', description: 'Browse the Funding Vault for grants and pitch templates.' }
    }
    if (selectedStage === 'ideation') return { title: 'Validate your problem', description: 'Head to The Idea Lab to analyze your idea with AI.' }
    if (selectedStage === 'design') return { title: 'Design your product', description: 'Check the Design Blueprint for prompts and tools.' }
    if (selectedStage === 'development') return { title: 'Start coding', description: 'Visit the Code Factory for battle-tested code templates.' }
    if (selectedStage === 'launch') return { title: 'Deploy your app', description: 'Head to the Deployment Hub for a step-by-step launch guide.' }
    if (selectedStage === 'growth') return { title: 'Grow your users', description: 'Check Marketing Hustle for launch strategies and channels.' }
    return { title: 'Welcome to HORIZON', description: 'Let\'s start building something amazing.' }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-md" />

      {/* Content */}
      <motion.div
        {...FADE_VARIANTS}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg"
      >
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Rocket size={18} className="text-accent-highlight" />
              <span className="text-sm font-medium text-white">Setup</span>
            </div>
            <span className="text-xs text-accent-primary-dark">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary to-accent-highlight rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: New or Existing */}
          {step === 1 && (
            <motion.div
              key="step-1"
              {...FADE_VARIANTS}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-highlight flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={28} className="text-dark-900" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to HORIZON</h2>
                <p className="text-accent-primary-dark">Let's personalize your experience</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setStartupStatus('new')}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 ${
                    startupStatus === 'new'
                      ? 'bg-accent-primary/10 border-accent-primary/40 shadow-lg shadow-accent-primary/5'
                      : 'bg-dark-800/50 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      startupStatus === 'new' ? 'bg-accent-primary/20' : 'bg-dark-600'
                    }`}>
                      <Rocket size={20} className={startupStatus === 'new' ? 'text-accent-highlight' : 'text-accent-primary-dark'} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Starting a new startup</h3>
                      <p className="text-sm text-accent-primary-dark">I have an idea and need help getting started</p>
                    </div>
                    {startupStatus === 'new' && (
                      <CheckCircle2 size={20} className="text-accent-highlight ml-auto" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setStartupStatus('existing')}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 ${
                    startupStatus === 'existing'
                      ? 'bg-accent-primary/10 border-accent-primary/40 shadow-lg shadow-accent-primary/5'
                      : 'bg-dark-800/50 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      startupStatus === 'existing' ? 'bg-accent-primary/20' : 'bg-dark-600'
                    }`}>
                      <TrendingUp size={20} className={startupStatus === 'existing' ? 'text-accent-highlight' : 'text-accent-primary-dark'} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Already have a startup</h3>
                      <p className="text-sm text-accent-primary-dark">I've started building and need guidance</p>
                    </div>
                    {startupStatus === 'existing' && (
                      <CheckCircle2 size={20} className="text-accent-highlight ml-auto" />
                    )}
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Startup Name */}
          {(step === 2 && (startupStatus === 'new' || startupStatus === 'existing')) && (
            <motion.div
              key="step-2"
              {...FADE_VARIANTS}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {startupStatus === 'new' ? 'Name your startup' : 'What\'s your startup called?'}
                </h2>
                <p className="text-accent-primary-dark">
                  {startupStatus === 'new'
                    ? 'Give your idea a name — even a working title helps'
                    : 'We\'ll personalize your dashboard based on your answers'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-primary-light mb-2">
                  Startup Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. StudyBuddy, CampusCart, CodeMentor"
                  className="input-field text-lg"
                  autoFocus
                />
              </div>

              {startupStatus === 'new' && (
                <div>
                  <label className="block text-sm font-medium text-accent-primary-light mb-2">
                    One-line description <span className="text-accent-primary-dark">(optional)</span>
                  </label>
                  <textarea
                    value={startupDescription}
                    onChange={(e) => setStartupDescription(e.target.value)}
                    placeholder="e.g. AI-powered study planner that matches students by learning style"
                    className="input-field h-24 resize-none"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3 (existing only): Select Stage */}
          {step === 3 && startupStatus === 'existing' && (
            <motion.div
              key="step-3"
              {...FADE_VARIANTS}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">What stage are you in?</h2>
                <p className="text-accent-primary-dark">Select where you currently are in your journey</p>
              </div>

              <div className="space-y-2.5">
                {STAGES.map((stage) => {
                  const Icon = stage.icon
                  const isSelected = selectedStage === stage.id
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? `bg-gradient-to-r ${stage.color} ${stage.borderColor} shadow-lg`
                          : 'bg-dark-800/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-white/10' : 'bg-dark-600'
                        }`}>
                          <Icon size={18} className={isSelected ? 'text-white' : 'text-accent-primary-dark'} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${isSelected ? 'text-white' : 'text-accent-primary-light'}`}>
                            {stage.label}
                          </h4>
                          <p className="text-xs text-accent-primary-dark">{stage.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-accent-highlight" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3/4: Focus Area */}
          {((step === 3 && startupStatus === 'new') || (step === 4 && startupStatus === 'existing')) && (
            <motion.div
              key="step-focus"
              {...FADE_VARIANTS}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">What's your top priority right now?</h2>
                <p className="text-accent-primary-dark">We'll highlight the most relevant tools for you</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {FOCUS_OPTIONS.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedFocus === option.id
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedFocus(option.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-accent-primary/10 border-accent-primary/40 shadow-lg shadow-accent-primary/5'
                          : 'bg-dark-800/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <Icon size={20} className={isSelected ? 'text-accent-highlight mb-2' : 'text-accent-primary-dark mb-2'} />
                      <h4 className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-accent-primary-light'}`}>
                        {option.label}
                      </h4>
                      <p className="text-xs text-accent-primary-dark mt-0.5">{option.desc}</p>
                    </button>
                  )
                })}
              </div>

              {/* Preview of next action */}
              {selectedFocus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-dark-800/80 border border-white/5"
                >
                  <p className="text-xs text-accent-primary-dark mb-1">Your next action will be:</p>
                  <p className="text-sm font-medium text-white">{getNextAction().title}</p>
                  <p className="text-xs text-accent-primary-dark mt-0.5">{getNextAction().description}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-accent-primary-dark hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              if (step < totalSteps) setStep(step + 1)
              else handleFinish()
            }}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-dark-900 font-semibold text-sm hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
            {step === totalSteps ? <Rocket size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
