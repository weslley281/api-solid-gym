import { app } from './app';

const port = 5000;
const host = '192.168.15.41';

app
  .listen({ host, port })
  .then(() =>
    console.log(`🚀 The HTTP Server is running on http://${host}:${port}`)
  );
