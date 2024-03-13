import fp from "fastify-plugin";
import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyPluginOptions,
} from "fastify";
import bcrypt from "bcrypt";

export default fp(
  async (server: FastifyInstance, opts: FastifyPluginOptions) => {
    server.post(
      "/sign-up",
      async (
        request: FastifyRequest<{ Body: { email: string; password: string } }>,
        reply: FastifyReply
      ) => {
        const { email, password } = request.body;
        const user = await server.db.user.findOne({ where: { email } });

        if (user) {
          reply.code(409).send("EMAIL_ALREADY_TAKEN");
        } else {
          await server.db.user.save({
            email,
            password: bcrypt.hashSync(password, 8),
          });
          reply.code(201).send();
        }
      }
    );

    server.post(
      "/sign-in",
      async (
        request: FastifyRequest<{ Body: { email: string; password: string } }>,
        reply: FastifyReply
      ) => {
        const { email, password } = request.body;
        // 기존 findOne({emil}) 코드는 Object literal may only specify
        // known properties, and 'email' does not exist in type
        // 'FindOneOptions<User>'. 에러가 발생
        // findOne 메소드에는 값뿐만 아니라 조건도 보내야 함
        const user = await server.db.user.findOne({ where: { email } });

        if (user) {
          // check password
          if (bcrypt.compareSync(password, user.password)) {
            const token = server.jwt.sign({ userId: user.id });
            reply.code(200).send({ token });
          }
          // password mismatch
          else {
            reply.code(401).send("PASSWORD_MISMATCH");
          }
        } else {
          reply.code(404).send("USER_NOT_FOUND");
        }
      }
    );
  }
);
