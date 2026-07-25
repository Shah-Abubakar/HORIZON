'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone,
  Twitter,
  Linkedin,
  MessageCircle,
  FileText,
  Mail,
  List,
  Users,
  Search,
  BarChart3,
  DollarSign,
  Smartphone,
  Globe,
  Star,
  Zap,
  Sparkles,
  Target,
  TrendingUp,
  Rocket,
  X,
  ChevronRight,
  Youtube,
  Mic,
  Award,
  Radio,
  Gift,
  Send,
  Headphones,
  Music,
} from 'lucide-react'

type Method = {
  icon: React.ElementType
  name: string
  description: string
  cost: string
  costLabel: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  reach: string
  bestFor: string
  prompt: string
  steps: string[]
}

const freeMethods: Method[] = [
  {
    icon: Twitter,
    name: 'X (Twitter) Threads',
    description: 'Build in public with daily threads. Share milestones, lessons, and behind-the-scenes to attract early adopters.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Medium',
    reach: '1K–50K impressions per thread',
    bestFor: 'Building audience before launch',
    prompt: 'Write a Twitter/X thread announcing my product [product name]. Hook, 5 value-packed tweets, strong CTA. Each tweet under 280 characters.',
    steps: [
      'Research trending topics and conversations in your niche to identify what resonates with your audience.',
      'Outline a thread structure: a strong hook tweet followed by 5–7 value-packed tweets that build on each other.',
      'Write the thread with short, punchy sentences. Each tweet should stand alone but drive readers to the next.',
      'Add relevant visuals — screenshots, data charts, or product GIFs — to increase engagement by 2–3×.',
      'Post at peak hours (7–9 AM or 12–2 PM in your timezone) and reply to every comment within the first hour.',
      'Pin the thread to your profile and share it in relevant communities for extended reach.',
    ],
  },
  {
    icon: Linkedin,
    name: 'LinkedIn Organic',
    description: 'Publish thought leadership posts about the problem you are solving. Engage in relevant industry groups.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Medium',
    reach: '500–10K impressions per post',
    bestFor: 'B2B and professional services',
    prompt: 'Write a LinkedIn post about the problem [product] solves. Include a personal story, key insight, and a question to drive engagement.',
    steps: [
      'Optimize your LinkedIn profile — professional photo, keyword-rich headline, and a clear "what I do" summary.',
      'Identify your target audience: specific job titles, industries, and company sizes relevant to your product.',
      'Create a content calendar: 3 posts/week — one thought leadership, one educational, one personal story.',
      'Write posts with a strong opener, a teaching moment, and a question to drive comments and engagement.',
      'Engage with 20+ relevant posts daily in your niche — meaningful comments, not just likes.',
      'Track which post formats drive the most profile views and inbound messages, then double down.',
    ],
  },
  {
    icon: MessageCircle,
    name: 'Community Engagement',
    description: 'Join Reddit, Indie Hackers, and niche Slack/Discord communities. Provide genuine value before promoting.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Medium',
    reach: '100–1K targeted interactions',
    bestFor: 'Validation and word-of-mouth',
    prompt: 'Generate 5 helpful comments I can leave on Reddit and Indie Hackers threads related to [industry]. Genuine value first, mention product naturally.',
    steps: [
      'Find 3–5 active communities (Reddit subreddits, Indie Hackers, niche Discords) where your target users hang out.',
      'Spend a week just reading — understand the culture, common questions, and what content gets upvoted.',
      'Start answering questions with genuine, detailed value. No promotion — just be the most helpful person in the room.',
      'Build reputation (15–20 high-value comments) before subtly mentioning your product as a solution when relevant.',
      'Share your own experiences and lessons learned — people connect with stories more than product pitches.',
      'Set a daily goal: 3–5 helpful interactions. Consistency matters more than volume in community building.',
    ],
  },
  {
    icon: FileText,
    name: 'Content Marketing',
    description: 'Write blog posts, tutorials, and case studies. SEO-optimized content brings organic traffic long-term.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Hard',
    reach: '100–5K monthly visitors',
    bestFor: 'Long-term organic growth',
    prompt: 'Create an outline for a blog post about [topic]. Include SEO keywords, intro hook, 5 main sections with key points, and a CTA.',
    steps: [
      'Research keywords your target audience searches for using tools like Ahrefs, SEMrush, or Google Keyword Planner.',
      'Create a content pillar strategy: one comprehensive guide + 5 supporting blog posts that link back to it.',
      'Write detailed outlines first — intro hook, 5 sections with subheadings, key takeaways, and a CTA.',
      'Write in a clear, conversational tone. Use short paragraphs, bullet points, and visuals to break up text.',
      'Optimize on-page SEO: meta title, description, heading tags, internal links, and image alt text.',
      'Promote each post across social channels, email lists, and relevant communities for the first 48 hours.',
    ],
  },
  {
    icon: Mail,
    name: 'Cold Email Outreach',
    description: 'Personalized cold emails to potential users, bloggers, and partners. Keep it under 100 words.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Hard',
    reach: '10–50 replies per 100 sent',
    bestFor: 'Direct user acquisition',
    prompt: 'Write a cold email for [product] targeting [audience]. Subject line, short body under 100 words, one clear CTA. Personalize for their industry.',
    steps: [
      'Build a list of 50–100 prospects — users, bloggers, journalists, or potential partners in your niche.',
      'Research each prospect: find their pain points, recent content, or a genuine reason to reach out.',
      'Craft a short email (<100 words): personalized subject line, compliment or common ground, 1-sentence value prop, clear CTA.',
      'Test different subject line styles: curiosity, benefit-driven, or direct. Track open rates to find what works.',
      'Send in small batches (20/day) to avoid spam flags and allow time to personalize each one.',
      'Follow up 3–5 days later with a brief, value-add message. A second touch converts 2× better than the first.',
    ],
  },
  {
    icon: List,
    name: 'Directory Listings',
    description: 'List your product on Product Hunt, BetaList, Hacker News, and niche directories for free exposure.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Easy',
    reach: '100–5K visitors per listing',
    bestFor: 'Pre-launch buzz',
    prompt: 'Write a Product Hunt description for [product]. Tagline (60 chars max), description, maker story, and launch day plan.',
    steps: [
      'Identify the top 10 directories for your niche: Product Hunt, BetaList, Hacker News, G2, Capterra, AlternativeTo, and industry-specific ones.',
      'Create a compelling listing for each: clear tagline (60 chars), benefit-driven description, relevant categories, and high-quality screenshots.',
      'Write unique copy for each directory — no copy-pasting. Tailor the angle to each platform.s audience.',
      'Optimize your listing with relevant tags, a demo video or GIF, and social proof (user count, testimonials).',
      'Submit and track each listing. Some directories have review processes — follow up if not approved in 2 weeks.',
      'Monitor traffic from each directory and double down on the 2–3 that drive the most signups.',
    ],
  },
  {
    icon: Users,
    name: 'Referral Program',
    description: 'Give existing users a reason to invite others. Offer credits, early access, or exclusive features.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Medium',
    reach: '10–30% of users refer others',
    bestFor: 'Organic viral growth',
    prompt: 'Design a referral program for [product]. Incentive structure, sharing mechanics, and example invite message.',
    steps: [
      'Define the incentive: credit toward their subscription, extended trial, exclusive features, or cash rewards.',
      'Make sharing dead simple — one-click share links, pre-written social posts, and email templates ready to go.',
      'Set up tracking: unique referral links, a dashboard to monitor invites, and automated reward fulfillment.',
      'Launch to your most engaged users first — they are your best advocates and will give you feedback.',
      'Promote the program inside your product: post-signup screen, dashboard banner, and periodic email reminders.',
      'Measure: referral conversion rate, cost per acquisition, and lifetime value of referred vs organic users.',
    ],
  },
  {
    icon: Globe,
    name: 'Open Source / Free Tool',
    description: 'Release a free tool or open-source library related to your product. Drive users through utility.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Hard',
    reach: '100–10K GitHub stars',
    bestFor: 'Developer-focused products',
    prompt: 'Suggest a free tool or open-source project I can build that relates to [product] and would attract my target users.',
    steps: [
      'Identify a common pain point your target users face that you can solve with a small, focused tool.',
      'Build the tool with clean documentation, a good README, and a live demo or hosted version.',
      'Release it on GitHub with an open-source license, clear contribution guidelines, and a code of conduct.',
      'Promote on Hacker News, Reddit, and dev communities. Frame it as a useful resource, not a marketing asset.',
      'Engage with every issue, PR, and discussion. An active maintainer attracts more contributors and users.',
      'Add a subtle "built by" note or a link to your product in the README and the tools footer.',
    ],
  },
  {
    icon: Youtube,
    name: 'YouTube Channel',
    description: 'Create a YouTube channel around your niche. Tutorials, product demos, case studies, and industry insights build trust and a loyal audience that converts over time.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Hard',
    reach: '500–50K views per video',
    bestFor: 'Long-term brand authority and SEO',
    prompt: 'Plan a YouTube content strategy for my product [product]. Channel name ideas, 10 video topics, upload schedule, and thumbnails brief.',
    steps: [
      'Define your channel niche and target audience — create content that solves specific problems your ideal users search for on YouTube.',
      'Set up your channel with a professional banner, profile picture, channel trailer, and playlists organized by content type.',
      'Invest in basics: a decent microphone (audio quality matters more than video), good lighting, and free editing software like DaVinci Resolve or CapCut.',
      'Plan a content mix: 40% tutorials/how-to, 30% product demos and case studies, 20% industry insights, 10% behind-the-scenes and personality content.',
      'Optimize every video for search: keyword-rich title, compelling thumbnail with faces and text overlay, detailed description with timestamps, and relevant tags.',
      'Post consistently — weekly uploads minimum. Engage with every comment, pin a question to drive discussion, and end each video with a clear CTA.',
    ],
  },
  {
    icon: Mic,
    name: 'Podcast Guesting',
    description: 'Get interviewed on podcasts in your industry. One appearance reaches a warm, targeted audience and builds backlinks and credibility for years.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Medium',
    reach: '500–5K listeners per appearance',
    bestFor: 'Personal brand and backlinks',
    prompt: 'Create a podcast pitch kit for [product]. My expertise, 5 talking points, target podcast list, and outreach email template.',
    steps: [
      'Identify 20–30 podcasts in your industry using Spotify, Apple Podcasts, Podchaser, and "guest for [your niche] podcast" Google searches.',
      'Listen to 2–3 episodes of each target podcast to understand the host style, audience, and topics they cover.',
      'Craft a personalized pitch: compliment a specific episode, explain why you would be a great guest, and propose 3 specific topics you can cover.',
      'Create a one-sheet: your bio, headshot, talking points, and what listeners will learn. Hosts love a ready-to-publish asset.',
      'Prepare for each recording: 5 key stories, 3 actionable takeaways for listeners, and a natural way to mention your product without sounding salesy.',
      'After the episode airs, share it across your channels, tag the host, and repurpose the content into social clips, blog posts, and email newsletters.',
    ],
  },
  {
    icon: Award,
    name: 'Viral Challenges & Contests',
    description: 'Launch a shareable challenge, giveaway, or contest that incentivizes user-generated content and organic sharing across platforms.',
    cost: 'Free',
    costLabel: 'Free (prize cost optional)',
    difficulty: 'Medium',
    reach: '1K–100K impressions per campaign',
    bestFor: 'Rapid brand awareness and UGC',
    prompt: 'Design a viral challenge or contest for [product]. Challenge concept, entry mechanics, prize structure, and promotion plan.',
    steps: [
      'Define a clear, simple challenge mechanic — the easier it is to participate, the more entries you will get. Think "post a photo with our product" not "produce a 3-minute video."',
      'Choose a compelling prize structure: grand prize (high-value), 2–3 runner-up prizes (medium), and a participation reward (discount code or shoutout).',
      'Design shareable assets: a branded hashtag, template graphics participants can use, and clear entry instructions in a single image.',
      'Launch on the platform where your audience is most active. Cross-promote on every other channel with a consistent hashtag.',
      'Engage actively during the contest period — share entries, comment, and create a gallery of submissions to encourage more participation.',
      'After the contest, repurpose the best UGC in your marketing, announce winners publicly, and run a retargeting campaign to all participants.',
    ],
  },
  {
    icon: Search,
    name: 'SEO Optimization',
    description: 'Optimize your website and content for search engines. Organic traffic compounds over time and delivers the highest ROI of any free channel.',
    cost: 'Free',
    costLabel: 'Free',
    difficulty: 'Hard',
    reach: '100–10K monthly organic visitors',
    bestFor: 'Sustainable long-term traffic',
    prompt: 'Create an SEO strategy for [product website]. Technical audit items, keyword targets, content plan, and backlink strategy.',
    steps: [
      'Conduct a technical SEO audit: check site speed (Core Web Vitals), mobile responsiveness, crawl errors, XML sitemap, and robots.txt configuration.',
      'Research keywords using Google Keyword Planner, Ahrefs, or SEMrush. Focus on long-tail keywords with commercial intent and low competition.',
      'Optimize every page: unique meta title and description, proper heading hierarchy (H1 → H2 → H3), internal links, image alt text, and structured data markup.',
      'Create a content hub — a pillar page (comprehensive guide) + 5–10 supporting blog posts that link back to it. This signals topical authority to Google.',
      'Build backlinks through guest posting, broken link building, resource page outreach, and creating linkable assets (original research, infographics, free tools).',
      'Track rankings weekly using Google Search Console and a rank tracker. Double down on pages ranking 4–10 — they are one optimization away from page 1.',
    ],
  },
]

