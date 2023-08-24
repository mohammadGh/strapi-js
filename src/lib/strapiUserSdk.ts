import type {
  StrapiAuthProvider,
  StrapiAuthenticationData,
  StrapiAuthenticationResponse,
  StrapiChangePasswordData,
  StrapiEmailConfirmationData,
  StrapiForgotPasswordData,
  StrapiRegistrationData,
  StrapiResetPasswordData,
  StrapiUser,
} from './types'
import { getStrapiClient } from './strapiClient'

const url = 'http://localhost:3000/'

export function useStrapiAuth() {
  const client = getStrapiClient()
  // const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  const getCurrentUser = async (): Promise<StrapiUser> => {
    return await client('/users/me', { params: {} })
  }

  /**
   * Authenticate user & retrieve his JWT
   *
   * @param  {StrapiAuthenticationData} data - User authentication form: `identifier`, `password`
   * @param  {string} data.identifier - The email or username of the user
   * @param  {string} data.password - The password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const login = async (data: StrapiAuthenticationData): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local', { method: 'POST', body: data })
    const user = await getCurrentUser()
    return {
      user,
      jwt,
    }
  }

  /**
   * Register a new user & retrieve JWT
   *
   * @param  {StrapiRegistrationData} data - New user registration form: `username`, `email`, `password`
   * @param  {string} data.username - Username of the new user
   * @param  {string} data.email - Email of the new user
   * @param  {string} data.password - Password of the new user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const register = async (data: StrapiRegistrationData): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local/register', { method: 'POST', body: data })
    const user = await getCurrentUser()
    return {
      user,
      jwt,
    }
  }

  /**
   * Send an email to a user in order to reset his password
   *
   * @param  {StrapiForgotPasswordData} data - Forgot password form: `email`
   * @param  {string} data.email - Email of the user who forgot his password
   * @returns Promise<void>
   */
  const forgotPassword = async (data: StrapiForgotPasswordData): Promise<void> => {
    await client('/auth/forgot-password', { method: 'POST', body: data })
  }

  /**
   * Reset the user password
   *
   * @param  {StrapiResetPasswordData} data - Reset password form: `code`, `password`, `passwordConfirmation`
   * @param  {string} data.code - Code received by email after calling the `forgotPassword` method
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const resetPassword = async (data: StrapiResetPasswordData): Promise<StrapiAuthenticationResponse> => {
    const { jwt }: StrapiAuthenticationResponse = await client('/auth/reset-password', { method: 'POST', body: data })
    const user = await getCurrentUser()
    return {
      user,
      jwt,
    }
  }

  /**
   * Change the user password
   *
   * @param  {StrapiChangePasswordData} data - Change password form: `currentPassword`, `password`, `passwordConfirmation`
   * @param  {string} data.currentPassword - Current password of the user
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<void>
   */
  const changePassword = async (data: StrapiChangePasswordData): Promise<void> => {
    await client('/auth/change-password', { method: 'POST', body: data })
  }

  /**
   * Send programmatically an email to a user in order to confirm his account
   *
   * @param  {StrapiEmailConfirmationData} data - Email confirmation form: `email`
   * @param  {string} data.email - Email of the user who want to be confirmed
   * @returns Promise<void>
   */
  const sendEmailConfirmation = async (data: StrapiEmailConfirmationData): Promise<void> => {
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
    const user = await getCurrentUser()
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
