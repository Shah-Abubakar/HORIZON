import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  university: string
  major: string
  photoURL?: string
}

interface Phase {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
}

interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  signup: (name: string, email: string, password: string) => void
  logout: () => void
  setUser: (user: User) => void
  
  // Onboarding
  hasCompletedOnboarding: boolean
  startupName: string
  startupDescription: string
  startupStatus: 'new' | 'existing' | null
  focusArea: string | null
  completeOnboarding: (
    phases: Phase[],
    completedSteps: string[],
    startupName: string,
    focusArea: string
  ) => void
  resetOnboarding: () => void
  
  // Progress
  currentPhase: string
  completedSteps: string[]
  phases: Phase[]
  setCurrentPhase: (phase: string) => void
  toggleStep: (stepId: string) => void
  
  // UI
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  currentPage: string
  setCurrentPage: (page: string) => void
  
  // Idea Lab
  ideaText: string
  setIdeaText: (text: string) => void
  validationScore: number | null
  analyzeIdea: () => void
  
  // Deployment Quiz
  deploymentAnswers: Record<number, string>
  setDeploymentAnswer: (questionId: number, answer: string) => void
  deploymentRecommendation: { platform: string; reason: string } | null
  generateRecommendation: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        // Firebase auth handles actual login
        // This is called after successful Firebase sign-in
        const storedUser = localStorage.getItem('smartups_user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          set({
            isAuthenticated: true,
            user: {
              id: user.uid || '1',
              name: user.name || email.split('@')[0],
              email: user.email || email,
              university: user.university || '',
              major: user.major || '',
              photoURL: user.photoURL,
            },
          })
        } else {
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              name: email.split('@')[0],
              email,
              university: '',
              major: '',
            },
          })
        }
      },
      signup: (name: string, email: string, _password: string) => {
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name,
            email,
            university: '',
            major: '',
          },
        })
      },
      logout: () => {
        localStorage.removeItem('smartups_user')
        set({ isAuthenticated: false, user: null })
      },
      setUser: (user: User) => {
        set({ user })
      },

      // Onboarding
      hasCompletedOnboarding: false,
      startupName: '',
      startupDescription: '',
      startupStatus: null,
      focusArea: null,
      completeOnboarding: (phases, completedSteps, startupName, focusArea) => {
        set({
          hasCompletedOnboarding: true,
          phases,
          completedSteps,
          startupName,
          focusArea,
          currentPhase: phases.find(p => p.status === 'in-progress')?.id || 'ideation',
        })
      },
      resetOnboarding: () => {
        set({
          hasCompletedOnboarding: false,
          startupName: '',
          startupDescription: '',
          startupStatus: null,
          focusArea: null,
          phases: [],
          completedSteps: [],
          currentPhase: 'ideation',
        })
      },

      // Progress
      currentPhase: 'ideation',
      completedSteps: ['step-1', 'step-2', 'step-3'],
      phases: [],
      setCurrentPhase: (phase) => set({ currentPhase: phase }),
      toggleStep: (stepId) => {
        const completed = get().completedSteps
        if (completed.includes(stepId)) {
          set({ completedSteps: completed.filter(id => id !== stepId) })
        } else {
          set({ completedSteps: [...completed, stepId] })
        }
      },
      
      // UI
      sidebarCollapsed: false,
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
      currentPage: 'overview',
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Idea Lab
      ideaText: '',
      setIdeaText: (text) => set({ ideaText: text }),
      validationScore: null,
      analyzeIdea: () => {
        const score = Math.floor(Math.random() * 30) + 60
        set({ validationScore: score })
      },
      
      // Deployment Quiz
      deploymentAnswers: {},
      setDeploymentAnswer: (questionId, answer) => {
        set({
          deploymentAnswers: { ...get().deploymentAnswers, [questionId]: answer },
        })
      },
      deploymentRecommendation: null,
      generateRecommendation: () => {
        const answers = get().deploymentAnswers
        const recommendation = {
          platform: 'Vercel',
          reason: 'Generous free tier, instant deployments, perfect for Next.js applications',
        }
        set({ deploymentRecommendation: recommendation })
      },
    }),
    {
      name: 'smartups-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        completedSteps: state.completedSteps,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        startupName: state.startupName,
        startupDescription: state.startupDescription,
        startupStatus: state.startupStatus,
        focusArea: state.focusArea,
        phases: state.phases,
        currentPhase: state.currentPhase,
      }),
    }
  )
)
