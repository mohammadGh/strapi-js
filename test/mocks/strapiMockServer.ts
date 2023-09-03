import { rest } from 'msw'
import { type SetupServer, setupServer } from 'msw/node'
import { type StrapiConfigs } from '../../src/lib/types'
import { getStrapiBaseURL } from '../../src/lib/getStrapiFetcher'
import loginBadRequestResponse from './loginBadRequestResponse.json'
import loginInvalidIdentifierOrPasswordResponse from './loginInvalidIdentifierOrPasswordResponse.json'
import loginOkResponse from './loginOkResponse.json'

export function getStrapiMockServer(configs: StrapiConfigs): SetupServer {
  const baseURL = getStrapiBaseURL(configs)
  return setupServer(
    rest.post(`${baseURL}/auth/local`, async (req, res, ctx) => {
      const { identifier, password } = await req.json()

      // bad request scenario
      if (!identifier) {
        return res(
          ctx.status(400),
          ctx.json(loginBadRequestResponse))
      }

      // bad credential scenario
      if (password && password as string === 'invalid-password') {
        return res(
          ctx.status(400),
          ctx.json(loginInvalidIdentifierOrPasswordResponse))
      }

      // otherwise: successful login scenario
      return res(
        ctx.status(200),
        ctx.json(loginOkResponse))
    }),
  )
}
