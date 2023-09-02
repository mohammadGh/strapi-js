import { rest } from 'msw'
import { setupServer } from 'msw/node'
import loginBadRequestResponse from './loginBadRequestResponse.json'
import loginInvalidIdentifierOrPasswordResponse from './loginInvalidIdentifierOrPasswordResponse.json'
import loginOkResponse from './loginOkResponse.json'

const baseUrl = 'http://cms.gazmeh.ir:1667'

export const strapiMockServer = setupServer(
  rest.post(`${baseUrl}/api/auth/local`, async (req, res, ctx) => {
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
