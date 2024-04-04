import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (server: FastifyInstance) => {
  server
    .get(
      '/some-route/:id',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // Your handler logic here
        const restaurant = { hello: 'world!' };
        reply
          .code(200)
          .header('Content-type', 'application/json; charset=utf-8')
          .send(restaurant);
      },
    )
    .addSchema({
      $id: 'mySchema', // $id 속성 추가
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      security: [{ apiKey: [process.env.KAKAO_RESTAPI_KEY] }],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id',
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          obj: {
            type: 'object',
            properties: {
              some: { type: 'string' },
            },
          },
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            hello: { type: 'string' },
          },
        },
        default: {
          description: 'Default response',
          type: 'object',
          properties: {
            foo: { type: 'string' },
          },
        },
      },
    });
});
