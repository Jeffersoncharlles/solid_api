import { FastifyReply, FastifyRequest } from "fastify"


const refreshController = async (req: FastifyRequest, res: FastifyReply) => {

  await req.jwtVerify({onlyCookie:true}) // with validate more no eye for headers in request


  const token = await res.jwtSign({}, {
      sign: {
        sub: req.user.sub,
      },
    })

  const refreshToken = await res.jwtSign({}, {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d',// refresh token 7 days
      }
    })

  return res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, //crypt in http
      sameSite: true, // cookie in with site
      httpOnly: true, // with cookie in back-end and not front-end
    })
    .send({
      token
    })
}

export { refreshController }
