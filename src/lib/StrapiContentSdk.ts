import type { StrapiFetcher, StrapiRequestParams } from './types'

export function StrapiContentSdk(strapiFetch: StrapiFetcher) {
  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {StrapiRequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: StrapiRequestParams): Promise<T> => {
    return strapiFetch(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {StrapiRequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, id?: string | number | StrapiRequestParams, params?: StrapiRequestParams): Promise<T> => {
    if (typeof id === 'object') {
      params = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return strapiFetch(path, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<T> => {
    return strapiFetch(`/${contentType}`, { method: 'POST', body: { data } })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T> | undefined, data?: Partial<T>): Promise<T> => {
    if (typeof id === 'object') {
      data = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return strapiFetch(path, { method: 'PUT', body: { data } })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <T>(contentType: string, id?: string | number): Promise<T> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return strapiFetch(path, { method: 'DELETE' })
  }

  return {
    find,
    findOne,
    create,
    update,
    delete: _delete,
  }
}
