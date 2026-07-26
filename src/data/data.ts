// Smartups Mock Data
// All static data lives here for easy updates

export const PROGRESS_DATA = {
  overall: 34,
  phases: [
    { id: 'ideation', name: 'Ideation', status: 'completed', progress: 100 },
    { id: 'design', name: 'Design', status: 'in-progress', progress: 65 },
    { id: 'development', name: 'Development', status: 'locked', progress: 0 },
    { id: 'launch', name: 'Launch', status: 'locked', progress: 0 },
    { id: 'growth', name: 'Growth', status: 'locked', progress: 0 },
  ],
  nextAction: {
    title: 'Validate your idea by talking to 10 strangers',
    description: 'Click here for the interview script',
    phase: 'ideation',
  },
  recentActivity: [
    { id: 1, action: 'Completed the Waitlist Gauntlet', time: '2 hours ago', phase: 'ideation' },
    { id: 2, action: 'Saved a prompt for Firebase Auth', time: '1 day ago', phase: 'code' },
    { id: 3, action: 'Generated a user flow diagram', time: '2 days ago', phase: 'design' },
  ],
}

export const IDEA_LAB_DATA = {
  validationScore: 72,
  devilAdvocate: [
    'The market is dominated by established players with network effects',
    'Customer acquisition cost may be too high for a bootstrapped startup',
    'The problem you are solving might not be painful enough for people to pay',
    'Regulatory challenges in this sector could slow down development',
    'Revenue model is unclear and may not scale beyond initial users',
  ],
  waitlistPreview: {
    title: 'Waitlist Landing Page',
    heading: 'Solve your biggest challenge',
    subheading: 'Join 500+ students already on the waitlist',
  },
  competitors: [
    { name: 'StudentHub', didWell: 'Strong community engagement', whyFailed: 'No sustainable monetization Strategy' },
    { name: 'CampusConnect', didWell: 'Great UI/UX design', whyFailed: 'Targeted too broad an audience' },
    { name: 'StudyBuddy', didWell: 'Viral initial acquisition', whyFailed: 'Poor retention after first week' },
  ],
}

export const DESIGN_PROMPTS = [
  {
    id: 1,
    title: 'User Flow Generator',
    description: 'Generate a 5-step user flow for a mobile app',
    prompt: 'Act as a senior UX designer. I am building a [your app type]. Give me a detailed 5-step user flow for a new user signing up. Draw it in a clear text-based diagram.',
    category: 'User Flows',
  },
  {
    id: 2,
    title: 'Color Palette Advisor',
    description: 'Get AI-recommended colors for your industry',
    prompt: 'Suggest a professional color palette for a [fintech/health/saas] startup. Include hex codes and explain the psychology behind each color choice.',
    category: 'Color Palettes',
  },
  {
    id: 3,
    title: 'Wireframe to Code',
    description: 'Convert wireframes into usable code',
    prompt: 'I have a wireframe description: [describe your layout]. Convert this into a responsive React component using Tailwind CSS. Include hover states and mobile breakpoints.',
    category: 'Wireframes',
  },
  {
    id: 4,
    title: 'Design System Builder',
    description: 'Create a complete design system',
    prompt: 'Create a complete design system for a [type of app] startup. Include typography scale, spacing system, component variants, and usage guidelines.',
    category: 'Mockups',
  },
  {
    id: 5,
    title: 'Landing Page Generator',
    description: 'Design a high-converting landing page',
    prompt: 'Design a high-converting landing page for a [product type]. Include section-by-section layout, copy suggestions, and CTA placement strategy.',
    category: 'Mockups',
  },
  {
    id: 6,
    title: 'Accessibility Auditor',
    description: 'Check your design for accessibility issues',
    prompt: 'Review this UI design description: [describe]. List all accessibility issues according to WCAG 2.1 AA standards and suggest fixes with specific color contrast ratios.',
    category: 'Wireframes',
  },
]

