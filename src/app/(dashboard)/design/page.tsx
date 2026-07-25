'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brush,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  X,
  ChevronRight,
  Rocket,
  Wallet,
} from 'lucide-react'

// ── Brand logos ─────────────────────────────────────────────
const BrandLogo = ({ children, size = 20, className = 'text-accent-highlight' }: { children: React.ReactNode; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>{children}</svg>
)

const LogoHermes = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M12 4v16M8 8l8 8M8 16l8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></BrandLogo>
)
const LogoOpenDesign = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 7v10M7 9.5l5 3 5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoOpenCode = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 10l3 2-3 2M13 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoGithub = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></BrandLogo>
)
const LogoClaude = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M4 20L12 4l8 16H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></BrandLogo>
)
const LogoChatGPT = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></BrandLogo>
)
const LogoGemini = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></BrandLogo>
)
const LogoReplit = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="6" y="3" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="6" y="14" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 10v4" stroke="currentColor" strokeWidth="1.5"/></BrandLogo>
)
const LogoHuggingFace = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 14c0 2.2 1.8 4 4 4s4-1.8 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></BrandLogo>
)
const LogoV0 = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M6 4l12 8-12 8V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></BrandLogo>
)
const LogoBolt = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></BrandLogo>
)
const LogoOllama = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><ellipse cx="12" cy="13" rx="7" ry="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="11" r="1.2" fill="currentColor"/><circle cx="16" cy="11" r="1.2" fill="currentColor"/><path d="M10 17c1 .5 3 .5 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 8c-1-2-1-4 0-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M17 8c1-2 1-4 0-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></BrandLogo>
)
const LogoCursor = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M4 4l16 6-7 3 4 7-4 2-3-6-6 7L4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></BrandLogo>
)
const LogoAntigravity = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6v8M8 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoCodex = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 10l3 2-3 2M16 10l-3 2 3 2M12 8l-1 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoWindsurf = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M3 18c3-6 6-6 9 0s6-6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></BrandLogo>
)
const LogoDeepSeek = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></BrandLogo>
)
const LogoAPI = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><path d="M4 8l4 4-4 4M20 8l-4 4 4 4M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoTabnine = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 15V9l6 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></BrandLogo>
)
const LogoOpenRouter = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 7.5l3.5 3M15.5 7.5l-3.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></BrandLogo>
)
const LogoGroq = (p: { size?: number; className?: string }) => (
  <BrandLogo {...p}><rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9h4M10 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></BrandLogo>
)

type Method = {
  icon: React.ElementType
  name: string
  description: string
  cost: string
  costLabel: string
  speed: 'Fast' | 'Medium' | 'Slow'
  bestFor: string
  strength: string
  steps: string[]
}

