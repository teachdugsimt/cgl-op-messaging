import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import {
  Token
} from '../models';
import * as fs from 'fs';
import fp from 'fastify-plugin';

interface ConnectionResponse {
  token: any
}

// const connection = async (): Promise<ConnectionResponse | undefined> => {
//   try {
//     const connection: Connection = await createConnection();
//     console.log('database connected');
//     const directory = 'src/migration';
//     fs.rmdir(directory, (err) => {
//       if (err) { console.log('err :>> ', err); }
//     })

//     return {
//       role: connection.getRepository(Role),
//       resource: connection.getRepository(Resource),
//       resourceAction: connection.getRepository(ResourceAction),
//       userRole: connection.getRepository(UserRole),
//       users: connection.getRepository(Users),
//       vwUserRole: connection.getRepository(VwUserRole),
//       vwUserRoleResource: connection.getRepository(VwUserRoleResource),
//       userTest: connection.getRepository(UserTest)
//     }
//   } catch (error) {
//     console.log(error);
//     console.log('make sure you have set .env variables - see .env.sample');
//   }
// }

// export default connection

export default fp(async server => {
  try {
    console.log("Step 1 : connectionn database")
    // const connection = await createConnection(await config);
    const connection = await createConnection();
    console.log('database connected :: ', connection);

    server.decorate('db', {
      token: connection.getRepository(Token),
    });
  } catch (error) {
    console.log(error);
    console.log('make sure you have set .env variables - see .env.sample');
  }
});
