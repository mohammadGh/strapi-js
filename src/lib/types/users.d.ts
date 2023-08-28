export type StrapiAuthProvider =
  | 'github'
  | 'facebook'
  | 'google'
  | 'cognito'
  | 'twitter'
  | 'discord'
  | 'twitch'
  | 'instagram'
  | 'vk'
  | 'linkedin'
  | 'cas'
  | 'reddit'
  | 'auth0'
  | string

export type StrapiUser = {
  id: number
  username?: string
  email?: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
} | null

export interface StrapiAuthenticationResponse {
  user: StrapiUser
  jwt: string
}

export interface StrapiAuthenticationRequest {
  identifier: string
  password: string
}

export interface StrapiRegistrationRequest {
  username?: string
  email: string
  password: string
  [field: string]: string | number | boolean | object | Array<string | number | boolean | object>
}

export interface StrapiForgotPasswordRequest {
  email: string
}

export interface StrapiResetPasswordRequest {
  code: string
  password: string
  passwordConfirmation: string
}

export interface StrapiChangePasswordRequest {
  currentPassword: string
  password: string
  passwordConfirmation: string
}

export interface StrapiEmailConfirmationRequest {
  email: string
}
