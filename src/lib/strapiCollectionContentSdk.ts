import type {
  StrapiFetchAdapter,
  StrapiFetchOptions,
  StrapiUser,
} from './types'

export function newStrapiCollectionContentSdk(strapiFetch: StrapiFetchAdapter) {
  const find = async (content: string, option: StrapiFetchOptions = {}): Promise<'JSON'> => {
    return await strapiFetch(`/${content}`, { ...option, method: 'GET' })
  }

  const create = async (content: string, entity: any, option: StrapiFetchOptions = {}): Promise<'JSON'> => {
    return await strapiFetch(`/${content}`, { ...option, method: 'POST', body: entity })
  }

  const findOne = async (content: string, id: string, option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/${content}/${id}`, { ...option, method: 'GET' })
  }

  const update = async (content: string, id: string, entity: any, option: StrapiFetchOptions = {}): Promise<StrapiUser> => {
    return await strapiFetch(`/${content}/${id}`, { ...option, method: 'PUT', body: entity })
  }

  const _delete = async (content: string, id: string, option: StrapiFetchOptions = {}): Promise<void> => {
    return await strapiFetch(`/${content}/${id}`, { ...option, method: 'DELETE' })
  }

  return {
    find,
    create,
    findOne,
    update,
    delete: _delete,
  }
}