const freeMethods: Method[] = [
  {
    icon: LogoHermes,
    name: 'Hermes AI',
    description: 'Open-source AI coding assistant by Nous Research. Runs locally or via free API. Great for small to medium projects with full privacy.',
    cost: 'Free',
    costLabel: 'Free (open-source)',
    speed: 'Slow',
    bestFor: 'Open-source projects and private codebases',
    strength: 'Complete privacy, runs locally',
    steps: [
      'Visit Nous Research Hermes page and choose your deployment method — local (Ollama, LM Studio) or cloud (Together AI, OpenRouter).',
      'Install Ollama on your machine and pull the Hermes model: "ollama pull hermes-3-llama-3.1-8b" for a good balance of speed and quality.',
      'Set up your editor: install Continue.dev extension for VS Code and configure it to use Hermes as the AI provider with your local Ollama endpoint.',
      'Start with small tasks — code completion, refactoring, and bug fixes. Hermes excels at understanding existing code patterns.',
      'For web apps, use Hermes with frameworks you already know. Ask it to generate components, API routes, and database schemas.',
      'Scale up to larger projects by using the 70B model via Together AI or a cloud provider. The quality rivals paid models for most tasks.',
    ],
  },
  {
    icon: LogoOpenDesign,
    name: 'Open Design',
    description: 'Free AI-powered design-to-code platform. Describe your app idea in plain language and get real, deployable code with modern UI.',
    cost: 'Free',
    costLabel: 'Free',
    speed: 'Medium',
    bestFor: 'Rapid prototyping and design exploration',
    strength: 'Design-to-code in one step',
    steps: [
      'Go to the Open Design platform and create a new project. Choose your app type — web app, mobile, dashboard, or landing page.',
      'Describe your app in natural language: "I want a habit tracking app with streaks, daily logs, and a calendar view." The more detail, the better the output.',
      'Review the generated design and code. Use the built-in editor to tweak colors, layout, and content without writing CSS.',
      'Iterate by giving feedback: "Make the header sticky, add a dark mode toggle, and change the accent to green." The AI updates the code instantly.',
      'Export the code as a complete project with proper file structure, ready to deploy or continue developing.',
      'Use Open Design for the first draft of every new feature or screen — it saves hours of boilerplate UI work.',
    ],
  },
  {
    icon: LogoOpenCode,
    name: 'OpenCode',
    description: 'Free AI-powered CLI tool that turns natural language into production-ready code. Works directly in your terminal with any project.',
    cost: 'Free',
    costLabel: 'Free (open-source)',
    speed: 'Medium',
    bestFor: 'Terminal-first developers and automation',
    strength: 'CLI-native, works with any codebase',
    steps: [
      'Install OpenCode globally via npm: "npm install -g opencode". Ensure you have Node.js 18+ installed.',
      'Navigate to your project directory and run "opencode" to start the interactive session in your terminal.',
      'Describe what you want to build: "Create a REST API with Express, PostgreSQL, and JWT authentication with user CRUD endpoints."',
      'Review the generated code file by file. OpenCode creates complete files with proper structure, imports, and error handling.',
      'Use the /edit command to modify existing code: "Add input validation and rate limiting to all API routes."',
      'Commit and deploy directly from the terminal. OpenCode respects your existing project structure and coding conventions.',
    ],
  },
  {
    icon: LogoGithub,
    name: 'GitHub Copilot Free',
    description: 'AI pair programmer from GitHub. Free for verified students, teachers, and open-source maintainers. Code completion and chat in IDE.',
    cost: 'Free',
    costLabel: 'Free (for students & maintainers)',
    speed: 'Fast',
    bestFor: 'Students and open-source contributors',
    strength: 'Industry-standard code completion',
    steps: [
      'Verify your eligibility: GitHub Copilot Free is available to verified students, teachers, and open-source maintainers through GitHub Education.',
      'Install the Copilot extension in VS Code, JetBrains, or Neovim. Sign in with your GitHub account.',
      'Start typing code and Copilot will suggest completions in real-time. Tab to accept, Ctrl+Enter to see alternative suggestions.',
      'Use Copilot Chat (Ctrl+Shift+I) for natural language questions: "Explain this function", "Write a test for this component", "Find the bug in this code."',
      'For new projects, describe what you want in a comment and let Copilot generate the implementation: "// Create a React hook that fetches and caches user data."',
      'Review every suggestion carefully. Copilot is a powerful accelerator but still needs human oversight for security and correctness.',
    ],
  },
  {
    icon: LogoClaude,
    name: 'Claude Free Tier',
    description: 'Free access to Claude AI by Anthropic. Powerful for architectural planning, code generation, app design discussions, and debugging.',
    cost: 'Free',
    costLabel: 'Free (limited messages)',
    speed: 'Medium',
    bestFor: 'Architecture planning and code review',
    strength: 'Excellent at system design and reasoning',
    steps: [
      'Go to claude.ai and create a free account. No credit card needed for the free tier.',
      'Start a conversation about your app idea: "I want to build a marketplace app. Help me design the database schema, API structure, and frontend components."',
      'Use Claude to generate complete files: "Write a Next.js API route for user authentication with JWT and refresh tokens." Copy the code directly.',
      'Leverage Claudes strong reasoning for architecture decisions: "Compare Server Components vs Client Components for a real-time dashboard."',
      'Upload existing code files (up to 3 per conversation) and ask Claude to review, refactor, or extend them.',
      'For complex projects, break your app into parts and generate them one conversation at a time. Combine the outputs in your project.',
    ],
  },
  {
    icon: LogoChatGPT,
    name: 'ChatGPT Free',
    description: 'Free access to GPT-4o-mini and GPT-4o (limited). Versatile for generating boilerplate, debugging, and learning new frameworks.',
    cost: 'Free',
    costLabel: 'Free (GPT-4o-mini)',
    speed: 'Fast',
    bestFor: 'Quick prototyping and boilerplate generation',
    strength: 'Fast responses, broad knowledge base',
    steps: [
      'Visit chat.openai.com and sign up for a free account. You get access to GPT-4o-mini with a daily message limit.',
      'Generate full project files: "Create a complete HTML/CSS/JS landing page for a SaaS product. Make it responsive with a hero, features section, and footer."',
      'Use ChatGPT for debugging: paste your error message and code, and ask it to find and fix the issue.',
      'Learn new frameworks by asking: "Explain React Server Components with a practical example. Show me the file structure and data flow."',
      'Generate boilerplate code for repeated patterns: authentication, CRUD operations, payment integration, email templates.',
      'When you hit the free tier limit, continue with GPT-4o-mini or switch to the API for more capacity.',
    ],
  },
  {
    icon: LogoGemini,
    name: 'Google Gemini Free',
    description: 'Free access to Googles most capable AI model. Strong on code generation with 1M token context window for large codebases.',
    cost: 'Free',
    costLabel: 'Free',
    speed: 'Fast',
    bestFor: 'Large codebase analysis and generation',
    strength: '1M token context window',
    steps: [
      'Go to gemini.google.com and sign in with your Google account. No credit card required.',
      'Start generating code: "Build a full-stack todo app with React frontend, Node.js backend, and MongoDB. Include user authentication and drag-and-drop."',
      'Use the massive 1M token context to upload your entire codebase or documentation and ask Gemini to analyze, refactor, or extend it.',
      'Leverage Gemini for Google Cloud integration: "Write a Cloud Function that processes uploaded images and stores thumbnails in Cloud Storage."',
      'Generate and test code iteratively — paste the output back when you hit errors and ask Gemini to debug.',
      'Export the generated code and organize it into your project structure. Gemini excels at producing complete, runnable files.',
    ],
  },
  {
    icon: LogoReplit,
    name: 'Replit Free Tier',
    description: 'Online IDE with built-in AI. Free tier includes basic AI assistance for building and deploying apps directly in the browser.',
    cost: 'Free',
    costLabel: 'Free (basic AI)',
    speed: 'Medium',
    bestFor: 'Quick prototypes and collaborative coding',
    strength: 'Browser-based, no setup needed',
    steps: [
      'Go to replit.com and create a free account. Choose a template or start from scratch with popular frameworks.',
      'Use the built-in AI assistant (Ctrl+K) to generate code: "Create a weather app that fetches from OpenWeatherMap API and shows a 7-day forecast."',
      'Deploy instantly with one click — Replit hosts your app on a free subdomain. Share the URL to get feedback immediately.',
      'Collaborate in real-time with your team. Multiple people can edit the same Repl simultaneously with AI assistance for everyone.',
      'Use Replit Databases for simple data storage, Secrets for environment variables, and the built-in package manager.',
      'For serious development, upgrade to Replit Core ($25/mo) for faster compute, private Repls, and more powerful AI.',
    ],
  },
  {
    icon: LogoHuggingFace,
    name: 'Hugging Face Models',
    description: 'Free access to thousands of open-source AI models. Use CodeLlama, StarCoder, DeepSeek Coder for building apps without paying.',
    cost: 'Free',
    costLabel: 'Free (open-source)',
    speed: 'Slow',
    bestFor: 'Custom AI features and open-source development',
    strength: 'Unlimited free model inference',
    steps: [
      'Sign up at huggingface.co and explore the model hub. Filter by "Code" to find coding-specific models like CodeLlama, StarCoder, and DeepSeek Coder.',
      'Use the free Inference API: send HTTP requests to hosted models without any infrastructure. Rate-limited but completely free.',
      'Set up in your project: install the "huggingface-hub" Python package or use the JS client for Node.js applications.',
      'Fine-tune models for your specific use case using free GPU credits. Hugging Face provides free training infrastructure for open-source projects.',
      'Deploy your own model endpoint using Hugging Face Spaces with a free CPU/GPU instance. Perfect for custom AI features in your app.',
      'Join the community and leverage existing Spaces — many are fully functional apps you can fork, customize, and deploy for your needs.',
    ],
  },
  {
    icon: LogoV0,
    name: 'V0 by Vercel Free',
    description: 'AI-powered UI generation by Vercel. Free tier lets you generate React components and pages from text prompts.',
    cost: 'Free',
    costLabel: 'Free (limited generations)',
    speed: 'Fast',
    bestFor: 'React UI component generation',
    strength: 'Production-quality React components',
    steps: [
      'Go to v0.dev and sign in with your GitHub account. The free tier includes a limited number of generations per month.',
      'Describe the UI you need: "A pricing table with 3 tiers, each with features list, CTA button, and a popular badge on the middle tier."',
      'V0 generates complete, production-ready React code with Tailwind CSS. Copy the code directly into your Next.js or React project.',
      'Iterate with follow-up prompts: "Make the popular tier blue instead of purple, increase padding, and add hover effects on the buttons."',
      'Combine multiple V0 generations to build complete pages — one prompt for the header, one for the hero, one for the features section.',
      'When you exceed the free tier limit, consider the Pro plan ($20/mo) for unlimited generations and private sharing.',
    ],
  },
  {
    icon: LogoBolt,
    name: 'Bolt.new Free',
    description: 'AI full-stack web app generator. Free tier lets you build and deploy complete applications from a single prompt in your browser.',
    cost: 'Free',
    costLabel: 'Free (limited)',
    speed: 'Fast',
    bestFor: 'Full-stack app generation from scratch',
    strength: 'One-prompt full-stack generation',
    steps: [
      'Go to bolt.new and describe your app: "Build a project management tool with kanban boards, team chat, file sharing, and user authentication."',
      'Bolt generates the entire application — frontend, backend, database schema, and API routes — in about 30 seconds.',
      'Review the generated code in the built-in editor. You can see every file, make changes, and see the live preview update in real-time.',
      'Continue iterating: "Add a calendar view, notification system, and dark mode." Bolt updates the entire codebase to accommodate new features.',
      'Deploy with one click — Bolt.new provides a live URL you can share with users and stakeholders.',
      'For larger projects with more generations, upgrade to Bolt.new Pro ($20/mo) for higher limits and priority processing.',
    ],
  },
  {
    icon: LogoOllama,
    name: 'Ollama + Local LLMs',
    description: 'Run AI models completely free on your own hardware. CodeLlama, DeepSeek, Mistral, and Llama 3 run locally with full privacy.',
    cost: 'Free',
    costLabel: 'Free (your hardware)',
    speed: 'Slow',
    bestFor: 'Privacy-sensitive and offline development',
    strength: '100% private, works offline',
    steps: [
      'Download and install Ollama from ollama.ai. It runs on macOS, Linux, and Windows with a simple installer.',
      'Pull your first model: "ollama pull codellama:7b" for code generation, or "ollama pull llama3.1:8b" for general-purpose coding assistance.',
      'Integrate with your editor using Continue.dev or Ollama built-in integrations. Configure it to use your local model as the AI provider.',
      'Start with the 7B parameter models for faster responses on consumer hardware. They handle most coding tasks well.',
      'For better quality, use 13B or 70B models if you have sufficient RAM (16GB+ for 13B, 48GB+ for 70B).',
      'Build custom AI features into your apps using Ollamas API — it exposes a local REST API that any application can call.',
    ],
  },
]

