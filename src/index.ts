import { Elysia, error, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { note } from './Note';
// import { bot } from './discord';



const app = new Elysia()
          .use(swagger())
          .use(note)
          .get("/", () => "Hello Elysia")
          .get("/about", () => "About Elysia")
          .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
