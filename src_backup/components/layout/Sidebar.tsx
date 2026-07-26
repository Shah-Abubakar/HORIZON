'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/store/store'
import {
  Home,
  Lightbulb,
  Brush,
  Terminal,
  Cloud,
  Megaphone,
  Wallet,
  Users,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'The Idea Lab', href: '/ideation', icon: Lightbulb },
  { name: 'Design Blueprint', href: '/design', icon: Brush },
  { name: 'Code Factory', href: '/code-factory', icon: Terminal },
  { name: 'Deployment Hub', href: '/deployment', icon: Cloud },
  { name: 'Marketing Hustle', href: '/marketing', icon: Megaphone },
  { name: 'Funding Vault', href: '/funding', icon: Wallet },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'AI Tool Dictionary', href: '/ai-tools', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, user } = useStore()

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass border-t border-white/5">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-accent-highlight' : 'text-accent-primary-dark'
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 glass border-r border-white/5"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-primary to-accent-highlight flex items-center justify-center flex-shrink-0">
            <Rocket size={18} className="text-dark-900" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold gradient-text whitespace-nowrap"
              >
                HORIZON
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-accent-primary/10 text-accent-highlight'
                    : 'text-accent-primary-dark hover:text-accent-primary-light hover:bg-white/3'
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-highlight flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-dark-900">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0"
                >
                  <p className="text-sm font-medium text-accent-primary-light truncate">{user?.name}</p>
                  <p className="text-xs text-accent-primary-dark truncate">{user?.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-dark-600 border border-white/10 flex items-center justify-center text-accent-primary-dark hover:text-accent-highlight transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>
    </>
  )
}
