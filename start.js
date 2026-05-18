const http = require("http");
const path = require("path");

// ---- helpers ----
const ts = () => new Date().toISOString();
const log = (msg) => console.log(`[shule ${ts()}] ${msg}`);

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

// ---- start server ----
process.env.NODE_ENV = "production";
process.chdir(__dirname);

require("./server.js");
