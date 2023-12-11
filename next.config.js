/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  webpack: (config, context) => {
    config.resolve.fallback = { fs:false, net:false, tls:false }
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding|supports-color)$/,
        }),
      )
    }
    return config
  },
}

module.exports = nextConfig
