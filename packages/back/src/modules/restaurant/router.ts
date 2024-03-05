import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { handleData } from '../../kakaoAPI/keyword_search';
import { Restaurant } from './entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial } from 'typeorm';

export default fp(async (server: FastifyInstance) => {
  // 루트
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurant = { hello: 'world!' };
    reply
      .code(200)
      .header('Content-type', 'application/json; charset=utf-8')
      .send(restaurant);
  });

  // DB내 음식점 리스트 응답
  server.get(
    '/restaurants',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const restaurants = await server.db.restaurant.find();

      reply
        .code(200)
        .header('Content-type', 'application/json; charset=utf-8')
        .send(restaurants);
    },
  );

  //키워드로 음식점 응답
  server.get(
    '/restaurants/:place_name',
    async (
      request: FastifyRequest<{ Params: { place_name: string } }>,
      reply: FastifyReply,
    ) => {
      const { place_name } = request.params;
      const restaurant = await handleData(place_name);

      reply
        .code(200)
        .header('Content-type', 'application/json; charset=utf-8')
        .send(restaurant);
    },
  );

  // 음식점 추가
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
          const {
            place_name,
            category_name,
            distance,
            phone,
            place_url,
          }: DeepPartial<Restaurant> = item;
          const isDuplicated = await server.db.restaurant.findOne({
            where: { place_name: String(place_name) },
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

  // 음식점 수정
  server.patch(
    '/restaurants/:place_name',
    async (
      request: FastifyRequest<{ Params: { place_name: string }; Body: {} }>,
      reply: FastifyReply,
    ) => {
      const { place_name } = request.params;
      const restaurant = await server.db.restaurant.findOne({
        where: { place_name },
      });

      if (restaurant) {
        const updateData = request.body as QueryDeepPartialEntity<Restaurant>;
        await server.db.restaurant.update(restaurant.id, updateData);
        const updatedRestaurant = await server.db.restaurant.findOne({
          where: { place_name },
        });
        reply.code(200).send({ restaurant: updatedRestaurant });
      } else {
        reply.code(404).send('수정하려는 음식점이 존재하지 않습니다.');
      }
    },
  );

  server.delete(
    '/restaurants/:place_name',
    async (
      request: FastifyRequest<{ Params: { place_name: string } }>,
      reply: FastifyReply,
    ) => {
      const { place_name } = request.params;
      const restaurant = await server.db.restaurant.findOne({
        where: { place_name },
      });

      if (restaurant) {
        await server.db.restaurant.delete(restaurant.id);
        reply.code(200).send('음식점 삭제 완료');
      } else {
        reply.code(404).send('삭제하려는 음식점이 존재하지 않습니다.');
      }
    },
  );
});