export const DESIGN_TOOLS = [
  { name: 'Galileo AI', bestFor: 'UI generation from text', freeTier: '60 credits/month', link: 'https://www.usegalileo.ai' },
  { name: 'v0.dev', bestFor: 'React UI components', freeTier: 'Unlimited generations', link: 'https://v0.dev' },
  { name: 'Midjourney', bestFor: 'Concept art and mockups', freeTier: '25 images/month', link: 'https://www.midjourney.com' },
  { name: 'Figma AI', bestFor: 'Design collaboration', freeTier: '3 projects', link: 'https://www.figma.com' },
  { name: 'Canva Magic', bestFor: 'Quick social graphics', freeTier: 'Full free tier', link: 'https://www.canva.com' },
]

export const CODE_PROMPTS = {
  authentication: [
    {
      id: 'auth-1',
      title: 'Complete Login System with Supabase',
      description: 'Generate a full login flow with email verification',
      prompt: 'Using Next.js 14 App Router and Supabase, create a complete authentication system. Include: a login page with email/password, a signup page, email verification on signup, a protected dashboard route, a logout button, and middleware to redirect unauthenticated users. Handle these edge cases: wrong password, expired verification link, already registered email. Provide the full code for all files with explanations.',
    },
    {
      id: 'auth-2',
      title: 'OAuth with Multiple Providers',
      description: 'Add Google, GitHub, and Twitter login',
      prompt: 'Implement multi-provider OAuth in a Next.js 14 app using NextAuth.js v5. Support Google, GitHub, and Twitter providers. Include: JWT session strategy, user profile page showing connected accounts, and a disconnect button for each provider. Handle the case where a user connects multiple providers with the same email.',
    },
    {
      id: 'auth-3',
      title: 'Role-Based Access Control',
      description: 'Create admin, editor, and viewer roles',
      prompt: 'Implement a complete RBAC system using Next.js and a PostgreSQL database. Create three roles: admin, editor, and viewer. Include: middleware for route protection, a role management UI for admins, server actions for role changes, and audit logs for role modifications. Show the database schema and all necessary API routes.',
    },
  ],
  debugging: [
    {
      id: 'debug-1',
      title: 'Fix Stripe Webhook Errors',
      description: 'Resolve common webhook signature verification failures',
      prompt: 'I am getting a webhook signature verification failed error in my Next.js app using Stripe. Here is my webhook handler code: [paste your code]. I am using Stripe CLI locally. The error occurs when I try to test the webhook. Explain the most common causes of this error, provide the corrected code, and show me how to properly test it locally.',
    },
    {
      id: 'debug-2',
      title: 'Infinite Loop in useEffect',
      description: 'Fix common React rendering issues',
      prompt: 'My React component is causing an infinite loop. Here is the code: [paste code]. I suspect the issue is in the useEffect hook. Identify all possible causes of infinite loops in this code, explain why each happens, and provide the corrected version. Cover dependency array issues, state updates in effects, and stale closure problems.',
    },
    {
      id: 'debug-3',
      title: 'Memory Leak in Server Actions',
      description: 'Debug server-side memory issues',
      prompt: 'My Next.js server action is causing memory leaks in production. The memory usage grows over time until the server crashes. Here is my server action: [paste code]. Identify potential memory leak sources, explain how to profile memory usage in Next.js, and provide a corrected version with proper cleanup patterns.',
    },
  ],
  'web-apps': [
    {
      id: 'web-1',
      title: 'Real-time Chat Application',
      description: 'Build a WebSocket-based chat system',
      prompt: 'Create a real-time chat application using Next.js 14, Socket.io, and Redis for message persistence. Include: private messaging, online status indicators, message history, typing indicators, and message reactions. Design the database schema for storing messages efficiently and implement pagination for chat history.',
    },
    {
      id: 'web-2',
      title: 'Full-Stack E-commerce Platform',
      description: 'Complete store with cart and payments',
      prompt: 'Build a complete e-commerce platform using Next.js 14, Prisma, and Stripe. Features: product catalog with search/filter, shopping cart (persisted in DB), checkout flow with Stripe, order history, admin dashboard for inventory management. Include: image optimization, SEO metadata for products, and structured data markup.',
    },
  ],
  'mobile-apps': [
    {
      id: 'mobile-1',
      title: 'Cross-Platform App with Expo',
      description: 'iOS and Android from one codebase',
      prompt: 'Create a cross-platform mobile app using React Native with Expo Router. Include: tab navigation, push notifications, offline data sync, biometric authentication, and deep linking. Show the file structure, navigation setup, and how to handle platform-specific code when needed.',
    },
  ],
  'ai-features': [
    {
      id: 'ai-1',
      title: 'RAG Chatbot with PDF Support',
      description: 'Chat with your documents using AI',
      prompt: 'Build a Retrieval-Augmented Generation chatbot using Next.js, OpenAI API, and Pinecone for vector storage. Include: PDF upload and parsing, chunking strategy, embedding generation, semantic search, and a chat interface with sources cited. Handle rate limiting and implement streaming responses.',
    },
  ],
  payments: [
    {
      id: 'pay-1',
      title: 'Subscription Billing System',
      description: 'Recurring payments with Stripe',
      prompt: 'Implement a complete subscription billing system using Stripe in a Next.js app. Include: pricing page with monthly/annual toggle, subscription creation, proration on upgrades/downgrades, webhook handlers for payment events, customer portal for managing subscriptions, and dunning emails for failed payments.',
    },
  ],
  database: [
    {
      id: 'db-1',
      title: 'Database Schema Designer',
      description: 'Generate optimized SQL schemas',
      prompt: 'I am building a [describe your application]. Design an optimized PostgreSQL database schema. Include: all necessary tables, proper indexes for common queries, foreign key constraints with appropriate ON DELETE actions, and timestamps for audit trails. Explain the normalization decisions and any intentional denormalization for performance.',
    },
  ],
}

