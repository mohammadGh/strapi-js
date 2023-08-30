import { rest } from 'msw'
import { setupServer } from 'msw/node'

const loginBadRequestJsonResponse = './loginBadRequestJsonResponse.json'
const loginBadCredentialsJsonResponse = './loginBadCredentialsJsonResponse.json'
const loginOk = './loginOk.json'

export const strapiMockServer = setupServer(
  rest.post('/api/auth/local', (req: any, res: any, ctx: any) => {
    const { identifier, password } = req.params

    // bad request scenario
    if (!identifier) {
      return res(
        ctx.status(400),
        ctx.json(loginBadRequestJsonResponse))
    }

    // bad credential scenario
    if (password && password as string !== 'invalid-password') {
      return res(
        ctx.status(400),
        ctx.json(loginBadCredentialsJsonResponse))
    }

    // otherwise: successful login scenario
    return res(
      ctx.status(200),
      ctx.json(loginOk))
  }),
)
