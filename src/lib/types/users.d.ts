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

export interface StrapiAuthParams {
  identifier: string
  password: string
}

export interface StrapiRegisterParams {
  username: string
  email: string
  password: string
  [field: string]: string | number | boolean | object | Array<string | number | boolean | object>
}

export interface StrapiResetPasswordParams {
  code: string
  password: string
  passwordConfirmation: string
}

export interface StrapiChangePasswordParams {
  currentPassword: string
  password: string
  passwordConfirmation: string
}
