import fastify from 'fastify'
import cors from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'

import { createContext } from './context'
import appRouter from './router'

const server = fastify({
  maxParamLength: 5000,
})

export function createServer() {
  server.register(cors)

  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  })

  const stop = async () => {
    await server.close()
  }

  const start = async () => {
    try {
      await server.listen({ port: 8080 })
      console.log('listening on port', 8080)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return { start, stop }
}
