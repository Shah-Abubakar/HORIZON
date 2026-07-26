'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ExternalLink,
  X,
  Sparkles,
  Palette,
  Type,
  Image,
  Globe,
  Code,
  Layers,
} from 'lucide-react'

type Resource = {
  name: string
  url: string
  description: string
  category: string
  tags: string[]
  why: string
}

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'ui-components', label: 'UI Components', icon: Code },
  { id: 'design-inspiration', label: 'Design Inspiration', icon: Globe },
  { id: 'icons-illustrations', label: 'Icons & Illustrations', icon: Image },
  { id: 'fonts-typography', label: 'Fonts & Typography', icon: Type },
  { id: 'colors-palettes', label: 'Colors & Palettes', icon: Palette },
  { id: 'ai-tools', label: 'AI Design Tools', icon: Sparkles },
]

const resources: Resource[] = [
  {
    name: 'Uiverse',
    url: 'https://uiverse.io',
    description: 'Huge open-source library of handmade UI elements. Cards, buttons, inputs, loaders, checkboxes, and more in pure CSS/HTML.',
    category: 'ui-components',
    tags: ['CSS', 'Buttons', 'Cards', 'Forms'],
    why: '6000+ free UI elements you can copy-paste instantly. No framework lock-in.',
  },
  {
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste into your projects.',
    category: 'ui-components',
    tags: ['React', 'Tailwind', 'Components', 'Radix'],
    why: 'Industry standard for React projects. Accessible, customizable, and beautifully designed.',
  },
  {
    name: 'Tailwind UI',
    url: 'https://tailwindui.com',
    description: 'Premium component library by the Tailwind CSS team. Production-ready interface blocks and templates.',
    category: 'ui-components',
    tags: ['Tailwind', 'Templates', 'Premium'],
    why: 'The most polished Tailwind component library. Built by the creators of Tailwind CSS.',
  },
  {
    name: 'Float UI',
    url: 'https://floatui.com',
    description: 'Free Tailwind CSS component library with modern responsive UI components for marketing sites.',
    category: 'ui-components',
    tags: ['Tailwind', 'Free', 'Responsive'],
    why: 'Completely free with a wide variety of well-designed components and page sections.',
  },
  {
    name: 'HyperUI',
    url: 'https://hyperui.dev',
    description: 'Free open-source Tailwind CSS components for marketing sites and web apps.',
    category: 'ui-components',
    tags: ['Tailwind', 'Free', 'Open Source'],
    why: 'Clean, well-documented, and completely free. Great for marketing pages.',
  },
  {
    name: 'Preline UI',
    url: 'https://preline.co',
    description: 'Comprehensive Tailwind CSS component library with 500+ components and templates.',
    category: 'ui-components',
    tags: ['Tailwind', 'Components', 'Plugins'],
    why: 'One of the largest free Tailwind libraries with interactive components and plugins.',
  },
  {
    name: 'Motion Sites',
    url: 'https://motionsites.ai',
    description: 'Curated gallery of websites with exceptional motion design and animation inspiration.',
    category: 'design-inspiration',
    tags: ['Motion', 'Animation', 'Inspiration'],
    why: 'The best source for motion design inspiration. See what top studios are doing with web animation.',
  },
  {
    name: 'Awwwards',
    url: 'https://www.awwwards.com',
    description: 'The worlds leading awards platform for web design and development.',
    category: 'design-inspiration',
    tags: ['Awards', 'Inspiration', 'Showcase'],
    why: 'The gold standard for web design recognition. Filter by trend, technology, and category.',
  },
  {
    name: 'Land Book',
    url: 'https://land-book.com',
    description: 'Curated gallery of the best landing pages for layout and copy inspiration.',
    category: 'design-inspiration',
    tags: ['Landing Pages', 'Gallery', 'Layout'],
    why: 'Focused exclusively on landing pages with clean categorization and real-world examples.',
  },
  {
    name: 'SiteInspire',
    url: 'https://www.siteinspire.com',
    description: 'Hand-picked showcase of the finest web design, filterable by style and type.',
    category: 'design-inspiration',
    tags: ['Showcase', 'Curated', 'Creative'],
    why: 'High-quality curation with useful filters for finding your exact aesthetic.',
  },
  {
    name: 'SaaS Landing Page',
    url: 'https://saaslandingpage.com',
    description: 'Examples of the best SaaS landing pages for conversion-driven design.',
    category: 'design-inspiration',
    tags: ['SaaS', 'Conversion', 'Marketing'],
    why: 'Specifically focused on SaaS landing page patterns and conversion-driven design.',
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com',
    description: 'The largest design community with millions of UI, branding, and illustration shots.',
    category: 'design-inspiration',
    tags: ['Community', 'UI', 'Branding'],
    why: 'Massive library of design concepts. Search by color, tool, or style for instant inspiration.',
  },
  {
    name: 'Lucide',
    url: 'https://lucide.dev',
    description: 'Beautiful consistent open-source icon library. 1500+ SVG and React icons.',
    category: 'icons-illustrations',
    tags: ['Icons', 'SVG', 'Open Source'],
    why: 'Clean, consistent icon set used in this very app. Fully customizable stroke width.',
  },
  {
    name: 'Heroicons',
    url: 'https://heroicons.com',
    description: 'Hand-crafted SVG icons by the Tailwind CSS team with outline and solid variants.',
    category: 'icons-illustrations',
    tags: ['Icons', 'SVG', 'Tailwind'],
    why: 'Industry-standard icons for Tailwind projects. Clean, recognizable, and well-maintained.',
  },
  {
    name: 'unDraw',
    url: 'https://undraw.co',
    description: 'Open-source illustrations customizable to match your brand color.',
    category: 'icons-illustrations',
    tags: ['Illustrations', 'SVG', 'Customizable'],
    why: 'Beautiful, consistent illustrations with color customization. Completely free.',
  },
  {
    name: 'Icons8',
    url: 'https://icons8.com',
    description: 'Huge library of icons, illustrations, photos, and design tools.',
    category: 'icons-illustrations',
    tags: ['Icons', 'Illustrations', 'Photos'],
    why: 'One-stop shop for all visual assets. Icons, illustrations, photos, and even music.',
  },
  {
    name: 'Phosphor Icons',
    url: 'https://phosphoricons.com',
    description: 'Flexible icon library with 6 weight variants for adaptable design systems.',
    category: 'icons-illustrations',
    tags: ['Icons', 'SVG', 'Design Systems'],
    why: 'Six weight variants let you dial the exact visual emphasis for every context.',
  },
  {
    name: 'Google Fonts',
    url: 'https://fonts.google.com',
    description: 'The largest free font library with 1700+ font families and variable fonts.',
    category: 'fonts-typography',
    tags: ['Fonts', 'Free', 'Variable'],
    why: 'Essential resource for every web project. Free, well-hosted, and constantly growing.',
  },
  {
    name: 'Fontsource',
    url: 'https://fontsource.org',
    description: 'Self-host open-source fonts with npm for better privacy and performance.',
    category: 'fonts-typography',
    tags: ['Fonts', 'npm', 'Privacy'],
    why: 'Self-hosting fonts means no external requests, better privacy, and faster load times.',
  },
  {
    name: 'Fontshare',
    url: 'https://www.fontshare.com',
    description: 'High-quality free fonts curated by Indian Type Foundry for professionals.',
    category: 'fonts-typography',
    tags: ['Fonts', 'Free', 'Premium'],
    why: 'Professional-grade fonts that are genuinely free with unique display faces.',
  },
  {
    name: 'Coolors',
    url: 'https://coolors.co',
    description: 'The most popular color palette generator with accessibility checking.',
    category: 'colors-palettes',
    tags: ['Palette', 'Generator', 'Accessibility'],
    why: 'Fast palette generation with accessibility checking. Export to Tailwind, CSS, and Figma.',
  },
  {
    name: 'UI Colors',
    url: 'https://uicolors.app',
    description: 'Tailwind CSS color palette generator with visual shade editing.',
    category: 'colors-palettes',
    tags: ['Tailwind', 'Palette', 'Generator'],
    why: 'Purpose-built for Tailwind CSS. Generate perfect 50-950 shade scales for any color.',
  },
  {
    name: 'Realtime Colors',
    url: 'https://realtimecolors.com',
    description: 'Visualize color palettes on a real website template in context.',
    category: 'colors-palettes',
    tags: ['Palette', 'Visualizer', 'Preview'],
    why: 'See your palette on a real page instantly. Best way to evaluate color combinations.',
  },
  {
    name: 'V0 by Vercel',
    url: 'https://v0.dev',
    description: 'AI-powered UI generation. Describe your UI and get React/Tailwind code instantly.',
    category: 'ai-tools',
    tags: ['AI', 'React', 'Tailwind'],
    why: 'Fastest way to go from idea to UI. Generates clean, accessible React components.',
  },
  {
    name: 'Bolt.new',
    url: 'https://bolt.new',
    description: 'AI full-stack web app generator. Build complete apps from a single prompt.',
    category: 'ai-tools',
    tags: ['AI', 'Full-stack', 'Generation'],
    why: 'One prompt to a fully working app with frontend, backend, and database.',
  },
  {
    name: 'Open Design',
    url: 'https://opencode.ai',
    description: 'Free AI-powered design-to-code platform for rapid prototyping.',
    category: 'ai-tools',
    tags: ['AI', 'Design', 'Code'],
    why: 'Turn descriptions into deployable apps. Built for rapid prototyping with real code output.',
  },
]

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const visibleResources = activeCategory === 'all'
    ? resources
    : resources.filter(r => r.category === activeCategory)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
            <Search size={26} className="text-accent-highlight" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
            <p className="text-accent-primary-dark max-w-xl">
              Curated collection of the best design resources on the web.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 overflow-x-auto"
      >
        <div className="flex gap-2 min-w-max pb-2">
          {categories.map(cat => {
            const CatIcon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-accent-highlight text-dark-900 shadow-lg shadow-accent-highlight/20'
                    : 'glass-card text-accent-primary-dark hover:text-accent-primary-light hover:bg-white/5'
                }`}
              >
                <CatIcon size={15} />
                {cat.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-accent-primary-dark text-xs mb-6"
      >
        {visibleResources.length} {visibleResources.length === 1 ? 'resource' : 'resources'} found
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {visibleResources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="glass-card rounded-xl p-5 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">{resource.name}</h3>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-accent-primary/10 flex items-center justify-center hover:bg-accent-primary/20 transition-colors flex-shrink-0 ml-2"
                >
                  <ExternalLink size={13} className="text-accent-primary-dark" />
                </a>
              </div>

              <p className="text-accent-primary-dark text-xs leading-relaxed mb-3 line-clamp-2">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {resource.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-accent-primary/10 text-accent-primary-dark border border-accent-primary/10"
                  >
                    {tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-accent-primary-dark">
                    +{resource.tags.length - 3}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedResource(resource)}
                className="w-full text-xs py-2 rounded-lg border border-accent-primary/15 text-accent-primary-light hover:bg-accent-primary/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Search size={12} />
                See details
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedResource && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSelectedResource(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg z-50 overflow-y-auto"
            >
              <div className="min-h-full p-6 bg-dark-800 border-l border-accent-primary/10 overflow-y-auto">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{selectedResource.name}</h2>
                    <a
                      href={selectedResource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-highlight text-xs hover:underline"
                    >
                      Visit website
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center hover:bg-accent-primary/20 transition-colors flex-shrink-0"
                  >
                    <X size={16} className="text-accent-primary-dark" />
                  </button>
                </div>

                <p className="text-accent-primary-light text-sm leading-relaxed mb-5 pb-5 border-b border-accent-primary/10">
                  {selectedResource.description}
                </p>

                <div className="mb-5">
                  <h3 className="text-white font-semibold text-sm mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedResource.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-accent-primary/10 text-accent-primary-light border border-accent-primary/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/10 mb-5">
                  <h3 className="text-white font-semibold text-xs mb-1.5">Why we recommend it</h3>
                  <p className="text-accent-primary-light text-sm leading-relaxed">{selectedResource.why}</p>
                </div>

                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-highlight text-dark-900 font-semibold text-sm py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-accent-highlight-light transition-colors"
                >
                  <ExternalLink size={15} />
                  Open {selectedResource.name}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
