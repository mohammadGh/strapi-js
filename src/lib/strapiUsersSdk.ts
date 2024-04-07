import type {
  StrapiFetchAdapter,
  StrapiUser,
} from './types'

export function newStrapiUsersSdk(strapiFetch: StrapiFetchAdapter) {
  const me = async (token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    return await strapiFetch('/users/me', { token, method: 'GET', headers })
  }

  const getUsers = async (token: string = '', headers: Record<string, string> = {}): Promise<'JSON'> => {
    return await strapiFetch(`/users}`, { token, headers, method: 'GET' })
  }

  const getUserById = async (id: string, token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/users/${id}`, { token, headers, method: 'GET' })
  }

  const updateUserById = async (id: string, partialUser: Partial<StrapiUser>, token: string = '', headers: Record<string, string> = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/users/${id}`, { token, headers, method: 'PUT', body: partialUser })
  }

  const deleteUserById = async (id: string, token: string = '', headers: Record<string, string> = {}): Promise<void> => {
    return await strapiFetch(`/users/${id}`, { token, headers, method: 'DELETE' })
  }

  return {
    me,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  }
}