const paidMethods: Method[] = [
  {
    icon: LogoCursor,
    name: 'Cursor AI',
    description: 'The most popular AI-native IDE. Superfast code generation with deep codebase understanding. Tab to accept, Ctrl+K to edit, chat with context.',
    cost: '$20',
    costLabel: '$20/mo (Pro)',
    speed: 'Fast',
    bestFor: 'Production-grade app development',
    strength: 'Best-in-class codebase context awareness',
    steps: [
      'Download Cursor from cursor.com and install it. It is a fork of VS Code so you can import all your extensions and settings.',
      'Open your project and let Cursor index your entire codebase. This takes a few minutes but gives the AI full context about your project.',
      'Use Ctrl+K for inline editing: highlight code and describe the change — "Add error handling", "Convert to TypeScript", "Optimize this query."',
      'Use Ctrl+L for chat with your entire codebase as context. Ask questions like "Where is the authentication logic?" or "How does the payment flow work?"',
      'Use the Composer (Ctrl+I) for multi-file changes: "Add a dark mode toggle that persists to localStorage and updates all component styles."',
      'Chat with specific files, folders, or documentation. Cursor supports @docs to include external documentation as context for more accurate code.',
    ],
  },
  {
    icon: LogoClaude,
    name: 'Claude Code',
    description: 'Anthropics terminal-native AI coding agent. Handles complex multi-file edits, shell commands, and git operations through natural language.',
    cost: '$20',
    costLabel: '$20/mo (Claude Pro)',
    speed: 'Fast',
    bestFor: 'Complex multi-file refactoring and architecture',
    strength: 'Multi-file edits and autonomous task completion',
    steps: [
      'Install Claude Code: "npm install -g @anthropic-ai/claude-code" and authenticate with your Anthropic account.',
      'Navigate to your project and run "claude" in the terminal. Describe what you want to build at a high level.',
      'Claude Code reads your entire project structure, understands the tech stack, and generates complete features across multiple files.',
      'Use slash commands: /add for new features, /fix for bug fixes, /test for generating tests, /explain for code understanding.',
      'For major features, describe the architecture first: "Add a subscription billing system with Stripe, webhook handling, and a billing dashboard page."',
      'Review every change using git diff before committing. Claude Code creates a git checkpoint before making changes so you can roll back easily.',
    ],
  },
  {
    icon: LogoAntigravity,
    name: 'Antigravity',
    description: 'Next-gen AI development platform. Generates complete, production-ready applications from high-level descriptions with built-in hosting.',
    cost: '$29',
    costLabel: '$29/mo (Starter)',
    speed: 'Fast',
    bestFor: 'Full-stack app generation with hosting',
    strength: 'End-to-end from idea to deployed app',
    steps: [
      'Go to antigravity.ai and sign up. Describe your app idea in a few sentences — "A marketplace for freelance designers with escrow payments."',
      'Antigravity generates the complete application with frontend, backend, database, authentication, and deployment configuration.',
      'Review the generated architecture: you can see the database schema, API routes, component tree, and data flow before diving into code.',
      'Use the built-in visual editor to tweak the UI without writing CSS. Change colors, layout, and content through a point-and-click interface.',
      'Deploy with one click to Antigravitys hosting. It handles SSL, scaling, and monitoring out of the box.',
      'Iterate by adding new features: "Add a review system, messaging between clients and freelancers, and an admin dashboard." Antigravity updates everything.',
    ],
  },
  {
    icon: LogoCodex,
    name: 'Codex CLI (OpenAI)',
    description: 'OpenAIs terminal-based coding agent. Generates, tests, and iterates on code autonomously. Uses GPT-4 and o-series models for deep reasoning.',
    cost: '$20',
    costLabel: '$20/mo (ChatGPT Plus)',
    speed: 'Fast',
    bestFor: 'Complex logic and algorithmic development',
    strength: 'Deep reasoning for complex problems',
    steps: [
      'Access Codex via ChatGPT Plus or the OpenAI API. Install the Codex CLI tool: "pip install openai-codex" or use the web interface.',
      'Describe your project: "Build a real-time collaborative document editor with operational transform, user presence, and markdown support."',
      'Codex generates the complete implementation with proper algorithms, data structures, and handling of edge cases.',
      'Test the generated code with Codexs built-in test runner. It writes and runs tests automatically to verify correctness.',
      'Iterate on the output: "Make it more performant by using a Web Worker for the OT calculations", "Add keyboard shortcuts like Notion."',
      'For production use, review and refactor the generated code. Codex produces correct code but may not follow your specific coding conventions.',
    ],
  },
  {
    icon: LogoGithub,
    name: 'GitHub Copilot Pro',
    description: 'Full-powered AI pair programming across all languages and IDEs. Unlimited completions, chat, and agents for pull request review.',
    cost: '$10',
    costLabel: '$10/mo (Pro)',
    speed: 'Fast',
    bestFor: 'Daily development acceleration',
    strength: 'Seamless IDE integration, PR reviews',
    steps: [
      'Upgrade from the free tier at github.com/settings/copilot. The Pro tier unlocks unlimited completions and all features.',
      'Install the Copilot extension in your preferred IDE — VS Code, JetBrains, Neovim, or Visual Studio. Sign in with your GitHub Pro account.',
      'Use Copilot Chat for deep code understanding: highlight a function and ask "What does this do?" or "Write a test for this."',
      'Enable Copilot Agents for multi-file edits: "Create a new REST endpoint for user preferences with validation and database migration."',
      'Use Copilot for pull requests: it automatically reviews your PRs, suggests improvements, catches bugs, and summarizes changes.',
      'Leverage the CLI integration: "gh copilot explain" and "gh copilot suggest" work directly in your terminal for quick questions.',
    ],
  },
  {
    icon: LogoV0,
    name: 'V0 by Vercel Pro',
    description: 'Unlimited UI generation with Vercels AI. Generates production React components with Tailwind, shadcn/ui, and proper accessibility.',
    cost: '$20',
    costLabel: '$20/mo (Pro)',
    speed: 'Fast',
    bestFor: 'React component and page generation',
    strength: 'Production UI with accessibility built-in',
    steps: [
      'Upgrade to V0 Pro at v0.dev for unlimited generations, private sharing, and priority support.',
      'Generate complete pages: "Build an analytics dashboard with a line chart, bar chart, data table with sorting, and date range picker."',
      'Use the shadcn/ui integration — V0 generates components that use your existing design system tokens and conventions.',
      'Share generated UIs privately with your team using V0s sharing feature. Collect feedback before implementing.',
      'Export code directly into your Next.js project with proper file structure. V0 Pro supports project-level exports with routing.',
      'Use V0 for design handoff: generate UI from Figma designs by describing what you see, then implement the generated code.',
    ],
  },
  {
    icon: LogoBolt,
    name: 'Bolt.new Pro',
    description: 'Unlimited full-stack app generation. Faster generation, private projects, larger context, and priority deployment.',
    cost: '$20',
    costLabel: '$20/mo (Pro)',
    speed: 'Fast',
    bestFor: 'Full-stack app development with no limits',
    strength: 'Unlimited generation, private projects',
    steps: [
      'Upgrade at bolt.new to unlock unlimited generations, private projects, and faster processing.',
      'Build larger applications: "Create an e-commerce platform with product catalog, shopping cart, Stripe checkout, order management, and admin panel."',
      'Use private projects for client work or proprietary code. Your prompts and generated code remain confidential.',
      'Get faster generation times with priority processing. Complex apps generate in seconds instead of minutes.',
      'Export complete projects with proper Git history, ready to push to your repository and deploy.',
      'Use the expanded context window for larger prompts — describe entire applications with multiple features in a single prompt.',
    ],
  },
  {
    icon: LogoWindsurf,
    name: 'Windsurf IDE',
    description: 'AI-native IDE by Codeium. Deep contextual understanding of your codebase with automatic AI suggestions and multi-file editing.',
    cost: '$15',
    costLabel: '$15/mo (Pro)',
    speed: 'Fast',
    bestFor: 'Teams and large codebases',
    strength: 'Auto-suggestions without explicit prompts',
    steps: [
      'Download Windsurf from codeium.com and install it. It builds on VS Code with deep AI integration throughout the editor.',
      'Open your project and Windsurf automatically indexes your codebase. It starts suggesting improvements without you asking.',
      'Use the Flow feature for multi-file edits: describe a feature and Windsurf plans and executes changes across your entire project.',
      'Get automatic inline suggestions as you type — Windsurf predicts your next edit and applies it with a single keystroke.',
      'Use the terminal AI: describe shell commands in natural language and Windsurf generates, explains, and executes them.',
      'For teams, use Windsurf Teams ($30/user/mo) for shared context, consistent coding standards across the team, and AI-powered code reviews.',
    ],
  },
  {
    icon: LogoReplit,
    name: 'Replit Core',
    description: 'Upgraded online IDE with powerful AI, faster compute, private Repls, and advanced deployment options for serious development.',
    cost: '$25',
    costLabel: '$25/mo (Core)',
    speed: 'Fast',
    bestFor: 'Browser-based development with AI',
    strength: 'Faster compute and private projects',
    steps: [
      'Upgrade to Replit Core for private Repls, faster machines (4x RAM/CPU), and more powerful AI with larger context.',
      'Build complete apps in the browser with the AI writing code alongside you. The AI understands your entire project context.',
      'Use the Ghostwriter AI for natural language feature generation: "Add WebSocket-based real-time collaboration to this document editor."',
      'Deploy with custom domains and HTTPS. Replit Core supports PostgreSQL databases, cron jobs, and background workers.',
      'Use the expanded storage and bandwidth for larger projects with assets, databases, and multiple environments.',
      'Collaborate in real-time with unlimited team members. Every edit is synced instantly with full version history.',
    ],
  },
  {
    icon: LogoClaude,
    name: 'Claude Max',
    description: 'Anthropics premium tier with the most powerful Claude models. Unlimited usage with priority access for complex, large-scale app development.',
    cost: '$100',
    costLabel: '$100/mo (Max)',
    speed: 'Fast',
    bestFor: 'Large-scale enterprise applications',
    strength: 'Most capable Claude with unlimited usage',
    steps: [
      'Upgrade to Claude Max at claude.ai for unlimited access to the most capable Claude models with 500K context window.',
      'Upload entire codebases for analysis: Claude Max can read and understand projects with thousands of files.',
      'Generate complete enterprise applications: "Build a multi-tenant SaaS platform with RBAC, audit logging, billing, and a public API."',
      'Use the massive context for complex architectural discussions — include entire documentation, API specs, and existing code in a single conversation.',
      'Get priority access during peak times and faster response generation for large outputs.',
      'Export generated code as complete file structures. Claude Max produces production-grade code with comprehensive error handling.',
    ],
  },
  {
    icon: LogoGemini,
    name: 'Gemini Advanced',
    description: 'Googles premium AI tier with Gemini Ultra. Best integration with Google Cloud, Android, and Google Workspace for building apps.',
    cost: '$20',
    costLabel: '$20/mo (Google One AI Premium)',
    speed: 'Fast',
    bestFor: 'Google Cloud and Android development',
    strength: 'Deep Google ecosystem integration',
    steps: [
      'Subscribe to Google One AI Premium for $20/mo. This unlocks Gemini Advanced, 2TB storage, and Google Workspace integration.',
      'Use Gemini for Google Cloud development: "Write a serverless function on Cloud Run that processes Pub/Sub messages and writes to BigQuery."',
      'Build Android apps with Geminis deep understanding of Kotlin and Jetpack Compose: "Create a Compose UI for a fitness tracking app with Wear OS support."',
      'Leverage the 1M+ token context to include your entire project specification, API docs, and existing codebase in a single session.',
      'Use the Workspace integration for app planning — generate docs, spreadsheets, and presentations alongside your code.',
      'Access Gemini in Android Studio for inline code suggestions and chat assistance while building Android apps.',
    ],
  },
  {
    icon: LogoCursor,
    name: 'Cursor Business',
    description: 'Enterprise Cursor with admin controls, centralized billing, team-wide AI policy management, and enhanced privacy.',
    cost: '$40',
    costLabel: '$40/user/mo (Business)',
    speed: 'Fast',
    bestFor: 'Development teams and enterprises',
    strength: 'Team management and compliance',
    steps: [
      'Sign up for Cursor Business at cursor.com. It includes everything in Pro plus admin controls and team features.',
      'Configure team-wide AI policies: choose which models are available, set privacy levels, and manage API key usage across the team.',
      'Use centralized billing with per-user or per-seat pricing. Add and remove team members from the admin dashboard.',
      'Get enhanced privacy mode — your teams code is never used for training and is processed under a DPA with SOC 2 compliance.',
      'Deploy custom models: connect your own fine-tuned models to Cursor for organization-specific code generation.',
      'Monitor usage analytics: see how your team uses AI features, which suggestions are accepted most, and where productivity gains are highest.',
    ],
  },
]

