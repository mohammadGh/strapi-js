import type {
  StrapiFetchAdapter,
  StrapiFetchOptions,
  StrapiUser,
} from './types'

export function newStrapiUsersSdk(strapiFetch: StrapiFetchAdapter) {
  const me = async (option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch('/users/me', { ...option, method: 'GET' })
  }

  const getUsers = async (option: StrapiFetchOptions = {}): Promise<'JSON'> => {
    return await strapiFetch('/users}', { ...option, method: 'GET' })
  }

  const getUserById = async (id: string, option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/users/${id}`, { ...option, method: 'GET' })
  }

  const updateUserById = async (id: string, partialUser: Partial<StrapiUser>, option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/users/${id}`, { ...option, method: 'PUT', body: partialUser })
  }

  const deleteUserById = async (id: string, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch(`/users/${id}`, { ...option, method: 'DELETE' })
  }

  return {
    me,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  }
}