export const DEPLOYMENT_QUIZ = {
  questions: [
    { id: 1, text: 'Is your app static or dynamic?', options: ['Static (no server)', 'Dynamic (needs backend)', 'Not sure'] },
    { id: 2, text: 'What is your monthly budget?', options: ['$0 (free tier only)', '$5-20', '$20+'] },
    { id: 3, text: 'Expected monthly traffic?', options: ['< 1000 users', '1000-10000 users', '> 10000 users'] },
  ],
  recommendations: {
    'static-free-low': { platform: 'Vercel', reason: 'Generous free tier, instant deployments, perfect for portfolios and static sites' },
    'static-free-mid': { platform: 'Cloudflare Pages', reason: 'Unlimited bandwidth on free tier, global CDN, great for high-traffic static sites' },
    'dynamic-free-low': { platform: 'Render', reason: 'Free tier for web services, managed databases, auto-deploy from Git' },
    'dynamic-5-low': { platform: 'Railway', reason: 'Simple pricing from $5/mo, great DX, includes databases' },
    'dynamic-5-mid': { platform: 'Vercel Pro', reason: 'Enterprise-grade infrastructure, analytics, team features' },
    'dynamic-20-mid': { platform: 'AWS/GCP', reason: 'Full control, scalable infrastructure, for serious production workloads' },
  },
  checklist: [
    { id: 1, text: 'Buy a domain', link: 'https://namecheap.com' },
    { id: 2, text: 'Connect GitHub repository', link: null },
    { id: 3, text: 'Set environment variables', link: null },
    { id: 4, text: 'Configure custom domain', link: null },
    { id: 5, text: 'Set up SSL certificate', link: null },
  ],
  tutorials: [
    { id: 1, title: 'Deploy Next.js to Vercel', duration: '8 min' },
    { id: 2, title: 'Custom Domain Setup', duration: '5 min' },
    { id: 3, title: 'Environment Variables Guide', duration: '3 min' },
  ],
}

