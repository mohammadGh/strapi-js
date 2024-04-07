import type {
  StrapiAuthRequest,
  StrapiAuthResponse,
  StrapiChangePasswordRequest,
  StrapiFetchAdapter,
  StrapiRegisterRequest,
  StrapiResetPasswordRequest,
  StrapiUser,
} from './types'

export function newStrapiAuthSdk(strapiFetch: StrapiFetchAdapter) {
  /**
   * get current user
   * currently this api in strapi is not available in /auth/; this method makes request to /users/me
   */
  const currentUser = async (token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    return await strapiFetch('/users/me', { token, method: 'GET', headers })
  }

  const login = async (data: StrapiAuthRequest): Promise<StrapiAuthResponse> => {
    const { jwt, user }: StrapiAuthResponse = await strapiFetch('/auth/local', { method: 'POST', body: data })
    return {
      user,
      jwt,
    }
  }

  const localRegister = async (data: StrapiRegisterRequest): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/local/register', { method: 'POST', body: data })
  }

  const emailConfirmation = async (confirmation: string = '', headers: Record<string, string> = {}): Promise<void> => {
    return await strapiFetch('/auth/email-confirmation', { method: 'GET', headers, params: { confirmation } })
  }

  /**
   * request to reset the password
   */
  const forgotPassword = async (email: string): Promise<void> => {
    return await strapiFetch('/auth/forgot-password', { method: 'POST', body: { email } })
  }

  /**
   * Change the user password
   */
  const changePassword = async (data: StrapiChangePasswordRequest, token: string = ''): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/change-password', { token, method: 'POST', body: data })
  }

  /**
   * request to send confirmation email
   */
  const sendEmailConfirmation = async (email: string): Promise<void> => {
    await strapiFetch('/auth/send-email-confirmation', { method: 'POST', body: { email } })
  }

  /**
   * reset password using forgot-code received from forgot-password request through email
   */
  const resetPassword = async (data: StrapiResetPasswordRequest): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/reset-password', { method: 'POST', body: data })
  }

  return {
    login,
    currentUser,
    localRegister,
    emailConfirmation,
    forgotPassword,
    resetPassword,
    changePassword,
    sendEmailConfirmation,
  }
}
