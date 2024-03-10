import fp from 'fastify-plugin';
import { DataSource, createConnection, getConnectionOptions } from 'typeorm';
import { Restaurant } from '../modules/restaurant/entity';

export default fp(async fastify => {
  const connection = process.env.TYPEORM_CONNECTION;
  const port = process.env.TYPEORM_PORT;
  const host = process.env.TYPEORM_HOST;
  const username = process.env.TYPEORM_USERNAME;
  const password = process.env.TYPEORM_PASSWORD;
  const database = process.env.TYPEORM_DATABASE;
  const entities = process.env.TYPEORM_ENTITIES;

  try {
    // const connectionOptions = await getConnectionOptions();
    // const connection = await createConnection(connectionOptions);
    const connectDB = new DataSource({
      type: 'postgres',
      entities: [__dirname + `/../${entities}`, Restaurant],
      synchronize: true,
      url: `${connection}://${username}:${password}@${host}:${port}/${database}`,
    });

    connectDB
      .initialize()
      .then(() => console.log('DB가 연결되었습니다!'))
      .catch(err => console.error('DB 연결 실패!', err));

    fastify.decorate('db', {
      restaurant: connectDB.getRepository(Restaurant),
    });

    // fastify.addHook('onClose', async fastify => {
    //   console.log('Running onClose hook...');

    //   if (connectDB) {
    //     await connectDB.destroy();
    //   }
    //   console.log('Running onClose hook complete');
    // });
  } catch (error) {
    console.log(error);
  }
});