const affordableMethods: Method[] = [
  {
    icon: LogoDeepSeek,
    name: 'DeepSeek',
    description: 'Chinese AI lab offering extremely competitive pricing. DeepSeek-V3 and R1 models rival GPT-4 quality at a fraction of the cost. Best value in AI coding.',
    cost: '$0.50',
    costLabel: '~$0.50/mo (API)',
    speed: 'Fast',
    bestFor: 'Budget-conscious developers',
    strength: 'GPT-4 quality at 95%+ cost reduction',
    steps: [
      'Sign up at platform.deepseek.com for API access. No minimum commitment — pay only for what you use.',
      'Install the API client: "npm install openai" and configure the base URL to "https://api.deepseek.com" for OpenAI-compatible access.',
      'Integrate DeepSeek into your editor via Continue.dev or any tool that supports custom OpenAI endpoints. Configure it as your AI provider.',
      'Use with Cursor by adding a custom model pointing to DeepSeeks API. Same experience as GPT-4 at 1/20th the cost.',
      'For complex reasoning tasks, use DeepSeek-R1. For everyday coding, use DeepSeek-V3. Both are remarkably affordable.',
      'Monitor your usage in the dashboard. At $0.14 per million input tokens and $0.28 per million output tokens, most developers spend under $5/month.',
    ],
  },
  {
    icon: LogoAPI,
    name: 'Claude API (Pay-as-you-go)',
    description: 'Use Anthropics Claude models via API with no monthly commitment. Pay per token — ideal for variable or low-volume usage.',
    cost: '$3',
    costLabel: '~$3/mo for light usage',
    speed: 'Fast',
    bestFor: 'Variable usage and custom integrations',
    strength: 'Pay only for what you use',
    steps: [
      'Get API access at console.anthropic.com. Add a small amount of credits — $10 lasts most developers 1-2 months.',
      'Use Claude Haiku ($0.25/M input tokens) for quick code generation and simple tasks. It is the cheapest and fastest Claude model.',
      'Use Claude Sonnet ($3/M input tokens) for complex coding tasks. It balances quality and cost for most development work.',
      'Integrate via Continue.dev, Open Interpreter, or custom scripts. The API is OpenAI-compatible for easy migration.',
      'Set usage limits in the Anthropic console to control costs. Configure alerts when you approach your budget.',
      'For heavy usage, compare with the $20/month Claude Pro subscription which includes free API credits.',
    ],
  },
  {
    icon: LogoGemini,
    name: 'Gemini API (Google)',
    description: 'Googles most affordable AI API. Free tier includes 60 requests per minute. Paid tier is significantly cheaper than OpenAI.',
    cost: '$0',
    costLabel: 'Free tier available, then $0.0035/1K chars',
    speed: 'Fast',
    bestFor: 'High-volume and budget applications',
    strength: 'Generous free tier, cheapest major API',
    steps: [
      'Get API access at makersuite.google.com/app/apikey. The free tier includes 60 requests per minute with Gemini 1.5 Flash.',
      'For free: use Gemini 1.5 Flash for all your coding needs. It is surprisingly capable and completely free within rate limits.',
      'For production: use Gemini 1.5 Pro at $0.0035 per 1K input characters — roughly 1/10th the cost of GPT-4.',
      'Integrate with Google AI Studio for testing, then switch to the API for production. The developer experience is excellent.',
      'Use the 1M token context window for large codebase analysis — upload your entire project and ask for architecture improvements.',
      'For Next.js/Vercel projects, the free tier is often sufficient for development. Only upgrade to paid when you hit rate limits.',
    ],
  },
  {
    icon: LogoTabnine,
    name: 'Tabnine',
    description: 'AI code completion tool with on-device models and team customization. Affordable pricing with strong privacy guarantees.',
    cost: '$12',
    costLabel: '$12/mo (Pro)',
    speed: 'Medium',
    bestFor: 'Privacy-first teams and enterprises',
    strength: 'On-device AI, SOC 2 compliant',
    steps: [
      'Install Tabnine from tabnine.com for your IDE. It supports VS Code, JetBrains, Vim, and more.',
      'Choose your AI model: on-device (completely free, no data leaves your machine) or cloud (more accurate, SOC 2 compliant).',
      'Start coding and Tabnine provides real-time completions. It learns your coding patterns and project conventions over time.',
      'For teams ($39/user/mo), share coding patterns and best practices across your organization with customized AI suggestions.',
      'Use Tabnine Chat for natural language queries: "How do I implement pagination in this component?" with full project context.',
      'Tabnine excels in regulated industries where data privacy is critical. The on-device model never sends code to external servers.',
    ],
  },
  {
    icon: LogoOpenRouter,
    name: 'OpenRouter',
    description: 'Unified API gateway for 200+ AI models. Pay per token across all major and open-source models. One API for everything.',
    cost: '$1',
    costLabel: '~$1/mo for light usage',
    speed: 'Medium',
    bestFor: 'Accessing multiple models via one API',
    strength: '200+ models, one API key, pay-per-token',
    steps: [
      'Sign up at openrouter.ai and create an API key. Add a small amount of credits — $5 gets you access to 200+ models.',
      'Use the cheapest models for everyday coding: DeepSeek-V3 ($0.14/M tokens), Mistral Small ($0.20/M tokens), or Llama 3.1 70B ($0.59/M tokens).',
      'Configure Continue.dev or Cursor to use your OpenRouter API key. You can switch between models without changing your setup.',
      'Use premium models (Claude, GPT-4) only when you need them for complex tasks. Fall back to cheap models for boilerplate.',
      'Monitor costs per model in the OpenRouter dashboard. Set spending limits and alerts to stay within budget.',
      'For production, use OpenRouter as a fallback — if one model provider is down, it automatically routes to an alternative.',
    ],
  },
  {
    icon: LogoGroq,
    name: 'Groq Cloud',
    description: 'Lightning-fast inference provider with a generous free tier. Runs open-source models at speeds unmatched by any competitor.',
    cost: '$0',
    costLabel: 'Free tier available',
    speed: 'Fast',
    bestFor: 'Real-time applications and rapid iteration',
    strength: 'Fastest inference speed, free tier',
    steps: [
      'Sign up at groq.com for free API access. No credit card required. You get thousands of free requests per day.',
      'Use Llama 3.1 70B on Groq — it generates tokens at 800+ tokens/second, making it the fastest freely available coding assistant.',
      'Integrate via Continue.dev, Open Interpreter, or directly via OpenAI-compatible API. Set the base URL to Groqs endpoint.',
      'For real-time coding features in your own apps, Groqs speed is unmatched. Perfect for in-app AI assistants and chat interfaces.',
      'The free tier is generous enough for most individual developers. Upgrade to paid only for production workloads with SLA requirements.',
      'Groq runs on specialized LPU hardware that is 10-20x faster than GPU-based inference. This means near-instant code generation.',
    ],
  },
]

