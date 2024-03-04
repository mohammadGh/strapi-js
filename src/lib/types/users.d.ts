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

export interface StrapiAuthResponse {
  user: StrapiUser
  jwt: string
}

export interface StrapiAuthRequest {
  identifier: string
  password: string
}

export interface StrapiRegisterRequest {
  username: string
  email: string
  password: string
  [field: string]: string | number | boolean | object | Array<string | number | boolean | object>
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
