import { HttpResponse, http } from 'msw'
import { type SetupServer, setupServer } from 'msw/node'
import type { StrapiConfig } from '../../src/lib/types'
import { getBaseUrl } from '../../src/lib/config'
import loginBadRequestResponse from './loginBadRequestResponse.json'
import loginInvalidIdentifierOrPasswordResponse from './loginInvalidIdentifierOrPasswordResponse.json'
import loginOkResponse from './loginOkResponse.json'

export function getStrapiMockServer(config: Required<StrapiConfig>): SetupServer {
  const baseURL = getBaseUrl(config)
  return setupServer(
    http.post(`${baseURL}/auth/local`, async ({ request }) => {
      const { identifier, password }: any = await request.json()

      // bad request scenario
      if (!identifier)
        return HttpResponse.json({ ...loginBadRequestResponse }, { status: 400 })
      // bad credential scenario
      if (password && password as string === 'invalid-password')
        return HttpResponse.json({ ...loginInvalidIdentifierOrPasswordResponse }, { status: 400 })

      // otherwise: successful login scenario
      return HttpResponse.json({ ...loginOkResponse }) as any
    }),
  )
}
