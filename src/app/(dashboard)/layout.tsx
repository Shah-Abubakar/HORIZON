'use client'

import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/store'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import Sidebar from '@/components/layout/Sidebar'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, login, logout, hasCompletedOnboarding } = useStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in via Firebase
        const storedUser = localStorage.getItem('smartups_user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          login(user.email, '')
        } else {
          login(firebaseUser.email || '', '')
        }
      } else {
        // User is signed out
        logout()
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [login, logout, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <AnimatePresence>
        {!hasCompletedOnboarding && (
          <OnboardingModal onComplete={() => {}} />
        )}
      </AnimatePresence>

      {hasCompletedOnboarding && (
        <>
          <Sidebar />
          <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
            <div className="p-6 lg:p-8">
              {children}
            </div>
          </main>
        </>
      )}
    </div>
  )
}
