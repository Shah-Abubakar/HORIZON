'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  RefreshCw,
  Clock,
  Rocket,
} from 'lucide-react'

interface AnalysisResult {
  score: number
  verdict: string
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  suggestions: string[]
  targetMarket: string
  monetization: string
  competitors: { name: string; difference: string; threat_level?: string }[]
  businessModel: string
  mvpTimeline: string
  estimatedCost: string
  nextSteps: string[]
  keyMetrics: string[]
  pivotSuggestion: string
}

export default function IdeationPage() {
  const [ideaText, setIdeaText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (ideaText.trim().length < 20) {
      setError('Please write at least 20 characters describing your idea')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const res = await fetch('/api/analyze-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: ideaText }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setAnalysis(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setAnalysis(null)
    setIdeaText('')
    setError('')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: '#22c55e', text: 'text-green-400', label: 'Excellent' }
    if (score >= 60) return { stroke: '#a3e635', text: 'text-lime-400', label: 'Good' }
    if (score >= 40) return { stroke: '#facc15', text: 'text-yellow-400', label: 'Decent' }
    if (score >= 20) return { stroke: '#f97316', text: 'text-orange-400', label: 'Weak' }
    return { stroke: '#ef4444', text: 'text-red-400', label: 'Needs Work' }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center">
            <Lightbulb size={20} className="text-accent-highlight" />
          </div>
          <h1 className="text-3xl font-bold text-white">The Idea Lab</h1>
        </div>
        <p className="text-accent-primary-dark mb-8 ml-[52px]">
          Describe your idea and our AI will analyze it, rate it, and suggest improvements
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <label className="block text-sm font-medium text-accent-primary-light mb-3">
          Describe your idea in detail
        </label>
        <textarea
          value={ideaText}
          onChange={(e) => {
            setIdeaText(e.target.value)
            if (error) setError('')
          }}
          placeholder="I am building a platform that helps students find study partners based on their courses and learning style. The problem is that students often struggle to find compatible study groups, and existing solutions don't match based on learning preferences, schedules, or academic goals. My app would use AI to create optimal study group matches..."
          className="input-field h-48 resize-none mb-4"
          disabled={loading}
        />

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleAnalyze}
            disabled={loading || ideaText.trim().length < 20}
            className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing your idea...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze My Idea
              </>
            )}
          </button>

          {analysis && (
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl border border-white/10 text-accent-primary-dark hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
            >
              <RefreshCw size={16} />
              New Idea
            </button>
          )}
        </div>
      </motion.div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Score + Verdict */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="rgba(160, 160, 160, 0.08)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={getScoreColor(analysis.score).stroke}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (analysis.score / 100) * 251.2 }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className={`text-3xl font-bold ${getScoreColor(analysis.score).text}`}
                    >
                      {analysis.score}
                    </motion.span>
                    <span className="text-xs text-accent-primary-dark">
                      {getScoreColor(analysis.score).label}
                    </span>
                  </div>
                </div>

                {/* Verdict */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-white mb-2">AI Verdict</h3>
                  <p className="text-accent-primary-dark leading-relaxed italic">
                    "{analysis.verdict}"
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.strengths.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-accent-primary-dark"
                    >
                      <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Weaknesses & Risks</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((w, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-accent-primary-dark"
                    >
                      <span className="text-orange-400 mt-0.5 flex-shrink-0">-</span>
                      {w}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-accent-highlight" />
                <h3 className="text-lg font-semibold text-white">AI Improvement Suggestions</h3>
              </div>
              <div className="space-y-3">
                {analysis.suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-accent-primary/5 border border-white/5"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent-highlight">{i + 1}</span>
                    </div>
                    <p className="text-sm text-accent-primary-dark leading-relaxed">{s}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Target Market + Monetization */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-accent-highlight" />
                  <h3 className="text-lg font-semibold text-white">Target Market</h3>
                </div>
                <p className="text-sm text-accent-primary-dark leading-relaxed">{analysis.targetMarket}</p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-accent-highlight" />
                  <h3 className="text-lg font-semibold text-white">Monetization Ideas</h3>
                </div>
                <p className="text-sm text-accent-primary-dark leading-relaxed whitespace-pre-line">{analysis.monetization}</p>
              </div>
            </div>

            {/* Competitor Insights */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-accent-highlight" />
                <h3 className="text-lg font-semibold text-white">Competitive Landscape</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.competitors.map((comp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="p-4 rounded-xl bg-dark-700/50 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">{comp.name}</h4>
                      {comp.threat_level && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          comp.threat_level === 'high' ? 'bg-red-500/15 text-red-400' :
                          comp.threat_level === 'medium' ? 'bg-yellow-500/15 text-yellow-400' :
                          'bg-green-500/15 text-green-400'
                        }`}>
                          {comp.threat_level} threat
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-accent-primary-dark">
                      <span className="text-accent-highlight">Your edge:</span> {comp.difference}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Opportunities & Threats */}
            <div className="grid md:grid-cols-2 gap-6">
              {analysis.opportunities && analysis.opportunities.length > 0 && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Opportunities</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.opportunities.map((o, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-accent-primary-dark"
                      >
                        <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>
                        {o}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.threats && analysis.threats.length > 0 && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={18} className="text-red-400" />
                    <h3 className="text-lg font-semibold text-white">Threats</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.threats.map((t, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-accent-primary-dark"
                      >
                        <span className="text-red-400 mt-0.5 flex-shrink-0">!</span>
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Business Model + MVP Timeline + Cost */}
            <div className="grid md:grid-cols-3 gap-6">
              {analysis.businessModel && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Rocket size={18} className="text-accent-highlight" />
                    <h3 className="text-lg font-semibold text-white">Business Model</h3>
                  </div>
                  <p className="text-sm text-accent-primary-dark leading-relaxed">{analysis.businessModel}</p>
                </div>
              )}
              {analysis.mvpTimeline && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={18} className="text-accent-highlight" />
                    <h3 className="text-lg font-semibold text-white">MVP Timeline</h3>
                  </div>
                  <p className="text-sm text-accent-primary-dark leading-relaxed">{analysis.mvpTimeline}</p>
                </div>
              )}
              {analysis.estimatedCost && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={18} className="text-accent-highlight" />
                    <h3 className="text-lg font-semibold text-white">Est. Monthly Cost</h3>
                  </div>
                  <p className="text-sm text-accent-primary-dark leading-relaxed">{analysis.estimatedCost}</p>
                </div>
              )}
            </div>

            {/* Key Metrics */}
            {analysis.keyMetrics && analysis.keyMetrics.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-accent-highlight" />
                  <h3 className="text-lg font-semibold text-white">Key Metrics to Track</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyMetrics.map((metric, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.05 }}
                      className="px-3 py-1.5 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-sm text-accent-highlight"
                    >
                      {metric}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Pivot Suggestion */}
            {analysis.pivotSuggestion && (
              <div className="glass-card rounded-2xl p-6 border-l-4 border-l-purple-500/50">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw size={18} className="text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Pivot Consideration</h3>
                </div>
                <p className="text-sm text-accent-primary-dark leading-relaxed">{analysis.pivotSuggestion}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-accent-primary">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-accent-highlight" />
                <h3 className="text-lg font-semibold text-white">Your Next Steps</h3>
              </div>
              <div className="space-y-3">
                {analysis.nextSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={14} className="text-accent-highlight" />
                    </div>
                    <p className="text-sm text-accent-primary-dark leading-relaxed pt-0.5">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
