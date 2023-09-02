/* eslint-disable no-console */
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import loginBadRequestResponse from './loginBadRequestResponse.json'
import loginBadCredentialResponse from './loginBadCredentialResponse.json'
import loginOkResponse from './loginOkResponse.json'

const baseUrl = 'http://cms.gazmeh.ir:1667'

export const strapiMockServer = setupServer(
  rest.post(`${baseUrl}/api/auth/local`, async (req, res, ctx) => {
    const { identifier, password } = await req.json()
    console.log(' ==== IDENTIFIER PARMA === : ', identifier, ' , ', password)

    // bad request scenario
    if (!identifier) {
      console.log(' ==== THE REQUEST MOCKED ===> 1')
      return res(
        ctx.status(400),
        ctx.json(loginBadRequestResponse))
    }

    // bad credential scenario
    if (password && password as string === 'invalid-password') {
      console.log(' ==== THE REQUEST MOCKED ===> 2')
      return res(
        ctx.status(400),
        ctx.json(loginBadCredentialResponse))
    }

    console.log(' ==== THE REQUEST MOCKED ===> 3')
    // otherwise: successful login scenario
    return res(
      ctx.status(200),
      ctx.json(loginOkResponse))
  }),
)
