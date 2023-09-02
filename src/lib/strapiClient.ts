import { type FetchError, type FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { stringify } from 'qs'
import type { StrapiErrorResponse } from './types'

const defaults = {
  url: 'http://cms.gazmeh.ir:1667',
  prefix: 'api',
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

export function getStrapiClient() {
  const baseURL = `${defaults.url}/${defaults.prefix}/`

  return async <T> (url: string, fetchOptions: FetchOptions<'json'> = {}): Promise<T> => {
    const headers: HeadersInit = {}
    let originalHeaders = {}

    if (fetchOptions.params) {
      // if original request has Authorization header, we try to use it for cms authorization
      if (fetchOptions.params.headers) {
        headers.Authorization = fetchOptions.params.headers.Authorization || fetchOptions.params.headers.authorization
        delete fetchOptions.params.headers.Authorization
        delete fetchOptions.params.headers.authorization
        originalHeaders = { ...fetchOptions.params.headers }
        delete fetchOptions.params.headers
      }

      // if explicity a token provided for cms we use it for Authorization header
      if (fetchOptions.params.token) {
        headers.Authorization = `Bearer ${fetchOptions.params.token}`
        delete fetchOptions.params.token
      }

      if (fetchOptions.params) {
        const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
        if (params)
          url = `${url}?${params}`

        delete fetchOptions.params
      }
    }

    try {
      return await ofetch<T>(url, {
        retry: 0,
        baseURL,
        headers: {
          ...headers,
          ...originalHeaders,
        },
        ...fetchOptions,
      })
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err.data?.error || defaultErrors(err)
      // eslint-disable-next-line no-console
      console.log(' [strapi-client] Error', strapiError)
      throw strapiError
    }
  }
}
