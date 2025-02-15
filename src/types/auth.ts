export type User = {
  id: string
  names: string
  surnames: string
  roles: string[]
  photoUrl?: string
}

export type LoginCredentials = {
  username: string
  password: string
}

export type LoginResponse = {
  user: User
  token: string
}

export type RefreshTokenResponse = {
  token: string
}