export const MARKETING_DATA = {
  launchCalendar: [
    { week: 1, days: [
      { day: 'Mon', task: 'Write product description', prompt: 'Write a one-sentence product description for [product]. Include the main benefit and target audience.' },
      { day: 'Tue', task: 'Create Twitter header', prompt: 'Generate 3 Twitter header image descriptions for [product type]. Focus on clean, professional aesthetics.' },
      { day: 'Wed', task: 'Draft launch tweet', prompt: 'Write a launch tweet for [product]. Include hook, value proposition, and CTA. Maximum 280 characters.' },
      { day: 'Thu', task: 'Find subreddits', prompt: 'List 10 relevant subreddits for a [product type] startup. Include subscriber counts and posting frequency tips.' },
      { day: 'Fri', task: 'Write cold email', prompt: 'Write a cold outreach email for [product] targeting [audience]. Keep it under 100 words with a clear CTA.' },
    ]},
    { week: 2, days: [
      { day: 'Mon', task: 'Product Hunt prep', prompt: 'Write a Product Hunt description for [product]. Include: tagline, description, maker story, and launch day plan.' },
      { day: 'Tue', task: 'LinkedIn article', prompt: 'Write a LinkedIn article about the problem [product] solves. Include personal story and key insights.' },
      { day: 'Wed', task: 'Press list', prompt: 'Create a list of 20 journalists/bloggers who cover [industry]. Include their publication, email, and why they would care.' },
      { day: 'Thu', task: 'Beta tester outreach', prompt: 'Write a message template for recruiting beta testers. Include: what is it, why join, and what is expected.' },
      { day: 'Fri', task: 'Community engagement', prompt: 'Generate 5 helpful comments to leave on relevant Reddit/StackOverflow threads. Provide genuine value before mentioning product.' },
    ]},
  ],
  copywritingPrompts: {
    twitter: [
      { id: 'tw-1', title: 'Launch Thread', prompt: 'Write a Twitter/X thread announcing [product]. Thread structure: Hook tweet, 5 value tweets, CTA tweet. Each tweet under 280 chars.' },
      { id: 'tw-2', title: 'Problem-Solution Tweet', prompt: 'Write a tweet that highlights a painful problem and hints at the solution. End with a question to drive engagement.' },
      { id: 'tw-3', title: 'Social Proof Tweet', prompt: 'Write a tweet sharing [milestone/result]. Include specific numbers and a thank you to early supporters.' },
    ],
    email: [
      { id: 'em-1', title: 'Cold Outreach', prompt: 'Write a cold email for [product] to [target role]. Subject line, body under 100 words, one clear CTA. Personalize for their industry.' },
      { id: 'em-2', title: 'Welcome Sequence', prompt: 'Write a 3-email welcome sequence for new [product] users. Email 1: Welcome, Email 2: Key feature, Email 3: Social proof and upgrade prompt.' },
      { id: 'em-3', title: 'Re-engagement', prompt: 'Write a re-engagement email for users who have not logged in for 2 weeks. Include: what is new, a direct link, and an incentive.' },
    ],
    linkedin: [
      { id: 'li-1', title: 'Launch Post', prompt: 'Write a LinkedIn post announcing [product]. Include: the journey, lessons learned, key metrics, and gratitude. Use line breaks for readability.' },
      { id: 'li-2', title: 'Story Post', prompt: 'Write a LinkedIn post sharing a failure story from building [product]. Focus on the lesson learned and how it improved the product.' },
      { id: 'li-3', title: 'Insight Post', prompt: 'Write a LinkedIn post sharing a counterintuitive insight about [industry]. End with a question to drive comments.' },
    ],
    producthunt: [
      { id: 'ph-1', title: 'Tagline & Description', prompt: 'Write a Product Hunt tagline (60 chars max) and first comment description for [product]. Include: what it does, why it exists, and maker background.' },
      { id: 'ph-2', title: 'Maker Story', prompt: 'Write a maker story for Product Hunt. Include: who you are, why you built this, what you learned, and what is next.' },
    ],
  },
  directories: [
    { name: 'Product Hunt', category: 'Launch Platform', link: 'https://producthunt.com', tips: 'Launch on Tuesday, coordinate upvotes' },
    { name: 'Hacker News', category: 'Tech Community', link: 'https://news.ycombinator.com', tips: 'Show HN format, technical angle works best' },
    { name: 'Indie Hackers', category: 'Founder Community', link: 'https://indiehackers.com', tips: 'Share revenue numbers, be transparent' },
    { name: 'BetaList', category: 'Early Adopters', link: 'https://betalist.com', tips: 'Great for pre-launch validation' },
    { name: 'r/SideProject', category: 'Reddit Community', link: 'https://reddit.com/r/SideProject', tips: 'Show the building process, not just results' },
  ],
}

