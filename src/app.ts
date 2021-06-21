import fastify from 'fastify'
import fastifyBlipp from "fastify-blipp";
import { bootstrap } from 'fastify-decorators';

import { resolve } from 'path';

import configApp from './config/app'
import configSwagger from './config/swagger'
function build(opts: object = configApp) {
  const app = fastify(opts)
  app.register(fastifyBlipp)
  app.register(require('fastify-swagger'), configSwagger)

  app.register(require('fastify-cors'), { 
    origin: (origin, cb) => {
      // if(/localhost/.test(origin)){
      //   //  Request from localhost will pass
      //   cb(null, true)
      //   return
      // }
      // Generate an error on other origins, disabling access
      // cb(new Error("Not allowed"))
      cb(null, true)
      return
    }
  })

  // app.register(require('fastify-formbody'))
  // app.register(require('fastify-multipart'), {
  //   limits: {
  //     fieldNameSize: 100, // Max field name size in bytes
  //     fieldSize: 1000000, // Max field value size in bytes
  //     fields: 10,         // Max number of non-file fields
  //     fileSize: 100,      // For multipart forms, the max file size
  //     files: 1,           // Max number of file fields
  //     headerPairs: 2000   // Max number of header key=>value pairs
  //   }
  // });
  
  app.register(bootstrap, {
    directory: resolve(__dirname, `controllers`),
    mask: /\.controller\./,
  });
  return app
}

export default build
