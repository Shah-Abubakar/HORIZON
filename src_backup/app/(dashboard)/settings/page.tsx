'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Bell, Shield, LogOut, RotateCcw } from 'lucide-react'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signOut as firebaseSignOut } from 'firebase/auth'

export default function SettingsPage() {
  const { user, logout, resetOnboarding } = useStore()
  const router = useRouter()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth)
      localStorage.removeItem('smartups_user')
      logout()
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleResetOnboarding = () => {
    resetOnboarding()
    router.push('/dashboard')
    window.location.reload()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center">
            <Settings size={20} className="text-accent-highlight" />
          </div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-accent-primary-dark mb-8 ml-[52px]">
          Manage your account preferences
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={18} className="text-accent-highlight" />
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-accent-primary-dark mb-1">Name</label>
            <input
              type="text"
              defaultValue={user?.name || ''}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-accent-primary-dark mb-1">Email</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="input-field"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm text-accent-primary-dark mb-1">University</label>
            <input
              type="text"
              defaultValue={user?.university || ''}
              className="input-field"
              placeholder="e.g. IIT Delhi"
            />
          </div>
          <div>
            <label className="block text-sm text-accent-primary-dark mb-1">Major</label>
            <input
              type="text"
              defaultValue={user?.major || ''}
              className="input-field"
              placeholder="e.g. Computer Science"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell size={18} className="text-accent-highlight" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-accent-primary-light">Email Notifications</p>
              <p className="text-xs text-accent-primary-dark">Receive updates via email</p>
            </div>
            <button
              onClick={() => setEmailNotifs(!emailNotifs)}
              className={`w-11 h-6 rounded-full transition-colors ${
                emailNotifs ? 'bg-accent-primary' : 'bg-dark-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  emailNotifs ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-accent-primary-light">Push Notifications</p>
              <p className="text-xs text-accent-primary-dark">Browser push notifications</p>
            </div>
            <button
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`w-11 h-6 rounded-full transition-colors ${
                pushNotifs ? 'bg-accent-primary' : 'bg-dark-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  pushNotifs ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-accent-primary-light">Weekly Digest</p>
              <p className="text-xs text-accent-primary-dark">Summary of your progress every Monday</p>
            </div>
            <button
              onClick={() => setWeeklyDigest(!weeklyDigest)}
              className={`w-11 h-6 rounded-full transition-colors ${
                weeklyDigest ? 'bg-accent-primary' : 'bg-dark-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  weeklyDigest ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Reset Onboarding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <RotateCcw size={18} className="text-accent-highlight" />
          Replay Onboarding
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-accent-primary-light">Reset startup setup</p>
            <p className="text-xs text-accent-primary-dark">Re-answer the onboarding questions to update your progress</p>
          </div>
          <button
            onClick={handleResetOnboarding}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-highlight text-sm hover:bg-accent-primary/20 transition-colors"
          >
            <RotateCcw size={16} />
            Replay
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 border border-red-500/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-red-400" />
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-accent-primary-light">Sign Out</p>
            <p className="text-xs text-accent-primary-dark">Log out of your account</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  )
}