export const FUNDING_DATA = {
  grants: [
    { id: 1, name: 'Thiel Fellowship', prize: '$100,000', deadline: 'Dec 31, 2025', status: 'Open' },
    { id: 2, name: 'YSB India Startup Battalion', prize: 'Up to $5,000', deadline: 'Jul 15, 2025', status: 'Closing Soon' },
    { id: 3, name: 'Google for Startups', prize: '$100,000 + credits', deadline: 'Mar 1, 2026', status: 'Open' },
    { id: 4, name: 'MIT Solve', prize: '$10,000 - $200,000', deadline: 'Pass Closed', status: 'Closed' },
    { id: 5, name: 'E-Verify Student Grant', prize: '$200/month', deadline: 'Dec 31, 2025', status: 'Open' },
  ],
  pitchSlides: [
    { id: 1, title: 'Title Slide', description: 'Company name, tagline, your name and role', prompt: 'Generate a compelling title slide pitch for [company]. Include: company name, one-line tagline that captures the value proposition, and founder credentials in one sentence.' },
    { id: 2, title: 'The Problem', description: 'What pain point are you solving?', prompt: 'Write the problem slide for [company]. Describe the problem in one relatable sentence, quantify the pain with a statistic, and show who experiences this problem.' },
    { id: 3, title: 'The Solution', description: 'How do you solve it?', prompt: 'Write the solution slide for [company]. Describe your solution in one sentence, list 3 key features, and explain the primary benefit to users.' },
    { id: 4, title: 'Market Size', description: 'How big is the opportunity?', prompt: 'Calculate the market size for [company]. Provide TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) with realistic numbers.' },
    { id: 5, title: 'Business Model', description: 'How do you make money?', prompt: 'Design the business model for [company]. Include: pricing strategy, revenue streams, unit economics (CAC and LTV), and path to profitability.' },
    { id: 6, title: 'Traction', description: 'What progress have you made?', prompt: 'Create the traction slide for [company]. Include: key metrics, growth rate, notable customers or users, and any revenue or partnerships to date.' },
    { id: 7, title: 'Competitive Landscape', description: 'Who else is doing this?', prompt: 'Map the competitive landscape for [company]. Identify 3-5 competitors, your key differentiator, and your unfair advantage that cannot be easily copied.' },
    { id: 8, title: 'Team', description: 'Why are you the right people?', prompt: 'Write the team slide for [company]. For each founder: name, role, relevant experience in one sentence, and why they are uniquely qualified for this problem.' },
    { id: 9, title: 'The Ask', description: 'What do you need?', prompt: 'Write the ask slide for [company]. Specify: amount raising, use of funds breakdown (%), key milestones this funding will unlock, and timeline to next raise.' },
    { id: 10, title: 'Closing', description: 'Final impression', prompt: 'Write the closing slide for [company]. Include: memorable tagline, contact information, and a clear call to action for interested investors.' },
  ],
  safeTerms: [
    { term: 'Valuation Cap', explanation: 'The maximum valuation at which your investment converts to equity. Example: If the cap is $5M and the next round is at $10M, your shares are priced at the $5M valuation, giving you more equity.' },
    { term: 'Discount Rate', explanation: 'A percentage discount applied to the price per share in the next round. Example: A 20% discount means if the next round price is $1.00/share, SAFE holders convert at $0.80/share.' },
    { term: 'Pro-Rata Rights', explanation: 'The right to participate in future funding rounds to maintain your ownership percentage. Example: If you own 10% and pro-rata rights, you can invest in the next round to keep your 10% stake.' },
    { term: 'Most Favored Nation', explanation: 'A clause ensuring that if you get better terms in the future, those terms apply to earlier investors too. Protects early supporters from being left with worse deals.' },
  ],
}

