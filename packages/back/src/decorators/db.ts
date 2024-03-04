import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Restaurant } from '../modules/restaurant/entity';

export default fp(async fastify => {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);

    fastify.decorate('db', {
      restaurant: connection.getRepository(Restaurant),
    });
  } catch (error) {
    console.log(error);
  }
});
