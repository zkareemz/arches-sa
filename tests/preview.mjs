import { preview } from "astro";

// The API keeps this process in the foreground so Playwright owns its lifetime.
const server = await preview({ server: { host: "127.0.0.1", port: 4322 } });
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await server.stop();
    process.exit(0);
  });
}
