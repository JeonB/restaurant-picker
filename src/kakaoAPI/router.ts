import fp from "fastify-plugin";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default fp(async (server: FastifyInstance) => {
  server.get(
    "https://dapi.kakao.com/v2/local/search/category?category_group_code=FD6&x=126.82597944995&y=37.5676859104888&radius=250&size=15",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).header("Content-type", "application/json; charset=utf-8");
    }
  );
});
