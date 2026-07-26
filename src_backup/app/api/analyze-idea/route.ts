import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODELS = [
  process.env.OPENROUTER_MODEL,
  'nvidia/nemotron-3-ultra-550b-a55b-20260604:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'google/gemini-2.0-flash-001',
  'openai/gpt-4o-mini',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
].filter(Boolean) as string[]

const SYSTEM_PROMPT = `You are an expert startup analyst for student entrepreneurs. Analyze the given startup idea and respond with ONLY valid JSON (no markdown, no code fences) in this exact structure:

{
  "score": <number 1-100>,
  "verdict": "<one sentence verdict>",
  "strengths": ["<s1>", "<s2>", "<s3>", "<s4>"],
  "weaknesses": ["<w1>", "<w2>", "<w3>", "<w4>"],
  "opportunities": ["<o1>", "<o2>", "<o3>"],
  "threats": ["<t1>", "<t2>", "<t3>"],
  "suggestions": ["<sg1>", "<sg2>", "<sg3>", "<sg4>"],
  "targetMarket": "<target market description>",
  "monetization": "<2-4 monetization strategies>",
  "competitors": [
    {"name": "<name>", "difference": "<your edge>", "threat_level": "<low|medium|high>"},
    {"name": "<name>", "difference": "<your edge>", "threat_level": "<low|medium|high>"}
  ],
  "businessModel": "<business model type>",
  "mvpTimeline": "<weeks to build MVP>",
  "estimatedCost": "<monthly burn rate>",
  "nextSteps": ["<step1>", "<step2>", "<step3>", "<step4>"],
  "keyMetrics": ["<metric1>", "<metric2>", "<metric3>"],
  "pivotSuggestion": "<pivot idea>"
}

Scoring: 80-100 Excellent, 60-79 Good, 40-59 Decent, 20-39 Weak, 1-19 Needs Work. Be honest and specific. Consider Indian student context.`;

async function callOpenRouter(userPrompt: string): Promise<{ response: Response; modelUsed: string }> {
  const url = 'https://openrouter.ai/api/v1/chat/completions'

  for (const model of OPENROUTER_MODELS) {
    const body = {
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'HORIZON — AI Startup Analyzer',
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      return { response: res, modelUsed: model }
    }

    const errText = await res.text().catch(() => '')
    console.warn(`Model ${model} failed (${res.status}): ${errText.slice(0, 200)}`)
  }

  // All models failed — return last response
  const body = {
    model: OPENROUTER_MODELS[0],
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 4096,
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'HORIZON — AI Startup Analyzer',
    },
    body: JSON.stringify(body),
  })
  return { response: res, modelUsed: OPENROUTER_MODELS[0] }
}

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured. Please add OPENROUTER_API_KEY to .env.local and restart the dev server.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { idea } = body

    if (!idea || typeof idea !== 'string' || idea.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide a detailed idea description (at least 20 characters)' },
        { status: 400 }
      )
    }

    const userPrompt = `Analyze this startup idea thoroughly:\n\n"${idea.trim()}"\n\nProvide a comprehensive analysis covering all fields requested. Be specific, honest, and actionable. Think about: market size, competitive landscape, execution risk, monetization viability, team requirements, and timing. Consider the founder is likely a student with limited resources and network.`

    const { response, modelUsed } = await callOpenRouter(userPrompt)

    if (response.status === 429) {
      return NextResponse.json(
        { error: 'AI is currently at capacity. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => null)
      const errorMessage = errData?.error?.message || errData?.message || `API returned ${response.status}`
      console.error(`OpenRouter error with model ${modelUsed}: ${errorMessage}`)
      return NextResponse.json(
        { error: `AI service error: ${errorMessage}` },
        { status: 500 }
      )
    }

    const data = await response.json().catch(() => null)

    if (!data) {
      return NextResponse.json(
        { error: 'Empty response from AI service. Please try again.' },
        { status: 500 }
      )
    }

    if (data.error) {
      console.error('OpenRouter API body error:', data.error)
      return NextResponse.json(
        { error: `AI error: ${data.error?.message || 'Unknown error'}. Please try again.` },
        { status: 500 }
      )
    }

    // Extract the response text from OpenRouter's OpenAI-compatible format
    const text = data?.choices?.[0]?.message?.content

    if (!text) {
      console.error('OpenRouter: no content in response:', JSON.stringify(data).slice(0, 500))
      return NextResponse.json(
        { error: 'No analysis content returned from AI. Please try again.' },
        { status: 500 }
      )
    }

    // Parse JSON from the response (handle markdown code fences)
    let cleanText = text.trim()
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    // Attempt to extract JSON even if there's trailing content
    if (!cleanText.startsWith('{')) {
      const jsonStart = cleanText.indexOf('{')
      const jsonEnd = cleanText.lastIndexOf('}')
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanText = cleanText.slice(jsonStart, jsonEnd + 1)
      }
    }

    let analysis
    try {
      analysis = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', cleanText.slice(0, 300))
      return NextResponse.json(
        { error: 'AI returned an invalid response format. Please try again.' },
        { status: 500 }
      )
    }

    // Validate required fields
    if (typeof analysis.score !== 'number' || !Array.isArray(analysis.strengths)) {
      return NextResponse.json(
        { error: 'AI response was incomplete. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(analysis)

  } catch (error: any) {
    console.error('Analysis route error:', error)

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong analyzing your idea. Please try again.' },
      { status: 500 }
    )
  }
}