const paidMethods: Method[] = [
  {
    icon: Search,
    name: 'Google Ads',
    description: 'Target high-intent keywords. Best for SaaS tools with clear search demand and immediate conversion potential.',
    cost: '$200',
    costLabel: '$200/mo minimum',
    difficulty: 'Medium',
    reach: '1K–10K targeted clicks/mo',
    bestFor: 'High-intent user acquisition',
    prompt: 'Write 10 Google Ads headlines and descriptions for [product]. Focus on high-intent keywords. Include CTAs and USPs.',
    steps: [
      'Research high-intent keywords using Google Keyword Planner — focus on terms with commercial intent like "best [product type] for [use case]".',
      'Create 3–4 ad groups, each targeting a different keyword theme or audience segment with dedicated ad copy.',
      'Write 3 headlines and 2 descriptions per ad group. Include USPs, numbers, and strong CTAs in each combination.',
      'Set up conversion tracking: install the Google Ads tag, define key events (signup, purchase), and link Google Analytics.',
      'Start with a small daily budget ($20–$50/day) for 7–14 days to gather data before scaling.',
      'Optimize weekly: pause low-performing keywords, increase bids on high-converting ones, refresh ad copy monthly.',
    ],
  },
  {
    icon: BarChart3,
    name: 'LinkedIn Ads',
    description: 'Target by job title, industry, company size. Best for B2B products with specific professional audiences.',
    cost: '$500',
    costLabel: '$500/mo minimum',
    difficulty: 'Hard',
    reach: '5K–50K targeted impressions/mo',
    bestFor: 'B2B and professional services',
    prompt: 'Create a LinkedIn ad campaign for [product]. Target audience, ad copy, headline, and CTA for 3 different audience segments.',
    steps: [
      'Define your target audience precisely: job titles, industries, company sizes, seniority levels, and skills.',
      'Choose the right ad format: single image for brand awareness, carousel for multiple features, or conversation ads for lead gen.',
      'Write ad copy that speaks to professional pain points — focus on ROI, efficiency, and competitive advantage.',
      'Set up the LinkedIn Insight Tag for conversion tracking and audience retargeting.',
      'Start with a budget of $100/day minimum — LinkedIn requires higher spend for meaningful results.',
      'A/B test headlines, visuals, and CTAs. LinkedIn audience saturation happens fast — refresh creatives every 2 weeks.',
    ],
  },
  {
    icon: Smartphone,
    name: 'Meta Ads (FB/IG)',
    description: 'Target by interests, behaviors, and demographics. Best for B2C products with visual appeal.',
    cost: '$300',
    costLabel: '$300/mo minimum',
    difficulty: 'Medium',
    reach: '10K–100K impressions/mo',
    bestFor: 'B2C and consumer products',
    prompt: 'Design a Facebook/Instagram ad campaign for [product]. Audience targeting, creative brief, ad copy, and A/B test strategy.',
    steps: [
      'Define your audience by interests, demographics, behaviors, and lookalike sources from existing customers.',
      'Create 3–4 ad sets with different audience targeting angles to discover which segments perform best.',
      'Design mobile-first creatives: 4:5 or 1:1 aspect ratio, bold text overlay, and the first 3 seconds must hook attention.',
      'Write ad copy that leads with emotion or problem, not features. Use social proof and urgency in the CTA.',
      'Set up the Meta Pixel and configure 7 standard events (ViewContent, AddToCart, Purchase, etc.).',
      'Monitor frequency — if it exceeds 3–4, refresh creatives. Scale winning ad sets by 20–30% every 3 days.',
    ],
  },
  {
    icon: Star,
    name: 'Influencer Marketing',
    description: 'Partner with micro-influencers in your niche. Authentic recommendations drive trust and conversions.',
    cost: '$200',
    costLabel: '$200–$2,000 per campaign',
    difficulty: 'Medium',
    reach: '1K–50K engaged views per post',
    bestFor: 'Social proof and brand awareness',
    prompt: 'Write an influencer outreach template for [product]. Include: intro, what we offer, collaboration options, and expected deliverables.',
    steps: [
      'Find micro-influencers (1K–50K followers) in your niche using tools like Upfluence, Heepsy, or manual hashtag searches.',
      'Vet each influencer: engagement rate (>3%), audience authenticity, content quality, and brand alignment.',
      'Draft a personalized outreach email — mention their specific content, explain why your product fits their audience, and propose a collaboration.',
      'Negotiate deliverables: number of posts, format (story, reel, post), usage rights, and timeline.',
      'Provide creatives and talking points but let them use their authentic voice — scripted posts perform worse.',
      'Track each campaign with unique UTM links, promo codes, and ask for screenshots of analytics.',
    ],
  },
  {
    icon: Rocket,
    name: 'Product Hunt Featured',
    description: 'Get featured placement on Product Hunt. Higher visibility, more upvotes, and featured badge.',
    cost: '$199',
    costLabel: '$199 one-time',
    difficulty: 'Easy',
    reach: '5K–50K visitors on launch day',
    bestFor: 'Launch day momentum',
    prompt: 'Write a complete Product Hunt launch strategy for [product]. Tagline, description, first comment, and hunter outreach message.',
    steps: [
      'Prepare 2 weeks before launch: craft your tagline (60 chars), description, and first comment story.',
      'Build your hunter network — reach out to 10–15 Product Hunt makers and ask them to hunt your product.',
      'Prepare all assets: demo GIF, 5–8 screenshots, a launch video under 60 seconds, and social media banners.',
      'On launch day, post your product at 12:01 AM PT. Share the link with your network immediately.',
      'Engage all day: reply to every comment within 5 minutes, post updates on X/Twitter every 2 hours.',
      'Send personalized thank-you messages to everyone who supported. Follow up with featured press coverage.',
    ],
  },
  {
    icon: Megaphone,
    name: 'PR / Press Outreach',
    description: 'Hire a PR freelancer or use a service like HARO to get featured in relevant publications.',
    cost: '$500',
    costLabel: '$500–$5,000 per campaign',
    difficulty: 'Hard',
    reach: '10K–100K readers per feature',
    bestFor: 'Credibility and authority',
    prompt: 'Write a press release for [product]. Include: headline, subheading, body with key stats, founder quote, and media contact info.',
    steps: [
      'Develop your story angle — journalists care about trends, data, and human interest, not product launches.',
      'Build a press list of 20–30 journalists who cover your industry using tools like Muck Rack or Cision.',
      'Write a concise press release: compelling headline, 5 Ws in the first paragraph, founder quote, and boilerplate.',
      'Use HARO (Help a Reporter Out) — sign up as a source and respond to relevant queries daily.',
      'Pitch personally to each journalist — no mass blasts. Reference their recent articles to show you did your homework.',
      'Follow up once after 5–7 days with a brief, polite check-in. Offer exclusive data or an interview opportunity.',
    ],
  },
  {
    icon: Mail,
    name: 'Newsletter Sponsorships',
    description: 'Sponsor relevant newsletters in your industry. Highly targeted audiences that trust the curator.',
    cost: '$200',
    costLabel: '$200–$1,000 per issue',
    difficulty: 'Easy',
    reach: '1K–50K targeted subscribers',
    bestFor: 'Targeted traffic to landing page',
    prompt: 'Write a newsletter sponsorship ad for [product]. Subject line, intro blurb (50 words), CTA, and tracking UTM parameters.',
    steps: [
      'Find newsletters in your niche using tools like SparkToro, Newsletter Crew, or searching "newsletter + [your industry]" on Google.',
      'Evaluate each newsletter: subscriber count, open rate (>30%), audience demographics, and past sponsors.',
      'Prepare your ad — a 50–100 word native-style blurb that reads like a recommendation from the curator.',
      'Include a special offer or UTM-tagged link so you can track conversions from each newsletter.',
      'Test 3–5 different newsletters simultaneously with the same offer to compare cost per acquisition.',
      'Scale the best-performing newsletter by negotiating a multi-issue package deal for a discounted rate.',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Retargeting Ads',
    description: 'Show ads to people who visited your site but did not convert. Highest ROI paid channel.',
    cost: '$300',
    costLabel: '$300/mo minimum',
    difficulty: 'Medium',
    reach: 'Recover 5–15% of lost visitors',
    bestFor: 'Conversion optimization',
    prompt: 'Create a retargeting ad strategy for [product]. Audience segments, ad creative ideas, frequency caps, and offer suggestions.',
    steps: [
      'Install the retargeting pixel on your site (Meta Pixel, Google Ads tag, LinkedIn Insight Tag) and let it gather data for 7–14 days.',
      'Create audience segments: all visitors (top of funnel), product page visitors (mid funnel), cart abandoners (bottom funnel).',
      'Design ads for each funnel stage: awareness (brand + problem), consideration (features + social proof), conversion (offer + urgency).',
      'Set frequency caps — 3–5 impressions per user per day to avoid ad fatigue and brand damage.',
      'Use dynamic product ads for e-commerce or SaaS — show users the exact product or feature page they visited.',
      'Monitor and optimize: exclude converters, adjust bids by segment, and refresh creatives every 2–3 weeks.',
    ],
  },
  {
    icon: Music,
    name: 'TikTok Ads',
    description: 'Run ads on TikTok to reach younger, high-engagement audiences. Short-form video creatives with strong hooks drive viral potential and conversions.',
    cost: '$250',
    costLabel: '$250/mo minimum',
    difficulty: 'Medium',
    reach: '50K–500K impressions/mo',
    bestFor: 'B2C, DTC, and lifestyle products',
    prompt: 'Create a TikTok ad strategy for [product]. Audience targeting, 3 video creative concepts, hook ideas, and budget allocation.',
    steps: [
      'Set up TikTok Ads Manager and install the TikTok Pixel on your site for conversion tracking and audience building.',
      'Define your audience: age (18–34 sweet spot), interests, behaviors, and create 2–3 lookalike audiences from your customer list.',
      'Create 3–5 ad creatives per campaign: each video must hook viewers in the first 2 seconds with a bold visual or question.',
      'Use TikTok-native formats: Spark Ads (boost organic posts), In-Feed Ads (native-looking), and Branded Hashtag Challenge for virality.',
      'Set a daily budget of $30–$50 minimum. TikTok algorithm needs data to optimize — give it time and creative variety.',
      'Monitor key metrics: CTR, CPM, completion rate (>25% is good), and cost per conversion. Refresh creatives every 5–7 days.',
    ],
  },
  {
    icon: Headphones,
    name: 'Podcast Sponsorships',
    description: 'Sponsor episodes of popular podcasts in your industry. Host-read ads feel personal and drive high-intent traffic from loyal audiences.',
    cost: '$500',
    costLabel: '$500–$3,000 per episode',
    difficulty: 'Medium',
    reach: '2K–50K listeners per episode',
    bestFor: 'Niche audience targeting',
    prompt: 'Write a podcast sponsorship pitch deck for [product]. Target podcast criteria, ad script (host-read), offer for listeners, and tracking setup.',
    steps: [
      'Find podcasts your target audience listens to using Spotify Ad Studio, Podcorn, or manually searching "best [industry] podcasts."',
      'Evaluate each podcast: monthly downloads (>5K), audience demographics, listener engagement, and whether they already run host-read ads.',
      'Write a host-read ad script — 60–90 seconds that tells a story, introduces the problem, presents your product as the solution, and includes a unique discount code.',
      'Negotiate pricing per episode or as a multi-episode package. Ask for a dedicated segment (mid-roll) rather than a pre-roll for better conversion.',
      'Set up a unique landing page with UTM parameters and a promo code so you can track exactly which podcast drives conversions.',
      'Repurpose each episode: share clips, quote the host on social, and use the recording as social proof in your sales materials.',
    ],
  },
  {
    icon: Gift,
    name: 'Affiliate Marketing Program',
    description: 'Recruit affiliates who earn commission for every sale they refer. Performance-based — you only pay for results, not clicks or impressions.',
    cost: '$200',
    costLabel: '$200/mo + 15–30% commission',
    difficulty: 'Medium',
    reach: 'Varies by affiliate network size',
    bestFor: 'Scalable performance marketing',
    prompt: 'Design an affiliate program for [product]. Commission structure, affiliate tiers, promotional materials, and recruitment strategy.',
    steps: [
      'Choose your platform: ShareASale, PartnerStack, or FirstPromoter for SaaS; Refersion or Shopify Collabs for e-commerce.',
      'Set commission rates: 20–30% for SaaS subscriptions (recurring), 10–15% for one-time products. Offer higher rates for top-tier affiliates.',
      'Create affiliate resources: banner ads, email templates, social media copy, comparison charts, and a swipe file of proven messaging.',
      'Recruit in phases: first 10 affiliates manually (email existing happy customers), then open applications with clear criteria.',
      'Provide affiliates with unique tracking links, a dashboard to monitor performance, and regular communication (weekly tips, new creatives).',
      'Pay commissions monthly with a minimum payout threshold ($50–$100). Review affiliate performance quarterly — prune inactive ones, reward top performers.',
    ],
  },
  {
    icon: Send,
    name: 'Email Marketing Automation',
    description: 'Use paid email tools to send targeted drip campaigns, product updates, and personalized offers. Highest ROI channel at $42 per $1 spent.',
    cost: '$50',
    costLabel: '$50–$400/mo for tools',
    difficulty: 'Medium',
    reach: '20–40% open rates on warm lists',
    bestFor: 'Nurturing leads and reactivating users',
    prompt: 'Build an email marketing automation flow for [product]. Welcome sequence (5 emails), re-engagement campaign, and weekly newsletter template.',
    steps: [
      'Choose your email platform: ConvertKit (creators), Mailchimp (e-commerce), HubSpot (enterprise), or Loops (SaaS) based on your needs and list size.',
      'Build your list with lead magnets (free guide, checklist, templates) and embedded signup forms on your site and in your product.',
      'Create a welcome sequence: 5 emails over 7 days — welcome + value, problem deep-dive, product solution, case study, and testimonial + offer.',
      'Segment your list by behavior: new signups, trial users, paying customers, and churned users. Each segment gets different messaging and frequency.',
      'Set up triggered automations: abandoned cart (1h, 24h, 72h), feature announcement after signup, re-engagement after 60 days of inactivity.',
      'Track and optimize: open rate (>25% is good), click rate (>3%), unsubscribe rate (<0.5%). A/B test subject lines, send times, and CTAs weekly.',
    ],
  },
  {
    icon: Radio,
    name: 'Community Sponsorships',
    description: 'Sponsor existing communities (Slack, Discord, newsletters, events) that your target audience already trusts and participates in daily.',
    cost: '$300',
    costLabel: '$300–$1,500 per sponsorship',
    difficulty: 'Easy',
    reach: '1K–20K engaged community members',
    bestFor: 'Building trust through association',
    prompt: 'Write a community sponsorship proposal for [product]. Target community criteria, sponsorship tier ideas, deliverables, and ROI tracking.',
    steps: [
      'Identify 10–15 active communities (Slack groups, Discord servers, Reddit communities, industry events) where your target users spend time.',
      'Evaluate each community: member count, activity level (daily active memberships post ratio), engagement quality, and existing sponsorship models.',
      'Reach out to community managers with a sponsorship proposal: what you offer (value to their members), what you ask for (mention, logo placement, dedicated post).',
      'Offer tiered sponsorship: Bronze ($300 — logo + mention), Silver ($700 — logo + dedicated post + welcome email), Gold ($1,500 — all above + co-hosted event).',
      'Prepare value-add content for the community: an exclusive discount code, a free resource, or a Q&A session — not just a banner ad.',
      'Measure ROI: track referral traffic from community links, use unique promo codes, and survey community members for brand recall after the sponsorship ends.',
    ],
  },
]

const difficultyColors = {
  Easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
}

export default function MarketingHustle() {
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free')
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null)

  const methods = activeTab === 'free' ? freeMethods : paidMethods

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-primary/15 flex items-center justify-center flex-shrink-0">
            <Megaphone size={26} className="text-accent-highlight" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Marketing Hustle</h1>
            <p className="text-accent-primary-dark max-w-xl">
              Get your first users with proven promotion strategies. We have curated {freeMethods.length} free and {paidMethods.length} paid methods to grow your startup.
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
          <button
            onClick={() => setActiveTab('free')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'free'
                ? 'bg-accent-highlight text-dark-900 shadow-lg'
                : 'text-accent-primary-dark hover:text-accent-primary-light'
            }`}
          >
            <Sparkles size={16} />
            Free Methods
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'paid'
                ? 'bg-accent-highlight text-dark-900 shadow-lg'
                : 'text-accent-primary-dark hover:text-accent-primary-light'
            }`}
          >
            <DollarSign size={16} />
            Paid Methods
          </button>
        </div>
      </motion.div>

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
            const Icon = method.icon
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
                    <Icon size={20} className="text-accent-highlight" />
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
                      : 'text-accent-highlight bg-accent-primary/10 border border-accent-primary/20'
                  }`}>
                    {activeTab === 'free' ? <Sparkles size={11} /> : <DollarSign size={11} />}
                    {method.costLabel}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${difficultyColors[method.difficulty]}`}>
                    <Zap size={11} />
                    {method.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Target size={12} className="text-accent-primary-dark flex-shrink-0" />
                    <span className="text-accent-primary-dark">Reach: </span>
                    <span className="text-accent-primary-light">{method.reach}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={12} className="text-accent-primary-dark flex-shrink-0" />
                    <span className="text-accent-primary-dark">Best for: </span>
                    <span className="text-accent-primary-light">{method.bestFor}</span>
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-accent-highlight bg-accent-primary/10 border border-accent-primary/20">
                    {activeTab === 'free' ? <Sparkles size={11} /> : <DollarSign size={11} />}
                    {selectedMethod.costLabel}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${difficultyColors[selectedMethod.difficulty]}`}>
                    <Zap size={11} />
                    {selectedMethod.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20">
                    <Target size={11} />
                    {selectedMethod.reach}
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
