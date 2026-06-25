const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

function getOrCreateSessionId(): string {
  const key = 'portfolio_chat_session'
  const existing = sessionStorage.getItem(key)
  if (existing) return existing
  const id = crypto.randomUUID()
  sessionStorage.setItem(key, id)
  return id
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  body: string
  skills: string[]
  category: string
  codeLink?: string
  siteLink?: string
  institution?: { name: string; url: string }
  warnings?: string[]
}

export interface Skill {
  id: string
  title: string
  level: string
  category: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string
  skills: string[]
  type: string
}

export interface ContactInfo {
  name: string
  email: string
  github: string
  location: string
  openTo: string
}

export type ActionData =
  | { type: 'show_projects'; data: Project[] }
  | { type: 'show_skills'; data: Record<string, Skill[]> }
  | { type: 'show_experience'; data: ExperienceItem[] }
  | { type: 'get_contact'; data: ContactInfo }
  | { type: 'unknown'; data: null }

export interface ChatResponse {
  reply: string
  actions: ActionData[]
}

export async function sendChatMessage(
  tenant: string,
  message: string,
  history: ChatMessage[]
): Promise<ChatResponse> {
  const sessionId = getOrCreateSessionId()
  const res = await fetch(`${API_URL}/api/${tenant}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, sessionId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? 'Chat failed')
  }

  return res.json() as Promise<ChatResponse>
}
