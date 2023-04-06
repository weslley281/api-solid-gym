import { app } from './app';
import { env } from './env';

const port = env.PORT;
const host = env.HOST;

app
  .listen({ host, port })
  .then(() =>
    console.log(`🚀 The HTTP Server is running on http://${host}:${port}`)
  );
