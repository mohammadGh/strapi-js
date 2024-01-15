import type {
  StrapiAuthProvider,
  StrapiAuthenticationRequest,
  StrapiAuthenticationResponse,
  StrapiChangePasswordRequest,
  StrapiEmailConfirmationRequest,
  StrapiFetcher,
  StrapiForgotPasswordRequest,
  StrapiRegistrationRequest,
  StrapiResetPasswordRequest,
  StrapiUser,
} from './types'

const url = 'http://cms.gazmeh.ir:1667/'

export function StrapiUserSdk(strapiFetch: StrapiFetcher) {
  /**
   * Get logged-in user information
   *
   * @param token JWT token
   * @param headers Custom headers that will be attached to the strapi request
   * @returns A promise of {StrapiUser} object
   */
  const getCurrentUser = async (token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    return await strapiFetch('/users/me', { method: 'GET', headers, params: { token } })
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
    const { jwt, user }: StrapiAuthenticationResponse = await strapiFetch('/auth/local', { method: 'POST', body: data })
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
    return await strapiFetch('/auth/local/register', { method: 'POST', body: data })
  }

  /**
   * Confirm account with confirmation code received by account's email
   *
   * @param confirmation a confirmation code received by account's email
   * @param headers any extra string->string http-headers
   * @returns ok if the account is confirmed successfully
   */
  const confirmAccount = async (confirmation: string = '', headers: Record<string, string> = {}): Promise<void> => {
    return await strapiFetch('/auth/email-confirmation', { method: 'GET', headers, params: { confirmation } })
  }

  /**
   * Send an email to a user in order to reset his password
   *
   * @param  {StrapiForgotPasswordRequest} data - Forgot password form: `email`
   * @param  {string} data.email - Email of the user who forgot his password
   * @returns Promise<void>
   */
  const forgotPassword = async (data: StrapiForgotPasswordRequest): Promise<void> => {
    return await strapiFetch('/auth/forgot-password', { method: 'POST', body: data })
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
  const changePassword = async (data: StrapiChangePasswordRequest, token: string = ''): Promise<StrapiAuthenticationResponse> => {
    return await strapiFetch('/auth/change-password', { method: 'POST', body: data, params: { token } })
  }

  /**
   * Send programmatically an email to a user in order to confirm his account
   *
   * @param  {StrapiEmailConfirmationRequest} data - Email confirmation form: `email`
   * @param  {string} data.email - Email of the user who want to be confirmed
   * @returns Promise<void>
   */
  const sendEmailConfirmation = async (data: StrapiEmailConfirmationRequest): Promise<void> => {
    await strapiFetch('/auth/send-email-confirmation', { method: 'POST', body: data })
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
    return await strapiFetch('/auth/reset-password', { method: 'POST', body: data })
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
    const { jwt }: StrapiAuthenticationResponse = await strapiFetch(`/auth/${provider}/callback`, { method: 'GET', params: { access_token } })
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
    confirmAccount,
    forgotPassword,
    resetPassword,
    changePassword,
    sendEmailConfirmation,
    getProviderAuthenticationUrl,
    authenticateProvider,
  }
}
