import { FastifyReply, FastifyRequest } from "fastify"

const verifyUserRole =  (roleToVerify: 'ADMIN' | 'MEMBER') => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { role } = req.user

      if (role !== roleToVerify) {
        return res.status(401).send({ message: 'Unauthorized.' })
      }
    } catch (error) {
      return res.status(401).send({ message: 'Unauthorized.' })
    }
  }
}

export { verifyUserRole }
