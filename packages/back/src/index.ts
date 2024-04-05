import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import restaurant from '@_modules/restaurant/router';
import user from '@_modules/user/router';
import db from '@_decorators/db';
import auth from '@_middlewares/auth';
import test from '@_modules/restaurant/test';
import swagger from '@fastify/swagger';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

server.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },

    servers: [
      {
        url: 'http://192.168.10.100:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
  },
});
server.register(restaurant);
server.register(user);
server.register(db);
server.register(auth);
server.register(test);
server.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: () => void,
    ) {
      next();
    },
    preHandler: function (
      request: FastifyRequest,
      reply: FastifyReply,
      next: () => void,
    ) {
      next();
    },
  },
  staticCSP: false,
  transformStaticCSP: (header: any) => header,
  transformSpecification: (
    swaggerObject: any,
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});
server.listen({
  host: '0.0.0.0', //외부에서 접속 가능
  port: 3000,
});
