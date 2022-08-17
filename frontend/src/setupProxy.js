const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://i7d103.p.ssafy.io/rest",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};

// "http://i7d103.p.ssafy.io/rest"
