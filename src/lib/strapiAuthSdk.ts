import type {
  StrapiAuthRequest,
  StrapiAuthResponse,
  StrapiChangePasswordRequest,
  StrapiFetchAdapter,
  StrapiFetchOptions,
  StrapiRegisterRequest,
  StrapiResetPasswordRequest,
  StrapiUser,
} from './types'

export function newStrapiAuthSdk(strapiFetch: StrapiFetchAdapter) {
  /**
   * get current user
   * currently this api in strapi is not available in /auth/; this method makes request to /users/me
   */
  const currentUser = async (option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch('/users/me', { ...option, method: 'GET' })
  }

  const login = async (authParams: StrapiAuthRequest, option: StrapiFetchOptions = {}): Promise<StrapiAuthResponse> => {
    const { jwt, user }: StrapiAuthResponse = await strapiFetch('/auth/local', { ...option, method: 'POST', body: authParams })
    return {
      user,
      jwt,
    }
  }

  const localRegister = async (registerParams: StrapiRegisterRequest, option: StrapiFetchOptions = {}): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/local/register', { ...option, method: 'POST', body: registerParams })
  }

  const emailConfirmation = async (confirmation: string = '', option: Omit<StrapiFetchOptions, 'params'> = {}): Promise<void> => {
    return await strapiFetch('/auth/email-confirmation', { ...option, method: 'GET', params: { confirmation } })
  }

  /**
   * request to reset the password
   */
  const forgotPassword = async (email: string, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch('/auth/forgot-password', { ...option, method: 'POST', body: { email } })
  }

  /**
   * Change the user password
   */
  const changePassword = async (data: StrapiChangePasswordRequest, option: StrapiFetchOptions = {}): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/change-password', { ...option, method: 'POST', body: data })
  }

  /**
   * request to send confirmation email
   */
  const sendEmailConfirmation = async (email: string, option: StrapiFetchOptions = {}): Promise<void> => {
    await strapiFetch('/auth/send-email-confirmation', { ...option, method: 'POST', body: { email } })
  }

  /**
   * reset password using forgot-code received from forgot-password request through email
   */
  const resetPassword = async (data: StrapiResetPasswordRequest, option: StrapiFetchOptions = {}): Promise<StrapiAuthResponse> => {
    return await strapiFetch('/auth/reset-password', { ...option, method: 'POST', body: data })
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