export const AI_TOOLS = [
  { name: 'Hermes 3', category: 'Coding', freeTier: 'Open source, self-hosted', useCase: 'Fine-tuned for code generation and reasoning', cheatsheet: 'Use specific function signatures and include error handling requirements in your prompt.' },
  { name: 'DeepSeek-Coder', category: 'Coding', freeTier: 'Free API with limits', useCase: 'Best for complex multi-file code generation', cheatsheet: 'Provide full file context and specify the exact function signature you need.' },
  { name: 'Claude 3.5 Sonnet', category: 'Coding', freeTier: 'Free tier via console', useCase: 'Long context understanding for large codebases', cheatsheet: 'Use for refactoring and code review. Paste entire files for best results.' },
  { name: 'Cursor AI', category: 'Coding', freeTier: '200 premium requests/month', useCase: 'AI-first IDE for writing and editing code', cheatsheet: 'Use Cmd+K for inline edits, Cmd+L for chat. Index your codebase for accurate suggestions.' },
  { name: 'Replit AI', category: 'Coding', freeTier: 'Unlimited basic tier', useCase: 'Browser-based coding with AI assistance', cheatsheet: 'Great for quick prototypes. Use the AI to explain code blocks you are unsure about.' },
  { name: 'v0.dev', category: 'Design', freeTier: 'Free tier available', useCase: 'Generate React UI components from text', cheatsheet: 'Describe the component layout in detail. Specify Tailwind classes for styling.' },
  { name: 'Galileo AI', category: 'Design', freeTier: '60 credits/month', useCase: 'Generate high-fidelity UI designs from text', cheatsheet: 'Include layout structure, color preferences, and target audience in your prompt.' },
  { name: 'Midjourney', category: 'Design', freeTier: '25 images/month', useCase: 'Concept art, illustrations, and mockup visuals', cheatsheet: 'Use --ar for aspect ratios. Describe style, mood, and composition separately.' },
  { name: 'Runway ML', category: 'Video', freeTier: '125 credits free', useCase: 'AI video generation and editing', cheatsheet: 'Use text-to-video for B-roll. Great for product demos and social content.' },
  { name: 'Perplexity AI', category: 'Writing', freeTier: 'Free with limits', useCase: 'AI-powered research and fact-checking', cheatsheet: 'Use for market research and competitor analysis. Ask for sources to verify claims.' },
]

