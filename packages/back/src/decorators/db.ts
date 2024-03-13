import fp from 'fastify-plugin';
import { DataSource } from 'typeorm';
import { Restaurant } from '../modules/restaurant/entity';
import { User } from '../modules/user/entity';

export default fp(async fastify => {
  try {
    const connectDB = new DataSource({
      type: 'postgres',
      entities: [__dirname + '/../src/modules/*/entity.ts', Restaurant, User],
      synchronize: true,
      url: process.env.TYPEORM_URL,
    });

    connectDB
      .initialize()
      .then(() => console.log('DB가 연결되었습니다!'))
      .catch(err => console.error('DB 연결 실패!', err));

    fastify.decorate('db', {
      restaurant: connectDB.getRepository(Restaurant),
      user: connectDB.getRepository(User),
    });
  } catch (error) {
    console.log(error);
  }
});
