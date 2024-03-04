import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import restaurant from './modules/restaurant/router';
import db from './decorators/db';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });

server.register(restaurant);
server.register(db);

server.listen({
  host: 'localhost',
  port: 3000,
});
