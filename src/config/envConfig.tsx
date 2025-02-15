type Environment = {
  [key: string]: string
}

const config: Environment = {
  ...window._env_,
  VITE_API_URL:
    window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL || '',
}

if (!config.VITE_API_URL) {
  throw new Error('Missing required environment variable: VITE_API_URL')
}

export default config