export const COMMUNITY_DATA = {
  quizQuestions: [
    { id: 1, text: 'When working on a project, you prefer to:', options: ['Plan everything first', 'Start and figure it out', 'Research extensively'] },
    { id: 2, text: 'In a team conflict, you would:', options: ['Seek compromise', 'Stand your ground', 'Defer to the expert'] },
    { id: 3, text: 'Your ideal work schedule is:', options: ['9-5 structured', 'Flexible hours', 'Intense sprints with breaks'] },
    { id: 4, text: 'When learning something new, you:', options: ['Watch tutorials', 'Read documentation', 'Try and error your way through'] },
    { id: 5, text: 'Your biggest strength is:', options: ['Creative thinking', 'Execution speed', 'Attention to detail'] },
    { id: 6, text: 'Under deadline pressure, you:', options: ['Work longer hours', 'Cut scope strategically', 'Panic but deliver'] },
    { id: 7, text: 'You communicate best via:', options: ['Video calls', 'Written messages', 'In-person meetings'] },
    { id: 8, text: 'Your approach to risk is:', options: ['Calculate carefully', 'Trust your gut', 'Avoid when possible'] },
    { id: 9, text: 'In a startup, you would handle:', options: ['Product vision', 'Technical architecture', 'Business operations'] },
    { id: 10, text: 'Your definition of success is:', options: ['Financial freedom', 'Impact on world', 'Personal fulfillment'] },
  ],
  personalityTypes: {
    'Visionary Hustler': { description: 'You see the big picture and drive forward. You need a Detail-Oriented Builder who can execute your vision.', match: 'Detail-Oriented Builder' },
    'Detail-Oriented Builder': { description: 'You excel at execution and quality. You need a Visionary Hustler to provide direction and momentum.', match: 'Visionary Hustler' },
    'Strategic Operator': { description: 'You balance vision with execution. You need a Creative Disruptor to push boundaries.', match: 'Creative Disruptor' },
    'Creative Disruptor': { description: 'You challenge assumptions and innovate. You need a Strategic Operator to ground your ideas.', match: 'Strategic Operator' },
  },
  qnaBoard: [
    { id: 1, title: 'How to validate a SaaS idea without building?', author: 'Arun R', tags: ['validation', 'saas'], answers: 12 },
    { id: 2, title: 'Best free database for a Next.js app?', author: 'Maria S', tags: ['database', 'nextjs'], answers: 8 },
    { id: 3, title: 'First 100 users strategy for student startup?', author: 'Rohan K', tags: ['marketing', 'growth'], answers: 24 },
    { id: 4, title: 'How to split equity among 3 co-founders?', author: 'Priya M', tags: ['equity', 'legal'], answers: 15 },
    { id: 5, title: 'Stripe vs Lemon Squeezy for payments?', author: 'Amit P', tags: ['payments', 'stripe'], answers: 6 },
  ],
  successStories: [
    { id: 1, name: 'StudyBuddy', description: 'AI-powered study planner for college students', milestone: '500 users in 30 days' },
    { id: 2, name: 'CampusCart', description: 'Peer-to-peer marketplace for students', milestone: 'Revenue positive in 6 weeks' },
    { id: 3, name: 'CodeMentor', description: 'Connect junior and senior developers', milestone: '1000 sessions completed' },
  ],
}

export const GOLDEN_PROMPT_FRAMEWORK = [
  { step: 1, title: 'Define Your Tech Stack', description: 'Specify the exact frameworks, languages, and versions you are using.', example: 'Next.js 14.2, TypeScript, Tailwind CSS, Supabase, Stripe' },
  { step: 2, title: 'Specify Inputs and Outputs', description: 'What data goes in? What should come out? Be explicit about types.', example: 'Input: User email (string), password (string). Output: Auth token (JWT), user object' },
  { step: 3, title: 'List Edge Cases and Constraints', description: 'What could go wrong? What are the performance requirements?', example: 'Edge cases: empty input, invalid email, network error. Constraint: response under 200ms' },
  { step: 4, title: 'Request the Code', description: 'Ask for the implementation with clear structure requirements.', example: 'Provide the code as separate files. Include TypeScript types. Use proper error handling.' },
  { step: 5, title: 'Ask for Tests and Documentation', description: 'Every function should have tests and comments.', example: 'Write Jest tests for all functions. Include JSDoc comments for public APIs.' },
]
