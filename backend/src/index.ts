import { resolve } from 'path'
import { MongoDb } from './services'
import { serviceProto } from './shared/protocols/serviceProto'
import { HttpServerWithPlugin, paramsValidatePlugin } from './plugins'

// Create the Server
const server = new HttpServerWithPlugin(serviceProto, {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  // Remove this to use binary mode (remove from the client too)
  json: true,
  cors: '*'
})

server.plugins.use(paramsValidatePlugin)

// Initialize before server start
async function init() {
  // Auto implement APIs
  await server.autoImplementApi(resolve(__dirname, 'api'))

  await MongoDb.init(server.logger)
}

async function main() {
  await init()
  await server.start()
}
main()
