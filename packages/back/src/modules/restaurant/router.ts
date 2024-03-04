import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { handleData } from '../../kakaoAPI/keyword_search';

export default fp(async (server: FastifyInstance) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurant = { hello: 'world!' };
    reply
      .code(200)
      .header('Content-type', 'application/json; charset=utf-8')
      .send(restaurant);
  });

  //get restaurant list
  server.get(
    '/restaurants',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const restaurants = await server.db.restaurant.find();
      console.log(restaurants);

      reply
        .code(200)
        .header('Content-type', 'application/json; charset=utf-8')
        .send(restaurants);
    },
  );

  //add new restaurants
  server.post(
    '/restaurants/:keyword',
    async (
      request: FastifyRequest<{ Params: { keyword: string } }>,
      reply: FastifyReply,
    ) => {
      const { keyword } = request.params;
      const restaurant = await handleData(keyword);
      try {
        restaurant.forEach(async item => {
          const { place_name, category_name, distance, phone, place_url } =
            item;
          const isDuplicated = await server.db.restaurant.findOne({
            where: { place_name },
          });

          if (!isDuplicated) {
            await server.db.restaurant.save({
              place_name,
              category_name,
              distance,
              phone,
              place_url,
            });
          }
        }),
          reply.code(201).send('데이터 저장 완료');
      } catch (error) {
        if (!reply.sent) {
          reply.code(500).send('서버 에러');
        }
      }
    },
  );
});