const speedColors = {
  Fast: 'text-green-400 bg-green-500/10 border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Slow: 'text-red-400 bg-red-500/10 border-red-500/20',
}

type TabType = 'free' | 'paid' | 'affordable'

export default function Building() {
  const [activeTab, setActiveTab] = useState<TabType>('free')
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null)

  const tabs: { id: TabType; label: string; icon: React.ElementType; methods: Method[]; description: string }[] = [
    { id: 'free', label: 'Free', icon: Sparkles, methods: freeMethods, description: 'Start with zero budget — use free API tiers and open-source models. Slower but completely free with no credit card needed.' },
    { id: 'paid', label: 'Paid', icon: Rocket, methods: paidMethods, description: 'Premium tools for maximum speed and quality. Get production-grade apps built in hours with the best AI models available.' },
    { id: 'affordable', label: 'Affordable', icon: Wallet, methods: affordableMethods, description: 'Best value picks — low-cost tools that deliver 80% of the quality at 20% of the price. Perfect for bootstrapped startups.' },
  ]

  const currentTab = tabs.find(t => t.id === activeTab)!
  const methods = currentTab.methods

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
            <Brush size={26} className="text-accent-highlight" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Building</h1>
            <p className="text-accent-primary-dark max-w-xl">
              Build your app or website with AI — from free open-source tools to premium platforms. We have curated {freeMethods.length} free, {paidMethods.length} paid, and {affordableMethods.length} affordable methods.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="glass-card rounded-2xl p-1.5 inline-flex">
          {tabs.map(tab => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-accent-highlight text-dark-900 shadow-lg'
                    : 'text-accent-primary-dark hover:text-accent-primary-light'
                }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-accent-primary-dark text-sm mb-8 max-w-2xl"
      >
        {currentTab.description}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {methods.map((method, index) => {
            const MethodIcon = method.icon
            return (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    <MethodIcon size={20} className="text-accent-highlight" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1">{method.name}</h3>
                    <p className="text-accent-primary-dark text-xs leading-relaxed line-clamp-2">{method.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                    activeTab === 'free'
                      ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                      : activeTab === 'paid'
                        ? 'text-accent-highlight bg-accent-primary/10 border border-accent-primary/20'
                        : 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {activeTab === 'free' ? <Sparkles size={11} /> : activeTab === 'paid' ? <Rocket size={11} /> : <Wallet size={11} />}
                    {method.costLabel}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${speedColors[method.speed]}`}>
                    <Zap size={11} />
                    {method.speed}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Target size={12} className="text-accent-primary-dark flex-shrink-0" />
                    <span className="text-accent-primary-dark">Best for: </span>
                    <span className="text-accent-primary-light">{method.bestFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={12} className="text-accent-primary-dark flex-shrink-0" />
                    <span className="text-accent-primary-dark">Strength: </span>
                    <span className="text-accent-primary-light">{method.strength}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMethod(method)}
                  className="btn-primary text-xs py-2 px-3.5 w-full flex items-center justify-center gap-1.5"
                >
                  <ChevronRight size={13} />
                  See in detail
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedMethod && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSelectedMethod(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg z-50 overflow-y-auto"
            >
              <div className="min-h-full p-6 bg-dark-800 border-l border-accent-primary/10 overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent-primary/15 flex items-center justify-center">
                      {React.createElement(selectedMethod.icon, { size: 22, className: 'text-accent-highlight' })}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedMethod.name}</h2>
                      <p className="text-accent-primary-dark text-xs">{selectedMethod.costLabel}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center hover:bg-accent-primary/20 transition-colors flex-shrink-0"
                  >
                    <X size={16} className="text-accent-primary-dark" />
                  </button>
                </div>

                <p className="text-accent-primary-light text-sm leading-relaxed mb-6 pb-6 border-b border-accent-primary/10">
                  {selectedMethod.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                    activeTab === 'free'
                      ? 'text-green-400 bg-green-500/10 border-green-500/20'
                      : activeTab === 'paid'
                        ? 'text-accent-highlight bg-accent-primary/10 border border-accent-primary/20'
                        : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                  }`}>
                    {activeTab === 'free' ? <Sparkles size={11} /> : activeTab === 'paid' ? <Rocket size={11} /> : <Wallet size={11} />}
                    {selectedMethod.costLabel}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${speedColors[selectedMethod.speed]}`}>
                    <Zap size={11} />
                    {selectedMethod.speed}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20">
                    <Target size={11} />
                    {selectedMethod.bestFor}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-sm mb-4">Step-by-step guide</h3>
                <div className="space-y-4">
                  {selectedMethod.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-accent-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-accent-highlight text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-accent-primary-light text-sm leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
