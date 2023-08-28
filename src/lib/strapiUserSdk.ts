import type {
  StrapiAuthProvider,
  StrapiAuthenticationRequest,
  StrapiAuthenticationResponse,
  StrapiChangePasswordRequest,
  StrapiEmailConfirmationRequest,
  StrapiForgotPasswordRequest,
  StrapiRegistrationRequest,
  StrapiResetPasswordRequest,
  StrapiUser,
} from './types'
import { getStrapiClient } from './strapiClient'

const url = 'http://cms.gazmeh.ir:1667/'

export function StrapiUserSdk() {
  const client = getStrapiClient()

  const authTokenPrecondition = (token: string, headers: Record<string, string> = {}): boolean => {
    if (!token && !headers.Authorization && !headers.authorization)
      throw new Error('Authorization token not provided')
    return true
  }
  // const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  const getCurrentUser = async (token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    authTokenPrecondition(token, headers)
    return await client('/users/me', { params: { token, headers } })
  }

  /**
   * Authenticate user & retrieve his JWT
   *
   * @param  {StrapiAuthenticationRequest} data - User authentication form: `identifier`, `password`
   * @param  {string} data.identifier - The email or username of the user
   * @param  {string} data.password - The password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const login = async (data: StrapiAuthenticationRequest): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local', { method: 'POST', body: data })
    const user = await getCurrentUser(jwt)
    return {
      user,
      jwt,
    }
  }

  /**
   * Register a new user & retrieve JWT
   *
   * @param  {StrapiRegistrationRequest} data - New user registration form: `username`, `email`, `password`
   * @param  {string} data.username - Username of the new user
   * @param  {string} data.email - Email of the new user
   * @param  {string} data.password - Password of the new user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const register = async (data: StrapiRegistrationRequest): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local/register', { method: 'POST', body: data })
    const user = await getCurrentUser(jwt)
    return {
      user,
      jwt,
    }
  }

  /**
   * Send an email to a user in order to reset his password
   *
   * @param  {StrapiForgotPasswordRequest} data - Forgot password form: `email`
   * @param  {string} data.email - Email of the user who forgot his password
   * @returns Promise<void>
   */
  const forgotPassword = async (data: StrapiForgotPasswordRequest): Promise<void> => {
    await client('/auth/forgot-password', { method: 'POST', body: data })
  }

  /**
   * Reset the user password
   *
   * @param  {StrapiResetPasswordRequest} data - Reset password form: `code`, `password`, `passwordConfirmation`
   * @param  {string} data.code - Code received by email after calling the `forgotPassword` method
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const resetPassword = async (data: StrapiResetPasswordRequest): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/reset-password', { method: 'POST', body: data })
    const user = await getCurrentUser(jwt)
    return {
      user,
      jwt,
    }
  }

  /**
   * Change the user password
   *
   * @param  {StrapiChangePasswordRequest} data - Change password form: `currentPassword`, `password`, `passwordConfirmation`
   * @param  {string} data.currentPassword - Current password of the user
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<void>
   */
  const changePassword = async (data: StrapiChangePasswordRequest, token: string = '', headers: Record<string, string> = {}): Promise<StrapiAuthenticationResponse> => {
    authTokenPrecondition(token, headers)
    return await client('/auth/change-password', { method: 'POST', body: data, params: { token, headers } })
  }

  /**
   * Send programmatically an email to a user in order to confirm his account
   *
   * @param  {StrapiEmailConfirmationRequest} data - Email confirmation form: `email`
   * @param  {string} data.email - Email of the user who want to be confirmed
   * @returns Promise<void>
   */
  const sendEmailConfirmation = async (data: StrapiEmailConfirmationRequest): Promise<void> => {
    await client('/auth/send-email-confirmation', { method: 'POST', body: data })
  }

  /**
   * Get the correct URL to authenticate with provider
   *
   * @param  {StrapiAuthProvider} provider - Provider name
   * @returns string
   */
  const getProviderAuthenticationUrl = (provider: StrapiAuthProvider): string => {
    return `${url}/connect/${provider}`
  }

  /**
   * Authenticate user with the access_token
   *
   * @param  {StrapiAuthProvider} provider - Provider name
   * @param  {string} access_token - Access token returned by Strapi
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const authenticateProvider = async (provider: StrapiAuthProvider, access_token: string): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client(`/auth/${provider}/callback`, { method: 'GET', params: { access_token } })
    const user = await getCurrentUser(jwt)
    return {
      user,
      jwt,
    }
  }

  return {
    login,
    getCurrentUser,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    sendEmailConfirmation,
    getProviderAuthenticationUrl,
    authenticateProvider,
  }
}
