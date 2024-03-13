import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import restaurant from './modules/restaurant/router';
import user from './modules/user/router';
import db from './decorators/db';
import auth from './middlewares/auth';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

server.register(restaurant);
server.register(user);
server.register(db);
server.register(auth);
server.listen({
  host: 'localhost',
  port: 3000,
});
