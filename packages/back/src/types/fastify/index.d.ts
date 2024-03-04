import { Server, IncomingMessage, ServerResponse } from 'http';
import { Repository } from 'typeorm';

import { Restaurant } from '../../modules/restaurant/entity';

interface Repositories {
  restaurant: Repository<Restaurant>;
}

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    db: Repositories;
    auth: any;
    jwt: any;
  }
}
