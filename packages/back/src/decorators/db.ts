import fp from 'fastify-plugin';
import { DataSource } from 'typeorm';
import { Restaurant } from '../modules/restaurant/entity';

export default fp(async fastify => {
  try {
    const connectDB = new DataSource({
      type: 'postgres',
      entities: [__dirname + '/../src/modules/*/entity.ts', Restaurant],
      synchronize: true,
      url: process.env.TYPEORM_URL,
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
