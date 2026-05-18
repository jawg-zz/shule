const http = require("http");
const path = require("path");
const { spawnSync } = require("child_process");

// ---- helpers ----
const ts = () => new Date().toISOString();
const log = (msg) => console.log(`[shule ${ts()}] ${msg}`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run(command, args, options = {}) {
  const attempts = options.attempts || 1;
  const retryDelayMs = options.retryDelayMs || 3000;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    log(`Running ${command} ${args.join(" ")}${attempts > 1 ? ` (attempt ${attempt}/${attempts})` : ""}`);
    const result = spawnSync(command, args, {
      cwd: __dirname,
      env: process.env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    if (result.status === 0) return;

    if (attempt < attempts) {
      log(`${command} ${args.join(" ")} failed; retrying in ${retryDelayMs / 1000}s`);
      await sleep(retryDelayMs);
      continue;
    }

    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

async function deployDatabase() {
  if (process.env.SKIP_DB_DEPLOY === "true") {
    log("Skipping database deploy because SKIP_DB_DEPLOY=true");
    return;
  }

  if (!process.env.DATABASE_URL) {
    log("Skipping database deploy because DATABASE_URL is missing");
    return;
  }

  const prismaCli = path.join(__dirname, "node_modules", "prisma", "build", "index.js");
  const tsxCli = path.join(__dirname, "node_modules", "tsx", "dist", "cli.cjs");

  await run(process.execPath, [prismaCli, "db", "push", "--accept-data-loss"], {
    attempts: 10,
    retryDelayMs: 5000,
  });
  await run(process.execPath, [tsxCli, path.join(__dirname, "prisma", "seed.ts")]);
}

// ---- env check ----
log(`NODE_ENV=${process.env.NODE_ENV}`);
log(`PORT=${process.env.PORT || 3000}`);
log(`HOSTNAME=${process.env.HOSTNAME || "0.0.0.0"}`);
log(`DATABASE_URL=${process.env.DATABASE_URL ? "SET" : "MISSING"}`);
log(`NEXTAUTH_SECRET=${process.env.NEXTAUTH_SECRET ? "SET" : "MISSING"}`);
log(`NEXTAUTH_URL=${process.env.NEXTAUTH_URL || "MISSING"}`);

// ---- request logger ----
const origCreateServer = http.createServer;
http.createServer = function (handler, ...args) {
  const wrapped = (req, res) => {
    const start = Date.now();
    const origEnd = res.end.bind(res);
    res.end = (...endArgs) => {
      log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - start}ms)`);
      return origEnd(...endArgs);
    };
    return handler(req, res);
  };
  return origCreateServer.call(http, wrapped, ...args);
};

async function main() {
  // ---- start server ----
  process.env.NODE_ENV = "production";
  process.chdir(__dirname);

  await deployDatabase();
  require("./server.js");
}

main().catch((error) => {
  console.error("[shule] Startup failed:", error);
  process.exit(1);
});
