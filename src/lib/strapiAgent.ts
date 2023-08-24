import { type FetchError, type FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { stringify } from 'qs'
import type { StrapiErrorResponse } from './types'

const defaults = {
  url: 'http://localhost:1337',
  prefix: '/api',
  version: 'v4',
  cookie: {},
  auth: {},
  cookieName: 'strapi_jwt',
  devtools: false,
}

function defaultErrors(err: FetchError) {
  return {
    status: 500,
    name: 'UnknownError',
    message: err.message,
    details: err,
  }
}

export function getStrapiAgent() {
  const baseURL = `${defaults.url}/${defaults.prefix}/${defaults.version}`

  return async <T> (url: string, token: string | (() => string), fetchOptions: FetchOptions<'json'> = {}): Promise<T> => {
    const headers: HeadersInit = {}

    if (token)
      headers.Authorization = `Bearer ${token}`

    if (fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
      if (params)
        url = `${url}?${params}`

      delete fetchOptions.params
    }

    try {
      return await ofetch<T>(url, {
        retry: 0,
        baseURL,
        headers: {
          ...headers,
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      })
    }
    catch (err: any) {
      const e: StrapiErrorResponse = err.data || defaultErrors(err)
      throw e
    }
  }
}
