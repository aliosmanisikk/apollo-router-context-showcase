import { runA } from './subgraph-a';
import { runB } from './subgraph-b';

let isShuttingDown = false;
const noopInterval = setInterval(() => {}, 1000);

(async () => {
  const serverA = await runA();
  const serverB = await runB();

  const gracefulShutdown = async () => {
    console.log('Shutting down servers gracefully...');
    if (isShuttingDown) return;
    isShuttingDown = true;

    await serverA.stop();
    await serverB.stop();
    console.log('All servers stopped gracefully.');

    clearInterval(noopInterval);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
})();
