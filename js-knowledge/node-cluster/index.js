/*
1 sentence:
Node is single-thread, but we can take advantage of multi-core systems to handle incoming requests parallelly

Detail:
- The worker processes are spawned using the child_process.fork() method, 
so they can communicate with the 'master' via IPC and pass server handles back and forth.

However, there are drawbacks.
- If one slave dies, we have to spawn another one. It means that we have to manage the clusters pool ourself.
- In practice, distribution tends to be very unbalanced due to OS scheduler vagaries. e.g. 70% connections to 2/8 cpus.
*/

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    console.log(`Worker ${process.pid} got pinned`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}